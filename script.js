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

function updateCounter() {
    const attemptsUsedEl = document.querySelector('#attemptsUsed')
    const attemptsLeftEl = document.querySelector('#attemptsLeft')
    
    attemptsUsedEl.textContent = game.attempts
    attemptsLeftEl.textContent = game.maxAttempts - game.attempts
    
    attemptsUsedEl.classList.add('updated')
    attemptsLeftEl.classList.add('updated')
    
    setTimeout(() => {
        attemptsUsedEl.classList.remove('updated')
        attemptsLeftEl.classList.remove('updated')
    }, 500)
}

function makeGuess() {
    let guess = document.querySelector('#guessFile').value
    
    if (!guess || guess < 1 || guess > 100) {
        document.querySelector('#message').innerText = 'لطفاً یک عدد معتبر بین 1 تا 100 وارد کنید'
        return
    }
    
    let message = game.checkGuess(guess)
    document.querySelector('#message').innerText = message
    updateCounter()
    
    document.querySelector('#guessFile').value = ''
}

const btn = document.querySelector('#submitGuess')
btn.addEventListener('click', makeGuess)

document.querySelector('#guessFile').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        makeGuess()
    }
})