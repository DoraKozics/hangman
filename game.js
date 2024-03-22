let wordLength = 6;
let wordDisplay;
let keyboard;
let wordToGuess;
let amountOfLettersToGuess = wordLength;
document.addEventListener('DOMContentLoaded', () => {
    wordDisplay = document.getElementById('word-display');
    keyboard = document.getElementById('keyboard');
    generateKeyboard();
    generateNewWord()
        .then(word => {
            wordToGuess = word.toUpperCase();
            console.log(wordToGuess);
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

        button.onclick = function (e) {
            checkForLetterAppearance(character);
            button.onclick = null;
        }
        keyboard.appendChild(button);
    }
}

const generateNewWord = () => {
    return fetch("https://random-word-api.herokuapp.com/word?length=" + wordLength)
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
        letter.setAttribute('id', 'word-letter-' + i);
        wordDisplay.appendChild(letter);
    }
}

const checkForLetterAppearance = (character) => {
    for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === character) {
            console.log("contains");
            document.getElementById('word-letter-' + i).innerText = character;
            amountOfLettersToGuess--;
        }
    }
    checkForSolvedWord();
}

const checkForSolvedWord = () => {
    if (amountOfLettersToGuess === 0) {
        console.log("solved!");
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + wordToGuess)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Process the response data
                console.log(data);
                // Depending on the structure of the response, you might access the definition like:
                // const definition = data[0].meanings[0].definitions[0].definition;
                // console.log(definition);
            })
    }
}