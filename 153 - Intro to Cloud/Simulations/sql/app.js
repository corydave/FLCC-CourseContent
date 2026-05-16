/**
 * SQL Course Application
 * Main controller for lesson loading, query execution, validation, and progression
 */

class SQLCourseApp {
    constructor() {
        this.currentLessonIndex = 0;
        this.lessons = [];
        this.completedLessons = new Set();
        this.isDebugMode = false;
        this.studentName = null;

        // DOM elements
        this.instructionPane = document.getElementById('instruction-pane');
        this.interactivePane = document.getElementById('interactive-pane');
        this.debugMenu = document.getElementById('debug-menu');
        this.debugButtons = document.getElementById('debug-buttons');
        this.nextBtn = document.getElementById('btn-next');
        this.resetBtn = document.getElementById('btn-reset');
        this.themeToggle = document.getElementById('theme-toggle');
        this.progressBar = document.getElementById('progress-bar');
        this.progressText = document.getElementById('progress-text');

        // Event listeners
        this.nextBtn.addEventListener('click', () => this.nextLesson());
        this.resetBtn.addEventListener('click', () => this.resetCurrentLesson());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        // Check for debug mode
        const params = new URLSearchParams(window.location.search);
        this.isDebugMode = params.has('debug') && params.get('debug') === 'true';

        // Initialize SQL executor
        await sqlExecutor.initialize();

        // Collect all lessons (defined in the lesson files)
        this.collectLessons();

        // Setup theme preference
        this.setupTheme();

        // Setup debug mode if enabled
        if (this.isDebugMode) {
            this.setupDebugMode();
        }

        // Load and display first lesson
        this.loadLesson(0);
    }

    /**
     * Collect all lessons from global scope
     * Lessons are registered via window.LESSONS array
     */
    collectLessons() {
        // Lessons are registered globally by their script files
        if (typeof window.LESSONS !== 'undefined' && Array.isArray(window.LESSONS)) {
            this.lessons = window.LESSONS;
        } else {
            console.error('No lessons found! Make sure lesson files are loaded.');
        }
    }

    /**
     * Load a specific lesson by index
     * @param {number} index - Lesson index
     */
    loadLesson(index) {
        if (index < 0 || index >= this.lessons.length) {
            console.error(`Invalid lesson index: ${index}`);
            return;
        }

        this.currentLessonIndex = index;
        const lesson = this.lessons[index];

        // Update progress
        this.updateProgress();
        
        // Setup database for this lesson
        this.setupDatabaseForLesson(lesson);        

        // Render instruction pane
        this.renderInstruction(lesson);

        // Render interactive pane
        this.renderInteractive(lesson);

        // Reset next button state
        this.nextBtn.disabled = true;

        // Show reset button if applicable
        if (lesson.type === 'interactive') {
            this.resetBtn.classList.remove('hidden');
        } else {
            this.resetBtn.classList.add('hidden');
        }
    }

    /**
     * Render instruction pane content
     * @param {object} lesson - Lesson object
     */
    renderInstruction(lesson) {
        this.instructionPane.innerHTML = '';

        // Title
        const title = document.createElement('h2');
        title.textContent = lesson.title;
        this.instructionPane.appendChild(title);

        // Description (can be HTML)
        if (lesson.description) {
            const desc = document.createElement('div');
            desc.innerHTML = lesson.description;
            this.instructionPane.appendChild(desc);
        }

        // Instructions
        if (lesson.instructions) {
            const instructions = document.createElement('div');
            instructions.innerHTML = lesson.instructions;
            this.instructionPane.appendChild(instructions);
        }

        // Video placeholder if specified
        if (lesson.videoUrl) {
            const videoContainer = document.createElement('div');
            videoContainer.className = 'media-container';
            videoContainer.innerHTML = `
                <p>Video: ${lesson.videoTitle || 'Video Lesson'}</p>
                <p style="font-size: 0.7rem; margin-top: 0.5rem;">(Placeholder for ${lesson.videoUrl})</p>
            `;
            this.instructionPane.appendChild(videoContainer);
        }
        lucide.createIcons();
    }

