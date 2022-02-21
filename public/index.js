// const MAIN_SERVER = "http://localhost:5500";
const MAIN_SERVER = "";

async function searchAndDisplay(){
    const title_search = document.getElementById("title_movie_search").value.trim();
    if(!title_search) throw new Error("Title to search is void.");

 
    let a = await fetch(MAIN_SERVER + "/api/searchByName?title=" + title_search);
    let b = await a.json();

    let card_container = document.getElementById("card_container");
    console.log(b);
    b.forEach((e) => card_container.appendChild(createBasicDataCard(e)));
}

function createBasicDataCard(data){
    let container = document.createElement("div");
    container.setAttribute("movie_id", data.id);
    container.setAttribute("tabindex", "2");
    container.addEventListener("click", () => alert("S"));
    container.classList.add("basic_data_card", data.type)
    let image = document.createElement("img");
    image.setAttribute("src", data.poster);
    let text = document.createElement("p");
    text.innerText = data.title;

    container.appendChild(image);
    container.appendChild(text);


    let hidden = document.createElement("div");
    hidden.classList.add("hidden_card");
    text = document.createElement("p");
    text.innerText = "Presione para cargar."
    container.appendChild(hidden);
    return container;
};

document.getElementById("searchMoviesByName").addEventListener("click", searchAndDisplay);