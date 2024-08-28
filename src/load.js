import bgImg from "../media/bg.jpg"
import cloudyBg from "../media/cloudy.jpg"
import clearBg from "../media/clear.jpg"
import rainyBg from "../media/rain.jpg"
import snowyBg from "../media/snowing.jpg"
import windyBg from "../media/windy.jpg"
import fogyBg from "../media/fogy.jpg"

class Theme {
    constructor (url) {
        this.url = url
    }
    getUrl () {
        return this.url
    }
}

const THEMES_LIST = {
    "snow": new Theme(snowyBg),
    "rain": new Theme(rainyBg),
    "fog": new Theme(fogyBg),
    "wind": new Theme(windyBg),
    "cloudy": new Theme(cloudyBg),
    "clear": new Theme(clearBg),
}

export function loadDefault () {
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

export function loadWeather (theme, titleData, tempData, daysData) {
    document.body.textContent = "";
    const themeImg = document.createElement("img");
    const content = document.createElement("div");
    const title = new Title(titleData.title, titleData.subTitle, titleData.displayDate, titleData.description);

    themeImg.src = THEMES_LIST[theme].getUrl()
    themeImg.className = "bg";
    content.className = "content"

    content.appendChild(title.elem);
    document.body.appendChild(themeImg);
    document.body.appendChild(content);
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
    function getInput () {
        return searchInput
    }
    function getInputValue () {
        return searchInput.value
    }
    load()

    return { loadSmall, loadLarge, getBtn, getInput, getInputValue }
})()

class Title {
    constructor (title, subTitle, date, desc) {
        this.div = document.createElement("div")
        const titleElem = document.createElement("h1");
        const subTitleElem = document.createElement("h3");
        const dateElem = document.createElement("h2");
        const descElem = document.createElement("h2");

        titleElem.textContent = title;
        subTitleElem.textContent = subTitle;
        dateElem.textContent = date;
        descElem.textContent = desc;

        this.div.appendChild(titleElem);
        this.div.appendChild(subTitleElem);
        this.div.appendChild(dateElem);
        this.div.appendChild(descElem);
        this.div.className = "title-div"
    }
    get elem() {
        return this.div
    }
}


loadDefault()