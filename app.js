const boxes = document.querySelectorAll(".box");
const resetButton = document.querySelector("#resetGame");
const msgContainer = document.querySelector(".msg-container");
const winnerMsg = document.querySelector("#msg");
const newGameButton = document.querySelector(".newGame");
const drawGame = document.querySelector(".drawGame");
const drawMsg = document.querySelector("#drawMsg");
const NewGame = document.querySelector(".NewGame");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enabledBoxes();
    msgContainer.classList.add("hide");
    drawGame.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        checkWin();
    });
});

const showWinner = (winner) => {
    winnerMsg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const showDraw = () => {
    drawMsg.innerText = "It's a Draw!";
    drawGame.classList.remove("hide");
    disabledBoxes();
};

const checkWin = () => {
    let isWinnerFound = false;

    for (let pattern of winPatterns) {
        let pos1value = boxes[pattern[0]].innerText;
        let pos2value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;

        if (pos1value !== "" && pos1value === pos2value && pos2value === pos3value) {
            showWinner(pos1value);
            isWinnerFound = true;
            break;
        }
    }

    if (!isWinnerFound && count === 9) {
        showDraw();
    }
};

resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);
NewGame.addEventListener("click", resetGame);
