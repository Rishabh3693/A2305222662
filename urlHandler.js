const urlDB = new Map();
const { generateShortcode } = require('../utils/generateShortcode');
const Log = require('../middleware/logMiddleware');

exports.createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || typeof url !== 'string') {
    await Log('backend', 'error', 'handler', 'Invalid URL provided');
    return res.status(400).json({ error: 'Invalid URL' });
  }

  let code = shortcode || generateShortcode();
  if (urlDB.has(code)) {
    await Log('backend', 'error', 'handler', 'Shortcode collision');
    return res.status(409).json({ error: 'Shortcode already exists' });
  }

  const expiry = new Date(Date.now() + validity * 60 * 1000).toISOString();
  urlDB.set(code, {
    originalUrl: url,
    expiry,
    createdAt: new Date().toISOString(),
    clicks: [],
  });

  await Log('backend', 'info', 'handler', `Short URL created: ${code}`);
  res.status(201).json({ shortLink: `http://localhost:3000/${code}`, expiry });
};

exports.redirectShortUrl = async (req, res) => {
  const { shortcode } = req.params;
  const entry = urlDB.get(shortcode);

  if (!entry) {
    await Log('backend', 'error', 'route', 'Shortcode not found');
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  if (new Date(entry.expiry) < new Date()) {
    await Log('backend', 'warn', 'route', 'Shortcode expired');
    return res.status(410).json({ error: 'Shortcode expired' });
  }

  entry.clicks.push({
    time: new Date().toISOString(),
    referrer: req.headers.referer || 'unknown',
    userAgent: req.headers['user-agent'] || 'unknown',
  });

  await Log('backend', 'info', 'route', `Redirecting to ${entry.originalUrl}`);
  res.redirect(entry.originalUrl);
};

exports.getShortUrlStats = async (req, res) => {
  const { shortcode } = req.params;
  const entry = urlDB.get(shortcode);

  if (!entry) {
    await Log('backend', 'error', 'repository', 'Stats request for nonexistent shortcode');
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  res.json({
    shortcode,
    originalUrl: entry.originalUrl,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    totalClicks: entry.clicks.length,
    logs: entry.clicks,
  });
};