const aiInput = document.getElementById("budgetAiQuestion");

if (translatorInput) {
    aiInput.addEventListener("keyup", evt => {
        if (evt.keyCode === 13) {
            const button = document.getElementById("budgetAiButton");
            exec(button, askBudgetAi);
        }
    });
}

async function askBudgetAi(btn) {
    const question = aiInput.value.trim();

    if (!question) {
        await showMessage("Error: Input void detected.");
        return;
    }

    const originalText = btn.innerText;
    btn.innerText = "Processing...";

    await showMessage("Uploading query to the cloud...");
    await sleepFor(getRandomInt(500, 1000));

    const thinkingSteps = [
        "Consulting Wikipedia...",
        "Asking ChatGPT (he ignores me)...",
        "Pretending to think...",
        "Optimizing neural pathways...",
        "Stealing data from NASA...",
        "Calculating universe entropy..."
    ];
    await showMessage(thinkingSteps[getRandomInt(0, thinkingSteps.length)]);
    await sleepFor(getRandomInt(800, 1500));

    const answers = [
        "The answer is 42. Obviously.",
        "I could tell you, but then I'd have to delete your browser history.",
        "As an AI language model, I don't care.",
        "Have you tried turning it off and on again?",
        "My complex algorithms suggest: maybe.",
        "Error 418: I'm a teapot.",
        "According to my calculations, you should go for a walk.",
        "I asked the intern, he said 'yes'.",
        "It depends on the humidity.",
        "Cannot compute. Too much sarcasm detected.",
        "Sure, why not.",
        "Ask again later (I'm charging)."
    ];

    let finalAnswer = answers[getRandomInt(0, answers.length)];
    const lowerQ = question.toLowerCase();

    if (lowerQ.includes("ciao") || lowerQ.includes("hello") || lowerQ.includes("hi")) {
        finalAnswer = "Greetings, human entity.";
    } else if (lowerQ.includes("love") || lowerQ.includes("amore")) {
        finalAnswer = "Error: Emotion module not found.";
    } else if (lowerQ.includes("password")) {
        finalAnswer = "My password is '" + randPass() + "'. Don't tell anyone.";
    }

    await showMessage("Analysis complete.");
    showResult("🤖 BudgetAI: " + finalAnswer);

    btn.innerText = originalText;
    aiInput.value = "";
}
