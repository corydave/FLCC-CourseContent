/* ================================================================
   Lesson 3: Paragraphs & Line Breaks
   ----------------------------------------------------------------
   This is a sneaky-tricky lesson. The "two spaces at end of line"
   rule for line breaks is the #1 beginner gotcha in markdown.
   Worth a whole lesson.
   ================================================================ */

window.lessons = window.lessons || [];

window.lessons.push({
    title: "Paragraphs & Line Breaks",
    type: "interactive",

    description: `
        <p>Markdown handles paragraphs a bit differently than you might
        expect. Pressing Enter once usually <em>isn't</em> enough.</p>

        <h3>New paragraphs need a blank line</h3>
        <p>To start a new paragraph, leave a completely blank line between
        the two pieces of text:</p>
        <pre><code>This is one paragraph.

This is a brand new paragraph.</code></pre>

        <h3>Line breaks within a paragraph</h3>
        <p>Sometimes you want a line break <em>without</em> starting a new
        paragraph - like in a poem or an address. For that, end the line
        with <strong>two spaces</strong>, then press Enter:</p>
        <pre><code>Roses are red,··
Violets are blue.</code></pre>
        <p>(The little dots above mean "spaces" - they're invisible when
        you actually type them.)</p>

        <div class="callout">
            <strong>Why so weird?</strong> Markdown was designed to look
            readable as plain text. A single Enter is usually just a soft
            line wrap, not an actual new paragraph. The two-space rule
            gives you a way to force a break when you really want one.
        </div>

        <h3>Your turn</h3>
        <p>Write two separate paragraphs:</p>
        <ol>
            <li>First paragraph: <code>I am learning markdown.</code></li>
            <li>Second paragraph: <code>It is going well.</code></li>
        </ol>
    `,

    starterText: "",

    expected: "I am learning markdown.\n\nIt is going well.",

    successMessage: "✓ Got it! Two newlines = two paragraphs.",

    hints: [
        {
            // They put everything on one line
            test: (md) => md.includes('I am learning markdown.') &&
                          md.includes('It is going well.') &&
                          !md.includes('\n'),
            message: "Don't forget to press Enter between the sentences - and leave a blank line so they become separate paragraphs."
        },
        {
            // They used only ONE newline between them
            test: (md) => /I am learning markdown\.\nIt is going well\./.test(md),
            message: "One Enter isn't quite enough! You need a blank line between paragraphs - that means TWO Enters."
        }
    ]
});
