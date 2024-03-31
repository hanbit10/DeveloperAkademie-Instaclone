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
  let topContent = document.getElementById("top-content");
  let postContent = document.getElementById("post-content");
  console.log(posts.length);

  for (let i = 0; i < profiles.length; i++) {
    topContent.innerHTML += getProfiles(i);
  }

  for (let i = 0; i < posts.length; i++) {
    postContent.innerHTML += getPost(i);
  }
}

function getProfiles(index) {
  let profile = profiles[index];
  return /*html*/ `
    <div class="top-profile">
      <div class="img-container">
        <img src="${profile["profileImage"]}" alt="">
      </div>
      <span>${profile["userName"]}</span>
    </div>
  `;
}

function getPost(index) {
  let post = posts[index];
  let pIndex = profiles.findIndex((obj) => obj.userName == post["userName"]);
  return /*html*/ `
  <div class="post-card">
    <div class="profile">
      <img  src="${profiles[pIndex]["profileImage"]}">
      <h2>${post["userName"]}</h2>
    </div>
    <span>${post["location"]}</span> <br>
    <img class="foto-box" src="${post["image"]}" alt="">
    <b>${post["userName"]}&nbsp;</b> 
    <span>${post["headline"]}</span> <br>
    <div class="comment">
    </div>

    <span>${post["likes"]} likes</span>
  </div>
  `;
}

function getCommentProfiles(commentUsers, comments) {
  let commentProfiles = "";
  for (let i = 0; i < commentUsers.length; i++) {
    let pIndex = profiles.findIndex((obj) => obj.userName == commentUsers[i]);
    commentProfiles += /*html*/ `
      <div class="profile">
        <img src="${profiles[pIndex]["profileImage"]}" alt="">
      </div>
 
      <span>${commentUsers[i]}</span>
      <span>${comments[i]}</span>
      <br>
      `;
  }
  return commentProfiles;
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
