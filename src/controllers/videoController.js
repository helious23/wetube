import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

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
    file: { location },
  } = req;
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id, // creator 에 user.id 대입하여 newVideo 객체 생성
  });
  req.user.videos.push(newVideo.id); // db에 id만 push
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req; // req.params.id 와 동일한 표현
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    const commentArray = await Comment.find(video.comments.creator);
    res.render("videoDetail", { pageTitle: video.title, video, commentArray }); // videoDetail.pug 로 video 변수로 넘겨줌
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video }); // editVideo template 으로 video object 전송
    }
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
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove(id);
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Delete comment

export const postDeleteComment = async (res, req) => {
  const {
    req: {
      user: { id },
      body: { comment },
    },
  } = req;
  try {
    const commentItem = await Comment.find({ text: comment });
    // console.log(commentItem);
    console.log(commentItem[0].id);
    if (String(commentItem[0].creator) !== id) {
      throw Error();
    } else {
      await Comment.findByIdAndDelete(commentItem[0].id);
    }
  } catch (error) {
    console.log(error);
    //   res.status(400);
    // } finally {
    //   res.end();
  }
};
