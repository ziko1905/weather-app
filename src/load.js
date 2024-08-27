export function loadDefault() {
    document.body.textContent = "";
    const main = document.createElement("div");

    main.className = "default";
    document.body.appendChild(main);
}