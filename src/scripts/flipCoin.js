async function flipCoin(btn) {
    const scenarios = [
        { pre: "Look up!", result: "Heads" },
        { pre: "Look over there!", result: "Heads" },
        { pre: "Catching it...", result: "The coin is gone (in my pocket)" },
        { pre: "Calculating physics...", result: "It stopped in mid-air!" },
        { pre: "Wait, what is that?", result: "It turned into a cookie 🍪" },
        { pre: "Loading 'Tails'...", result: "Error 404: Side not found" },
        { pre: "It's Tai... uhm...", result: "It's definitively Heads. Trust me." },
        { pre: "Perfect balance...", result: "The coin fell on its edge!" },
        { pre: "Too much force!", result: "The coin shattered into bitcoins" },
        { pre: "Meow?", result: "A cat grabbed it!" },
        { pre: "Look up!", result: "It's stuck in the ceiling" }
    ];

    const rand = getRandomInt(0, scenarios.length);
    const scenario = scenarios[rand];
    await showMessage("Flipping...");
    await showMessage(scenario.pre);
    await sleepFor(getRandomInt(400, 800));
    await showResult(`🪙 ${scenario.result}`);
}
