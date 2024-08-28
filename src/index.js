import "./styles.css";
import { getWeather } from "./external";
import { SearchDiv } from "./load.js"

SearchDiv.getInput().addEventListener("keypress", (e) => {
    if (e.key === "Enter") getWeather(SearchDiv.getInputValue())
})
SearchDiv.getBtn().addEventListener("click", () => getWeather(SearchDiv.getInputValue()))