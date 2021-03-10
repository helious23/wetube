import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import { corsMiddleware, localsMiddleware } from "./middlewares";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

import "./passport";

const app = express(); // express 실행 및 app 생성

/* ------------------------------ middleware ------------------------------------- */

app.use(helmet()); // 보안처리
app.set("view engine", "pug"); // res.render 사용 시, views 폴더에서 .pug 파일을 검색하도록 설정
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser()); // cookie 에 있는 data 이해하도록 parsing: 사용자 인증 시 필요
app.use(bodyParser.json()); // 서버가 json data 이해하도록 parsing: requset 정보에서 form 이나 json 형태로 된 body를 검사
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 normal html 이해하도록 parsing
app.use(morgan("dev")); // logging
app.use(localsMiddleware); // route 보다 상위에 있어야 모든 route 에서 호출 가능
app.use(passport.initialize()); // cookie parser 로 읽은 후에  passport 의 cookie 값 초기화
app.use(passport.session()); //

app.use(corsMiddleware); // helmet middleware 의 CORS policy 때문에 추가

/* --------------------------------- route --------------------------------------- */

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;

/* --------------------------- export to init.js --------------------------------- */
