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

export function loadWeather (sign, theme, titleData, tempData, daysData) {
    document.body.textContent = "";
    const themeImg = document.createElement("img");
    const content = document.createElement("div");
    const top = new TopSection(sign)
    const title = new Title(titleData.title, titleData.subTitle, titleData.displayDate, titleData.description);
    const temp = new Temp(sign, tempData.currTemp, tempData.currMaxTemp, tempData.currMinTemp, tempData.currFeel)
    const days = new Cards(daysData);

    themeImg.src = THEMES_LIST[theme].getUrl()
    themeImg.className = "bg";
    content.className = "content"

    content.appendChild(top.elem)
    content.appendChild(title.elem);
    content.appendChild(temp.elem);
    content.appendChild(days.elem);
    document.body.appendChild(themeImg);
    document.body.appendChild(content);
}

export const SearchDiv = (function() {
    const searchDiv = document.createElement("div");
    const searchInput = document.createElement("input");
    const searchButton = document.createElement("button");
    const searchError = document.createElement("span");
    function load() {
        searchDiv.className = "search-div";
        searchInput.className = "search-inp";
        searchButton.className = "search-btn";
        searchButton.textContent = "Get weather";
        searchError.className = "error-msg";

        searchDiv.appendChild(searchInput);
        searchDiv.appendChild(searchButton);
        searchDiv.appendChild(searchError);
    }

    function loadSmall (elem) {
        searchDiv.classList.add("small")
        searchDiv.style.fontSize = "1rem";
        searchError.textContent = "";
        searchError.style.display = "none";
        elem.appendChild(searchDiv);
    }
    function loadLarge (elem) {
        searchDiv.className = "search-div";
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

class TopSection {
    constructor (sign) {
        this.div = document.createElement("div");
        const buttonsDiv = document.createElement("div");
        const celsiusBtn = document.createElement("button");
        const fahrenheitBtn = document.createElement("button");
        SearchDiv.loadSmall(this.div);

        this.div.className = "top";
        buttonsDiv.className = "buttons-div";
        celsiusBtn.className = "celsius-btn";
        celsiusBtn.textContent = "\u2103";
        fahrenheitBtn.className = "fahrenheit-btn";
        fahrenheitBtn.textContent = "\u2109";
        if (sign === "\u2109") fahrenheitBtn.classList.add("act")
        else if (sign === "\u2103") celsiusBtn.classList.add("act")

        buttonsDiv.appendChild(celsiusBtn);
        buttonsDiv.appendChild(fahrenheitBtn);
        this.div.appendChild(buttonsDiv);
    }
    get elem () {
        return this.div
    }
}

class Title {
    constructor (title, subTitle, date, desc) {
        this.div = document.createElement("div")
        const titleElem = document.createElement("h1");
        const subTitleElem = document.createElement("h3");
        const dateElem = document.createElement("h2");
        const descElem = document.createElement("h4");

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
    get elem () {
        return this.div
    }
}

class Temp {
    constructor (sign, currTemp, currMaxTemp, currMinTemp, currFeel) {
        this.div = document.createElement("div");
        const mainTemp = document.createElement("p");
        const minMaxTemp = document.createElement("p");
        const feelDesc = document.createElement("p");
        const feelTemp = document.createElement("p");

        mainTemp.className = "curr-temp";
        mainTemp.textContent = `${currTemp}${sign}`
        minMaxTemp.className = "curr-min-max-temp";
        minMaxTemp.textContent = `${currMaxTemp}\u00B0 / ${currMinTemp}\u00B0`
        feelDesc.className = "feel-temp-desc";
        feelDesc.textContent = "Feels like: "
        feelTemp.className = "curr-feel-temp";
        feelTemp.textContent = `${currFeel}${sign}`

        this.div.appendChild(mainTemp);
        this.div.appendChild(minMaxTemp);
        this.div.appendChild(feelDesc);
        this.div.appendChild(feelTemp);
        this.div.className = "temps-div";
    }
    get elem () {
        return this.div
    }
}

class Cards {
    constructor (daysData) {
        this.div = document.createElement("div");
        this.div.className = "upc-days";
        for (let n of daysData) this.div.appendChild(createCard(n.dayOfWeek, n.icon, n.minTemp, n.maxTemp))
    }
    get elem () {
        return this.div
    }
}

function createCard (dayOfWeek, cardIcon, minTemp, maxTemp) {
    const card = document.createElement("div");
    const weekDay = document.createElement("p");
    const icon = document.createElement("img");
    const iconSrc = require(`../media/icons/${cardIcon}.svg`)
    const minMaxTemp = document.createElement("p");

    card.className = "weather-card";
    weekDay.className = "week-day";
    weekDay.textContent = `${dayOfWeek}`;
    icon.className = "weather-icon";
    icon.src = iconSrc;
    minMaxTemp.textContent = `${maxTemp}\u00B0 / ${minTemp}\u00B0`;
    minMaxTemp.className = "card-min-max";

    card.appendChild(weekDay);
    card.appendChild(icon);
    card.appendChild(minMaxTemp);

    return card
}

loadDefault()