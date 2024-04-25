document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const result = document.getElementById("result");
    const restartBtn = document.getElementById("restartBtn");
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modalText");
    const newGameBtn = document.getElementById("newGameBtn");
    const closeBtn = document.getElementsByClassName("close")[0];

    let currentPlayer = "X";
    let moves = 0;
    let winner = null;

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
                return cells[a].innerHTML;
            }
        }

        if (moves === 9) {
            return "draw";
        }

        return null;
    }

    function handleClick(e) {
        const cell = e.target;
        if (!cell.innerHTML && !winner) {
            cell.innerHTML = currentPlayer;
            moves++;
            winner = checkWinner();
            if (winner) {
                showModal(winner);
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function restartGame() {
        cells.forEach(cell => {
            cell.innerHTML = "";
        });
        result.textContent = "";
        currentPlayer = "X";
        moves = 0;
        winner = null;
    }

    function showModal(outcome) {
        modal.style.display = "block";
        modalText.innerHTML = outcome === "draw" ? "It's a draw!" : `${outcome} wins!`;
    }

    function closeModal() {
        modal.style.display = "none";
    }

    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });

    restartBtn.addEventListener("click", restartGame);
    newGameBtn.addEventListener("click", function() {
        closeModal();
        restartGame();
    });
    closeBtn.addEventListener("click", closeModal);
});
