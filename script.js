const game = {
    secretNumber: Math.floor(Math.random() * 100) + 1,
    attempts: 0,
    maxAttempts: 10,
    isGameOver: false,

    checkGuess: function(guess) {
        guess = parseInt(guess)

        this.attempts++

        if (guess === this.secretNumber) {
            this.isGameOver = true
            return { message: `Congratulations! You won with ${this.attempts} attempt${this.attempts > 1 ? 's' : ''}`, gameOver: true }
        } else if (this.attempts >= this.maxAttempts) {
            this.isGameOver = true
            return { message: `Game Over! The number was ${this.secretNumber}`, gameOver: true }
        } else if (guess < this.secretNumber) {
            return { message: `Higher`, gameOver: false }
        } else {
            return { message: `Lower`, gameOver: false }
        }
    },

    reset: function() {
        this.secretNumber = Math.floor(Math.random() * 100) + 1
        this.attempts = 0
        this.isGameOver = false
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

function disableInputs() {
    const input = document.querySelector('#guessFile')
    const button = document.querySelector('#submitGuess')
    input.disabled = true
    button.disabled = true
    input.style.opacity = '0.6'
    input.style.cursor = 'not-allowed'
    button.style.opacity = '0.6'
    button.style.cursor = 'not-allowed'
}

function enableInputs() {
    const input = document.querySelector('#guessFile')
    const button = document.querySelector('#submitGuess')
    input.disabled = false
    button.disabled = false
    input.style.opacity = '1'
    input.style.cursor = 'text'
    button.style.opacity = '1'
    button.style.cursor = 'pointer'
    input.focus()
}

function resetGame() {
    game.reset()
    updateCounter()
    document.querySelector('#message').innerText = ''
    document.querySelector('#guessFile').value = ''
    enableInputs()
}

function makeGuess() {
    if (game.isGameOver) {
        return
    }
    
    let guess = document.querySelector('#guessFile').value
    
    if (!guess || guess < 1 || guess > 100) {
        document.querySelector('#message').innerText = 'Please enter a valid number between 1 and 100'
        return
    }
    
    let result = game.checkGuess(guess)
    document.querySelector('#message').innerText = result.message
    updateCounter()
    
    document.querySelector('#guessFile').value = ''
    
    if (result.gameOver) {
        disableInputs()
        setTimeout(() => {
            resetGame()
        }, 2500)
    }
}

const btn = document.querySelector('#submitGuess')
btn.addEventListener('click', makeGuess)

document.querySelector('#guessFile').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        makeGuess()
    }
})