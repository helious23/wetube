import routes from "./routes";
// local 변수를 global 하게 사용할 수 있게 만듦

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = { // DB 생성 전, 가짜 user  정보를 변수로 입력 
    isAuthenticated : true,
    id : 1,
  }
  next(); // app.js 에서 다음 함수인 route 로 넘어가기 위해 필수
};

export const corsMiddleware = (req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org"
  );
  return next();
}
