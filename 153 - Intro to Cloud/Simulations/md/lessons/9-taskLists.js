/* ================================================================
   Lesson 9: Task Lists
   ----------------------------------------------------------------
   Task lists are technically a GitHub-Flavored Markdown extension,
   not part of "vanilla" markdown - but they're so widely supported
   (GitHub, GitLab, Obsidian, Notion, VS Code, Slack) that they're
   basically expected knowledge now.
   ================================================================ */

window.lessons = window.lessons || [];

window.lessons.push({
    title: "Task Lists",
    type: "interactive",

    description: `
        <p>Task lists are checkbox lists - perfect for to-dos, project
        plans, or anything where you want to track progress.</p>

        <h3>The syntax</h3>
        <p>Start each item like a regular bullet (<code>-</code> + space),
        then add <code>[ ]</code> for an empty box or <code>[x]</code>
        for a checked one:</p>
        <pre><code>- [ ] Buy groceries
- [x] Wash dishes
- [ ] Walk the dog</code></pre>

        <p>The middle item (with the <code>x</code>) will appear as a
        checked checkbox.</p>

        <div class="callout">
            <strong>Where it works:</strong> task lists are an addition
            called "GitHub-Flavored Markdown" (GFM). They render as
            checkboxes on GitHub, GitLab, Notion, Obsidian, VS Code, and
            most modern markdown tools - but in some older tools they
            might appear as plain text. Worth knowing if you publish to
            unusual places.
        </div>

        <h3>Your turn</h3>
        <p>Make a task list with three items, where the middle one is
        already done:</p>
        <pre><code>- [ ] Learn markdown
- [x] Drink coffee
- [ ] Conquer the world</code></pre>
    `,

    starterText: "",

    expected: "- [ ] Learn markdown\n- [x] Drink coffee\n- [ ] Conquer the world",

    successMessage: "✓ Look at those checkboxes! Great for tracking project progress.",

    hints: [
        {
            // Used uppercase X (won't be checked in most renderers)
            test: (md) => md.includes('[X]') && !md.includes('[x]'),
            message: "Close! Use a lowercase 'x' inside the brackets: [x], not [X]."
        },
        {
            // Forgot the space inside empty brackets
            test: (md) => md.includes('[]'),
            message: "Empty checkboxes need a space inside the brackets: [ ], not []."
        },
        {
            // Missing the dash prefix
            test: (md) => /\[[ x]\]/.test(md) && !/^- \[/m.test(md),
            message: "Each task item needs to start with '- ' before the [ ] or [x]."
        },
        {
            // Has the dashes and brackets but wrong spacing
            test: (md) => /^-\[/m.test(md),
            message: "Don't forget the space after the dash: '- [ ]', not '-[ ]'."
        }
    ]
});
