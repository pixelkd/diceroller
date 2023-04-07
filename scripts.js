function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const diceType = document.getElementById('dice-type');
const numDice = document.getElementById('num-dice');
const addDiceBtn = document.getElementById('add-dice');
const rollBtn = document.getElementById('roll-btn');
const rollSummary = document.getElementById('roll-summary');
const rollResult = document.getElementById('roll-result');

const quickRollButtons = document.querySelectorAll('.quick-roll button');

let diceRolls = [];

function addDice() {
  const type = diceType.value;
  const quantity = parseInt(numDice.value);

  const existingRoll = diceRolls.find(roll => roll.type === type);
  if (existingRoll) {
    existingRoll.quantity += quantity;
  } else {
    diceRolls.push({ type, quantity });
  }

  updateRollSummary();
}

function updateRollSummary() {
  if (diceRolls.length === 0) {
    rollSummary.textContent = 'No dice selected.';
    return;
  }

  const summary = diceRolls
    .map(roll => `${roll.quantity} x ${roll.type.toUpperCase()}`)
    .join(', ');

  rollSummary.textContent = summary;
}

function rollDice() {
  const results = [];

  diceRolls.forEach(roll => {
    for (let i = 0; i < roll.quantity; i++) {
      const sides = roll.type === 'coin' ? 2 : parseInt(roll.type.slice(1));
      const result = getRandomInt(1, sides);
      results.push(`${roll.type.toUpperCase()}: ${result}`);
    }
  });

  if (results.length > 0) {
    rollResult.textContent = results.join(', ');
  } else {
    rollResult.textContent = 'No dice to roll. Add dice first.';
  }
}

function quickRoll(type) {
  const sides = type === 'coin' ? 2 : parseInt(type.slice(1));
  const result = getRandomInt(1, sides);
  rollResult.textContent = `${type.toUpperCase()}: ${result}`;
}

addDiceBtn.addEventListener('click', addDice);
rollBtn.addEventListener('click', rollDice);

quickRollButtons.forEach(button => {
  button.addEventListener('click', () => quickRoll(button.id.replace('quick-roll-', '')));
});