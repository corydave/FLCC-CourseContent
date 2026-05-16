/**
 * Lesson 4: ORDER BY & LIMIT
 * Sort and limit your results
 */
const lesson4OrderByLimit = {
    id: 'order-by-limit',
    title: 'ORDER BY & LIMIT - Sorting and Limiting Results',
    type: 'interactive',
    instructions: `
        <p>After filtering data, you often want to:</p>
        <ul>
            <li>Sort results (ascending or descending)</li>
            <li>Limit how many rows you get back</li>
        </ul>
        <p><strong>ORDER BY</strong> sorts your results:</p>
        <pre><code>SELECT * FROM books ORDER BY price;</code></pre>
        <pre><code>SELECT * FROM books ORDER BY price DESC;</code></pre>
        <p><strong>LIMIT</strong> caps the number of rows:</p>
        <pre><code>SELECT * FROM books LIMIT 5;</code></pre>
        <p><strong>Challenge:</strong> Show the 3 cheapest books (title and price), sorted by price.</p>
    `,
    placeholder: 'SELECT title, price FROM books ORDER BY price LIMIT 3;',
    database: {
        tables: [
            {
                name: 'books',
                columns: ['title', 'price'],
                rows: [
                    { title: 'Pride and Prejudice', price: 9.99 },
                    { title: 'The Great Gatsby', price: 11.99 },
                    { title: 'To Kill a Mockingbird', price: 12.99 },
                    { title: '1984', price: 13.99 },
                    { title: 'Brave New World', price: 14.99 }
                ]
            }
        ],
        init: [
            `CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, author TEXT, year INTEGER, price REAL)`,
            `INSERT INTO books VALUES (1, 'To Kill a Mockingbird', 'Harper Lee', 1960, 12.99)`,
            `INSERT INTO books VALUES (2, '1984', 'George Orwell', 1949, 13.99)`,
            `INSERT INTO books VALUES (3, 'Pride and Prejudice', 'Jane Austen', 1813, 9.99)`,
            `INSERT INTO books VALUES (4, 'The Great Gatsby', 'F. Scott Fitzgerald', 1925, 11.99)`,
            `INSERT INTO books VALUES (5, 'Brave New World', 'Aldous Huxley', 1932, 14.99)`
        ]
    },
    challenge: {
        validate: (userQuery, result) => {
            const upperQuery = userQuery.toUpperCase();
            if (result.success && result.rows && result.rows.length === 3) {
                return { correct: true, message: '✓ Great! You sorted and limited the results!' };
            }
            return { correct: false, message: 'You should get exactly 3 rows, sorted by price.' };
        }
    },
    hint: 'Use <code>ORDER BY price LIMIT 3</code> to sort by price and get only the first 3 rows.',
    setupDatabase: async function() {
        for (const sql of this.database.init) sqlExecutor.execute(sql);
    }
};

// Register lesson
if (typeof window.LESSONS === 'undefined') {
    window.LESSONS = [];
}
window.LESSONS.push(lesson4OrderByLimit);
