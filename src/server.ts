import app from "./app";
import config from "./config";

const port = Number(config.port) || 5000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
