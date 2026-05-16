/**
 * Lesson 9: UPDATE
 * Modify existing data
 */
const lesson9Update = {
    id: 'update',
    title: 'UPDATE - Modifying Data',
    type: 'interactive',
    instructions: `
        <p><code>UPDATE</code> changes values in existing rows:</p>
        <pre><code>UPDATE table SET column = value WHERE condition;</code></pre>
        <p>The <code>WHERE</code> clause is crucial-it specifies <em>which rows</em> to update. Without it, you'll update every row!</p>
        <p>Example:</p>
        <pre><code>UPDATE users SET email = 'newemail@example.com' WHERE id = 1;</code></pre>
        <p><strong>Challenge:</strong> Update the user with id=1 to have a new email: 'newemail@example.com'.</p>
    `,
    placeholder: "UPDATE users SET email = 'newemail@example.com' WHERE id = 1;",
    database: {
        tables: [{ name: 'users', columns: ['id', 'name', 'email'], rows: [{ id: 1, name: 'Bob', email: 'bob@old.com' }] }],
        init: [
            `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)`,
            `INSERT INTO users VALUES (1, 'Bob', 'bob@old.com')`
        ]
    },
    challenge: {
        validate: (userQuery, result) => {
            const upperQuery = userQuery.toUpperCase();
            if (!upperQuery.includes('UPDATE') || !upperQuery.includes('SET')) {
                return { correct: false, message: 'Make sure you\'re using UPDATE and SET.' };
            }
            if (!upperQuery.includes('WHERE')) {
                return { correct: false, message: 'Important: Use WHERE to specify which row(s) to update!' };
            }
            if (result.success && result.changes > 0) {
                return { correct: true, message: '✓ Data updated! One more operation: DELETE.' };
            }
            return { correct: false, message: result.error || 'Make sure your UPDATE syntax is correct.' };
        }
    },
    hint: 'Use <code>UPDATE users SET email = \'newemail@example.com\' WHERE id = 1</code> to update the specific user.',
    setupDatabase: async function() {
        for (const sql of this.database.init) sqlExecutor.execute(sql);
    }
};

// Register lesson
if (typeof window.LESSONS === 'undefined') {
    window.LESSONS = [];
}
window.LESSONS.push(lesson9Update);
