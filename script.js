let noClickCount = 0;
let currentSurveyQuestion = 1;
let targetClickCount = 0;
const TARGETS_NEEDED = 15;

// Setup game
document.addEventListener('DOMContentLoaded', function() {
    setupTargetGame();
});

function setupTargetGame() {
    const target = document.getElementById('clickableTarget');
    if (target) {
        target.addEventListener('click', clickTarget);
        moveTargetToRandomLocation();
    }
}

function moveTargetToRandomLocation() {
    const gameArea = document.getElementById('gameArea');
    const target = document.getElementById('clickableTarget');
    
    if (!gameArea || !target) return;
    
    const randomX = Math.random() * (gameArea.clientWidth - 60);
    const randomY = Math.random() * (gameArea.clientHeight - 60);
    
    target.style.left = randomX + 'px';
    target.style.top = randomY + 'px';
    
    // Make target smaller as difficulty increases
    const difficulty = targetClickCount / TARGETS_NEEDED;
    let scale = 1 - (difficulty * 0.4);
    target.style.transform = `scale(${scale})`;
}

function clickTarget() {
    targetClickCount++;
    const counter = document.getElementById('clickCounter');
    counter.textContent = targetClickCount;
    
    if (targetClickCount >= TARGETS_NEEDED) {
        foundTarget();
    } else {
        moveTargetToRandomLocation();
    }
}

function foundTarget() {
    const gameContainer = document.getElementById('gameContainer');
    const congratsPage = document.getElementById('congratsPage');
    
    // Hide game
    gameContainer.style.animation = 'fadeOutToQuestion 0.4s ease-out forwards';
    
    setTimeout(() => {
        gameContainer.style.display = 'none';
        congratsPage.style.display = 'block';
    }, 400);
}

function goToSurvey() {
    const congratsPage = document.getElementById('congratsPage');
    const surveyPage = document.getElementById('surveyPage');
    
    // Hide congrats page
    congratsPage.style.animation = 'fadeOutToQuestion 0.4s ease-out forwards';
    
    setTimeout(() => {
        congratsPage.style.display = 'none';
        surveyPage.style.display = 'block';
    }, 400);
}

function nextSurveyQuestion() {
    const question1 = document.getElementById('surveyQuestion1');
    const question2 = document.getElementById('surveyQuestion2');
    const question3 = document.getElementById('surveyQuestion3');
    
    if (currentSurveyQuestion === 1) {
        // Check if answer is selected
        const selected = document.querySelector('input[name="rating1"]:checked');
        if (!selected) {
            alert('Please select a rating before continuing');
            return;
        }
        
        // Hide question 1, show question 2
        question1.style.animation = 'fadeOutToQuestion 0.4s ease-out forwards';
        
        setTimeout(() => {
            question1.style.display = 'none';
            question2.style.display = 'block';
            currentSurveyQuestion = 2;
        }, 400);
    } else if (currentSurveyQuestion === 2) {
        // Check if answer is selected
        const selected = document.querySelector('input[name="rating2"]:checked');
        if (!selected) {
            alert('Please select a rating before continuing');
            return;
        }
        
        // Hide question 2, show question 3
        question2.style.animation = 'fadeOutToQuestion 0.4s ease-out forwards';
        
        setTimeout(() => {
            question2.style.display = 'none';
            question3.style.display = 'block';
            currentSurveyQuestion = 3;
        }, 400);
    }
}

function goToValentine() {
    const surveyPage = document.getElementById('surveyPage');
    const valentineCard = document.getElementById('valentineCard');
    
    // Hide survey page
    surveyPage.style.animation = 'fadeOutToQuestion 0.4s ease-out forwards';
    
    setTimeout(() => {
        surveyPage.style.display = 'none';
        valentineCard.style.display = 'block';
    }, 400);
}

function handleYes() {
    const questionContainer = document.getElementById('questionContainer');
    const celebrationContainer = document.getElementById('celebrationContainer');
    
    // Hide question container
    questionContainer.style.animation = 'fadeOutToQuestion 0.4s ease-out forwards';
    
    // Show celebration after fade out
    setTimeout(() => {
        questionContainer.style.display = 'none';
        celebrationContainer.classList.add('show');
        
        // Show silly text after 2 seconds
        setTimeout(() => {
            const sillyText = document.getElementById('sillyText');
            sillyText.classList.add('show');
        }, 2000);
    }, 400);
}

function handleNo() {
    noClickCount++;
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const questionText = document.querySelector('.question-text');
    
    // First click
    if (noClickCount === 1) {
        noBtn.textContent = 'Are you sure?';
    }
    
    // Calculate scale - gets bigger with each click
    const baseScale = 1.45;
    const newScale = baseScale + ((noClickCount - 1) * 0.4);
    
    yesBtn.style.transform = `scale(${newScale})`;
    
    // Hide question text after a certain scale
    if (newScale > 2.5 && questionText) {
        questionText.style.opacity = '0';
    }
    
    // Hide No button after many clicks
    if (noClickCount > 6) {
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';
    }
}

function showResponse(message) {
    document.getElementById('buttonContainer').style.display = 'none';
    const responseMsg = document.getElementById('responseMessage');
    responseMsg.textContent = message;
    responseMsg.classList.add('show');
}
