/* eslint-disable no-plusplus */
const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleBtn = document.querySelector('#double');
const showMillionairesBtn = document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calculateWealthBtn = document.querySelector('#calculate-wealth');

let data = [];

// Format number as money
function formatMoney(amount) {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Fetch random user and add money
async function getRandomUser(n) {
  for (let i = 0; i < n; i++) {
    const res = await fetch('https://randomuser.me/api');
    const fetchedData = await res.json();

    const user = fetchedData.results[0];

    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
  }
}

// Double everyones money
function doubleMoney() {
  data = data.map(user => ({ ...user, money: user.money * 2 }));

  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter millionaires
function filterMillionaires() {
  data = data.filter(item => item.money >= 1000000);
  updateDOM();
}

function calculateWealth() {
  const wealth = data.reduce((total, curr) => total + curr.money, 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

getRandomUser(3);

// Event listeners
addUserBtn.addEventListener('click', () => getRandomUser(1));
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', filterMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
