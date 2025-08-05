const express = require('express');
const app = express();
const urlRoutes = require('./routes/urlRoutes');
const Log = require('./middleware/logMiddleware');

app.use(express.json());

app.use(async (req, res, next) => {
  await Log('backend', 'info', 'api', `${req.method} ${req.originalUrl}`);
  next();
});

app.use('/', urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await Log('backend', 'info', 'server', `Server running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});