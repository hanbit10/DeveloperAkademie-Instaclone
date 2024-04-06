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

let posts = [
  {
    userName: "C.hansam123",
    location: "Wien, Austria",
    headline: "Spring is coming back",
    image: "/bitGram/assets/imgs/posts/hansam_vienna.jpg",
    heart: true,
    bookmark: true,
    showComments: true,
    comments: ["This is a great picture!", "I love this flower!", "Omg so beautiful", "I want to visit you!"],
    commentUser: ["miller.John_ZZ", "elenaaa.o0", "SophieBrown", "LiamWilson"],
    likes: 363,
  },
  {
    userName: "HanbitChang",
    location: "Maastricht, Netherlands",
    headline: "Birds and a Person on the stairs",
    image: "/bitGram/assets/imgs/posts/hanbit_netherlands.jpg",
    heart: true,
    bookmark: true,
    showComments: true,
    comments: ["Great picture!", "What are the stairs", "Omg so beautiful", "I want to visit this place!"],
    commentUser: ["daveeeeGarciano", "elenaaa.o0", "miller.John_ZZ", "LiamWilson"],
    likes: 423,
  },
  {
    userName: "elenaaa.o0",
    location: "Paris, France",
    headline: "Exploring the City of Love!",
    image: "/bitGram/assets/imgs/posts/parisfrance.jpg",
    heart: true,
    bookmark: true,
    showComments: true,
    comments: ["Love this city!", "So much history!", "Fantastic atmosphere!", "Can't wait to come back!"],
    commentUser: ["LiamWilson", "papagganiSmith", "SophieBrown", "miller.John_ZZ"],
    likes: 69,
  },
  {
    userName: "EmmaWhite",
    location: "Rome, Italy",
    headline: "Adventures in Ancient Rome",
    image: "/bitGram/assets/imgs/posts/emmawhite_italy.jpg",
    heart: true,
    bookmark: true,
    showComments: true,
    comments: ["Amazing architecture!", "The palce is incredible!", "So many things to see!", "Feels like home!"],
    commentUser: ["doggybooyyyy", "daveeeeGarciano", "LiamWilson", "miller.John_ZZ"],
    likes: 48,
  },
  {
    userName: "SophieBrown",
    location: "Barcelona, Spain",
    headline: "Sunny Days in Barcelona",
    image: "/bitGram/assets/imgs/posts/sophiebrown_spain.jpg",
    heart: true,
    bookmark: true,
    showComments: true,
    comments: ["The beaches are stunning!", "Barcelona the city of Spain!", "I want to visit this place too!", "A perfect getaway!"],
    commentUser: ["miller.John_ZZ", "9thcrew", "EmmaWhite", "papagganiSmith"],
    likes: 22,
  },
  {
    userName: "EmmaWhite",
    location: "London, United Kingdom",
    headline: "London Calling!",
    image: "/bitGram/assets/imgs/posts/emmawhite_london.jpg",
    heart: true,
    bookmark: true,
    showComments: true,
    comments: ["London is magical!", "I miss the pubs!", "Great shot!", "Charming city!", "So much to explore!"],
    commentUser: ["papagganiSmith", "daveeeeGarciano", "EmmaWhite", "miller.John_ZZ", "SophieBrown"],
    likes: 72,
  },
  {
    userName: "daveeeeGarciano",
    location: "Berlin, Germany",
    headline: "Berlin Vibes",
    image: "/bitGram/assets/imgs/posts/davidgarcia_berlin.jpg",
    heart: true,
    bookmark: true,
    showComments: true,
    comments: ["Berlin is so hip!", "Love this place!", "Memories!", "Can't get enough of this city!"],
    commentUser: ["SophieBrown", "miller.John_ZZ", "papagganiSmith", "EmmaWhite"],
    likes: 58,
  },
  {
    userName: "LiamWilson",
    location: "Amsterdam, Netherlands",
    headline: "Canal Cruising in Amsterdam",
    image: "/bitGram/assets/imgs/posts/amsterdamnetherlands.jpg",
    heart: true,
    bookmark: true,
    showComments: true,
    comments: ["Amsterdam is breathtaking!", "Dream destination!", "Wish I was there!", "Canal views are amazing!"],
    commentUser: ["SophieBrown", "EmmaWhite", "papagganiSmith", "miller.John_ZZ"],
    likes: 9,
  },
  {
    userName: "daveeeeGarciano",
    location: "Vienna, Austria",
    headline: "Music and History in Vienna",
    image: "/bitGram/assets/imgs/posts/viennaaustria.jpg",
    heart: true,
    bookmark: true,
    showComments: true,
    comments: ["Vienna is stunning!", "Love the architecture!", "Great memories!", "Music everywhere!"],
    commentUser: ["elenaaa.o0", "LiamWilson", "concept.design", "papagganiSmith"],
    likes: 72,
  },
  {
    userName: "miller.John_ZZ",
    location: "Athens, Greece",
    headline: "Discovering Ancient Athens",
    image: "/bitGram/assets/imgs/posts/athengreece.jpg",
    heart: true,
    bookmark: true,
    showComments: true,
    comments: ["Greece is amazing!", "History everywhere!", "Incredible experience!", "This ancient temple is awesome!"],
    commentUser: ["daveeeeGarciano", "papagganiSmith", "LiamWilson", "EmmaWhite"],
    likes: 61,
  },
  {
    userName: "elenaaa.o0",
    location: "Prague, Czech Republic",
    headline: "Magical Moments in Prague",
    image: "/bitGram/assets/imgs/posts/elenamartinez_prague.jpg",
    heart: true,
    bookmark: true,
    showComments: true,
    comments: ["Prague is like a fairy tale!", "Charming city!", "Love the culture!", "Magical atmosphere!"],
    commentUser: ["EmmaWhite", "C.hansam123", "papagganiSmith", "SophieBrown"],
    likes: 86,
  },
  {
    userName: "SophieBrown",
    location: "Florence, Italy",
    headline: "Art and History in Florence",
    image: "/bitGram/assets/imgs/posts/florenceitaly.jpg",
    heart: true,
    bookmark: true,
    showComments: true,
    comments: ["Florence stole my heart!", "Art lover's paradise!", "Bellissimo!", "Could stay here forever!"],
    commentUser: ["daveeeeGarciano", "elenaaa.o0", "miller.John_ZZ", "LiamWilson"],
    likes: 17,
  },
];