    /**
     * Render interactive pane content
     * @param {object} lesson - Lesson object
     */
    renderInteractive(lesson) {
        const container = this.interactivePane.querySelector('.interactive-content');
        container.innerHTML = '';

        // For certificate lessons, show special content
        if (lesson.type === 'certificate') {
            this.renderCertificateLesson(lesson);
            return;
        }

        // Render database table(s)
        if (lesson.database && lesson.database.tables) {
            const tablesContainer = document.createElement('div');
            tablesContainer.className = 'tables-section';

            lesson.database.tables.forEach(table => {
                const tableDiv = document.createElement('div');
                tableDiv.style.marginBottom = '1.5rem';

                const label = document.createElement('div');
                label.className = 'editor-label';
                label.innerHTML = `Table: <code style="text-transform: none;">${table.name}</code>`;
                tableDiv.appendChild(label);

                const tableEl = document.createElement('div');
                tableEl.className = 'table-container';
                tableEl.innerHTML = this.createTableHTML(table);
                tableDiv.appendChild(tableEl);

                tablesContainer.appendChild(tableDiv);
            });

            container.appendChild(tablesContainer);
        }

        // Render editor section
        const editorSection = document.createElement('div');
        editorSection.className = 'editor-section';

        // Editor label
        const editorLabel = document.createElement('div');
        editorLabel.className = 'editor-label';
        editorLabel.innerHTML = '✎ SQL Query';
        editorSection.appendChild(editorLabel);

        // Textarea
        const textarea = document.createElement('textarea');
        textarea.id = 'query-editor';
        textarea.placeholder = lesson.placeholder || 'Enter your SQL query here...';
        textarea.spellcheck = false;
        editorSection.appendChild(textarea);

        // Execution controls
        const controls = document.createElement('div');
        controls.className = 'execution-controls';

        const executeBtn = document.createElement('button');
        executeBtn.className = 'btn-execute';
        executeBtn.textContent = 'Execute Query';
        executeBtn.addEventListener('click', () => this.executeQuery(lesson));
        controls.appendChild(executeBtn);

        const clearBtn = document.createElement('button');
        clearBtn.className = 'btn-execute';
        clearBtn.style.background = 'var(--bg-tertiary)';
        clearBtn.style.color = 'var(--text-primary)';
        clearBtn.textContent = 'Clear';
        clearBtn.addEventListener('click', () => {
            textarea.value = '';
            textarea.focus();
        });
        controls.appendChild(clearBtn);

        editorSection.appendChild(controls);
        container.appendChild(editorSection);

        // Results area
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'results-container';
        resultsContainer.id = 'results-container';
        resultsContainer.innerHTML = '<div class="results-label">Results</div><div class="empty-state">Run a query to see results</div>';
        container.appendChild(resultsContainer);

        // Hint area (if lesson has hints)
        if (lesson.hint) {
            const hintDiv = document.createElement('div');
            hintDiv.className = 'hint-box';
            hintDiv.innerHTML = `<strong>Hint:</strong> ${lesson.hint}`;
            hintDiv.style.display = 'none';
            hintDiv.id = 'hint-box';
            container.appendChild(hintDiv);
        }

        // Focus on textarea
        setTimeout(() => textarea.focus(), 100);
    }

    /**
     * Render certificate lesson
     * @param {object} lesson - Certificate lesson object
     */
    renderCertificateLesson(lesson) {
        const container = this.interactivePane.querySelector('.interactive-content');

        const certDiv = document.createElement('div');
        certDiv.style.textAlign = 'center';
        certDiv.style.padding = '2rem';

        const congratsHeading = document.createElement('h2');
        congratsHeading.style.color = 'var(--color-success)';
        congratsHeading.style.marginBottom = '1rem';
        congratsHeading.innerHTML = '<i data-lucide="party-popper"></i> Congratulations! <i data-lucide="party-popper"></i>';
        lucide.createIcons();
        certDiv.appendChild(congratsHeading);

        const message = document.createElement('p');
        message.style.marginBottom = '1.5rem';
        message.style.fontSize = '1.1rem';
        message.innerHTML = lesson.description;
        certDiv.appendChild(message);

        const nameInputDiv = document.createElement('div');
        nameInputDiv.style.marginBottom = '1rem';
        nameInputDiv.style.textAlign = 'left';

        const nameLabel = document.createElement('label');
        nameLabel.htmlFor = 'student-name';
        nameLabel.textContent = 'Your name (for certificate):';
        nameLabel.style.display = 'block';
        nameLabel.style.marginBottom = '0.5rem';
        nameLabel.style.fontWeight = 'bold';
        nameInputDiv.appendChild(nameLabel);

        const nameInput = document.createElement('input');
        nameInput.id = 'student-name';
        nameInput.type = 'text';
        nameInput.placeholder = 'Enter your name';
        nameInput.style.width = '100%';
        nameInput.style.padding = '0.5rem';
        nameInput.style.borderRadius = '0.25rem';
        nameInput.style.border = '1px solid var(--border-color)';
        nameInput.style.fontFamily = 'inherit';
        nameInput.style.fontSize = 'inherit';
        nameInput.style.marginBottom = '1rem';
        nameInput.addEventListener('input', (e) => {
            this.studentName = e.target.value.trim() || 'Student';
        });
        nameInputDiv.appendChild(nameInput);

        certDiv.appendChild(nameInputDiv);

        const generateBtn = document.createElement('button');
        generateBtn.className = 'btn-execute';
        generateBtn.textContent = 'Download Certificate';
        generateBtn.addEventListener('click', () => {
            const name = document.getElementById('student-name').value.trim() || 'Student';
            CertificateGenerator.generateCertificate(name, 'SQL Fundamentals: Part 1');
            this.nextBtn.disabled = false;
        });
        certDiv.appendChild(generateBtn);

        container.appendChild(certDiv);
    }

