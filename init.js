import "./db"
import app from "./app";
import dotenv from "dotenv";
dotenv.config(); // key 를 공개적으로 올리지 않게 함 .env 파일에서 로드해서 사용
import "./models/video";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅Listening on: http://localhost:${PORT}`);
app.listen(PORT, handleListening);
