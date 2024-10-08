import "./styles.css";
import { getWeather } from "./external";
import { loadWeather, SearchDiv } from "./load.js"
import { format } from "date-fns";

const NEXT_DAYS_NUM = 6;
let lastSearch;

SearchDiv.getInput().addEventListener("keypress", (e) => {
    if (e.key === "Enter") loadingController(SearchDiv.getInputValue())
})
SearchDiv.getBtn().addEventListener("click", () => loadingController(SearchDiv.getInputValue()))

async function loadingController (search) {
    if (search === null) search = lastSearch;
    else if (!search) checkSearch(search)
    const data = await getWeather(search, GetMetric.getAddUrl());
    lastSearch = search;
    const obtained = new GetData(data);
    console.log(GetMetric.getAddUrl(), GetMetric.getSign())
    loadWeather(GetMetric.getSign(), obtained.getTheme(), obtained.getMain(), obtained.getTemp(), obtained.getDays(NEXT_DAYS_NUM));
    assignButtons()
}

class GetData {
    constructor (data) {
        this.data = data;
        this.currDate = new Date(this.data.days[0].datetime);
    }
    getTheme () {
        let icon = this.data.currentConditions.icon.split("-");
        if (icon.length < 3) icon = icon[0];
        else icon = icon[1];
        return icon
        
    }
    getMain () {
        const address = this.data.resolvedAddress.split(", ") 
        const title = address[0];
        const subTitle = address.slice(1).join(", ");
        const displayDate = format(this.currDate, "do MMMM, yyyy")
        const description = this.data.description;
        return { title, subTitle, displayDate, description }
    }
    getTemp () {
        const currTemp = this.data.currentConditions.temp;
        const currMaxTemp = this.data.days[0].tempmax;
        const currMinTemp = this.data.days[0].tempmin;
        const currFeel = this.data.currentConditions.feelslike;

        return { currTemp, currMaxTemp, currMinTemp, currFeel}
    }
    getDay (index=0) {
        const dayDate = new Date(this.currDate);
        dayDate.setDate(dayDate.getDate() + index);

        const dayOfWeek = format(dayDate, "E");
        const icon = this.data.days[index].icon;
        const maxTemp = this.data.days[index].tempmax;
        const minTemp = this.data.days[index].tempmin;

        return { dayOfWeek, icon, maxTemp, minTemp}
    }
    getDays (len) {
        let daysList = [];
        for (let n = 1; n < len + 1; n++) daysList.push(this.getDay(n));
        return daysList
    }
}

export function checkSearch(error) {
    const errorSpan = document.querySelector(".search-div .error-msg");
    if (error == "") {
        errorSpan.textContent = "Please enter city name!";
        errorSpan.style.display = "block";
    } else {
        errorSpan.textContent = "Enter valid city name!";
        errorSpan.style.display = "block";
    }
}

function assignButtons() {
    const celsiusBtn = document.querySelector(".celsius-btn");
    const fahrenheitBtn = document.querySelector(".fahrenheit-btn");

    celsiusBtn.addEventListener("click", (e) => checkState(e.target, GetMetric.change, new Celsius))
    fahrenheitBtn.addEventListener("click", (e) => checkState(e.target, GetMetric.change, new Fahrenheit))
}

function checkState(element, callback, metricObj) {
    if (!element.classList.contains("act"))
        for (let n of document.querySelectorAll(".buttons-div button")) n.classList.remove("act")
        callback(metricObj)
        loadingController(null)
}

class Metric {
    constructor (add, sign) {
        this.add = add
        this.sign = sign
    }
}

class Celsius extends Metric {
    constructor () {
        super("&unitGroup=metric", "\u2103")
    }
}

class Fahrenheit extends Metric {
    constructor () {
        super("", "\u2109")
    }
}

const GetMetric = (function () {
    let obj = new Fahrenheit;
    function change (newObj) {
        obj = newObj
    }
    function getSign () {
        return obj.sign
    }
    function getAddUrl () {
        return obj.add
    }

    return { change, getSign, getAddUrl }
})()