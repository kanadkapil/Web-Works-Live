document.getElementById("decodeButton").addEventListener("click", async () => {
    const input = document.getElementById("inputField").value.trim().toLowerCase();
    const results = document.getElementById("results");
    results.innerHTML = "Decoding...";

    try {
        const [slangs, acronyms, emojis] = await Promise.all([
            fetch("data/slangs.json").then(res => res.json()),
            fetch("data/acronyms.json").then(res => res.json()),
            fetch("data/emojis.json").then(res => res.json())
        ]);

        const slangMatch = slangs.find(slang => slang.term.toLowerCase() === input);
        const acronymMatch = acronyms.find(acronym => acronym.acronym.toLowerCase() === input);
        const emojiMatch = emojis.find(emoji => emoji.emoji === input);

        if (slangMatch) {
            results.innerHTML = `<strong>${slangMatch.term}</strong>: ${slangMatch.meaning}`;
        } else if (acronymMatch) {
            results.innerHTML = `<strong>${acronymMatch.acronym}</strong>: ${acronymMatch.meaning}`;
        } else if (emojiMatch) {
            results.innerHTML = `<strong>${emojiMatch.emoji}</strong>: ${emojiMatch.message}`;
        } else {
            results.innerHTML = "No matching slang, acronym, or emoji found.";
        }
    } catch (error) {
        results.innerHTML = "Error decoding. Please try again.";
        console.error(error);
    }
});
