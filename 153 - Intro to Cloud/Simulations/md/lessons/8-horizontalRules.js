/* ================================================================
   Lesson 8: Horizontal Rules
   ----------------------------------------------------------------
   A very short lesson. Horizontal rules are simple and serve as a
   nice palate cleanser before task lists.
   ================================================================ */

window.lessons = window.lessons || [];

window.lessons.push({
    title: "Horizontal Rules",
    type: "interactive",

    description: `
        <p>A horizontal rule is just a line across the page - useful for
        separating sections of a document. Think of it as a visual
        "...and now, something completely different."</p>

        <h3>The syntax</h3>
        <p>Put three or more dashes on a line by themselves:</p>
        <pre><code>---</code></pre>

        <p>You can also use asterisks or underscores - all three work:</p>
        <pre><code>***
___</code></pre>

        <div class="callout">
            <strong>Tip:</strong> always put a blank line before and after
            your horizontal rule. If you don't, markdown might mistake
            <code>---</code> for an underline on the line above it
            (which is a different feature called a "setext heading").
        </div>

        <h3>Your turn</h3>
        <p>Write a short document with two paragraphs separated by a
        horizontal rule. Like this:</p>
        <pre><code>Section one.

---

Section two.</code></pre>
    `,

    starterText: "",

    expected: "Section one.\n\n---\n\nSection two.",

    successMessage: "✓ Crisp divide! That rule will help readers see where one section ends and another begins.",

    hints: [
        {
            // Only two dashes
            test: (md) => md.includes('--') && !md.includes('---'),
            message: "You need at least THREE dashes in a row to make a horizontal rule."
        },
        {
            // No blank line before/after the dashes
            test: (md) => /[^\n]\n---/.test(md) || /---\n[^\n]/.test(md),
            message: "Add blank lines above and below the --- so markdown knows it's a horizontal rule, not a heading underline."
        },
        {
            // Used dashes but not in the right structure
            test: (md) => !md.includes('---') && !md.includes('***') && !md.includes('___'),
            message: "You need at least three dashes (---), asterisks (***), or underscores (___) on their own line."
        }
    ]
});
