async function askOracle(btn) {
    const answers = [
        "Yes, but you won't like it.",
        "Ask ChatGPT, I'm tired.",
        "404: Future not found.",
        "Have you tried turning it off and on again?",
        "My sources say: 'No'.",
        "Cannot predict now (coffee break).",
        "It is decidedly so.",
        "Don't count on it.",
        "Outlook good, unlike your life."
    ];

    await showMessage("Contacting the spirits...");
    await sleepFor(getRandomInt(1000, 2000)); // Suspense

    if (Math.random() > 0.8) {
        await showMessage("✨ Astral interference... ✨");
        await sleepFor(1000);
    }

    const randomAnswer = answers[getRandomInt(0, answers.length)];
    sendMessage("🔮 Oracle: " + randomAnswer);
}
