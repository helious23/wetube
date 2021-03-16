import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // .env 에서 URL 가지고 옴. .gitignore 에 .env 있는지 꼭 확인!

mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true, // deprecation warning 때문에 추가
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connected to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
