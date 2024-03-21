let wordDisplay;
let keyboard;
let wordToGuess;
document.addEventListener('DOMContentLoaded', () => {
    wordDisplay = document.getElementById('word-display');
    keyboard = document.getElementById('keyboard');
    generateKeyboard();
    generateNewWord()
        .then(word => {
            console.log("Random word:", word);
            wordToGuess = word;
            displayNewWord();
        })
        .catch(error => {
            console.error("Error occurred:", error);
        });
})

const generateKeyboard = () => {
    let alphabet = [];
    for (let i = 65; i < 91; i++) {
        alphabet.push(String.fromCharCode(i));
    }

    for (let i = 0; i < alphabet.length; i++) {
        let character = alphabet[i];
        let button = document.createElement("button");
        button.innerText = character;
        keyboard.appendChild(button);
    }
}

const generateNewWord = () => {
    return fetch("https://random-word-api.herokuapp.com/word?length=6")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data[0];
        })
        .catch(error => {
            console.error("There was a problem with this request: ", error);
        })
}

const displayNewWord = () => {
    for (let i = 0; i < wordToGuess.length; i++) {
        const letter = document.createElement('div');
        letter.classList.add('word-letter');
        // letter.innerText = wordToGuess[i];
        wordDisplay.appendChild(letter);
    }
}