let profiles = [
  {
    userName: "C.hansam123",
    profileImage: "/bitGram/assets/imgs/profilpicture/1hsc.jpg",
  },
  {
    userName: "HanbitChang",
    profileImage: "/bitGram/assets/imgs/profilpicture/2hbc.jpg",
  },
  {
    userName: "elenaaa.o0",
    profileImage: "/bitGram/assets/imgs/profilpicture/3elenamartinez.jpg",
  },
  {
    userName: "EmmaWhite",
    profileImage: "/bitGram/assets/imgs/profilpicture/4emwhite.jpg",
  },
  {
    userName: "SophieBrown",
    profileImage: "/bitGram/assets/imgs/profilpicture/5sophiebrown.jpg",
  },
  {
    userName: "daveeeeGarciano",
    profileImage: "/bitGram/assets/imgs/profilpicture/6davidgarcia.jpg",
  },
  {
    userName: "LiamWilson",
    profileImage: "/bitGram/assets/imgs/profilpicture/7lianwilson.jpg",
  },
  {
    userName: "miller.John_ZZ",
    profileImage: "/bitGram/assets/imgs/profilpicture/8johnmiller.jpg",
  },
  {
    userName: "papagganiSmith",
    profileImage: "/bitGram/assets/imgs/profilpicture/9alicesmith.jpg",
  },
  {
    userName: "piiiza.place",
    profileImage: "/bitGram/assets/imgs/profilpicture/10piiiza.place.jpg",
  },
  {
    userName: "concept.design",
    profileImage: "/bitGram/assets/imgs/profilpicture/11.jpg",
  },
  {
    userName: "9thcrew",
    profileImage: "/bitGram/assets/imgs/profilpicture/16.jpg",
  },
  {
    userName: "doggybooyyyy",
    profileImage: "/bitGram/assets/imgs/profilpicture/19.jpg",
  },
  {
    userName: "hyukkgyulee",
    profileImage: "/bitGram/assets/imgs/profilpicture/18.jpg",
  },
];

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

// async function printJSON() {
//   const responsePost = await fetch("/bitGram/assets/data/data_10.json");
//   const responseProfile = await fetch("/bitGram/assets/data/profil.json");
//   posts = await responsePost.json();
//   profiles = await responseProfile.json();
// }

// printJSON();
