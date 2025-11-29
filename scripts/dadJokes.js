async function generateDadJoke(btn) {
    const originalText = btn.innerText;
    btn.innerText = "Loading cringe...";

    await showMessage("Finding the worst joke possible...");
    await sleepFor(400);

    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();

        showResult("🤡 Dad: " + data.joke);
    } catch (e) {
        showResult("Error: Humor module failure.");
    } finally {
        btn.innerText = originalText;
    }
}
