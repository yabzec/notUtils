async function suggestActivity(btn) {
    const originalText = btn.innerText;
    btn.innerText = "Thinking...";

    await showMessage("Scanning hobbies database...");
    await sleepFor(400);

    try {
        const targetUrl = 'https://bored-api.appbrewery.com/random?t=' + Date.now();
        const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(targetUrl);
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error("Proxy Error");
        const proxyData = await response.json();
        const data = JSON.parse(proxyData.contents);

        showResult(`🥱 <b>Activity:</b> ${data.activity} <br> 🏷️ <b>Type:</b> ${data.type}`);
    } catch (e) {
        const backup = [
            "Learn to juggle.",
            "Count the pixels on your screen.",
            "Watch paint dry.",
            "Click this button again."
        ];
        showResult("🥱 Activity (Offline): " + backup[getRandomInt(0, backup.length)]);
    } finally {
        btn.innerText = originalText;
    }
}
