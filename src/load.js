import bgImg from"../media/bg.jpg"

export function loadDefault() {
    document.body.textContent = "";
    const main = document.createElement("div");
    const bg = document.createElement("img");
    const title = document.createElement("h1");

    main.className = "default";
    main.style.zIndex = 1;
    bg.src = bgImg;
    bg.className = "bg";
    title.textContent = "Search weather for:"
    title.className = "title"

    main.appendChild(title);
    SearchDiv.loadLarge(main);
    document.body.appendChild(bg);
    document.body.appendChild(main);
}

export const SearchDiv = (function() {
    const searchDiv = document.createElement("div");
    const searchInput = document.createElement("input");
    const searchButton = document.createElement("button");
    function load() {
        searchDiv.className = "search-div";
        searchInput.className = "search-inp";
        searchButton.className = "search-btn";
        searchButton.textContent = "Get weather";

        searchDiv.appendChild(searchInput);
        searchDiv.appendChild(searchButton);
    }

    function loadSmall (elem) {
        console.log(searchDiv)
        searchDiv.style.fontSize = "1rem";
        elem.appendChild(searchDiv);
    }
    function loadLarge (elem) {
        const div = searchDiv
        div.style.fontSize = "2rem";
        elem.appendChild(div);
    }
    function getBtn () {
        return searchButton
    }
    function getInputValue () {
        return searchInput.value
    }
    load()

    return { loadSmall, loadLarge, getBtn, getInputValue }
})()

loadDefault()