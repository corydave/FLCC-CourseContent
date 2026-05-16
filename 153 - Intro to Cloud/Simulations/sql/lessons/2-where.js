/**
 * Lesson 2: WHERE
 * Filter data based on conditions
 */

const lesson2Where = {
    id: 'where',
    title: 'WHERE - Filtering Data',
    type: 'interactive',
    description: 'Learn to ask more specific questions',
    
    instructions: `
        <p>
            So far, we've selected <em>all</em> rows. But usually we want to be more specific.
            The <code>WHERE</code> clause lets us filter results based on conditions.
        </p>
        <p>
            The pattern is:
        </p>
        <pre><code>SELECT columns FROM table WHERE condition;</code></pre>
        <p>
            Some common conditions:
        </p>
        <ul>
            <li><code>=</code> - equals (e.g., <code>year = 1960</code>)</li>
            <li><code>&gt;</code> - greater than (e.g., <code>price &gt; 10</code>)</li>
            <li><code>&lt;</code> - less than (e.g., <code>year &lt; 1950</code>)</li>
            <li><code>&lt;&gt;</code> or <code>!=</code> - not equal (e.g., <code>author &lt;&gt; 'Jane Austen'</code>)</li>
        </ul>
        <p>
            <strong>Challenge:</strong> Find all books that cost less than $12. 
            Show the title and price.
        </p>
    `,

    placeholder: 'SELECT title, price FROM books WHERE price < 12;',

    database: {
        tables: [
            {
                name: 'books',
                columns: ['id', 'title', 'author', 'year', 'price'],
                rows: [
                    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, price: 12.99 },
                    { id: 2, title: '1984', author: 'George Orwell', year: 1949, price: 13.99 },
                    { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, price: 9.99 },
                    { id: 4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, price: 11.99 },
                    { id: 5, title: 'Brave New World', author: 'Aldous Huxley', year: 1932, price: 14.99 }
                ]
            }
        ],
        init: [
            `CREATE TABLE books (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                year INTEGER,
                price REAL
            )`,
            `INSERT INTO books VALUES (1, 'To Kill a Mockingbird', 'Harper Lee', 1960, 12.99)`,
            `INSERT INTO books VALUES (2, '1984', 'George Orwell', 1949, 13.99)`,
            `INSERT INTO books VALUES (3, 'Pride and Prejudice', 'Jane Austen', 1813, 9.99)`,
            `INSERT INTO books VALUES (4, 'The Great Gatsby', 'F. Scott Fitzgerald', 1925, 11.99)`,
            `INSERT INTO books VALUES (5, 'Brave New World', 'Aldous Huxley', 1932, 14.99)`
        ]
    },

    challenge: {
        prompt: 'Find books cheaper than $12',
        validate: (userQuery, result) => {
            const upperQuery = userQuery.toUpperCase();
            
            if (!upperQuery.includes('WHERE')) {
                return {
                    correct: false,
                    message: 'Don\'t forget the WHERE clause to filter results.'
                };
            }

            if (!upperQuery.includes('PRICE') || !upperQuery.includes('<')) {
                return {
                    correct: false,
                    message: 'You need to filter by price using the < operator.'
                };
            }

            // Check results - should get 2 books (Pride and Prejudice at 9.99, Great Gatsby at 11.99)
            if (result.success && result.rows && result.rows.length === 2) {
                // Verify the prices are correct
                const prices = result.rows.map(row => row.price);
                if (prices.every(p => p < 12)) {
                    return {
                        correct: true,
                        message: '✓ Excellent! You found the books under $12. WHERE is one of the most powerful SQL tools!'
                    };
                }
            }

            if (result.success && result.rows) {
                return {
                    correct: false,
                    message: `You got ${result.rows.length} rows, but should get 2 books under $12.`
                };
            }

            return {
                correct: false,
                message: result.error || 'Something went wrong.'
            };
        }
    },

    hint: 'Use <code>WHERE price &lt; 12</code> to filter books. Make sure to include the columns you want (title and price).',

    setupDatabase: async function() {
        for (const sql of this.database.init) {
            sqlExecutor.execute(sql);
        }
    }
};

// Register lesson
if (typeof window.LESSONS === 'undefined') {
    window.LESSONS = [];
}
window.LESSONS.push(lesson2Where);
