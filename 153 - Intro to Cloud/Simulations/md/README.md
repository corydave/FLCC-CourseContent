# Markdown Fundamentals - Part 1

An interactive, browser-based mini-course that teaches markdown to absolute beginners. Designed as a companion to the SQL Fundamentals course - same look, same shape, same patterns - so the two can sit side-by-side in a wider "intro to nerd stuff" series.

## What's in the box

```
markdown-course/
├── index.html               ← Scaffold + script loading order
├── styles.css               ← All visual styling (light + dark mode)
├── app.js                   ← Main controller (lessons, progress, theme)
├── README.md                ← You are here
├── utils/
│   ├── markdownExecutor.js  ← Parses markdown and validates answers
│   └── certificate.js       ← Generates the PDF completion certificate
└── lessons/
    ├── 1-headings.js
    ├── 2-emphasis.js
    ├── 3-paragraphs.js
    ├── 4-lists.js
    ├── 5-linksImages.js
    ├── 6-code.js
    ├── 7-blockquotes.js
    ├── 8-horizontalRules.js
    ├── 9-taskLists.js
    ├── 10-puttingItTogether.js
    └── 11-certificate.js
```

## Running it

It's just a static site - no build step, no server needed.

1. Open `index.html` in any modern browser.
2. That's it.

(For local development, some browsers restrict file:// access. If you hit any issues, run a tiny local server: `python3 -m http.server` from the project folder, then visit `http://localhost:8000`.)

## How a lesson is structured

Every lesson is a single JS file that pushes one object into the global `window.lessons` array:

```js
window.lessons = window.lessons || [];

window.lessons.push({
    title: "Headings",
    type: "interactive",        // or "certificate"
    description: "<p>HTML shown in the left pane</p>",
    starterText: "",            // pre-fills the editor (optional)
    expected: "# My First Document",  // the correct markdown
    successMessage: "Nice!",    // optional - shown on success
    hints: [                    // optional - pinpoint feedback rules
        {
            test: (md) => !md.includes('#'),
            message: "Headings need a # at the start of the line."
        }
    ]
});
```

### Validation: how it actually works

When the learner clicks "Check My Work":

1. Their markdown is parsed to HTML with [marked.js](https://marked.js.org/).
2. The expected markdown is parsed to HTML too.
3. Both HTML strings are normalized (whitespace, etc.).
4. They're compared.

This means `*italic*` and `_italic_` both pass - because they produce the same HTML. That's intentional and matches real markdown behavior.

If they're wrong, the `hints` array is checked in order. The first hint whose `test` returns true wins, and its `message` is shown. If no hints match, a generic "not quite right" fallback appears.

## Adding a new lesson

1. Create `lessons/12-yourNewLesson.js` (number prefixes keep the file list sorted).
2. Copy the structure from any existing lesson.
3. Add a `<script src="lessons/12-yourNewLesson.js"></script>` line to `index.html`, in the right spot in the load order.
4. Refresh.

## Removing a lesson

1. Delete the file.
2. Remove its `<script>` tag from `index.html`.
3. Refresh.

## Customizing the look

All colors, spacing, and fonts live as CSS variables at the top of `styles.css`. Edit `:root` to retheme the whole app:

```css
:root {
    --color-primary: #2563eb;     /* Change this and everything follows */
    --font-sans: "Helvetica Neue", sans-serif;
    /* ... */
}
```

Dark mode happens three ways:

- Follows your OS preference by default
- Manually overridable via the toggle button (sun / moon / monitor)
- Persisted in `localStorage` so it survives page reloads

## Debug mode

Add `?debug=true` to the URL to show a floating panel with one button per lesson. Useful for testing without clicking through every lesson in order.

```
file:///path/to/index.html?debug=true
```

## Security & privacy

This whole course runs in your browser. Nothing is sent anywhere.

- No analytics, no tracking, no third-party scripts beyond two CDN libraries (marked.js for parsing, jsPDF for the certificate).
- No user accounts, no cookies (theme preference uses `localStorage`, which lives only on your machine).
- The certificate PDF is generated entirely client-side.
- The markdown editor uses a plain `<textarea>` - no `eval`, no `innerHTML` of user input.
- Lesson descriptions are authored by us and use `innerHTML` - that's the only place innerHTML is used with HTML content, and it's all static.

## Accessibility

- Full keyboard navigation (Tab through everything, Ctrl/Cmd+Enter to check your work).
- ARIA labels on all interactive elements.
- High-contrast focus ring on every focusable element.
- Live preview area announced via `aria-live="polite"` so screen reader users hear updates.
- Respects `prefers-reduced-motion` to disable transitions for sensitive users.
- All colors meet WCAG AA contrast in both light and dark modes.

## License

Do whatever you want with this code. It's a teaching tool - go teach.
