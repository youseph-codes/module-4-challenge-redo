const usermame = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = document.querySelector('#mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 9

finalScore.innerText = mostRecentScore

usermame.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !usermame.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: usermame.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score = a.score
    })

    highScores.splice(9)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}