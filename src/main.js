import ConfettiGenerator from "confetti-js";
var confettiSettings = { target: "my-canvas" };
var confetti = new ConfettiGenerator(confettiSettings);

let mainElement = document.querySelector("main");
let controller = document.getElementById("control-button");
function checkWinning() {
    let winningValue = mainElement.children[9].getAttribute("value");
    let won = false;
    for (let i = 0; i < mainElement.children.length; i++) {
        if (
            mainElement.children[i].getAttribute("freezed") === "true" &&
            mainElement.children[i].getAttribute("value") === winningValue
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
    if (die.getAttribute("freezed") === "true") {
        die.setAttribute("freezed", "false");
        die.classList.remove("freezed");
    } else {
        die.setAttribute("freezed", "true");
        die.classList.add("freezed");
    }
    if (checkWinning()) {
        controller.innerHTML = "New Game";
        confetti.render();
    }
}

function createFirstDice(dieOnClick) {
    for (let i = 0; i < mainElement.children.length; i++) {
        mainElement.children[i].onclick = dieOnClick;
        mainElement.children[i].setAttribute("id", i + 1);
        mainElement.children[i].setAttribute("freezed", "false");
        mainElement.children[i].setAttribute(
            "value",
            Math.ceil(Math.random() * 6)
        );
        mainElement.children[i].classList.remove("freezed");
        mainElement.children[i].innerHTML =
            mainElement.children[i].getAttribute("value");
    }
}
function rollDice() {
    for (let i = 0; i < mainElement.children.length; i++) {
        if (mainElement.children[i].getAttribute("freezed") === "true") {
            continue;
        } else {
            mainElement.children[i].setAttribute(
                "value",
                Math.ceil(Math.random() * 6)
            );
            mainElement.children[i].innerHTML =
                mainElement.children[i].getAttribute("value");
        }
    }
}

function controlOnClick() {
    if (checkWinning()) {
        window.location.reload()
    } else {
        rollDice();
    }
}
controller.onclick = controlOnClick;
window.onload = createFirstDice(dieOnClick);
