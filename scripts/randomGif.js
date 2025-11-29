async function generateRandomGif(btn) {
    const originalText = btn.innerText;
    btn.innerText = "Finding reaction...";

    await showMessage("Scraping the weeeeeeb...");
    await sleepFor(400);

    const subreddits = ['gifs', 'gifsthatkeepongiving', 'WastedGifs', 'noisygifs', 'GifsYouCanHear'];
    const rand = subreddits[getRandomInt(0, subreddits.length)];
    try {
        const response = await fetch(`https://meme-api.com/gimme/${rand}`);
        const data = await response.json();

        if (!data.url) throw new Error("No URL");

        const img = document.createElement("img");
        img.src = data.url;
        img.style.maxWidth = "100%";
        img.style.borderRadius = "8px";
        img.style.marginTop = "10px";
        img.alt = data.title;

        img.onload = async () => {
            showResult(`${data.title}`, img);
        };

        setTimeout(() => { if (!img.complete) throw new Error("Timeout"); }, 2000);

    } catch (e) {
        console.error(e);
        showResult("Error: Reddit is sleeping.");
    } finally {
        btn.innerText = originalText;
    }
}
