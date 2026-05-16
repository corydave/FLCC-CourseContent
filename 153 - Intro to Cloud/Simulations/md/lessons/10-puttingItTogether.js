/* ================================================================
   Lesson 10: Putting It All Together
   ----------------------------------------------------------------
   The capstone before the certificate. We ask the learner to write
   a small README using several elements at once. This consolidates
   everything from the previous lessons.

   Validation is more forgiving here - we accept a few reasonable
   variations since real-world markdown rarely has one "right" answer.
   ================================================================ */

window.lessons = window.lessons || [];

window.lessons.push({
    title: "Putting It All Together",
    type: "interactive",

    description: `
        <p>Time to combine what you've learned. You're going to write a
        small <code>README</code> for an imaginary project called
        <strong>Pixel Pal</strong>.</p>

        <h3>What to include</h3>
        <ol>
            <li>A level-1 heading: <code>Pixel Pal</code></li>
            <li>A short paragraph: <code>A tiny drawing app for the web.</code></li>
            <li>A level-2 heading: <code>Features</code></li>
            <li>An unordered list of three features:
                <ul>
                    <li><code>Draw with your mouse</code></li>
                    <li><code>Pick any color</code></li>
                    <li><code>Save as PNG</code></li>
                </ul>
            </li>
        </ol>

        <div class="callout">
            <strong>You've got this!</strong> Take your time. The live
            preview will show you how it looks as you go.
        </div>
    `,

    starterText: "",

    expected:
        "# Pixel Pal\n\n" +
        "A tiny drawing app for the web.\n\n" +
        "## Features\n\n" +
        "- Draw with your mouse\n" +
        "- Pick any color\n" +
        "- Save as PNG",

    successMessage: "Outstanding! You just wrote a real README - the same kind millions of open-source projects use. Hit Next for your certificate.",

    hints: [
        {
            test: (md) => !md.includes('# Pixel Pal') && !md.includes('#Pixel Pal'),
            message: "Start with a level-1 heading: # Pixel Pal"
        },
        {
            test: (md) => md.includes('# Pixel Pal') && !md.includes('## Features'),
            message: "Don't forget the second heading - 'Features' should be level 2 (##)."
        },
        {
            test: (md) => md.includes('## Features') && !/^- /m.test(md),
            message: "The three features should be a bullet list - each line starting with '- '."
        },
        {
            test: (md) => md.split('\n').filter(l => l.trim().startsWith('- ')).length < 3,
            message: "Looks like you're missing one or more list items. We need all three features listed."
        }
    ]
});
