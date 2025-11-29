async function randomImage(btn) {
    btn.disabled = true;
    const keywordList = ["funny", "cat", "dog", "frog", "bunny", "flamingo", "weird", "fail", "animal", "stupid"];
    const randomKeyword = keywordList[getRandomInt(0, keywordList.length)];
    const randomSeed = Math.floor(Math.random() * 100000);
    const url = `https://loremflickr.com/400/300/${randomKeyword}?lock=${randomSeed}`;

    const tempImg = new Image();

    tempImg.onload = function () {
        const imgElement = document.createElement("img");
        imgElement.setAttribute("onclick", "toggleZoom(this)");
        imgElement.src = url;
        imgElement.style.display = "block";

        showResult(imgElement);
        btn.disabled = false;
        btn.innerText = "Carica un'altra";
    };

    tempImg.onerror = function () {
        btn.disabled = false;
        showMessage("Something went wrong");
        btn.innerText = "Try again!";
    };

    await showMessage("Searching on the Internet...")
    await sleepFor(getRandomInt(700, 1500));
    await showMessage("Loading...");
    await sleepFor(400);
    tempImg.src = url;

}
