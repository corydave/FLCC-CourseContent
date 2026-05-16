/* ================================================================
   markdownExecutor.js
   ----------------------------------------------------------------
   This file is the "engine" that turns a learner's markdown into
   HTML and decides whether they got the answer right.

   It exposes a single global object: window.markdownExecutor
   with these methods:

     render(markdown)
       Parses a markdown string and returns the resulting HTML.

     normalize(html)
       Strips whitespace and trivial differences so two equivalent
       HTML strings compare as equal.

     compare(submittedMarkdown, expectedMarkdown)
       Returns true if the learner's markdown produces the same
       rendered HTML as the expected answer.

     diagnose(submittedMarkdown, expectedMarkdown, hints)
       Returns a friendly hint string when the learner is close
       but not quite right. Lessons supply their own `hints` array
       so feedback can be tailored to common mistakes.

   We deliberately compare RENDERED HTML rather than raw markdown.
   That means a learner can write *italic* or _italic_ and either
   will be accepted - which matches how markdown actually works.
   ================================================================ */

window.markdownExecutor = (function () {

    // Configure marked.js once when the file loads.
    // GitHub-Flavored Markdown (GFM) gives us tables and task lists for free.
    // `breaks: false` keeps the standard "two spaces = line break" rule.
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            gfm: true,
            breaks: false,
            headerIds: false,   // Prevents marked from adding `id` attributes
            mangle: false       // Don't obfuscate email addresses
        });
    }

    /**
     * Convert a markdown string into HTML.
     * @param {string} markdown - The markdown source text
     * @returns {string} The rendered HTML
     */
    function render(markdown) {
        if (typeof markdown !== 'string' || markdown.length === 0) {
            return '';
        }
        try {
            return marked.parse(markdown);
        } catch (err) {
            // If marked.js chokes on something weird, fall back to a safe escape
            // so the page never crashes mid-lesson.
            console.error('Markdown parse error:', err);
            return '<p>(Could not parse markdown.)</p>';
        }
    }

    /**
     * Normalize an HTML string so trivial differences don't fail comparison.
     * - Collapse all runs of whitespace into a single space
     * - Trim leading/trailing space
     * - Lowercase tag names (defensive - marked already does this)
     * - Remove whitespace immediately inside tags (between > and <)
     *
     * @param {string} html
     * @returns {string} A canonical form suitable for direct comparison
     */
    function normalize(html) {
        if (typeof html !== 'string') return '';
        return html
            .replace(/>\s+</g, '><')      // Whitespace between tags
            .replace(/\s+/g, ' ')         // Collapse all whitespace runs
            .replace(/\s+>/g, '>')        // Whitespace before closing bracket
            .replace(/<\s+/g, '<')        // Whitespace after opening bracket
            .trim()
            .toLowerCase();
    }

    /**
     * Compare a learner's submission to the expected answer by rendering both
     * to HTML and normalizing.
     *
     * @param {string} submitted - The learner's markdown
     * @param {string} expected - The instructor's reference markdown
     * @returns {boolean} true if they're equivalent
     */
    function compare(submitted, expected) {
        const a = normalize(render(submitted));
        const b = normalize(render(expected));
        return a === b && a.length > 0;
    }

    /**
     * Try to give the learner a helpful, specific hint when they're wrong.
     *
     * Each lesson can pass an array of hint rules. Each rule is an object:
     *   {
     *     test: (submittedMarkdown) => boolean,   // does this rule apply?
     *     message: "string shown to learner"
     *   }
     *
     * We run rules in order and return the first match. If none match, we
     * return a generic "not quite" message. This is the SQL-app pattern:
     * pinpoint when we can, fall back gracefully when we can't.
     *
     * @param {string} submitted
     * @param {string} expected
     * @param {Array} hints
     * @returns {string} A feedback message
     */
    function diagnose(submitted, expected, hints) {
        // If they submitted nothing, say so plainly
        if (!submitted || submitted.trim().length === 0) {
            return "Your editor is empty - try writing something!";
        }

        // Run through the lesson's specific hints first
        if (Array.isArray(hints)) {
            for (const hint of hints) {
                try {
                    if (typeof hint.test === 'function' && hint.test(submitted)) {
                        return hint.message;
                    }
                } catch (err) {
                    // If a hint's test function throws, just skip it - don't
                    // crash the lesson because of a buggy hint.
                    console.warn('Hint check threw an error:', err);
                }
            }
        }

        // Generic fallback - tells them something is wrong without being mean
        return "Not quite right. Check your syntax against the example and try again.";
    }

    // Expose only the public functions
    return {
        render: render,
        normalize: normalize,
        compare: compare,
        diagnose: diagnose
    };

})();