    /**
     * Create HTML for a data table
     * @param {object} table - Table object with name, columns, rows
     * @returns {string} - HTML table
     */
    createTableHTML(table) {
        let html = '<table><thead><tr>';
        
        // Header
        table.columns.forEach(col => {
            html += `<th>${this.escapeHTML(col)}</th>`;
        });
        html += '</tr></thead><tbody>';

        // Rows
        table.rows.forEach(row => {
            html += '<tr>';
            table.columns.forEach(col => {
                const value = row[col] !== null ? String(row[col]) : '(null)';
                html += `<td>${this.escapeHTML(value)}</td>`;
            });
            html += '</tr>';
        });

        html += '</tbody></table>';
        return html;
    }

    /**
     * Execute a SQL query and validate against lesson requirements
     * @param {object} lesson - Current lesson
     */
    executeQuery(lesson) {
        const editor = document.getElementById('query-editor');
        const userQuery = editor.value.trim();

        if (!userQuery) {
            this.displayMessage('Please enter a SQL query', 'info');
            return;
        }

        // Execute the query
        const result = sqlExecutor.execute(userQuery);
        const resultsContainer = document.getElementById('results-container');

        if (!result.success) {
            // Error occurred
            resultsContainer.innerHTML = `
                <div class="results-label">Results</div>
                <div class="results-message error">
                    <span><i data-lucide="circle-x"></i> Error: ${result.error}</span>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        // Query executed successfully - validate against lesson challenge
        let isCorrect = false;
        let feedbackMessage = '';

        if (lesson.challenge && lesson.challenge.validate) {
            // Use lesson's custom validation
            const validation = lesson.challenge.validate(userQuery, result);
            isCorrect = validation.correct;
            feedbackMessage = validation.message;
        } else {
            // Basic validation - just show results
            isCorrect = true;
            feedbackMessage = 'Query executed successfully!';
        }

        // Display results
        if (result.columns && result.columns.length > 0) {
            let resultsHTML = `<div class="results-label">Results (${result.rows.length} row${result.rows.length !== 1 ? 's' : ''})</div>`;

            if (result.rows.length === 0) {
                resultsHTML += '<div class="empty-state">No rows returned</div>';
            } else {
                resultsHTML += '<div class="results-table">';
                resultsHTML += '<table><thead><tr>';
                result.columns.forEach(col => {
                    resultsHTML += `<th>${this.escapeHTML(col)}</th>`;
                });
                resultsHTML += '</tr></thead><tbody>';

                result.rows.forEach(row => {
                    resultsHTML += '<tr>';
                    result.columns.forEach(col => {
                        const value = row[col] !== null ? String(row[col]) : '(null)';
                        resultsHTML += `<td>${this.escapeHTML(value)}</td>`;
                    });
                    resultsHTML += '</tr>';
                });

                resultsHTML += '</tbody></table></div>';
            }

            resultsContainer.innerHTML = resultsHTML;
        } else if (result.changes !== undefined) {
            // For INSERT/UPDATE/DELETE
            const action = userQuery.toUpperCase().startsWith('INSERT') ? 'inserted' :
                          userQuery.toUpperCase().startsWith('UPDATE') ? 'updated' :
                          'deleted';
            resultsContainer.innerHTML = `
                <div class="results-label">Results</div>
                <div class="results-message success">
                    <span>${result.changes} row${result.changes !== 1 ? 's' : ''} ${action}</span>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = `
                <div class="results-label">Results</div>
                <div class="empty-state">Query executed</div>
            `;
        }

        // Show feedback message
        const messageDiv = document.createElement('div');
        messageDiv.className = `results-message ${isCorrect ? 'success' : 'info'}`;
        messageDiv.innerHTML = `<span>${isCorrect ? '✓ ' : 'ℹ '}${feedbackMessage}</span>`;
        resultsContainer.appendChild(messageDiv);

        // Enable next button if correct
        if (isCorrect) {
            this.nextBtn.disabled = false;
            this.completedLessons.add(this.currentLessonIndex);
        }
    }

