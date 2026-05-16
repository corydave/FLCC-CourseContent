/* ================================================================
   Lesson 5: Links & Images
   ----------------------------------------------------------------
   These two share almost identical syntax - the only difference is
   the leading "!". Teaching them together makes the connection
   stick.
   ================================================================ */

window.lessons = window.lessons || [];

window.lessons.push({
    title: "Links & Images",
    type: "interactive",

    description: `
        <p>Links and images use almost the same syntax - they're cousins.</p>

        <h3>Links</h3>
        <p>Square brackets around the visible text, then parentheses with
        the URL:</p>
        <pre><code>[Visit Wikipedia](https://wikipedia.org)</code></pre>
        <p>The text inside the <code>[]</code> is what people see; the URL
        inside the <code>()</code> is where they go when they click.</p>

        <h3>Images</h3>
        <p>Exactly the same pattern, but with an exclamation mark in front:</p>
        <pre><code>![A friendly cat](https://example.com/cat.jpg)</code></pre>
        <p>This time the text inside <code>[]</code> is the <strong>alt
        text</strong> - what screen readers announce, and what shows up
        if the image can't load. Always include good alt text - it makes
        your content accessible to everyone.</p>

        <div class="callout">
            <strong>Remember:</strong> the only difference between a link
            and an image is the <code>!</code> at the start. Link:
            <code>[]()</code>. Image: <code>![]()</code>.
        </div>

        <h3>Your turn</h3>
        <p>Create a link with the text <code>Anthropic</code> that points to
        <code>https://anthropic.com</code>.</p>
    `,

    starterText: "",

    expected: "[Anthropic](https://anthropic.com)",

    successMessage: "✓ Linked up! The same pattern with a leading ! would make it an image.",

    hints: [
        {
            // They reversed brackets and parens
            test: (md) => /\(Anthropic\)\[https/.test(md),
            message: "The brackets and parentheses are in the wrong order. Text goes in [square brackets], URL goes in (parens)."
        },
        {
            // Made an image instead of a link
            test: (md) => /^!\[Anthropic\]/.test(md.trim()),
            message: "Almost! You made an image (the ! prefix). For a link, leave off the exclamation mark."
        },
        {
            // No brackets at all
            test: (md) => !md.includes('[') && md.includes('Anthropic'),
            message: "You need square brackets around the link text: [Anthropic](url)."
        },
        {
            // Space between ] and (
            test: (md) => /\]\s+\(/.test(md),
            message: "Don't put a space between ] and (. They should be touching: ](url)."
        }
    ]
});
