
const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: '',
    aiHand: '',
    playerHandHTML: ''
}

const hands = [...document.querySelectorAll('.select img')];

// Pierwsza funkcja
function handSelection() {
// console.log(this)
game.playerHand = this.dataset.option
hands.forEach(hand => hand.style.boxShadow='');
this.style.boxShadow='0 0 6px 3px green'
}

// Wybór komputera
function aiChoice() {
    const index = Math.floor(Math.random() * hands.length)
    return hands[index].dataset.option
}

// Sprawdzenie kto wygrał
function checkResult(player, ai) {
    if(player === ai) {
        return "It's a draw!"
    } else if ((player === 'paper' && ai === 'rock') || (player === 'rock' && ai === 'scissors') || (player === 'scissors' && ai === 'paper')) {
        return 'You!'
    } else {return 'Computer :('}
}

// Publikacja wyniku
function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    document.querySelector('[data-summary="who-win"]').textContent = result;
    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;
    if(result === 'You!') {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
    } else if(result === "It's a draw!") {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
    } else {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
    }
}

function endGame() {
    document.querySelector(`[data-option=${game.playerHand}]`).style.boxShadow = '';
    game.playerHand = '';
}

// Funkcja sterująca
function startGame() {
    if(!game.playerHand) return alert('Choose hand!');
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();
}




hands.forEach(img => img.addEventListener('click', handSelection))
document.querySelector('.start').addEventListener('click', startGame)