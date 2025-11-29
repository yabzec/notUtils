async function generateMeme(btn) {
    const originalText = btn.innerText;
    btn.innerText = "Stealing memes...";

    await showMessage("Browsing Reddit so you don't have to...");
    await sleepFor(400);

    try {
        const response = await fetch('https://meme-api.com/gimme');
        const data = await response.json();

        const img = document.createElement("img");
        img.src = data.url;
        img.style.maxWidth = "100%";
        img.style.borderRadius = "8px";
        img.style.marginTop = "10px";

        await showResult(`${data.title}`, img);

    } catch (e) {
        showResult("Error: The memes are too dank to load.");
    } finally {
        btn.innerText = originalText;
    }
}
