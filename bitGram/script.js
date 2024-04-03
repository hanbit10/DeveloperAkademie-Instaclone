async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

let posts = [];
let profiles = [];

function render() {
  if (
    ["heartArray", "likesArray", "commentArray"].every(
      (key) => localStorage.getItem(key) !== null
    )
  ) {
    getHeart();
    getLikes();
    getComments();
    getAllComments();
  }

  renderProfiles();
  renderPosts();
  renderSuggestions();
}

/**renders each content */
function renderPosts() {
  let postContent = document.getElementById("post-content");
  postContent.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    postContent.innerHTML += getPost(i);
  }
}

function renderProfiles() {
  let topContent = document.getElementById("top-content");
  topContent.innerHTML = "";
  for (let i = 0; i < profiles.length; i++) {
    topContent.innerHTML += getTopContent(i);
  }
}

function renderSuggestions() {
  let suggestionsContent = document.getElementById("suggestionsContent");
  suggestionsContent.innerHTML = "";
  for (let i = 2; i < profiles.length - 2; i++) {
    suggestionsContent.innerHTML += getSuggestions(i);
  }
}

/**get each content*/

function getTopContent(index) {
  let profile = profiles[index];
  return /*html*/ `
    <div class="top-profile">
      <div class="img-container">
        <img src="${profile["profileImage"]}" alt="">
      </div>
      <span>${profile["userName"]}</span>
    </div>`;
}

function getPost(index) {
  let post = posts[index];
  let pIndex = profiles.findIndex((obj) => obj.userName == post["userName"]);
  return /*html*/ `
  <div class="post-card">
    <div class="post-profile">
      ${getPostProfile(index, pIndex)}
    </div>
    <div class="column">
      ${getPostImage(index)}
      ${getPostInteractions(index)}
      ${getPostComments(index)}
    </div>
  </div>`;
}

function getSuggestions(index) {
  let profile = profiles[index];
  return /*html*/ `
  <div class="suggestions">
    <div class="suggestions-profile">
      <img src="${profile["profileImage"]}" alt="">
      <span>${profile["userName"]}</span>
    </div>
    <b class="text-btn">Follow</b>
  </div>
  
  `;
}

/**These functions are used to get the Post contents */
function getPostProfile(index, pIndex) {
  let post = posts[index];
  return /*html*/ `      
    <img  src="${profiles[pIndex]["profileImage"]}">
    <div class="column">
      <b>${post["userName"]}</b>
      <span>${post["location"]}</span>
    </div>`;
}

function getPostImage(index) {
  let post = posts[index];
  return /*html*/ `
    <img class="foto-box" ondblclick="plusHeartIcon(${index})" 
    src="${post["image"]}" alt="">
    <img class="heart-icon" alt="" id="heartIcon${index}"
    src="/bitGram/assets/icons/heart-svgrepo-com-black.svg" onload="getHeartIcon(${index})" onclick="switchHeartIcon(${index})">`;
}

function getPostInteractions(index) {
  let post = posts[index];
  return /*html*/ `
    <b>${post["likes"]} likes</b>
    <div class="row">    
      <b>${post["userName"]}&nbsp;</b> 
      <div>${post["headline"]}</div> <br>
    </div>
`;
}

function getPostComments(index) {
  let post = posts[index];
  return /*html*/ `
    <div id="showAllComments${index}" class="show-all-comments" onclick="showAllComments(${index})"> 
      hide comments
    </div>
    <div id="comment${index}" class="comment">
      ${getCommentProfiles(post["commentUser"], post["comments"])}
      <div class="row">
        <input id="commentInput${index}" class="comment-input" placeholder="add a comment" required>
        <button onclick="addComment(${index})" class="comment-button text-btn">Add</button>
      </div>
    </div>`;
}

/** In getPostComments */
function showAllComments(index) {
  let comment = document.getElementById(`comment${index}`);
  let showComment = document.getElementById(`showAllComments${index}`);
  let post = posts[index];
  post["showComments"] = !post["showComments"];

  if (post["showComments"]) {
    comment.classList.remove("d-none");
    showComment.innerHTML = `hide comments`;
  } else {
    comment.classList.add("d-none");
    showComment.innerHTML = `show all ${post["comments"].length} comments`;
  }
  saveAllComments();
}

/**In getPostComments */
function addComment(index) {
  let input = document.getElementById(`commentInput${index}`);
  if (input.value == "") {
    alert("fill in");
  } else {
    let post = posts[index];
    let profile = profiles[1];
    post["comments"].push(input.value);
    post["commentUser"].push(profile["userName"]);
    saveComments();
    render();
  }
}

