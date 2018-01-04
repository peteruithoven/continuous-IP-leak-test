const express = require('express');
const app = express();

// serve static files from folder: public
app.use(express.static('public'));

app.get('/api/ip', (req, res, next) => {
  const realIP = req.get('X-Real-IP');
  res.json({
    ip: realIP || req.ip
  })
});
app.use((err, req, res, next) => {
  console.log('error: ', err);
  return res.status(500).send(err);
});

const listener = app.listen(process.env.PORT|3000, () => {
  console.log('Server listening on ', listener.address().port);
});
