const game = {
    secretNumber: Math.floor(Math.random() * 100) + 1,
    attempts: 0,
    maxAttempts: 10,

    checkGuess: function(guess) {
        guess = parseInt(guess)

        this.attempts++

        if (guess === this.secretNumber) {
            return `تبریک ، شما برنده شدید با ${this.attempts} تلاش`
        } else if (this.attempts >= this.maxAttempts) {
            return `بازی تمام شد! عدد مورد نظر ${this.secretNumber} بود`
        } else if (guess < this.secretNumber) {
            return `بالاتر`
        } else {
            return `پایین تر`
        }
    }
}

function makeGuess() {
    let guess = document.querySelector('#guessFile').value
    let message = game.checkGuess(guess)
    document.querySelector('#message').innerText = message
}

const btn = document.querySelector('#submitGuess')
btn.addEventListener('click', makeGuess)