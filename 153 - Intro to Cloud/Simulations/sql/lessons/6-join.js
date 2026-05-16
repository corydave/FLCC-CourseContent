/**
 * Lesson 6: JOIN
 * Combine data from multiple tables
 */
const lesson6Join = {
    id: 'join',
    title: 'JOIN - Connecting Tables',
    type: 'interactive',
    instructions: `
        <p>Real databases have multiple tables. <strong>JOIN</strong> combines them by matching rows based on a condition.</p>
        <p>The most common is INNER JOIN:</p>
        <pre><code>SELECT columns FROM table1 
INNER JOIN table2 ON table1.id = table2.table1_id;</code></pre>
        <p>Or just use JOIN (it defaults to INNER):</p>
        <pre><code>SELECT columns FROM table1 
JOIN table2 ON table1.id = table2.table1_id;</code></pre>
        <p><strong>Challenge:</strong> Show book titles with their author names (join books and authors).</p>
    `,
    placeholder: 'SELECT books.title, authors.name FROM books JOIN authors ON books.author_id = authors.id;',
    database: {
        tables: [
            { name: 'books', columns: ['id', 'title', 'author_id'], rows: [{ id: 1, title: 'To Kill a Mockingbird', author_id: 1 }, { id: 2, title: '1984', author_id: 2 }] },
            { name: 'authors', columns: ['id', 'name'], rows: [{ id: 1, name: 'Harper Lee' }, { id: 2, name: 'George Orwell' }] }
        ],
        init: [
            `CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT)`,
            `CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, author_id INTEGER)`,
            `INSERT INTO authors VALUES (1, 'Harper Lee')`,
            `INSERT INTO authors VALUES (2, 'George Orwell')`,
            `INSERT INTO books VALUES (1, 'To Kill a Mockingbird', 1)`,
            `INSERT INTO books VALUES (2, '1984', 2)`
        ]
    },
    challenge: {
        validate: (userQuery, result) => {
            const upperQuery = userQuery.toUpperCase();
            if (!upperQuery.includes('JOIN')) {
                return { correct: false, message: 'You need to use a JOIN to combine the tables.' };
            }
            if (result.success && result.rows && result.rows.length === 2) {
                return { correct: true, message: '✓ Excellent! You\'ve joined two tables together!' };
            }
            return { correct: false, message: 'Make sure you\'re joining books and authors tables correctly.' };
        }
    },
    hint: 'Join on the condition <code>books.author_id = authors.id</code> to match books with their authors.',
    setupDatabase: async function() {
        for (const sql of this.database.init) sqlExecutor.execute(sql);
    }
};

// Register lesson
if (typeof window.LESSONS === 'undefined') {
    window.LESSONS = [];
}
window.LESSONS.push(lesson6Join);