    /**
     * Display a message to the user
     * @param {string} message - Message text
     * @param {string} type - 'success', 'error', or 'info'
     */
    displayMessage(message, type = 'info') {
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = `
            <div class="results-label">Results</div>
            <div class="results-message ${type}">
                <span>${message}</span>
            </div>
        `;
    }

    /**
     * Reset the current lesson
     */
    resetCurrentLesson() {
        const lesson = this.lessons[this.currentLessonIndex];
        
        // Clear editor
        const editor = document.getElementById('query-editor');
        if (editor) {
            editor.value = '';
            editor.focus();
        }

        // Clear results
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.innerHTML = '<div class="results-label">Results</div><div class="empty-state">Run a query to see results</div>';
        }

        // Reset database state if needed
        if (lesson.setupDatabase) {
            this.setupDatabaseForLesson(lesson);
        }

        // Disable next button
        this.nextBtn.disabled = true;
    }

    /**
     * Move to the next lesson
     */
    nextLesson() {
        if (this.currentLessonIndex < this.lessons.length - 1) {
            this.loadLesson(this.currentLessonIndex + 1);
        }
    }

    /**
     * Setup database for a lesson
     * @param {object} lesson - Lesson object
     */
    async setupDatabaseForLesson(lesson) {
        if (lesson.setupDatabase && typeof lesson.setupDatabase === 'function') {
            await lesson.setupDatabase();
        } else if (lesson.database && lesson.database.init) {
            // Execute init SQL statements
            for (const sql of lesson.database.init) {
                sqlExecutor.execute(sql);
            }
        }
    }

    /**
     * Update progress bar and text
     */
    updateProgress() {
        const total = this.lessons.length;
        const current = this.currentLessonIndex + 1;
        const percent = (current / total) * 100;

        this.progressBar.style.width = percent + '%';
        this.progressText.textContent = `${current} of ${total}`;

        // Update page title
        const lesson = this.lessons[this.currentLessonIndex];
        document.title = `${lesson.title} - SQL Fundamentals`;
    }

    /**
     * Setup theme toggle and persistence
     */
    setupTheme() {
        // Check system preference and localStorage
        const savedTheme = localStorage.getItem('sql-course-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            this.updateThemeIcon();
        }
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        this.updateThemeIcon();

        // Save preference
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('sql-course-theme', isDarkMode ? 'dark' : 'light');
    }

    /**
     * Update theme toggle icon
     */
    updateThemeIcon() {
        const isDark = document.body.classList.contains('dark-mode');
        const iconName = isDark ? 'sun' : 'moon';
        this.themeToggle.querySelector('.theme-icon').innerHTML = `<i data-lucide="${iconName}"></i>`;
        lucide.createIcons();
    }

    /**
     * Setup debug mode with collapsible menu
     */
    setupDebugMode() {
        this.debugMenu.classList.remove('hidden');
 
        // Create buttons for each lesson
        this.lessons.forEach((lesson, index) => {
            const btn = document.createElement('button');
            btn.textContent = `${index + 1}. ${lesson.title}`;
            btn.addEventListener('click', () => this.loadLesson(index));
            this.debugButtons.appendChild(btn);
        });
 
        // Add toggle functionality to debug header
        const debugHeader = document.getElementById('debug-header-toggle');
        debugHeader.addEventListener('click', () => {
            this.debugMenu.classList.toggle('collapsed');
            this.debugMenu.classList.toggle('expanded');
        });
    }

    /**
     * Escape HTML special characters
     * @param {string} text - Text to escape
     * @returns {string} - Escaped text
     */
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons(); // activate static icons (theme toggle, debug header)
    window.app = new SQLCourseApp();
});