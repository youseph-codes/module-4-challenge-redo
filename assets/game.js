const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What does "HTML" stand for?',
        choice1: 'hypertext markup link',
        choice2: 'hypertext markup language',
        choice3: 'hyperspeed text markup language',
        choice4: 'hypertext markup lingo',
        answer: 2,
    },
    {
        question: 'Which CSS property is used to make a text appear in bold?',
        choice1: 'style: bold',
        choice2: 'font: bold',
        choice3: 'text-decoration: bold',
        choice4: 'font-weight: bold',
        answer: 4,
    },
    {
        question: '"padding: 10px 50px" will apply to which sides?',
        choice1: 'top and bottom',
        choice2: 'vertical and horizontal',
        choice3: 'top and right',
        choice4: 'left and right',
        answer: 2,
    },
    {
        question: 'Which of these are the correct <tag> to create a paragraph?',
        choice1: '<paragraph>',
        choice2: '<par>',
        choice3: '<p-graph>',
        choice4: '<p>',
        answer: 4,
    },
    {
        question: 'What are arrays in JavaScript?',
        choice1: 'an ordered list of values',
        choice2: 'an unordered list of values',
        choice3: 'an ordered list of functions',
        choice4: 'an unordered list of functions',
        answer: 1,
    },
    {
        question: 'Which of these is the correct character when referring to a class from an HTML to CSS?',
        choice1: '#',
        choice2: '$',
        choice3: '.',
        choice4: '*',
        answer: 3,
    },
    {
        question: 'What does "CSS" stand for?',
        choice1: 'creative style sheet',
        choice2: 'cascading spread sheet',
        choice3: 'cascading style sheet',
        choice4: 'cascading standard stylelink',
        answer: 3,
    },
    {
        question: 'What tag accurately links the HTML file to a JavaScript file?',
        choice1: '<javascript src=" " >',
        choice2: '<script src=" " >',
        choice3: '<java src=" " >',
        choice4: '<script url=" " >',
        answer: 2,
    },
    {
        question: 'Which of these is the correct sequence of HTML tags for starting a webpage?',
        choice1: 'HTML, head, title, body',
        choice2: 'HTML, head, body, title',
        choice3: 'HTML, body, head, title',
        choice4: 'head, title, body, HTML',
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 9

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++   
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()