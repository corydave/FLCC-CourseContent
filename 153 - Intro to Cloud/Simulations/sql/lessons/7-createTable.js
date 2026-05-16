/**
 * Lesson 7: CREATE TABLE
 * Make your own tables
 */
const lesson7CreateTable = {
    id: 'create-table',
    title: 'CREATE TABLE - Defining Tables',
    type: 'interactive',
    instructions: `
        <p>Now you'll create your own table! <code>CREATE TABLE</code> defines the structure of a table:</p>
        <pre><code>CREATE TABLE table_name (
    column_name DATA_TYPE,
    column_name DATA_TYPE
);</code></pre>
        <p>Common data types:</p>
        <ul>
            <li><code>INTEGER</code> - whole numbers</li>
            <li><code>TEXT</code> - text strings</li>
            <li><code>REAL</code> - decimal numbers</li>
        </ul>
        <p>You can also use modifiers like <code>PRIMARY KEY</code> to mark unique identifiers.</p>
        <p><strong>Challenge:</strong> Create a table called "users" with columns: id (INTEGER PRIMARY KEY), name (TEXT), email (TEXT).</p>
    `,
    placeholder: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);',
    database: {
        tables: [],
        init: []
    },
    challenge: {
        validate: (userQuery, result) => {
            const upperQuery = userQuery.toUpperCase();
            if (!upperQuery.includes('CREATE') || !upperQuery.includes('TABLE') || !upperQuery.includes('USERS')) {
                return { correct: false, message: 'Make sure you\'re using CREATE TABLE and naming it "users".' };
            }
            if (result.success) {
                return { correct: true, message: '✓ Table created! Now we can add data to it with INSERT.' };
            }
            return { correct: false, message: result.error || 'Check your CREATE TABLE syntax.' };
        }
    },
    hint: 'Create a table with three columns: <code>id INTEGER PRIMARY KEY, name TEXT, email TEXT</code>',
    setupDatabase: async function() {}
};

// Register lesson
if (typeof window.LESSONS === 'undefined') {
    window.LESSONS = [];
}
window.LESSONS.push(lesson7CreateTable);
