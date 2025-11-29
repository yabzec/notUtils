async function doNotPush(btn) {
    await sleepFor(600);
    await showMessage("I told you to not push it!");
    await sleepFor(300);
    await showMessage("3");
    await sleepFor(300);
    await showMessage("2");
    await sleepFor(300);
    await showMessage("1");
    await triggerSelfDestruct(btn);
}

async function triggerSelfDestruct(btn) {
    const body = document.body;
    const what = [
        "browser history",
        "bank credentials",
        "spicy messages",
        "pics folder",
    ]
    const rand = getRandomInt(0, what.length);
    const panicMessages = [
        "⚠️ System error ⚠️",
        "Core temp: 9000°C",
        "Accessing " + what[rand],
        "Sending " + what[rand] + " to the police...",
        "Sent",
        "ADDIOS AMIGOS!"
    ];

    if (body.classList.contains('meltdown')) return;

    const originalText = btn.innerText;
    btn.innerText = "Error!";

    body.classList.add('meltdown');

    await showMessage(panicMessages[0]);
    await sleepFor(300);
    await sendMessage(panicMessages[1]);
    await sleepFor(300);
    await sendMessage(panicMessages[2]);
    await sleepFor(300);
    await showMessage(panicMessages[3]);
    await showResult(panicMessages[4]);
    await sleepFor(300);
    await sendMessage(panicMessages[5]);

    setTimeout(() => {
        body.classList.remove('meltdown');

        btn.innerText = originalText;
        btn.parentElement.querySelector("h3").innerHTML = "Do not push me (for real)!";
        clearHistory();
    }, 3000);
}