/** In getPostImage */
function getHeartIcon(index) {
  const img = document.getElementById(`heartIcon${index}`);
  let post = posts[index];
  if (post["heart"]) {
    img.src = "/bitGram/assets/icons/heart-svgrepo-com-black.svg";
  } else {
    img.src = "/bitGram/assets/icons/heart-svgrepo-com-red.svg";
  }
}

/** In getPostImage */
function switchHeartIcon(index) {
  const img = document.getElementById(`heartIcon${index}`);
  let post = posts[index];
  post["heart"] = !post["heart"];
  if (post["heart"]) {
    post["likes"] = post["likes"] - 1;
  } else {
    post["likes"] = post["likes"] + 1;
  }
  saveHeart();
  saveLikes();
  render();
}

/** In getPostImage */
function plusHeartIcon(index) {
  const img = document.getElementById(`heartIcon${index}`);
  let post = posts[index];
  if (!post["heart"]) {
  } else {
    post["heart"] = !post["heart"];
    post["likes"] = post["likes"] + 1;
  }
  saveHeart();
  saveLikes();
  render();
}

/** In getPostComments */
function getCommentProfiles(commentUsers, comments) {
  let commentProfiles = "";
  for (let i = 0; i < commentUsers.length; i++) {
    let pIndex = profiles.findIndex((obj) => obj.userName == commentUsers[i]);
    commentProfiles += /*html*/ `
      <div>
        <div id="commentProfile" class="comment-profile">
          <img src="${profiles[pIndex]["profileImage"]}" alt="">
          <div class="column">          
            <b>${commentUsers[i]}</b>
            <span>${comments[i]}</span>
          </div>
          <div>x</div> 
        </div>
        <br>
      </div>
      `;
  }
  return commentProfiles;
}

/** Save and Get Values from the Local Storage */
function saveHeart() {
  let heartArray = [];
  for (let i = 0; i < posts.length; i++) {
    heartArray[i] = posts[i]["heart"];
  }
  localStorage.setItem("heartArray", JSON.stringify(heartArray));
}

function saveLikes() {
  let likesArray = [];
  for (let i = 0; i < posts.length; i++) {
    likesArray[i] = posts[i]["likes"];
  }
  localStorage.setItem("likesArray", JSON.stringify(likesArray));
}

function saveComments() {
  let commentArray = [];
  let commentProfileArray = [];
  for (let i = 0; i < posts.length; i++) {
    commentArray[i] = posts[i]["comments"];
    commentProfileArray[i] = posts[i]["commentUser"];
  }
  localStorage.setItem("commentArray", JSON.stringify(commentArray));
  localStorage.setItem(
    "commentProfileArray",
    JSON.stringify(commentProfileArray)
  );
}

function saveAllComments() {
  let arr = [];
  for (let i = 0; i < posts.length; i++) {
    arr[i] = posts[i]["showComments"];
  }

  localStorage.setItem("showComments", JSON.stringify(arr));
}

function getAllComments() {
  const item = localStorage.getItem("showComments");
  let arr = JSON.parse(item);
  for (let i = 0; i < posts.length; i++) {
    posts[i]["showComments"] = arr[i];
  }
}

function getHeart() {
  const heartItem = localStorage.getItem("heartArray");
  let heartArray = JSON.parse(heartItem);
  for (let i = 0; i < posts.length; i++) {
    posts[i]["heart"] = heartArray[i];
  }
}

function getLikes() {
  const likesItem = localStorage.getItem("likesArray");
  let likesArray = JSON.parse(likesItem);
  for (let i = 0; i < posts.length; i++) {
    posts[i]["likes"] = likesArray[i];
  }
}

function getComments() {
  const commentItem = localStorage.getItem("commentArray");
  const commentProfile = localStorage.getItem("commentProfileArray");
  let commentArray = JSON.parse(commentItem);
  let commentProfileArray = JSON.parse(commentProfile);
  for (let i = 0; i < posts.length; i++) {
    posts[i]["comments"] = commentArray[i];
    posts[i]["commentUser"] = commentProfileArray[i];
  }
}

async function printJSON() {
  const responsePost = await fetch("/bitGram/assets/data/data_10.json");
  const responseProfile = await fetch("/bitGram/assets/data/profil.json");
  const jsonPost = await responsePost.json();
  const jsonProfile = await responseProfile.json();
  posts = jsonPost;
  profiles = jsonProfile;
}

printJSON();

// function getHeartIcon(index) {
//   let post = posts[index];
//   let heartIcon = localStorage.getItem("heartIcon");
//   heartIcon = heartIcon.replaceAll('"', "");
//   post["heartIcon"] = heartIcon;
//   console.log(post["heartIcon"]);
// }
