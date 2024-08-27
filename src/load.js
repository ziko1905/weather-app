import bgImg from"../media/bg.jpg"

export function loadDefault() {
    document.body.textContent = "";
    const main = document.createElement("div");
    const bg = document.createElement("img");
    const title = document.createElement("h1");

    bg.src = bgImg;
    bg.className = "bg";
    title.textContent = "Search weather of:"
    title.className = "title"
    main.className = "default";
    main.style.zIndex = 1;

    main.appendChild(title);
    document.body.appendChild(bg);
    document.body.appendChild(main);
}