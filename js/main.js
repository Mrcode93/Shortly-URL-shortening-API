let hamburger = document.querySelector(".hamburger");
let menu = document.querySelector(".mobile-menu");
let shorBtn = document.querySelector("#short");
let input = document.querySelector("input[type=text]");
let main = document.querySelector(".main");
let shorts = document.querySelector(".shorts");
let sevice = document.querySelector(".service");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
});

function fetchData() {
    fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`)
        .then((response) => response.json())
        .then((data) => {
            let info = data.result;

            let array = [
                info.full_short_link,
                info.full_short_link2,
                info.full_short_link3,
            ];
            sevice.classList.add("shortened");
            array.forEach((link, i) => {
                let shortLink = document.createElement("div");
                shortLink.classList.add("short-link");
                //old link
                let old = document.createElement("div");
                old.className = "old";
                old.innerHTML = input.value;
                shortLink.appendChild(old);
                //new short link
                let newLink = document.createElement("div");
                newLink.className = "new";
                let text = document.createElement("p");
                text.innerHTML = link;
                newLink.appendChild(text);
                let btn = document.createElement("input");
                btn.type = "button";
                btn.value = "Copy";
                newLink.appendChild(btn);
                shortLink.appendChild(newLink);
                shorts.appendChild(shortLink);

                text = text.innerHTML;
                btn.onclick = async() => {
                    try {
                        await navigator.clipboard.writeText(text);
                        btn.style.cssText = "background-color: hsl(257, 27%, 26%);";
                        btn.value = "Copied!";
                    } catch (err) {
                        console.error("Failed to copy: ", err);
                    }
                };
            });
            input.value = "";
        })
        .catch((error) => {
            console.log(error);
            if (input.value === "") {
                main.classList.add("error");
                let message = document.createElement("p");
                message.innerHTML = "Please add a link";
                main.appendChild(message);
                message.after(shorBtn);
            } else {
                main.classList.remove("error");
            }
        });
}

shorBtn.addEventListener("click", fetchData);