const wordEl = document.querySelector('#word');
const wrongLettersEl = document.querySelector('#wrong-letters');
const playAgainBtn = document.querySelector('#play-button');
const popup = document.querySelector('#popup-container');
const notification = document.querySelector('#notification-container');
const finalMessage = document.querySelector('#final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['buba', 'assir'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show the hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
        <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </span>
    `
      )
      .join('')}
`;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 🍌🍌🍌';
    popup.style.display = 'flex';
  }
}

function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, idx) => {
    const errors = wrongLetters.length;

    if (idx < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Oh no! You lost! 👺👺👺';
    popup.style.display = 'flex';
  }
}

function handleKeyDown(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);

      updateWrongLettersEl();
    } else {
      showNotification();
    }
  }
}

function playAgain() {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
}

// Keydown letter press
window.addEventListener('keydown', handleKeyDown);
playAgainBtn.addEventListener('click', playAgain);

displayWord();
