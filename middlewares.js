import multer from "multer";
import routes from "./routes";
// local 변수를 global 하게 사용할 수 있게 만듦

const multerVideo = multer({ dest: "uploads/videos/" }); // server 에 있는 video folder

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    // DB 생성 전, 가짜 user  정보를 변수로 입력
    isAuthenticated: false,
    id: 1,
  };
  next(); // app.js 에서 다음 함수인 route 로 넘어가기 위해 필수
};

export const corsMiddleware = (req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org"
  );
  next();
}; // CORS policy 추가 middleware

// File Upload middleware
export const uploadVideo = multerVideo.single("videoFile");
