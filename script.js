const fades = document.querySelectorAll(".fade");

function showOnScroll() {
  fades.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", showOnScroll);
window.addEventListener("load", showOnScroll);

function getRandomAnimeCharacter() {

  
  fetch("https://api.jikan.moe/v4/random/anime")
    .then(res => res.json())
    .then(animeData => {

      const animeID = animeData.data.mal_id;
      const animeTitle = animeData.data.title;

      
      return fetch(`https://api.jikan.moe/v4/anime/${animeID}/characters`)
        .then(res => res.json())
        .then(charData => {

          if (charData.data.length === 0) {
            throw "No character";
          }

          const randomChar =
            charData.data[Math.floor(Math.random() * charData.data.length)]
              .character;

          
          document.getElementById("charName").innerText =
            randomChar.name + " (" + animeTitle + ")";

          document.getElementById("charImg").src =
            randomChar.images.jpg.image_url;

          document.getElementById("charAbout").innerText =
            "Karakter dari anime acak";
        });
    })
    .catch(() => {
      document.getElementById("charName").innerText =
        "Gagal ambil anime :( coba reload";
    });
}


getRandomAnimeCharacter();
