async function generateInsult(btn) {
    btn.innerText = "Prepare to cry...";

    await showMessage("Scanning your insecurities...");
    await sleepFor(400);

    try {
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const targetUrl = encodeURIComponent('https://evilinsult.com/generate_insult.php?lang=en&type=json');

        const response = await fetch(proxyUrl + targetUrl);
        const data = await response.json();
        const insultData = JSON.parse(data.contents);

        showResult("😈 The Hater: " + insultData.insult);
    } catch (e) {
        const localInsults = [
            "You look like a drunk toddler.",
            "I'd insult you, but nature already did.",
            "Your browser history is disgusting."
        ];
        showResult("😈 The Hater: " + localInsults[getRandomInt(0, localInsults.length)]);
    } finally {
        btn.innerText = "Hurt me again";
    }
}
