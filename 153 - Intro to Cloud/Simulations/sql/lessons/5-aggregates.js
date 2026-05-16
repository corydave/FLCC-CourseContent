/**
 * Lesson 5: Aggregate Functions
 * COUNT, SUM, AVG, MIN, MAX
 */
const lesson5Aggregates = {
    id: 'aggregates',
    title: 'Aggregate Functions - Summarizing Data',
    type: 'interactive',
    instructions: `
        <p>Sometimes you don't want to see individual rows-you want to summarize them.</p>
        <p>Common aggregate functions:</p>
        <ul>
            <li><code>COUNT(*)</code> - count total rows</li>
            <li><code>SUM(column)</code> - add up values</li>
            <li><code>AVG(column)</code> - calculate average</li>
            <li><code>MIN(column)</code> - find minimum</li>
            <li><code>MAX(column)</code> - find maximum</li>
        </ul>
        <p>Example: <code>SELECT COUNT(*) FROM books;</code></p>
        <p><strong>Challenge:</strong> Find the average price of all books.</p>
    `,
    placeholder: 'SELECT AVG(price) FROM books;',
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
            if (result.success && result.rows && result.rows.length === 1) {
                return { correct: true, message: '✓ Perfect! You computed an aggregate value.' };
            }
            return { correct: false, message: 'Make sure you\'re using AVG(price) to get the average.' };
        }
    },
    hint: 'Use <code>AVG(price)</code> to calculate the average price across all books.',
    setupDatabase: async function() {
        for (const sql of this.database.init) sqlExecutor.execute(sql);
    }
};

// Register lesson
if (typeof window.LESSONS === 'undefined') {
    window.LESSONS = [];
}
window.LESSONS.push(lesson5Aggregates);
