/* ================================================================
   certificate.js
   ----------------------------------------------------------------
   Generates a PDF "certificate of completion" using jsPDF.
   This file is intentionally written to be DROP-IN COMPATIBLE with
   the SQL course's certificate.js - just change the courseName.

   Exposes: window.certificateGenerator.generate(name, courseName)
   ================================================================ */

window.certificateGenerator = (function () {

    /**
     * Get today's date as a nicely formatted string.
     * Example output: "May 15, 2026"
     * @returns {string}
     */
    function formattedDate() {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const now = new Date();
        return `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    }

    /**
     * Build and trigger download of a PDF certificate.
     *
     * @param {string} name - The learner's name (whatever they typed)
     * @param {string} courseName - e.g. "Markdown Fundamentals: Part 1"
     */
    function generate(name, courseName) {
        // jsPDF is loaded from CDN and lives on window.jspdf.jsPDF
        const { jsPDF } = window.jspdf;

        // Landscape orientation, US-letter size
        // (Letter, not A4, so it prints cleanly on common home printers)
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'letter'
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Decorative outer border
        doc.setDrawColor(37, 99, 235);  // Same blue as the app
        doc.setLineWidth(4);
        doc.rect(30, 30, pageWidth - 60, pageHeight - 60);

        // Thinner inner border for that "official document" feel
        doc.setLineWidth(1);
        doc.rect(45, 45, pageWidth - 90, pageHeight - 90);

        // Main title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(36);
        doc.setTextColor(31, 41, 55);
        doc.text('Certificate of Completion', pageWidth / 2, 140, { align: 'center' });

        // "This certifies that..." line
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(16);
        doc.setTextColor(107, 114, 128);
        doc.text('This certifies that', pageWidth / 2, 200, { align: 'center' });

        // The learner's name - the centerpiece of the certificate
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(32);
        doc.setTextColor(37, 99, 235);
        // Defensive: if no name was given, use a friendly placeholder
        const displayName = (name && name.trim()) ? name.trim() : 'A Curious Learner';
        doc.text(displayName, pageWidth / 2, 250, { align: 'center' });

        // Course completion sentence
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(16);
        doc.setTextColor(107, 114, 128);
        doc.text('has successfully completed', pageWidth / 2, 295, { align: 'center' });

        // Course name
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(31, 41, 55);
        doc.text(courseName, pageWidth / 2, 335, { align: 'center' });

        // Date at the bottom
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.setTextColor(107, 114, 128);
        doc.text(formattedDate(), pageWidth / 2, pageHeight - 100, { align: 'center' });

        // A small "seal" - just a colored circle with a checkmark style mark.
        // Decorative only, but it sells the "real certificate" vibe.
        const sealX = pageWidth - 130;
        const sealY = pageHeight - 130;
        doc.setFillColor(37, 99, 235);
        doc.circle(sealX, sealY, 35, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.text('★', sealX, sealY + 10, { align: 'center' });

        // Trigger the download with a sensible filename
        const safeName = displayName.replace(/[^a-z0-9]/gi, '_');
        doc.save(`markdown-certificate-${safeName}.pdf`);
    }

    return {
        generate: generate
    };

})();
