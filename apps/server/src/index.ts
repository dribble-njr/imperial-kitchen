import app from './app';
import config from './config';

const PORT = config.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});
