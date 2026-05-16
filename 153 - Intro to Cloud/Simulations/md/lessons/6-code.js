/* ================================================================
   Lesson 6: Code
   ----------------------------------------------------------------
   Backticks. Crucial for anyone writing about technical topics.
   We teach both inline `code` and ```fenced blocks```.
   ================================================================ */

window.lessons = window.lessons || [];

window.lessons.push({
    title: "Code",
    type: "interactive",

    description: `
        <p>If you write about code, commands, or filenames, markdown has
        you covered. The magic character is the <strong>backtick</strong>:
        <code>\`</code> (it lives in the top-left corner of most keyboards,
        next to the 1).</p>

        <h3>Inline code</h3>
        <p>Wrap short snippets in single backticks:</p>
        <pre><code>Run the \`npm install\` command first.</code></pre>
        <p>This renders the bit between backticks in a monospace font,
        usually with a different background, so it stands out as code.</p>

        <h3>Code blocks (fenced)</h3>
        <p>For multiple lines of code, use three backticks on a line by
        themselves to open and close a "fenced" code block:</p>
        <pre><code>\`\`\`
function hello() {
  console.log("Hi!");
}
\`\`\`</code></pre>

        <h3>Syntax highlighting</h3>
        <p>You can add a language name right after the opening backticks
        and many renderers will color-code your syntax:</p>
        <pre><code>\`\`\`javascript
function hello() {
  console.log("Hi!");
}
\`\`\`</code></pre>

        <div class="callout">
            <strong>Note:</strong> the character we want is a backtick
            (<code>\`</code>) - NOT a single quote (<code>'</code>) or
            an apostrophe. They look similar but markdown can tell the
            difference.
        </div>

        <h3>Your turn</h3>
        <p>Write the sentence: <code>To list files, type <code>ls</code> in the terminal.</code></p>
        <p>(Make the word <code>ls</code> appear as inline code.)</p>
    `,

    starterText: "",

    expected: "To list files, type `ls` in the terminal.",

    successMessage: "✓ Excellent. Now your technical writing will look professional.",

    hints: [
        {
            // Used single quotes instead of backticks
            test: (md) => md.includes("'ls'") && !md.includes('`ls`'),
            message: "Those are single quotes - markdown needs backticks (`). They live next to the 1 key on most keyboards."
        },
        {
            // Used double quotes
            test: (md) => md.includes('"ls"') && !md.includes('`ls`'),
            message: "Those are double quotes - markdown needs backticks (`). Look for the key next to your 1."
        },
        {
            // No backticks at all
            test: (md) => md.includes('ls') && !md.includes('`'),
            message: "Wrap 'ls' in backticks - like this: `ls` - so it renders as code."
        },
        {
            // Only one backtick around ls
            test: (md) => /[^`]`ls[^`]|[^`]ls`[^`]/.test(md),
            message: "You need a backtick on BOTH sides of the word: `ls`."
        }
    ]
});
