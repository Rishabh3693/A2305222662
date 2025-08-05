const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const isValidUrl = require('../utils/urlValidator');
const {
  createShortUrl,
  redirectShortUrl,
  getShortUrlStats
} = require('../handler/urlHandler');

router.post(
  '/',
  [
    body('url').notEmpty().withMessage('URL is required'),
    body('url').custom(isValidUrl),
    body('validity').optional().isInt({ min: 1 }),
    body('shortcode').optional().isString().isLength({ min: 4 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    await createShortUrl(req, res);
  }
);

router.get('/:shortcode', redirectShortUrl);
router.get('/stats/:shortcode', getShortUrlStats);

module.exports = router;