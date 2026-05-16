/* ================================================================
   Lesson 1: Headings
   ----------------------------------------------------------------
   The first lesson. Pick something that gives immediate visual
   feedback - headings are perfect because the size change is
   instantly obvious in the preview pane.
   ================================================================ */

window.lessons = window.lessons || [];

window.lessons.push({
    title: "Headings",
    type: "interactive",

    description: `
        <p>Welcome! Markdown is a way of writing text that gets turned into
        nicely formatted HTML. Instead of clicking "bold" or "heading" in
        a menu, you type a little symbol and the markdown takes care of
        the rest.</p>

        <h3>How headings work</h3>
        <p>Put a <code>#</code> (called a "hash" or "pound sign") at the
        start of a line, then a space, then your heading text.</p>

        <p>The number of <code>#</code> symbols sets the size:</p>
        <pre><code># This is the biggest heading
## A bit smaller
### Smaller still
#### Smaller again
##### Pretty small
###### The smallest</code></pre>

        <div class="callout">
            <strong>Watch out:</strong> you <em>must</em> put a space after the
            <code>#</code>. <code>#Hello</code> won't work - <code># Hello</code> will.
        </div>

        <h3>Your turn</h3>
        <p>In the editor, write a level-1 heading that says
        <code>My First Document</code>, then a level-2 heading that says
        <code>Introduction</code>.</p>
    `,

    starterText: "",

    expected: "# My First Document\n## Introduction",

    successMessage: "✓ Nailed it! You just wrote your first markdown. Hit Next when you're ready.",

    hints: [
        {
            // They wrote text but no # at all
            test: (md) => !md.includes('#'),
            message: "Almost there! Headings need a # at the start of the line."
        },
        {
            // They forgot the space after #
            test: (md) => /#[^ #\n]/.test(md),
            message: "You're missing a space after the #. Try '# Title' instead of '#Title'."
        },
        {
            // They used the wrong number of #s
            test: (md) => md.includes('#') && !md.includes('##'),
            message: "Don't forget the second heading needs ## (two hashes) for level 2."
        }
    ]
});
