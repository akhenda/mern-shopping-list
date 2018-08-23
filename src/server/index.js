import express from 'express';
import config from 'src/server/config/express';


const app = express();

config(app);

app.get('/', (req, res) => {
  res.status(200).send('hello');
});

app.post('/', (req, res) => {
  const message = `hello ${req.body.to}!`;
  res.json({ status: 'ok', message });
});

export default app;
