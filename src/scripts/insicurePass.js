function randPass() {
    const numbers = '1234567890';
    const badPasswords = [
        numbers,
        "password",
        "P@ssw0rd",
        "pass" + numbers,
        "qwerty",
        "admin",
        "admin" + numbers,
        "aa" + numbers,
        randRepeatedNumber(),
        "admintelecom",
        "112233"
    ];
    return badPasswords[Math.floor(Math.random() * badPasswords.length)];
}

async function generateBadPassword(elm) {
    const random = randPass();
    await showMessage("Thinking about a password...");
    await sleepFor(getRandomInt(200, 1200));
    await showMessage("Making it strong...");
    await sleepFor(getRandomInt(200, 1200));
    await sendMessage("New password: " + random.substring(0, getRandomInt(5, random.length)));
}
