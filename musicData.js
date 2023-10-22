// Mock async function to modify the URL
async function modifyUrl(url) {
  return new Promise((resolve) => {
    const modifiedUrl =
      url.replace(
        "https://open.spotify.com/track/",
        "https://open.spotify.com/embed/track/"
      ) + "?utm_source=generator&theme=0";
    resolve(modifiedUrl);
  });
}

function toggleLike() {
  $(".favme").click(function () {
    if ($(this).hasClass("active")) {
      const localData = JSON.parse(localStorage.getItem("likedMusic"));
      const likedMusic = localData;
      const id = $(this).parent().data("id");
      const index = likedMusic.indexOf(id);
      likedMusic.splice(index, 1);
      localStorage.setItem("likedMusic", JSON.stringify(likedMusic));
      $(this).toggleClass("active");
    } else {
      const localData = JSON.parse(localStorage.getItem("likedMusic"));
      // console.log(localData)
      let likedMusic = localData;
      const id = $(this).parent().data("id");
      likedMusic.push(id);
      localStorage.setItem("likedMusic", JSON.stringify(likedMusic));
      $(this).toggleClass("active");
    }
  });

  /* when a user clicks, toggle the 'is-animating' class */
  $(".favme").on("click touchstart", function () {
    $(this).toggleClass("is_animating");
  });

  /*when the animation is over, remove the class*/
  $(".favme").on("animationend", function () {
    $(this).toggleClass("is_animating");
  });
}

async function renderMusicCards(data) {
  // check if the likedMusic key exists in the local storage
  // if it does not exist, create it and set it to an empty array
  // if it exists, do nothing
  if (!localStorage.getItem("likedMusic")) {
    localStorage.setItem("likedMusic", JSON.stringify([]));
  }

  const musicContainer = document.querySelector(".music-grid");
  const seenCards = new Set();
  for (let item of data) {
    if (!seenCards.has(item.id)) {
    item.src = await modifyUrl(item.src);

    const musicItem = document.createElement("div");
    musicItem.className = "music-item";
    musicItem.setAttribute("data-aos", "fade-up");

    const des = document.createElement("div");
    des.className = "des";

    const iframe = document.createElement("iframe");
    Object.assign(iframe.style, {
      borderRadius: "12px",
      width: "100%",
      height: "352px",
      color: "black",
    });
    Object.assign(iframe, {
      src: item.src,
      frameBorder: "0",
      allowFullscreen: true,
      allow:
        "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
      loading: "lazy",
    });

    const details = document.createElement("div");
    details.className = "details";

    const p = document.createElement("p");
    p.textContent = "Suggested by " + item.suggestedBy;
    p.style.marginTop = "0px";
    p.style.marginBottom = "10px";
    p.style.color = "white";
    p.style.padding = "5px";

    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    // -webkit-animation: hue 60s infinite linear;

    //   <div class="fav-btn">
    // 	<span href="" class="favme dashicons dashicons-heart"></span>
    // </div>

    const likedMusic = JSON.parse(localStorage.getItem("likedMusic"));

    const favBtn = document.createElement("div");
    favBtn.className = "fav-btn";
    favBtn.setAttribute("data-id", item.id);
    const favme = document.createElement("span");
    favme.className = "favme dashicons dashicons-heart";
    if (likedMusic.includes(item.id)) {
      favme.classList.add("active");
    } else {
      favme.classList.remove("active");
    }
    favBtn.appendChild(favme);
    details.appendChild(favBtn);
    // des.appendChild(p);
    details.appendChild(p);

    des.appendChild(iframe);
    des.appendChild(details);
    musicItem.appendChild(des);
    musicContainer.appendChild(musicItem);
    seenCards.add(item.id);}
  }
}

// Fetch the JSON data from the file and then render the music cards
async function fetchAndRender(filter) {
  try {
    const response = await fetch("./musicData.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (filter) {
      switch (filter) {
        case "favourites":
          const likedMusic = JSON.parse(localStorage.getItem("likedMusic"));
          const filteredData = data.filter((item) => {
            return likedMusic.includes(item.id);
          });
          await renderMusicCards(filteredData);
          return;
        case "all":
          await renderMusicCards(data);
          return;
        case "latest":
          const latestData = data.sort((a, b) => b.id - a.id);
          await renderMusicCards(latestData);
          return;
        default:
          await renderMusicCards(data);
          return;
      }
    } else {
      await renderMusicCards(data);
      return;
    }
  } catch (error) {
    console.log("There was a problem:", error.message);
  }
}
const selectOptions = document.querySelector("#filter");
const search = document.querySelector("#search");

// Intial Render of the music cards
fetchAndRender("all").then(() => {
  toggleLike();
});

// Event listener for the select options to filter the music cards
selectOptions.addEventListener("change", (e) => {
  const filter = e.target.value;
  console.log(filter);
  const mediaContainer = document.querySelector(".music-grid");
  mediaContainer.innerHTML = "";
  fetchAndRender(filter).then(() => {
    toggleLike();
  });
});

// Event listener for the search input to filter the music cards
search.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const mediaContainer = document.querySelector(".music-grid");
  mediaContainer.innerHTML = "";
  fetchAndRender("all").then(() => {
    const musicItems = document.querySelectorAll(".music-item");
    musicItems.forEach((item) => {
      const p = item.querySelector("p");
      const text = p.textContent;
      if (text.toLowerCase().includes(searchValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
    toggleLike();
  });
});
