import ConfettiGenerator from "confetti-js";
let myCanvas = document.getElementById("my-canvas");
var confettiSettings = { target: "my-canvas" };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

let mainElement = document.querySelector("main");
let controller = document.getElementById("control-button");
function checkWinning() {
    let winningValue = mainElement.children[9].getAttribute("data-value");
    let won = false;
    for (let i = 0; i < mainElement.children.length; i++) {
        if (
            mainElement.children[i].getAttribute("data-freezed") === "true" &&
            mainElement.children[i].getAttribute("data-value") === winningValue
        ) {
            won = true;
        } else {
            won = false;
            break;
        }
    }
    return won;
}
function dieOnClick(e) {
    let die = e.currentTarget;
    if (die.getAttribute("data-freezed") === "true") {
        die.setAttribute("data-freezed", "false");
        die.classList.remove("freezed");
    } else {
        die.setAttribute("data-freezed", "true");
        die.classList.add("freezed");
    }
    if (checkWinning()) {
        controller.innerHTML = "New Game";
        myCanvas.classList.remove("disabled");
    }
}

function createFirstDice(dieOnClick) {
    for (let i = 0; i < mainElement.children.length; i++) {
        mainElement.children[i].onclick = dieOnClick;
        mainElement.children[i].setAttribute("data-id", i + 1);
        mainElement.children[i].setAttribute("data-freezed", "false");
        mainElement.children[i].setAttribute(
            "data-value",
            Math.ceil(Math.random() * 6)
        );
        mainElement.children[i].classList.remove("freezed");
        mainElement.children[i].innerHTML =
            mainElement.children[i].getAttribute("data-value");
    }
}
function rollDice() {
    for (let i = 0; i < mainElement.children.length; i++) {
        if (mainElement.children[i].getAttribute("data-freezed") === "true") {
            continue;
        } else {
            mainElement.children[i].setAttribute(
                "data-value",
                Math.ceil(Math.random() * 6)
            );
            mainElement.children[i].innerHTML =
                mainElement.children[i].getAttribute("data-value");
        }
    }
}

function controlOnClick() {
    if (checkWinning()) {
        myCanvas.classList.add("disabled");
        createFirstDice(dieOnClick);
    } else {
        rollDice();
    }
}
controller.onclick = controlOnClick;
window.onload = createFirstDice(dieOnClick);
