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
  if (localStorage.getItem("heartArray") !== null) {
    getHeart();
  }
  if (localStorage.getItem("likesArray") !== null) {
    getLikes();
  }
  if (localStorage.getItem("commentArray") !== null) {
    getComments();
  }

  if (localStorage.getItem("showComments") !== null) {
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
      ${getCommentProfiles(index, post["commentUser"], post["comments"])}
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
function getCommentProfiles(index, commentUsers, comments) {
  let commentProfiles = "";
  for (let i = 0; i < commentUsers.length; i++) {
    let pIndex = profiles.findIndex((obj) => obj.userName == commentUsers[i]);
    commentProfiles += /*html*/ `
        <div id="commentProfile" class="comment-profile">
          <div class="row">
            <img class="comment-profile-img" src="${profiles[pIndex]["profileImage"]}" alt="">
            <div class="column comment-profile-content">          
              <b>${commentUsers[i]}</b> <span >${comments[i]}</span>
            </div>
          </div>
          <div class='delete-btn' onclick="deleteComment(${i}, ${index})">${deleteCommentUser(i, commentUsers)}
          </div> 
        </div>
      `;
  }
  return commentProfiles;
}

function deleteComment(i, index) {
  let post = posts[index];
  post["comments"].splice(i, 1);
  post["commentUser"].splice(i, 1);
  saveComments();
  render();
}

/** In getCommentProfiles */
function deleteCommentUser(index, commentUsers) {
  let img = "<img class='delete-btn-img'  src='/bitGram/assets/icons/iconxx.svg'/>";
  if (commentUsers[index] == "HanbitChang") {
    return img;
  } else {
    return "";
  }
}

/** Save and Get Values from the Local Storage */
function saveHeart() {
  let arr = [];
  for (let i = 0; i < posts.length; i++) {
    arr[i] = posts[i]["heart"];
  }
  localStorage.setItem("heartArray", JSON.stringify(arr));
}

function saveLikes() {
  let arr = [];
  for (let i = 0; i < posts.length; i++) {
    arr[i] = posts[i]["likes"];
  }
  localStorage.setItem("likesArray", JSON.stringify(arr));
}

function saveComments() {
  let arr1 = [];
  let arr2 = [];
  for (let i = 0; i < posts.length; i++) {
    arr1[i] = posts[i]["comments"];
    arr2[i] = posts[i]["commentUser"];
  }
  localStorage.setItem("commentArray", JSON.stringify(arr1));
  localStorage.setItem("commentProfileArray", JSON.stringify(arr2));
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
  const item = localStorage.getItem("heartArray");
  let arr = JSON.parse(item);
  for (let i = 0; i < posts.length; i++) {
    posts[i]["heart"] = arr[i];
  }
}

function getLikes() {
  const item = localStorage.getItem("likesArray");
  let arr = JSON.parse(item);
  for (let i = 0; i < posts.length; i++) {
    posts[i]["likes"] = arr[i];
  }
}

function getComments() {
  const item1 = localStorage.getItem("commentArray");
  const item2 = localStorage.getItem("commentProfileArray");
  let arr1 = JSON.parse(item1);
  let arr2 = JSON.parse(item2);
  for (let i = 0; i < posts.length; i++) {
    posts[i]["comments"] = arr1[i];
    posts[i]["commentUser"] = arr2[i];
  }
}

async function printJSON() {
  const responsePost = await fetch("/bitGram/assets/data/data_10.json");
  const responseProfile = await fetch("/bitGram/assets/data/profil.json");
  posts = await responsePost.json();
  profiles = await responseProfile.json();
}

printJSON();
