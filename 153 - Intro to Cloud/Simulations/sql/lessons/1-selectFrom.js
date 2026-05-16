/**
 * Lesson 1: SELECT & FROM
 * Learn the fundamental building blocks of SQL queries
 */

const lesson1SelectFrom = {
    id: 'select-from',
    title: 'SELECT & FROM',
    type: 'interactive',
    description: 'Learn the two most important SQL keywords',
    
    instructions: `
        <p>
            SQL is a language for <strong>asking questions</strong> of your data. 
            The simplest question starts with two keywords:
        </p>
        <ul>
            <li><code>SELECT</code> - which columns do you want?</li>
            <li><code>FROM</code> - which table has the data?</li>
        </ul>
        <p>
            The basic pattern is:
        </p>
        <pre><code>SELECT column_name FROM table_name;</code></pre>
        <p>
            Or to get <strong>all columns</strong>, use an asterisk (<code>*</code>):
        </p>
        <pre><code>SELECT * FROM table_name;</code></pre>
        <p>
            Let's try it! Below is a table of books in our bookstore. 
            Write a query to select all columns from the <code>books</code> table.
        </p>
    `,

    placeholder: 'SELECT * FROM books;',

    // Database setup
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
        prompt: 'Show all books',
        validate: (userQuery, result) => {
            // Accept either "SELECT *" or listing all columns
            const upperQuery = userQuery.toUpperCase();
            
            if (!upperQuery.includes('SELECT') || !upperQuery.includes('FROM') || !upperQuery.includes('BOOKS')) {
                return {
                    correct: false,
                    message: 'Make sure your query includes SELECT, FROM, and the table name (books)'
                };
            }

            // Check results
            if (result.success && result.rows && result.rows.length === 5) {
                return {
                    correct: true,
                    message: '✓ Perfect! You\'ve selected all books. Next, we\'ll learn how to be more selective.'
                };
            } else if (result.success) {
                return {
                    correct: false,
                    message: `You got ${result.rows ? result.rows.length : 0} rows, but there should be 5 books.`
                };
            }

            return {
                correct: false,
                message: result.error || 'Something went wrong. Check your query.'
            };
        }
    },

    hint: 'Use <code>SELECT * FROM books;</code> to get all columns and all rows.',

    setupDatabase: async function() {
        // Clear and rebuild database
        for (const sql of this.database.init) {
            sqlExecutor.execute(sql);
        }
    }
};

// Register lesson
if (typeof window.LESSONS === 'undefined') {
    window.LESSONS = [];
}
window.LESSONS.push(lesson1SelectFrom);
