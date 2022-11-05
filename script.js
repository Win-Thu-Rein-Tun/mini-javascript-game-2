'use strict';

// Selection elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

let score0El = document.getElementById(`score--0`);
let score1El = document.getElementById(`score--1`);

const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);

const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

const switchPlayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`);
}

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {

    score0El.textContent = 0;
    score1El.textContent = 0;

    diceEl.classList.add(`hidden`);

    scores = [0, 0];

    currentScore = 0;

    activePlayer = 0;

    playing = true;

    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);

    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);
}
init();

// Rolling dice functionality
btnRoll.addEventListener(`click`, _ => {
    if (playing) {
        // 1. Generating a radom dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove(`hidden`);
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

btnHold.addEventListener(`click`, () => {
    if (playing) {
        scores[activePlayer] += currentScore;

        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
            // document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
            playing = false;
            diceEl.classList.add(`hidden`);
        } else {
            switchPlayer();
        }
    }
})

// Restart Game
btnNew.addEventListener(`click`, init)