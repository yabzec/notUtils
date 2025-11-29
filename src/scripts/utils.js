let doingSomething = false;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randRepeatedNumber() {
    return Math.floor(getRandomInt(0, 9)).toString().repeat(16);
}

async function sleepFor(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function showMessage(message) {
    const fakeInput = document.getElementById("fake_input");
    fakeInput.innerHTML = "> ";
    return new Promise(resolve => {
        let i = 0;
        let currentTimeout = null;
        function loop() {
            if (i >= message.length) {
                resolve();
                return;
            }
            const char = message.charAt(i);
            fakeInput.innerHTML += char;
            i++;
            let randomDelay = getRandomInt(30, 120);
            if (char === '.' && i+1 < message.length && message.charAt(i + 1) !== '.') {
                randomDelay += 200;
            } else if (char === '.' || char === '!' || char === '?') {
                randomDelay += 400;
            } else if (char === ',') {
                randomDelay += 200;
            }
            currentTimeout = setTimeout(loop, randomDelay);
        }
        loop();
    });
}

function showResult(...results) {
    const messageDiv = document.getElementById("messages");
    let isImage = false;
    let data = "";
    const container = document.createElement("div");
    container.className = "message";
    for (result of results) {
        let newElm = result;

        if (typeof newElm === "string") {
            newElm = document.createElement("div");
            newElm.innerHTML = result;
            data = newElm.innerText;
        } else if (newElm.tagName === "IMG" || newElm.querySelector("img")) {
            isImage = true;
            if (newElm.tagName === "IMG") {
                data = newElm.src;
            } else {
                data = newElm.querySelector("img").src;
            }
        }
        container.appendChild(newElm);
    }
    if (isImage || data) {
        const actionBtn = document.createElement("button");
        actionBtn.className = "action-btn";
        if (isImage) {
            actionBtn.innerText = "📥";
            actionBtn.title = "Download Image";
            actionBtn.onclick = () => forceDownload(data);
        } else {
            actionBtn.innerText = "📋";
            actionBtn.title = "Copy Text";
            actionBtn.onclick = () => copyToClipboard(data, actionBtn);
        }

        container.appendChild(actionBtn);
    }
    messageDiv.appendChild(container);
    messageDiv.scrollTop = messageDiv.scrollHeight;
    const fakeInput = document.getElementById("fake_input");
    fakeInput.innerHTML = "> ";
}

async function sendMessage(message) {
    await showMessage(message);
    await showResult(message);
}

function clearHistory() {
    const messages = document.querySelectorAll(".message");
    Array.from(messages).forEach((el) => el.remove());
}

function toggleZoom(elm) {
    Array.from(document.querySelectorAll(".card")).forEach(elm => elm.classList.toggle("inactive"));
    elm.classList.toggle("active");
}

function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const originalIcon = btn.innerText;
        btn.innerText = "✅";
        setTimeout(() => {
            btn.innerText = originalIcon;
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        btn.innerText = "❌";
    });
}

async function forceDownload(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `notutils-image-${Date.now()}.gif`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
        console.error("Download failed:", e);
        window.open(url, '_blank');
    }
}
