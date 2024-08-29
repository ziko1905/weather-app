import "./styles.css";
import { getWeather } from "./external";
import { loadWeather, SearchDiv } from "./load.js"
import { format } from "date-fns";

const NEXT_DAYS_NUM = 6;

SearchDiv.getInput().addEventListener("keypress", (e) => {
    if (e.key === "Enter") loadingController(SearchDiv.getInputValue())
})
SearchDiv.getBtn().addEventListener("click", () => loadingController(SearchDiv.getInputValue()))

async function loadingController (obj) {
    const data = await getWeather(obj);
    const obtained = new GetData(data);
    loadWeather(obtained.getTheme(), obtained.getMain(), obtained.getTemp(), obtained.getDays(NEXT_DAYS_NUM));
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
        const maxTemp = this.data.days[0].tempmax;
        const minTemp = this.data.days[0].tempmin;

        return { dayOfWeek, icon, maxTemp, minTemp}
    }
    getDays (len) {
        let daysList = [];
        for (let n = 1; n < len + 1; n++) daysList.push(this.getDay(n));
        return daysList
    }
}