import "@babel/polyfill";
import "./db";
import dotenv from "dotenv";
import app from "./app";
import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config(); // key 를 공개적으로 올리지 않게 함 .env 파일에서 로드해서 사용.

const PORT = process.env.PORT || 5000;

const handleListening = () =>
  console.log(`✅Listening on: http://localhost:${PORT}`);
app.listen(PORT, handleListening);
