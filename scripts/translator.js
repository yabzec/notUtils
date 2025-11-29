async function translateSomething(btn) {
    const languages = [
        { name: "Binary", func: () => "01001000 01101001" },
        { name: "Cat", func: () => "Meow meow mrrp?" },
        { name: "Corporate", func: () => "Let's circle back to that synergy." },
        { name: "Caveman", func: () => "Ooga Booga!" },
        { name: "Emoji", func: () => "👋🌍✨" }
    ];

    const selected = languages[getRandomInt(0, languages.length)];
    await showMessage("Detecting language...");
    await sleepFor(600);
    await showMessage(`Translating to ${selected.name}...`);
    await sleepFor(1000);

    sendMessage(`[${selected.name}]: "${selected.func()}"`);
}
