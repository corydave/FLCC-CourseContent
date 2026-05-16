/* ================================================================
   Lesson 11: Certificate
   ----------------------------------------------------------------
   The grand finale. type: "certificate" tells app.js to render the
   special certificate UI (name input + download button) instead of
   the normal editor/preview layout.
   ================================================================ */

window.lessons = window.lessons || [];

window.lessons.push({
    title: "Certificate of Completion",
    type: "certificate",

    description: `
        <h2 style="margin-top: 0;"><i data-lucide="graduation-cap"></i> You did it!</h2>

        <p>You've completed every lesson. You now know how to write:</p>
        <ul>
            <li>Headings of every size</li>
            <li>Bold, italic, and bold-italic text</li>
            <li>Paragraphs and line breaks</li>
            <li>Bulleted and numbered lists</li>
            <li>Links and images</li>
            <li>Inline code and fenced code blocks</li>
            <li>Blockquotes</li>
            <li>Horizontal rules</li>
            <li>Task lists with checkboxes</li>
        </ul>

        <p>That's everything you need to write README files, blog posts,
        documentation, GitHub issues, notes, and pretty much anywhere
        else you'll encounter markdown.</p>

        <h3>What's next?</h3>
        <p>A few directions to keep exploring:</p>
        <ul>
            <li><strong>Tables</strong> - GitHub-flavored markdown supports
                them with <code>|</code> separators.</li>
            <li><strong>Footnotes</strong> - some flavors of markdown
                support <code>[^1]</code> style footnotes.</li>
            <li><strong>Markdown editors</strong> - try Obsidian, Typora,
                Bear, or just VS Code with its built-in preview.</li>
            <li><strong>Different "flavors"</strong> - CommonMark, GFM,
                and others have small differences worth learning about.</li>
        </ul>

        <p>Enter your name on the right to download a personalized
        certificate. Congratulations! <i data-lucide="sparkles"></i></p>
    `
});
