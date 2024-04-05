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

let profiles = [];
let posts = [];

function render() {
  if (localStorage.getItem("obj") !== null) {
    getObj();
  }

  renderProfile();
  renderPosts();
}

function renderProfile() {
  getProfileImg();
  getProfileContent();
}

function getProfileImg() {
  let profile = profiles[1];
  let img = document.getElementById("profileImg");
  img.src = profile["profileImage"];
}

function getProfileContent() {
  let profile = profiles[1];
  let content = document.getElementById("profileContent");
  content.innerHTML = /*html*/ `
  <div class="user-name">${profile["userName"]}</div>
  `;
}

function renderPosts() {
  let getPost = document.getElementById("posts");
  getPost.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    if (post["userName"] == "HanbitChang") {
      getPost.innerHTML += /*html*/ `
      <img class="get-post" id="getPost${i}" src="${post["image"]}" alt="">
      `;
    }
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

function getObj() {
  const item = localStorage.getItem("obj");
  posts = JSON.parse(item);
}

function saveObj() {
  localStorage.setItem("obj", JSON.stringify(posts));
}

async function printJSON() {
  const responsePost = await fetch("/bitGram/assets/data/data_10.json");
  const responseProfile = await fetch("/bitGram/assets/data/profil.json");
  posts = await responsePost.json();
  profiles = await responseProfile.json();
}

printJSON();
