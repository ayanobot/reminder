/**
 * Parses text as a reminder!
 * @param {string} text The text to parse
 * @returns The parsed reminder data!
 */
module.exports = function parse(text) {
    // Attempt to identify a reminder
    const match = text.match(/^(?:remind )?(me )?(?:to )?([\s\S]*)$/i);
    if (!match) return null;

    // Extract the when from the what
    let [, who, what] = match;

    const when = chrono.parse(what, new Date(), {
        forwardDate: true
    });

    if (when.length < 1) return null;

    // Remove any time expressions from the what
    when.forEach(w => (what = what.replace(w.text, '')));

    // Clean up whitespace and common connecting words
    what = what
        .trim()
        .replace(/^(to|that) /, '')
        .replace(/ on$/, '')
        .replace(/ in$/, '');

    return {
        who,
        what,
        when: when[0].start.date()
    };
};
