/**
 * SQL Executor Utility
 * Wraps sql.js (SQLite in WebAssembly) to provide a clean API
 * for executing queries, managing databases, and validating results
 */

class SQLExecutor {
    constructor() {
        this.db = null;
        this.isInitialized = false;
    }

    /**
     * Initialize the SQL.js engine
     * Must be called once before any database operations
     */
    async initialize() {
        if (this.isInitialized) return;
    
        return new Promise((resolve, reject) => {
            window.initSqlJs({
                locateFile: file => `https://cdn.jsdelivr.net/npm/sql.js@1.8.0/dist/${file}`
            }).then(SQL => {
                this.db = new SQL.Database();
                this.isInitialized = true;
                resolve();
            }).catch(reject);
        });
    }

    /**
     * Execute a CREATE TABLE statement
     * @param {string} sql - The CREATE TABLE SQL statement
     * @returns {object} - { success: boolean, error?: string }
     */
    createTable(sql) {
        if (!this.isInitialized) {
            return { success: false, error: "Database not initialized" };
        }

        try {
            this.db.run(sql);
            return { success: true };
        } catch (error) {
            return { success: false, error: this.formatError(error) };
        }
    }

    /**
     * Execute an INSERT statement
     * @param {string} sql - The INSERT SQL statement
     * @returns {object} - { success: boolean, error?: string, changes?: number }
     */
    insert(sql) {
        if (!this.isInitialized) {
            return { success: false, error: "Database not initialized" };
        }

        try {
            this.db.run(sql);
            // Get the number of rows inserted
            const changes = this.db.getRowsModified();
            return { success: true, changes };
        } catch (error) {
            return { success: false, error: this.formatError(error) };
        }
    }

    /**
     * Execute an UPDATE statement
     * @param {string} sql - The UPDATE SQL statement
     * @returns {object} - { success: boolean, error?: string, changes?: number }
     */
    update(sql) {
        if (!this.isInitialized) {
            return { success: false, error: "Database not initialized" };
        }

        try {
            this.db.run(sql);
            const changes = this.db.getRowsModified();
            return { success: true, changes };
        } catch (error) {
            return { success: false, error: this.formatError(error) };
        }
    }

    /**
     * Execute a DELETE statement
     * @param {string} sql - The DELETE SQL statement
     * @returns {object} - { success: boolean, error?: string, changes?: number }
     */
    delete(sql) {
        if (!this.isInitialized) {
            return { success: false, error: "Database not initialized" };
        }

        try {
            this.db.run(sql);
            const changes = this.db.getRowsModified();
            return { success: true, changes };
        } catch (error) {
            return { success: false, error: this.formatError(error) };
        }
    }

    /**
     * Execute a SELECT query
     * @param {string} sql - The SELECT SQL statement
     * @returns {object} - { success: boolean, columns?: string[], rows?: array, error?: string }
     */
    select(sql) {
        if (!this.isInitialized) {
            return { success: false, error: "Database not initialized" };
        }

        try {
            // sql.js returns an array of result sets
            const stmt = this.db.prepare(sql);
            const columns = stmt.getColumnNames();
            const rows = [];

            while (stmt.step()) {
                const row = stmt.getAsObject();
                rows.push(row);
            }

            stmt.free();

            return {
                success: true,
                columns,
                rows
            };
        } catch (error) {
            return { success: false, error: this.formatError(error) };
        }
    }

    /**
     * Execute any SQL statement (SELECT, INSERT, UPDATE, DELETE, CREATE)
     * Automatically detects the statement type and routes appropriately
     * @param {string} sql - The SQL statement
     * @returns {object} - Result object with success, data, error, etc.
     */
    execute(sql) {
        if (!this.isInitialized) {
            return { success: false, error: "Database not initialized" };
        }

        // Trim and uppercase for detection
        const trimmedSql = sql.trim();
        const upperSql = trimmedSql.toUpperCase();

        // Determine statement type
        if (upperSql.startsWith('SELECT')) {
            return this.select(trimmedSql);
        } else if (upperSql.startsWith('INSERT')) {
            return this.insert(trimmedSql);
        } else if (upperSql.startsWith('UPDATE')) {
            return this.update(trimmedSql);
        } else if (upperSql.startsWith('DELETE')) {
            return this.delete(trimmedSql);
        } else if (upperSql.startsWith('CREATE')) {
            return this.createTable(trimmedSql);
        } else {
            return { success: false, error: "Unknown SQL statement type" };
        }
    }

    /**
     * Get all table names in the database
     * @returns {array} - Array of table names
     */
    getTableNames() {
        try {
            const result = this.select(
                "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
            );
            if (result.success) {
                return result.rows.map(row => row.name);
            }
            return [];
        } catch (error) {
            return [];
        }
    }

    /**
     * Get table schema (column names and types)
     * @param {string} tableName - Name of the table
     * @returns {array} - Array of column info objects
     */
    getTableSchema(tableName) {
        try {
            const result = this.select(`PRAGMA table_info(${tableName})`);
            if (result.success) {
                return result.rows;
            }
            return [];
        } catch (error) {
            return [];
        }
    }

    /**
     * Format error messages to be user-friendly
     * @param {Error} error - The error object
     * @returns {string} - Formatted error message
     */
    formatError(error) {
        const message = error.message || String(error);

        // Parse common SQL.js errors
        if (message.includes('SYNTAX ERROR')) {
            return "Syntax error in your SQL. Check your spelling and punctuation.";
        }
        if (message.includes('no such table')) {
            const match = message.match(/no such table: (\w+)/);
            return match ? `Table "${match[1]}" doesn't exist.` : "That table doesn't exist.";
        }
        if (message.includes('no such column')) {
            const match = message.match(/no such column: (\w+)/);
            return match ? `Column "${match[1]}" doesn't exist.` : "That column doesn't exist.";
        }
        if (message.includes('table') && message.includes('already exists')) {
            return "That table already exists. Choose a different name.";
        }
        if (message.includes('UNIQUE')) {
            return "This violates a unique constraint (no duplicates allowed).";
        }

        // Fallback
        return message || "An unknown error occurred.";
    }

    /**
     * Check if two result sets are equivalent
     * Useful for validation in lessons
     * @param {object} resultA - First result set { columns, rows }
     * @param {object} resultB - Second result set { columns, rows }
     * @returns {boolean} - True if results match
     */
    static areResultsEqual(resultA, resultB) {
        if (!resultA || !resultB) return false;

        // Check column count
        if (resultA.columns.length !== resultB.columns.length) {
            return false;
        }

        // Check row count
        if (resultA.rows.length !== resultB.rows.length) {
            return false;
        }

        // Check column names (order matters)
        if (!resultA.columns.every((col, i) => col === resultB.columns[i])) {
            return false;
        }

        // Check row values (order matters)
        return resultA.rows.every((rowA, i) => {
            const rowB = resultB.rows[i];
            return resultA.columns.every(col => rowA[col] === rowB[col]);
        });
    }

    /**
     * Reset the entire database
     * Creates a fresh, empty database
     */
    reset() {
        if (this.isInitialized) {
            this.db.close();
            this.db = null;
            this.isInitialized = false;
        }
    }
}

// Create a global instance
const sqlExecutor = new SQLExecutor();
