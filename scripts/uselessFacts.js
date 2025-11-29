async function getUselessFact(btn) {
    await showMessage("Fetching useless knowledge...");
    try {
        const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        const data = await response.json();
        await sleepFor(500);
        sendMessage("💡 Fact: " + data.text);
    } catch (e) {
        sendMessage("Error: Too useless to load.");
    }
}
