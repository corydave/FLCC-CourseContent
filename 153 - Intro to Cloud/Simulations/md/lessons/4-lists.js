/* ================================================================
   Lesson 4: Lists
   ----------------------------------------------------------------
   Covers both unordered (- and *) and ordered (1. 2. 3.) lists,
   plus a quick mention of nesting.
   ================================================================ */

window.lessons = window.lessons || [];

window.lessons.push({
    title: "Lists",
    type: "interactive",

    description: `
        <p>Lists are everywhere - shopping lists, to-do lists, instructions.
        Markdown gives you two flavors.</p>

        <h3>Unordered (bullet) lists</h3>
        <p>Start each line with a dash, then a space:</p>
        <pre><code>- Apples
- Bananas
- Cherries</code></pre>
        <p>You can also use <code>*</code> or <code>+</code> instead of <code>-</code> -
        they all work the same way. Most people stick with <code>-</code>.</p>

        <h3>Ordered (numbered) lists</h3>
        <p>Start each line with a number, a period, then a space:</p>
        <pre><code>1. Wake up
2. Drink coffee
3. Begin day</code></pre>

        <div class="callout">
            <strong>Fun trick:</strong> the numbers don't have to be right!
            Markdown will renumber them for you. <code>1. 1. 1.</code> still
            renders as a clean 1, 2, 3 list. (But humans reading the source
            appreciate accurate numbers.)
        </div>

        <h3>Nested lists</h3>
        <p>Indent with two spaces to nest a list inside another:</p>
        <pre><code>- Fruit
  - Apples
  - Bananas
- Vegetables
  - Carrots</code></pre>

        <h3>Your turn</h3>
        <p>Create an unordered list of three things you'd take to a desert
        island. Use <code>-</code> for the bullets. For this exercise, use:</p>
        <pre><code>- Water
- Sunscreen
- A good book</code></pre>
    `,

    starterText: "",

    expected: "- Water\n- Sunscreen\n- A good book",

    successMessage: "✓ Perfect list! Now you can organize anything.",

    hints: [
        {
            // Used asterisks instead - technically valid but the lesson asked for dashes
            test: (md) => md.includes('* Water') || md.includes('+ Water'),
            message: "That actually works, but for this exercise please use dashes (-) so we're all on the same page."
        },
        {
            // No list markers at all
            test: (md) => !/^[-*+]\s/m.test(md) && md.includes('Water'),
            message: "Each line needs to start with '- ' (a dash followed by a space) to become a list item."
        },
        {
            // Forgot the space after the dash
            test: (md) => /^-[^ \n]/m.test(md),
            message: "Don't forget the space after the dash! '-Water' won't work, but '- Water' will."
        },
        {
            // Used numbers when an unordered list was requested
            test: (md) => /^1\./m.test(md),
            message: "For this exercise we want an unordered (bulleted) list - try dashes instead of numbers."
        }
    ]
});
