const cardsContainer = document.querySelector('#cards-container');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const currentEl = document.querySelector('#current');
const showBtn = document.querySelector('#show');
const hideBtn = document.querySelector('#hide');
const questionEl = document.querySelector('#question');
const answerEl = document.querySelector('#answer');
const addCardBtn = document.querySelector('#add-card');
const clearBtn = document.querySelector('#clear');
const addContainer = document.querySelector('#add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Store card data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _',
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data',
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable',
//   },
// ];

// Create single card in DOM
function createCard(data, idx) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (idx === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>
    
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
    </div>
  `;

  card.setAttribute('tabindex', '0');

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  card.addEventListener('keyup', e =>
    e.key === 'Enter' ? card.classList.toggle('show-answer') : null
  );

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Create all cards
function createCards() {
  cardsData.forEach((data, idx) => createCard(data, idx));
}

// Add card to local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Event listeners

nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard += 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard -= 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

showBtn.addEventListener('click', () => addContainer.classList.add('show'));

hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});
