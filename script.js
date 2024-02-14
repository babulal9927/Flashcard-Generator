// Flashcard data
let flashcards = [];
        
// Get the flashcard form and container elements
const flashcardForm = document.getElementById('flashcard-form');
const flashcardsContainer = document.getElementById('flashcards-container');
const shuffleButton = document.getElementById('shuffle-btn');
const deleteButton = document.getElementById('delete-btn');

// Add an event listener to the form's submit event
flashcardForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Get the values from the question and answer input fields
    const questionInput = document.getElementById('question-input');
    const answerInput = document.getElementById('answer-input');
    const question = questionInput.value;
    const answer = answerInput.value;

    // Validate that both the question and answer inputs are filled
    if (!question || !answer) {
        alert('Please enter both a question and an answer.');
        return;
    }

    // Create a new flashcard object
    const flashcard = {
        question: question,
        answer: answer
    };

    // Add the flashcard to the flashcards array
    flashcards.push(flashcard);

    // Clear the question and answer inputs
    questionInput.value = '';
    answerInput.value = '';

    // Render the flashcards
    renderFlashcards();
});

// Add event listeners to the shuffle and delete buttons
shuffleButton.addEventListener('click', shuffleFlashcards);
deleteButton.addEventListener('click', deleteFlashcard);

// Function to render the flashcards
function renderFlashcards() {
    // Clear the flashcards container
    flashcardsContainer.innerHTML = '';

    // Loop through the flashcards array and create a flashcard element for each
    flashcards.forEach((flashcard, index) => {
        const flashcardElement = document.createElement('div');
        flashcardElement.classList.add('flashcard');
        flashcardElement.innerHTML = `
            <div class="content">
                <div class="question">${flashcard.question}</div>
                <div class="answer">${flashcard.answer}</div>
            </div>
        `;

        // Add event listener to flip the flashcard
        const contentElement = flashcardElement.querySelector('.content');
        contentElement.addEventListener('click', function() {
            flashcardElement.classList.toggle('flipped');
        });

        // Add event listener to delete the flashcard
        flashcardElement.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            deleteFlashcard(index);
        });

        flashcardsContainer.appendChild(flashcardElement);
    });
}

// Function to shuffle the flashcards
function shuffleFlashcards() {
    flashcards = shuffleArray(flashcards);
    renderFlashcards();
}

// Function to delete a flashcard by index
function deleteFlashcard(index) {
    flashcards.splice(index, 1);
    renderFlashcards();
}

// Function to shuffle an array
function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Initial render of flashcards
renderFlashcards();