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
  if (localStorage.getItem("commentArray") !== null) {
    getComments();
  }

  if (localStorage.getItem("obj") !== null) {
    getObj();
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
  for (let i = 0; i < 9; i++) {
    topContent.innerHTML += getTopContent(i);
  }
}

function renderSuggestions() {
  let suggestionsContent = document.getElementById("suggestionsContent");
  suggestionsContent.innerHTML = "";
  for (let i = 9; i < profiles.length; i++) {
    suggestionsContent.innerHTML += getSuggestions(i);
  }
}

/**get each content*/
function getTopContent(index) {
  let profile = profiles[index];
  return /*html*/ `
    <div id="topProfile${index}" class="top-profile" onclick="showFullProfile(${index})">
      <div class="img-container">
        <img id="topImage${index}" src=${profile["profileImage"]}  alt="">
      </div>
      <span id="topUserName${index}">${profile["userName"]}</span>
    </div>`;
}

function showFullProfile(index) {
  let profile = profiles[index];
  let fullPofileBg = document.getElementById("fullProfileBg");
  let fullProfileUser = document.getElementById("fullProfileUser");
  let fullProfile = document.getElementById("fullProfile");

  fullProfileUser.innerHTML = `${profile["userName"]}`;
  fullProfile.src = profile["profileImage"];
  fullProfileBg.classList.remove("d-none");
}

function hideFullProfile() {
  let fullPofileBg = document.getElementById("fullProfileBg");
  fullProfileBg.classList.add("d-none");
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
      <img src="${profile["profileImage"]}" alt="" onclick="showFullProfile(${index})">
      <div class="column">
        <span>${profile["userName"]}</span>
        <span class="text-blue">Suggested for you</span>
      </div>
    </div>
    <b class="text-btn">Follow</b>
  </div>
  
  `;
}

/**These functions are used to get the Post contents */
function getPostProfile(index, pIndex) {
  let post = posts[index];
  return /*html*/ `      
    <img  src="${profiles[pIndex]["profileImage"]}" onclick="showFullProfile(${index})">
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
    <div class="row jc-spacebtw">
      <div>
        <img class="icon" alt="" id="heartIcon${index}"
        src="/bitGram/assets/icons/heart-regular.svg" onload="getHeartIcon(${index})" onclick="switchHeartIcon(${index})">
        <img class="icon" src="/bitGram/assets/icons/comment-regular.svg" alt="">
        <img class="icon" src="/bitGram/assets/icons/paper-plane-regular.svg" alt="">
      </div>
      <img class="icon" id="bookmarkIcon${index}" onload="getBookmarkIcon(${index})" onclick="switchBookmarkIcon(${index})" src="/bitGram/assets/icons/bookmark-regular.svg" alt="">
    </div>
    `;
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
  saveObj();
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
    saveObj();
    render();
  }
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
  saveObj();
  render();
}

/** In getPostImage */
function getHeartIcon(index) {
  const img = document.getElementById(`heartIcon${index}`);
  let post = posts[index];
  if (post["heart"]) {
    img.src = "/bitGram/assets/icons/heart-regular.svg";
  } else {
    img.src = "/bitGram/assets/icons/heart-solid.svg";
  }
}

/** In getPostImage */
function getBookmarkIcon(index) {
  const img = document.getElementById(`bookmarkIcon${index}`);
  let post = posts[index];

  if (post["bookmark"]) {
    img.src = "/bitGram/assets/icons/bookmark-regular.svg";
  } else {
    img.src = "/bitGram/assets/icons/bookmark-solid.svg";
  }
}

/** In getPostImage */
function switchBookmarkIcon(index) {
  const img = document.getElementById(`bookmarkIcon${index}`);
  let post = posts[index];
  post["bookmark"] = !post["bookmark"];
  saveObj();
  render();
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
  saveObj();
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
            <img class="comment-profile-img" src="${profiles[pIndex]["profileImage"]}" alt="" onclick="showFullProfile(${pIndex})">
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
  saveObj();
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

function saveObj() {
  localStorage.setItem("obj", JSON.stringify(posts));
}

function getObj() {
  const item = localStorage.getItem("obj");
  posts = JSON.parse(item);
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

function closeFullEdit() {
  let element = document.getElementById("fullEdit");
  element.classList.add("d-none");
}

function openFullEdit() {
  let element = document.getElementById("fullEdit");
  element.classList.remove("d-none");
}

function saveFullEdit() {
  let text = document.getElementById("textarea");
  let input = document.getElementById("editInput");
  let element = document.getElementById("fullEdit");
  element.classList.add("d-none");
  console.log(text.value);
  console.log(input.value);
  let obj = {
    userName: "HanbitChang",
    location: "Maastricht, Netherlands",
    headline: input.value,
    image: "/bitGram/assets/imgs/posts/16.jpg",
    heart: true,
    bookmark: true,
    showComments: true,
    comments: [],
    commentUser: [],
    likes: 0,
  };
  posts.push(obj);
  saveObj();
  render();
}

async function printJSON() {
  const responsePost = await fetch("/bitGram/assets/data/data_10.json");
  const responseProfile = await fetch("/bitGram/assets/data/profil.json");
  posts = await responsePost.json();
  profiles = await responseProfile.json();
}

printJSON();
