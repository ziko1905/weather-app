import "./styles.css";
import { getWeather } from "./external";
import { SearchDiv } from "./load.js"
import { format } from "date-fns";

SearchDiv.getInput().addEventListener("keypress", (e) => {
    if (e.key === "Enter") loadingController(SearchDiv.getInputValue())
})
SearchDiv.getBtn().addEventListener("click", () => loadingController(SearchDiv.getInputValue()))

async function loadingController (obj) {
    const data = await getWeather(obj);
    const obtained = new GetData(data);
}

class GetData {
    constructor (data) {
        this.data = data
    }
    getMain () {
        const address = this.data.resolvedAddress.split(", ") 
        console.log(address);
        const title = address[0];
        const subTitle = address.slice(1).join(", ");
        const displayDate = format(new Date(), "do MMMM, yyyy")
        const description = this.data.description;
        return { title, subTitle, displayDate, description }
    }
}