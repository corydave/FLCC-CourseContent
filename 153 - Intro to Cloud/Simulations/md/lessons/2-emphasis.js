/* ================================================================
   Lesson 2: Bold & Italic
   ----------------------------------------------------------------
   Emphasis is the second-most-common thing people want to do.
   We teach asterisks because they're more universally supported,
   but mention underscores as an alternative.
   ================================================================ */

window.lessons = window.lessons || [];

window.lessons.push({
    title: "Bold & Italic",
    type: "interactive",

    description: `
        <p>Want to add emphasis? Wrap your text in asterisks.</p>

        <h3>Italic</h3>
        <p>One asterisk on each side makes text <em>italic</em>:</p>
        <pre><code>*this is italic*</code></pre>

        <h3>Bold</h3>
        <p>Two asterisks on each side makes text <strong>bold</strong>:</p>
        <pre><code>**this is bold**</code></pre>

        <h3>Both at once</h3>
        <p>Three asterisks gives you <strong><em>bold italic</em></strong>:</p>
        <pre><code>***bold AND italic***</code></pre>

        <div class="callout">
            <strong>Good to know:</strong> underscores work too -
            <code>_italic_</code> and <code>__bold__</code> mean the same thing as
            the asterisk versions. Use whichever you find easier to read.
        </div>

        <h3>Your turn</h3>
        <p>Write the sentence:</p>
        <p><code>Markdown is <strong>simple</strong> but <em>powerful</em>.</code></p>
        <p>(Make "simple" bold and "powerful" italic.)</p>
    `,

    starterText: "Markdown is ",

    expected: "Markdown is **simple** but *powerful*.",

    successMessage: "✓ Beautiful. You can mix bold and italic anywhere in your text.",

    hints: [
        {
            // They used single * around what should be bold
            test: (md) => /\*simple\*/.test(md) && !/\*\*simple\*\*/.test(md),
            message: "One asterisk gives italic. Bold needs two on each side: **simple**."
        },
        {
            // They used ** around what should be italic
            test: (md) => /\*\*powerful\*\*/.test(md),
            message: "Two asterisks gives bold. Italic only needs one on each side: *powerful*."
        },
        {
            // No asterisks at all
            test: (md) => !md.includes('*') && !md.includes('_'),
            message: "Don't forget the asterisks! ** for bold, * for italic."
        },
        {
            // Asterisks have a space inside them (won't work)
            test: (md) => /\*\* simple| simple\*\*|\* powerful| powerful\*/.test(md),
            message: "Markdown is picky about spaces - don't put a space between the asterisks and the word."
        }
    ]
});
