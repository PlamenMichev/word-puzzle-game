const elements = {
    generateBtn: document.querySelector('#generateWord'),
    gameField: document.querySelector('#gameField'),
    dynamicField: document.querySelector('#dynamic'),
    lettersEl: document.querySelectorAll('button'),
    ulEl: document.querySelector('ul'),
    categoryElement: document.querySelector('#select-category'),
    rulesBtn: document.querySelector('#rules'),
    rulesText: document.querySelector('#rulesText'),
}

const wordElement = document.createElement('div');
const hintElement = document.createElement('p');
const turnsElement = document.createElement('p');
let word = '';
let turns = 5;
let isGameOver = false;

const showWord = function showWord() {
    const category = elements.categoryElement.value;
    isGameOver = false;
    turns = 5;
    for (let i = 0; i < 26; i++) {
        const btn = elements.lettersEl[i];
        btn.classList.remove('pressed');
    }

    const indexOfWord = Math.floor(Math.random() * Math.floor(words[category].length));
    word = words[category][indexOfWord];
    wordElement.classList.add('word');
    wordElement.textContent = word[0] + ' _ '.repeat(word.length - 2) + word[word.length - 1];
    word = word.substring(1, word.length - 1);
    hintElement.classList.add('enter');
    hintElement.textContent = 'Select a letter by pressing it!';
    turnsElement.classList.add('turns');
    turnsElement.textContent = `${turns}/5`;
    elements.dynamicField.appendChild(wordElement);
    elements.dynamicField.appendChild(hintElement);
    elements.dynamicField.appendChild(turnsElement);
};

const updateWord = function (ev) {
        letter = ev.target.value;
        const wholeWord = wordElement.textContent[0] + word + wordElement.textContent[wordElement.textContent.length - 1];
        if (letter != undefined && wordElement.textContent != '' && Array.from(ev.target.classList).includes('pressed') == false) {
            ev.target.classList.add('pressed');
            if (word.split('').includes(letter)) {
                for (let i = 0; i < word.length; i++) {
                    const currentLetter = word[i];
                    if (currentLetter == letter) {
                        let index = i + 1;
                        let currentShownWord = wordElement.textContent;
                        currentShownWord = currentShownWord.split(' ').join('');
                        currentShownWord = currentShownWord.substr(0, index) + letter + currentShownWord.substr(index + letter.length);
                        currentShownWord = currentShownWord.split('').join(' ');
                        wordElement.textContent = currentShownWord;
                    }
                }

                if (wordElement.textContent.split(' ').join('') == wholeWord) {
                    hintElement.textContent = '';
                    turnsElement.textContent = `Congratulations! You guessed ${wholeWord}!\n Click Generate Word button to play again.`;
                    isGameOver = true;
                }
            } else {
                turns--;
                if (turns <= 0) {
                    hintElement.textContent = '';
                    turnsElement.textContent = `You lost! You had to guess ${wholeWord}!\n Click Generate Word button to play again.`;
                    isGameOver = true;
                } else {
                    turnsElement.textContent = `${turns}/5`;
                }
            }
        }
}

elements.generateBtn.addEventListener('click', showWord);
elements.ulEl.addEventListener('click', function (ev) {
    if (isGameOver == false) {
    updateWord(ev);
    }
});
elements.rulesBtn.addEventListener('click', () => {
    debugger;
    elements.rulesText.style.display = elements.rulesText.style.display != 'block'
    ? elements.rulesText.style.display = 'block'
    : elements.rulesText.style.display = 'none';
})