import "./styles.css";
import { getWeather } from "./external";
import { SearchDiv } from "./load.js"

getWeather("bedenica");

SearchDiv.getBtn().addEventListener("click", () => getWeather(SearchDiv.getInputValue()))