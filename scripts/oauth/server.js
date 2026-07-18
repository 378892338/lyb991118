const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = 8081;
const ORIGIN = process.env.ORIGIN;
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
app.use(express.json());
app.get(['/auth', '/auth/'], (req, res) => {
  const url =
    'https://github.com/login/oauth/authorize?' +
    'client_id=' + CLIENT_ID +
    '&scope=repo,user' +
    '&redirect_uri=' +
    encodeURIComponent(ORIGIN + '/api/auth/callback');

  res.redirect(url);
});
app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('no code');
  try {
    const r = await axios.post('https://github.com/login/oauth/access_token', { client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }, { headers: { Accept: 'application/json' } });
    if (r.data.error) return res.status(401).send(r.data.error_description);
    res.send('<script>window.opener.postMessage("authorization:github:success:' + r.data.access_token + '","https://liuybhub.top");window.close();</script>');
  } catch { res.status(500).send('fail'); }
});
app.post('/auth', async (req, res) => {
  const code = req.body.code;
  if (!code) return res.status(400).json({ error: 'missing code' });
  try {
    const r = await axios.post('https://github.com/login/oauth/access_token', { client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }, { headers: { Accept: 'application/json' } });
    if (r.data.error) return res.status(401).json({ error: r.data.error_description });
    res.json({ token: r.data.access_token, provider: 'github' });
  } catch { res.status(500).json({ error: 'fail' }); }
});
app.listen(PORT, () => console.log('OAuth server on ' + PORT));
