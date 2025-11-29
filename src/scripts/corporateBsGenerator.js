async function generateCorporateBS(btn) {
    const originalText = btn.innerText;
    btn.innerText = "Synergizing...";

    await showMessage("Aligning key stakeholders...");
    await sleepFor(500);
    await showMessage("Leveraging agile frameworks...");

    try {
        const response = await fetch('https://corporatebs-generator.sameerkumar.website/');
        const data = await response.json();

        await sleepFor(500);
        showResult("👔 Manager says: \"" + data.phrase + "\"");
    } catch (e) {
        showResult("Error: Too much synergy caused a crash.");
    } finally {
        btn.innerText = originalText;
    }
}
