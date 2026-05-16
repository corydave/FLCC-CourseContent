/**
 * Lesson 11: Certificate
 * Course completion and certificate generation
 */

const lesson11Certificate = {
    id: 'certificate',
    title: 'Certificate of Completion',
    type: 'certificate',
    description: `
        <p>You've completed <strong>SQL Fundamentals: Part 1</strong>! <i data-lucide="party-popper"></i></p>
        <p>You now understand:</p>
        <ul style="text-align: left;">
            <li>✓ SELECT & FROM (retrieving data)</li>
            <li>✓ WHERE (filtering)</li>
            <li>✓ AND & OR (combining conditions)</li>
            <li>✓ ORDER BY & LIMIT (sorting and limiting)</li>
            <li>✓ Aggregate Functions (summarizing)</li>
            <li>✓ JOIN (connecting tables)</li>
            <li>✓ CREATE TABLE (defining structure)</li>
            <li>✓ INSERT (adding data)</li>
            <li>✓ UPDATE (modifying data)</li>
            <li>✓ DELETE (removing data)</li>
        </ul>
        <p style="margin-top: 1rem;">Download your certificate below. Ready for Part 2?</p>
    `,
    setupDatabase: async function() {}
};

// Register lesson
if (typeof window.LESSONS === 'undefined') {
    window.LESSONS = [];
}
window.LESSONS.push(lesson11Certificate);
