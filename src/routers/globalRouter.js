import express from "express";
import passport from "passport";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  logout,
  getLogin,
  postLogin,
  githubLogin,
  postGithubLogIn,
  getMe,
  facebookLogin,
  postFacebookLogin,
} from "../controllers/userController";
import routes from "../routes";
import { onlyPrivate, onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.me, getMe);

/* --------------------- github login ---------------------*/

globalRouter.get(routes.gitHub, githubLogin); // github login 시 github webpage로 보냄
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }), // github 인증 후 돌아와서 User DB 와 비교 인증, 못찾으면 login 으로 redirect
  postGithubLogIn // callback function 인 postGithubLogin 실행
);

/* --------------------- facebook login ---------------------*/

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFacebookLogin
);

export default globalRouter;
