/**
 * Lesson 8: INSERT
 * Add data to tables
 */
const lesson8Insert = {
    id: 'insert',
    title: 'INSERT - Adding Data',
    type: 'interactive',
    instructions: `
        <p><code>INSERT</code> adds new rows to a table:</p>
        <pre><code>INSERT INTO table_name (col1, col2) VALUES (value1, value2);</code></pre>
        <p>You list the columns you're filling, then provide the values in the same order.</p>
        <p>If you're providing values for <em>all</em> columns in order, you can omit the column list:</p>
        <pre><code>INSERT INTO table_name VALUES (value1, value2, value3);</code></pre>
        <p><strong>Challenge:</strong> Insert a new user with name='Alice' and email='alice@example.com' into the users table.</p>
    `,
    placeholder: "INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');",
    database: {
        tables: [{ name: 'users', columns: ['id', 'name', 'email'], rows: [] }],
        init: [
            `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)`
        ]
    },
    challenge: {
        validate: (userQuery, result) => {
            const upperQuery = userQuery.toUpperCase();
            if (!upperQuery.includes('INSERT') || !upperQuery.includes('VALUES')) {
                return { correct: false, message: 'Make sure you\'re using INSERT and VALUES.' };
            }
            if (result.success && result.changes > 0) {
                return { correct: true, message: '✓ Data inserted! You\'re now ready for UPDATE and DELETE.' };
            }
            return { correct: false, message: result.error || 'Make sure your INSERT syntax is correct.' };
        }
    },
    hint: 'Use <code>INSERT INTO users (name, email) VALUES (\'Alice\', \'alice@example.com\')</code>. Note the quotes around text values.',
    setupDatabase: async function() {
        for (const sql of this.database.init) sqlExecutor.execute(sql);
    }
};

// Register lesson
if (typeof window.LESSONS === 'undefined') {
    window.LESSONS = [];
}
window.LESSONS.push(lesson8Insert);
