/* ================================================================
   Lesson 7: Blockquotes
   ----------------------------------------------------------------
   A short, satisfying lesson - blockquotes are easy and visually
   striking, which feels good after the slightly fiddly code lesson.
   ================================================================ */

window.lessons = window.lessons || [];

window.lessons.push({
    title: "Blockquotes",
    type: "interactive",

    description: `
        <p>A blockquote sets off a chunk of text as a quotation or callout.
        It's perfect for things like:</p>
        <ul>
            <li>Quoting someone</li>
            <li>Highlighting a key point</li>
            <li>Calling attention to a warning or note</li>
        </ul>

        <h3>The syntax</h3>
        <p>Just put a <code>&gt;</code> at the start of any line you want
        quoted, followed by a space:</p>
        <pre><code>&gt; The best time to plant a tree was 20 years ago.
&gt; The second best time is now.</code></pre>

        <h3>Multi-line quotes</h3>
        <p>If your quote spans multiple lines, put <code>&gt;</code> on
        every line. To include a blank line within the same quote, use
        <code>&gt;</code> alone on that line.</p>

        <h3>Nested quotes</h3>
        <p>Quotes inside quotes? Stack the markers:</p>
        <pre><code>&gt; She said:
&gt; &gt; "I love markdown!"</code></pre>

        <h3>Your turn</h3>
        <p>Turn this famous quote into a blockquote:</p>
        <p><code>To be, or not to be, that is the question.</code></p>
    `,

    starterText: "",

    expected: "> To be, or not to be, that is the question.",

    successMessage: "✓ Quoted! Notice how the preview shows a vertical line on the left.",

    hints: [
        {
            // Used < instead of >
            test: (md) => md.startsWith('<'),
            message: "Wrong direction! Blockquotes use the greater-than sign (>), not less-than (<)."
        },
        {
            // Missing space after >
            test: (md) => /^>[^ \n>]/.test(md),
            message: "You need a space after the >. Try '> Your text' instead of '>Your text'."
        },
        {
            // No > at all
            test: (md) => !md.includes('>') && md.includes('To be'),
            message: "You need a '> ' at the start of the line to make it a blockquote."
        }
    ]
});
