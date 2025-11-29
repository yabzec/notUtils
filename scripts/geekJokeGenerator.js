async function generateGeekJoke(btn) {
    await showMessage("Compiling humor module...");
    await sleepFor(400);

    try {
        const response = await fetch('https://geek-jokes.sameerkumar.website/api?format=json');
        const data = await response.json();

        showResult("🤓 Nerd: " + data.joke);
    } catch (e) {
        showResult("Error 404: Laughter not found.");
    }
}
