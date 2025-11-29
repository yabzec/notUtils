async function generateHttpCat(btn) {
    const originalText = btn.innerText;
    btn.innerText = "Meow...";

    await showMessage("Checking server status...");
    await sleepFor(400);

    const codes = [100, 200, 201, 204, 301, 302, 400, 401, 403, 404, 405, 408, 418, 420, 429, 500, 502, 503, 504];
    const randomCode = codes[getRandomInt(0, codes.length)];

    try {
        const imgUrl = `https://http.cat/${randomCode}`;

        const img = document.createElement("img");
        img.src = imgUrl;
        img.style.maxWidth = "100%";
        img.style.borderRadius = "8px";
        img.style.marginTop = "10px";

        let msg = `Status: ${randomCode}`;
        if (randomCode === 418) msg += " (I'm a teapot)";
        if (randomCode === 420) msg += " (Enhance your calm)";
        showResult(msg, img);

    } catch (e) {
        showResult("Error: Cat not found.");
    } finally {
        btn.innerText = originalText;
    }
}
