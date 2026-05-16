/**
 * Lesson 10: DELETE
 * Remove data from tables
 */
const lesson10Delete = {
    id: 'delete',
    title: 'DELETE - Removing Data',
    type: 'interactive',
    instructions: `
        <p><code>DELETE</code> removes rows from a table (use carefully!):</p>
        <pre><code>DELETE FROM table WHERE condition;</code></pre>
        <p>Like UPDATE, the <code>WHERE</code> clause is essential. Without it, you'll delete every row in the table!</p>
        <p>Example:</p>
        <pre><code>DELETE FROM users WHERE id = 1;</code></pre>
        <p><strong>Challenge:</strong> Delete the user with id=1.</p>
    `,
    placeholder: 'DELETE FROM users WHERE id = 1;',
    database: {
        tables: [{ name: 'users', columns: ['id', 'name'], rows: [{ id: 1, name: 'Bob' }, { id: 2, name: 'Alice' }] }],
        init: [
            `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)`,
            `INSERT INTO users VALUES (1, 'Bob')`,
            `INSERT INTO users VALUES (2, 'Alice')`
        ]
    },
    challenge: {
        validate: (userQuery, result) => {
            const upperQuery = userQuery.toUpperCase();
            if (!upperQuery.includes('DELETE') || !upperQuery.includes('FROM')) {
                return { correct: false, message: 'Make sure you\'re using DELETE FROM.' };
            }
            if (!upperQuery.includes('WHERE')) {
                return { correct: false, message: 'Critical: Always use WHERE to specify which row(s) to delete!' };
            }
            if (result.success && result.changes > 0) {
                return { correct: true, message: '✓ Data deleted! Congratulations-you know SQL fundamentals!' };
            }
            return { correct: false, message: result.error || 'Make sure your DELETE syntax is correct.' };
        }
    },
    hint: 'Use <code>DELETE FROM users WHERE id = 1</code> to remove the specific user.',
    setupDatabase: async function() {
        for (const sql of this.database.init) sqlExecutor.execute(sql);
    }
};

// Register lesson
if (typeof window.LESSONS === 'undefined') {
    window.LESSONS = [];
}
window.LESSONS.push(lesson10Delete);
