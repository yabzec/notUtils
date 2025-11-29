const translatorInput = document.getElementById("translatorInput");

if (translatorInput) {
    translatorInput.addEventListener("keyup", evt => {
        if (evt.key === "Enter") {
            const button = document.getElementById("translatorButton");
            if (typeof exec === "function") {
                exec(button, translateSomething);
            }
        }
    });
}

function pickConsistentWord(originalWord, dictionary) {
    let hash = 0;
    for (let i = 0; i < originalWord.length; i++) {
        hash += originalWord.charCodeAt(i);
    }
    return dictionary[hash % dictionary.length];
}

async function translateSomething(btn) {
    const text = translatorInput.value.trim();

    if (!text || text.length === 0) {
        await showResult("Error: Silence cannot be translated.");
        return;
    }

    const originalBtnText = btn.innerText;
    btn.innerText = "Processing...";

    await showMessage("Parsing semantic structure...");
    await sleepFor(400);

    const languages = [
        {
            lang: "cat",
            name: "Cat 🐱",
            translate: (word) => {
                const meows = [
                    "meow", "mew", "mrrp", "prrr", "nyan",
                    "mlem", "hiss", "yowl", "purr", "rawr"
                ];
                // Se è lunga, la allunghiamo proceduralmente, altrimenti dizionario
                if (word.length > 6) return "m" + "r".repeat(word.length - 2) + "ow";
                return pickConsistentWord(word, meows);
            }
        },
        {
            lang: "binary",
            name: "Binary 🤖",
            translate: (word) => {
                return word.split('').map(char => char.charCodeAt(0).toString(2)).join('');
            }
        },
        {
            lang: "caveman",
            name: "Caveman 🦴",
            translate: (word) => {
                const grunts = [
                    "Ooga", "Booga", "Ungh", "Grug", "Zog",
                    "Gonk", "Thag", "Maka", "Doh", "Grunt",
                    "Smash", "Rock", "Zug-zug", "Bamm", "Ugh"
                ];
                return pickConsistentWord(word, grunts);
            }
        },
        {
            lang: "corporate",
            name: "Corporate 👔",
            translate: (word) => {
                const buzzwords = [
                    "synergy", "leverage", "paradigm", "touchbase", "pivot",
                    "assets", "bandwidth", "KPIs", "deliverables", "holistic",
                    "vision", "ecosystem", "disrupt", "agile", "scalable",
                    "deep-dive", "alignment", "roadmap", "stakeholders", "win-win"
                ];
                return pickConsistentWord(word, buzzwords);
            }
        },
        {
            lang: "minion",
            name: "Minion 🍌",
            translate: (word) => {
                const sounds = [
                    "bello", "poopaye", "banana", "tankyu", "bi-do",
                    "para-tu", "kampai", "bee-do", "hana", "dul",
                    "sae", "underwear", "papoy", "gelato", "tualaliloo",
                    "look-a-tu", "bapples", "pwede-na"
                ];
                return pickConsistentWord(word, sounds);
            }
        }
    ];

    const selectedLang = languages[getRandomInt(0, languages.length)];
    await showMessage(`Detected: Human.`);
    await sleepFor(400);
    await showMessage(`Target: ${selectedLang.name}...`);
    await sleepFor(600);

    const words = text.split(' ');

    const translatedWords = words
        .filter(word => (["cat", "binary"].includes(selectedLang.lang) && word.length > 2) || !["cat", "binary"].includes(selectedLang.lang))
        .map(word => {
            const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

            if (cleanWord.length < 3) {
                return word;
            }

            return selectedLang.translate(cleanWord);
        });

    const resultText = translatedWords.join(' ');
    showResult(`🗣️ [${selectedLang.name}]: "${resultText}"`);
    btn.innerText = originalBtnText;
    translatorInput.value = "";
}
