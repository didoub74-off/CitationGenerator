const generate = document.getElementById("generate");
const favorite = document.getElementById("favorite");
const select = document.getElementById("selectCat");
const twitter = document.getElementById("twitter");

const quotesText = document.getElementById("quotes");
const authorText = document.getElementById("author");
const quotesContainer = document.getElementById("quotes-container");

const apiUrl = "https://api.api-ninjas.com/v1/quotes?category=";
const apiKey = "4lYcFZGhA3QidySyiMlhWA==8lAUulRSy4VI2r83";

const favoriteContainer = document.getElementById('favoriteContainer');
const favoriteList = document.getElementById('favoriteList');
const overlay = document.getElementById('overlay');

let selectOption = null;
let response = null;

let currentQuote = null;
let currentAuthor = null;

let localFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

generate.addEventListener("click", function() {
    selectOption = select.options[select.selectedIndex].text
    quotesText.innerHTML = "";
    authorText.innerHTML = "Please try another one.";
    if(selectOption === "Choose"){
        alert("Please select another option.");
    }else{
        quotesContainer.style.display = 'block';
        response = JSON.parse(httpGet(apiUrl + selectOption, apiKey));
        currentQuote = response[0].quote;
        currentAuthor = response[0].author;
        quotesText.innerHTML = currentQuote;
        authorText.innerHTML = currentAuthor;

        if(localFavorites.some(fav => fav[0] === currentQuote && fav[1] === currentAuthor)) {
            if(!favorite.classList.contains("favorited")) {
                favorite.classList.add("favorited");
            }
        }else {
            if(favorite.classList.contains("favorited")) {
                favorite.classList.remove("favorited");
            }
        }
    }
});

function httpGet(url,key){
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.setRequestHeader("X-Api-Key",key);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

favorite.addEventListener("click", function() {
    if(!localFavorites.some(fav => fav[0] === currentQuote && fav[1] === currentAuthor)) {
        localFavorites.push([currentQuote, currentAuthor]);
        localStorage.setItem('favorites', JSON.stringify(localFavorites));
        alert("Quote saved to favorites!");
        if(!favorite.classList.contains("favorited")) {
            favorite.classList.add("favorited");
        }
    }else {
        alert("Quote already in your favorites...")
    }
});

document.getElementById('showFavorite').addEventListener('click', () => {
    
    favoriteList.innerHTML = ''; // Clear existing favorites
    
    if (localFavorites.length === 0) {
        favoriteList.innerHTML = '<li>No favorites yet!</li>';
    } else {
        localFavorites.forEach(([quote, author]) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<h3 class="quotes favorites_quotes">${quote}</h3><h3 class="author">${author}</h3>`;
            favoriteList.appendChild(listItem);
        });
    }

    favoriteContainer.style.display = 'block';
    overlay.style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('favoriteContainer').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});

document.getElementById('twitter').addEventListener('click', () => {
    const twitterURL = `https://x.com/intent/tweet?text=${encodeURIComponent(currentQuote + " - " + currentAuthor)}`;
    window.open(twitterURL);
})
