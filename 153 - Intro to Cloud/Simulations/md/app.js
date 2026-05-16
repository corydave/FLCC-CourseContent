/* ================================================================
   app.js
   ----------------------------------------------------------------
   The main controller. It glues everything together:

     - Loads lessons (from window.lessons - populated by lesson files)
     - Renders the instruction pane (left side)
     - Renders the interactive pane (right side - editor + preview)
     - Handles "Check my work" submissions
     - Tracks progress and advances through lessons
     - Manages the dark-mode toggle and persists the choice
     - Builds the debug menu (jump to any lesson) when ?debug=true

   This is intentionally written in plain "class" style with lots
   of comments, so a learner who pokes at the source code can follow
   what's happening.
   ================================================================ */

class MarkdownCourse {

    constructor() {
        // The list of lessons is built by the individual lesson files
        // BEFORE this controller runs. If it's missing, fail loudly.
        if (!window.lessons || window.lessons.length === 0) {
            console.error('No lessons found! Check that all lesson scripts loaded.');
            return;
        }

        this.lessons = window.lessons;
        this.currentIndex = 0;

        // Friendly name used on the certificate
        this.courseName = 'Markdown Fundamentals: Part 1';

        // Cache DOM references we'll use a lot
        this.instructionPane = document.getElementById('instruction-pane');
        this.interactivePane = document.getElementById('interactive-pane');
        this.nextBtn = document.getElementById('btn-next');
        this.resetBtn = document.getElementById('btn-reset');
        this.themeToggle = document.getElementById('theme-toggle');
        this.progressBar = document.getElementById('progress-bar');
        this.progressText = document.getElementById('progress-text');

        // Wire up the always-present buttons
        this.nextBtn.addEventListener('click', () => this.next());
        this.resetBtn.addEventListener('click', () => this.loadLesson(this.currentIndex));
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Restore theme preference from a previous visit
        this.restoreTheme();

        // Debug mode: only shows up if ?debug=true is in the URL
        this.setupDebugMenu();

        // Kick off the first lesson
        this.loadLesson(0);
    }

    // -----------------------------------------------------------------
    // Theme handling
    // -----------------------------------------------------------------

