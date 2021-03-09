import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req; // req.params.id 와 동일한 표현
  try {
    const video = await Video.findById(id);
    // async await, mongoose 의 findById method : mongoose 의 id 로 Video model 에서 검색하여 결과 찾은 후 render 실행
    res.render("videoDetail", { pageTitle: video.title, video }); // videoDetail.pug 로 video 변수로 넘겨줌
  } catch (error) {
    res.redirect(routes.home); // error 발생시 홈화면으로 redirect
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video }); // editVideo template 으로 video object 전송
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description }); // id로 title, description 검색하여 update
    // 저장할 필요는 없으므로 함수만 설정
    res.redirect(routes.videoDetail(id)); // videoDetail 로 redirect
  } catch (error) {
    res.redirect(routes.home); // middleware 사용하여 error 발생시 home으로 redirect 하게 할 수 있음(참고)
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
