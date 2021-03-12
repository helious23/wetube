const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playButton = document.getElementById("jsPlayButton");

const handlePlayClick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
};

const init = () => {
  playButton.addEventListener("click", handlePlayClick);
};

if (videoContainer) {
  init();
}
// javascript 는 footer 밑에 들어가서 모든 페이지에서 로드되므로 if문으로 원하는 page 만 sorting
