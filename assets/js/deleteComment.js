import axios from "axios";

const deleteBtn = document.getElementsByClassName("jsDeleteBtn"); // button
const commentItem = document.getElementsByClassName("jsCommentItem"); // span
const commentNumber = document.getElementById("jsCommentNumber");
const commentList = document.getElementById("jsCommentList"); //ul

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteCommentOne = (comment, li) => {
  console.log(comment);
  console.log(li);
  // document.removeChild(li);
  // decreaseNumber();
};

const deleteComment = async (comment, li) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/deletecomment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    // console.log(comment);
    // console.log(li);
    deleteCommentOne(comment, li);
  }
};

const handleDeleteComment = (event) => {
  // console.log(event.target);
  const li = event.target.parentNode;
  const comment = li.textContent;
  // console.log(comment);
  deleteComment(comment, li);
};

const init = () => {
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", handleDeleteComment);
  }
};

if (deleteBtn) {
  init();
}