    /**
     * Toggle between light and dark modes, and remember the choice.
     * The actual color values live in styles.css - we just flip a class.
     */
    toggleTheme() {
        const body = document.body;
        // Three states: light-mode, dark-mode, or "follow system"
        // We cycle: system -> dark -> light -> system
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('mdcourse-theme', 'light');
            this.updateThemeIcon('sun');
        } else if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            localStorage.setItem('mdcourse-theme', 'system');
            this.updateThemeIcon('monitor');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('mdcourse-theme', 'dark');
            this.updateThemeIcon('moon');
        }
    }

    /**
     * On page load, restore whatever theme the learner picked last time.
     */
    restoreTheme() {
        const saved = localStorage.getItem('mdcourse-theme');
        if (saved === 'dark') {
            document.body.classList.add('dark-mode');
            this.updateThemeIcon('moon');
        } else if (saved === 'light') {
            document.body.classList.add('light-mode');
            this.updateThemeIcon('sun');
        } else {
            this.updateThemeIcon('monitor');
        }
    }

    updateThemeIcon(iconName) {
        const span = this.themeToggle.querySelector('.theme-icon');
        if (span) {
            span.innerHTML = `<i data-lucide="${iconName}"></i>`;
            lucide.createIcons();
        }
    }

    // -----------------------------------------------------------------
    // Debug menu
    // -----------------------------------------------------------------

    /**
     * If the URL contains ?debug=true, show a floating panel with
     * a button for each lesson. Lets us jump around while testing.
     */
    setupDebugMenu() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('debug') !== 'true') return;

        const menu = document.getElementById('debug-menu');
        const buttons = document.getElementById('debug-buttons');

        this.lessons.forEach((lesson, i) => {
            const btn = document.createElement('button');
            btn.textContent = String(i + 1);
            btn.title = lesson.title;
            btn.addEventListener('click', () => this.loadLesson(i));
            buttons.appendChild(btn);
        });

        menu.classList.remove('hidden');
    }

    // -----------------------------------------------------------------
    // Lesson loading & rendering
    // -----------------------------------------------------------------

    /**
     * Load and display a specific lesson by index.
     * @param {number} index
     */
    loadLesson(index) {
        if (index < 0 || index >= this.lessons.length) {
            console.error(`Invalid lesson index: ${index}`);
            return;
        }

        this.currentIndex = index;
        const lesson = this.lessons[index];

        this.updateProgress();
        this.updateVideoPanel(lesson);
        this.renderInstruction(lesson);
        this.renderInteractive(lesson);

        // Next button starts disabled until they prove they got it right
        this.nextBtn.disabled = true;

        // On the last (certificate) lesson, rename the button so it doesn't
        // feel like there's another step after.
        if (index === this.lessons.length - 1) {
            this.nextBtn.classList.add('hidden');
        } else {
            this.nextBtn.classList.remove('hidden');
        }

        // Only show the Reset button when there's something to reset
        if (lesson.type === 'interactive') {
            this.resetBtn.classList.remove('hidden');
        } else {
            this.resetBtn.classList.add('hidden');
        }

        // Scroll to top so each lesson feels like a fresh page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Update the progress bar and "Lesson X of Y" text.
     */
    updateProgress() {
        const percent = ((this.currentIndex + 1) / this.lessons.length) * 100;
        this.progressBar.style.width = `${percent}%`;
        this.progressText.textContent =
            `Lesson ${this.currentIndex + 1} of ${this.lessons.length} - ${this.lessons[this.currentIndex].title}`;
    }

    updateVideoPanel(lesson) {
        const panel   = document.getElementById('video-panel');
        if (!panel) return;
        const titleEl = panel.querySelector('.video-panel-title');
        const iframe  = panel.querySelector('iframe');
        const videoId = lesson.videoId || 'dQw4w9WgXcQ';
        if (titleEl) titleEl.textContent = `VIDEO - ${lesson.title}`;
        if (iframe) {
            iframe.dataset.src = `https://www.youtube.com/embed/${videoId}`;
            if (panel.dataset.open === 'true') iframe.src = iframe.dataset.src;
        }
    }

    /**
     * Fill the left-side instruction pane with the lesson's teaching content.
     * @param {object} lesson
     */
    renderInstruction(lesson) {
        this.instructionPane.innerHTML = '';

        const title = document.createElement('h2');
        title.textContent = lesson.title;
        this.instructionPane.appendChild(title);

        if (lesson.description) {
            const desc = document.createElement('div');
            // Lesson HTML is authored by us, so trusting innerHTML here is fine.
            desc.innerHTML = lesson.description;
            this.instructionPane.appendChild(desc);
        }
        lucide.createIcons();
    }

    /**
     * Fill the right-side interactive pane with the editor, preview, and
     * (where applicable) a check button.
     * @param {object} lesson
     */
    renderInteractive(lesson) {
        const container = this.interactivePane.querySelector('.interactive-content');
        container.innerHTML = '';

        // Certificate lessons get their own special UI
        if (lesson.type === 'certificate') {
            this.renderCertificate(container, lesson);
            return;
        }

        // -------- Editor --------
        const editorLabel = document.createElement('div');
        editorLabel.className = 'editor-label';
        editorLabel.textContent = 'Your Markdown';
        container.appendChild(editorLabel);

        const editor = document.createElement('textarea');
        editor.className = 'markdown-editor';
        editor.spellcheck = false;
        editor.setAttribute('aria-label', 'Markdown editor');
        // Pre-fill with starter text if the lesson provides any
        editor.value = lesson.starterText || '';
        container.appendChild(editor);

        // -------- Preview --------
        const previewLabel = document.createElement('div');
        previewLabel.className = 'editor-label';
        previewLabel.textContent = 'Live Preview';
        container.appendChild(previewLabel);

        const preview = document.createElement('div');
        preview.className = 'preview-box';
        preview.setAttribute('aria-live', 'polite');
        container.appendChild(preview);

        // -------- Check button --------
        const checkBtn = document.createElement('button');
        checkBtn.className = 'check-btn';
        checkBtn.textContent = 'Check My Work';
        container.appendChild(checkBtn);

        // -------- Feedback area --------
        const feedback = document.createElement('div');
        feedback.className = 'feedback hidden';
        feedback.setAttribute('role', 'status');
        container.appendChild(feedback);

        // -------- Wire up live preview --------
        // Render whenever the learner types, so they see results immediately.
        const updatePreview = () => {
            preview.innerHTML = window.markdownExecutor.render(editor.value);
        };
        editor.addEventListener('input', updatePreview);
        updatePreview();

        // -------- Wire up the check button --------
        checkBtn.addEventListener('click', () => {
            this.checkAnswer(lesson, editor, feedback);
        });

        // Also allow Ctrl/Cmd+Enter as a keyboard shortcut for checking
        editor.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.checkAnswer(lesson, editor, feedback);
            }
        });
    }

    /**
     * The check button's handler: compare the learner's markdown to the
     * expected answer, update the feedback area, and unlock "Next" on success.
     */
    checkAnswer(lesson, editor, feedback) {
        const submitted = editor.value;
        const passed = window.markdownExecutor.compare(submitted, lesson.expected);

        feedback.classList.remove('hidden', 'success', 'error', 'hint');

        if (passed) {
            feedback.classList.add('success');
            feedback.textContent = lesson.successMessage || '✓ Perfect! Click "Next Step" to continue.';
            this.nextBtn.disabled = false;
        } else {
            feedback.classList.add('error');
            feedback.textContent = window.markdownExecutor.diagnose(
                submitted,
                lesson.expected,
                lesson.hints
            );
        }
    }

    // -----------------------------------------------------------------
    // Certificate lesson - special UI
    // -----------------------------------------------------------------

    renderCertificate(container, lesson) {
        // A simple form: name input + "Download Certificate" button.
        const nameLabel = document.createElement('div');
        nameLabel.className = 'editor-label';
        nameLabel.textContent = 'Your Name';
        container.appendChild(nameLabel);

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'markdown-editor';
        nameInput.style.minHeight = 'auto';
        nameInput.style.height = '3rem';
        nameInput.placeholder = 'How should we address you?';
        nameInput.setAttribute('aria-label', 'Your name for the certificate');
        container.appendChild(nameInput);

        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'check-btn';
        downloadBtn.innerHTML = '<i data-lucide="graduation-cap"></i> Download Certificate (PDF)';
        lucide.createIcons();
        downloadBtn.addEventListener('click', () => {
            window.certificateGenerator.generate(nameInput.value, this.courseName);
        });
        container.appendChild(downloadBtn);

        const note = document.createElement('div');
        note.className = 'feedback hint';
        note.style.marginTop = '1rem';
        note.textContent = 'The PDF is generated entirely in your browser - nothing is uploaded anywhere.';
        container.appendChild(note);

        // For the certificate lesson, "Next" doesn't apply - they're done.
        this.nextBtn.classList.add('hidden');
    }

    // -----------------------------------------------------------------
    // Navigation
    // -----------------------------------------------------------------

    next() {
        if (this.currentIndex + 1 < this.lessons.length) {
            this.loadLesson(this.currentIndex + 1);
        }
    }
}

// Boot up once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MarkdownCourse();
});
