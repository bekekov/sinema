const abc = document.querySelectorAll('a');
const cards = document.querySelector('.cards');
const input = document.querySelector('input');
const randomBtn = document.querySelector('#randomBtn'); // кнопка "random"
const homeBtn = document.querySelector('#homeBtn'); // кнопка "home"
const _baseUrl = "https://www.themealdb.com/api/json/v1/1/search.php?";
const abcUrl = "f=";
const searchName = "s=";

function getRandomMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php") // Используем API для случайного блюда
        .then(res => res.json())
        .then(data => {
            console.log(data.meals);
            showCard(data.meals);
        });
}

function getMealsByABC(tamga) {
    fetch(_baseUrl + abcUrl + tamga)
        .then(res => res.json())
        .then(data => {
            console.log(data.meals);
            showCard(data.meals);
        });
}
function getSearchName(name) {
    fetch(_baseUrl + searchName + name)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showCard(data.meals);
        });
}
abc.forEach((letter) => {
    letter.onclick = (event) => {
        event.preventDefault();
        console.log(letter.innerText.toLocaleLowerCase());
        getMealsByABC(letter.innerText.toLocaleLowerCase());
    };
});

function showCard(arr) {
    cards.innerHTML = ""; 
    if (!arr) {
        cards.innerHTML = "<p>No meals found.</p>"; 
        return;
    }

    arr.forEach((el) => {
        cards.innerHTML += `
        <div class="col-md-3">
            <div class="card" style="width: 18rem;">
                <img src="${el.strMealThumb}" class="card-img-top" alt="${el.strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${el.strMeal}</h5>
                    <p class="card-text">${el.strInstructions ? el.strInstructions.substring(0, 100) : "No instructions available"}</p>
                    <a href="recipe.html?id=${el.idMeal}" class="btn btn-primary">Recipe</a> <!-- Перенаправление на рецепт -->
                </div>
            </div>
        </div>`;
    });
}


input.addEventListener('input', () => {
    console.log(input.value);
    getSearchName(input.value);
});


randomBtn.addEventListener('click', () => {
    getRandomMeal(); 
});


homeBtn.addEventListener('click', () => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?") // Запрашиваем все блюда
        .then(res => res.json())
        .then(data => {
            console.log(data.meals);
            showCard(data.meals); 
        });
});

