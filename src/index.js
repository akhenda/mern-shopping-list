import app from 'src/server';

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Shopping List API running on port ${port}`);
});
