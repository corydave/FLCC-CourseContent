/**
 * Lesson 3: AND & OR
 * Combine multiple WHERE conditions
 */

const lesson3AndOr = {
    id: 'and-or',
    title: 'AND & OR - Combining Conditions',
    type: 'interactive',
    description: 'Ask even more specific questions',
    
    instructions: `
        <p>
            Often you want to filter by multiple conditions at once. 
            Use <code>AND</code> and <code>OR</code> to combine them:
        </p>
        <ul>
            <li><code>AND</code> - both conditions must be true</li>
            <li><code>OR</code> - at least one condition must be true</li>
        </ul>
        <p>
            Examples:
        </p>
        <pre><code>SELECT title FROM books WHERE year > 1900 AND price < 13;</code></pre>
        <pre><code>SELECT title FROM books WHERE author = 'Jane Austen' OR author = 'George Orwell';</code></pre>
        <p>
            <strong>Challenge:</strong> Find all books published before 1950 AND that cost more than $10. 
            Show the title and year.
        </p>
    `,

    placeholder: 'SELECT title, year FROM books WHERE year < 1950 AND price > 10;',

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
        prompt: 'Find old expensive books',
        validate: (userQuery, result) => {
            const upperQuery = userQuery.toUpperCase();
            
            if (!upperQuery.includes('AND')) {
                return {
                    correct: false,
                    message: 'Use AND to combine two conditions.'
                };
            }

            // Should get 2 rows: 1984 (1949, 13.99) and Brave New World (1932, 14.99)
            if (result.success && result.rows && result.rows.length === 2) {
                const allMatch = result.rows.every(row => row.year < 1950 && row.price > 10);
                if (allMatch) {
                    return {
                        correct: true,
                        message: '✓ Perfect! You\'ve combined conditions with AND. You\'re thinking like a SQL pro!'
                    };
                }
            }

            if (result.success && result.rows) {
                return {
                    correct: false,
                    message: `You got ${result.rows.length} rows. Remember: BOTH conditions must be true with AND.`
                };
            }

            return {
                correct: false,
                message: result.error || 'Something went wrong.'
            };
        }
    },

    hint: 'Use <code>WHERE year &lt; 1950 AND price &gt; 10</code> to filter on both conditions.',

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
window.LESSONS.push(lesson3AndOr);
