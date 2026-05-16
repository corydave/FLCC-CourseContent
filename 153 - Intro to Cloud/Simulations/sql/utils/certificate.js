/**
 * Certificate Generator
 * Creates a beautiful, downloadable PDF certificate of completion
 * Uses jsPDF library for PDF generation
 */

class CertificateGenerator {
    /**
     * Generate and download a certificate
     * @param {string} studentName - Name of the student
     * @param {string} courseName - Name of the course
     * @param {Date} completionDate - Date of completion
     */
    static generateCertificate(studentName = "Student", courseName = "SQL Fundamentals: Part 1", completionDate = new Date()) {
        const { jsPDF } = window.jspdf;
        
        // Create a new PDF document
        // Using 'mm' as unit, Letter size
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'letter'
        });

        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        // ========== Background & Border ==========
        // Decorative border
        pdf.setDrawColor(37, 99, 235); // Blue color
        pdf.setLineWidth(2);
        pdf.rect(10, 10, width - 20, height - 20);

        // Subtle inner border
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.5);
        pdf.rect(14, 14, width - 28, height - 28);

        // Decorative elements (corner circles)
        pdf.setFillColor(37, 99, 235);
        pdf.circle(15, 15, 2, 'F');
        pdf.circle(width - 15, 15, 2, 'F');
        pdf.circle(15, height - 15, 2, 'F');
        pdf.circle(width - 15, height - 15, 2, 'F');

        // ========== Content ==========
        
        // Title
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(37, 99, 235);
        pdf.text('CERTIFICATE OF COMPLETION', width / 2, 35, { align: 'center' });

        // "This certifies that..." text
        pdf.setFont('Helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(80, 80, 80);
        pdf.text('This certifies that', width / 2, 50, { align: 'center' });

        // Student name (large, prominent)
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(28);
        pdf.setTextColor(37, 99, 235);
        
        // Add underline for name
        const nameWidth = pdf.getTextWidth(studentName);
        pdf.text(studentName, width / 2, 75, { align: 'center' });
        pdf.setDrawColor(37, 99, 235);
        pdf.setLineWidth(1);
        const nameX = (width - nameWidth) / 2;
        pdf.line(nameX - 5, 78, nameX + nameWidth + 5, 78);

        // Completion text
        pdf.setFont('Helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(80, 80, 80);
        pdf.text('has successfully completed the course', width / 2, 92, { align: 'center' });

        // Course name (emphasized)
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(13);
        pdf.setTextColor(37, 99, 235);
        
        // Wrap course name if needed
        const courseLines = pdf.splitTextToSize(courseName, width - 60);
        pdf.text(courseLines, width / 2, 105, { align: 'center' });

        // Completion date
        pdf.setFont('Helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        const formattedDate = this.formatDate(completionDate);
        pdf.text(`Completed on: ${formattedDate}`, width / 2, height - 50, { align: 'center' });

        // Signature area (just for show/printing)
        pdf.setDrawColor(100, 100, 100);
        pdf.setLineWidth(0.5);
        
        // Left signature
        pdf.line(20, height - 35, 50, height - 35);
        pdf.setFont('Helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(100, 100, 100);
        pdf.text('Instructor', 35, height - 30, { align: 'center' });

        // Right signature (Anthropic seal concept)
        pdf.line(width - 50, height - 35, width - 20, height - 35);
        pdf.text('SQL Course', width - 35, height - 30, { align: 'center' });

        // Footer seal/badge
        pdf.setFillColor(22, 163, 74); // Green
        pdf.circle(width / 2, height - 15, 4, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(8);
        pdf.text('✓', width / 2, height - 13, { align: 'center' });

        // Reset text color
        pdf.setTextColor(0, 0, 0);

        // ========== Generate filename and download ==========
        const filename = `SQL_Certificate_${studentName.replace(/\s+/g, '_')}_${this.formatDate(completionDate, 'filename')}.pdf`;
        
        // Download the PDF
        pdf.save(filename);

        return filename;
    }

    /**
     * Format a date for display
     * @param {Date} date - The date to format
     * @param {string} style - 'display' (default) or 'filename'
     * @returns {string} - Formatted date
     */
    static formatDate(date, style = 'display') {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        if (style === 'filename') {
            return `${year}-${String(date.getMonth() + 1).padStart(2, '0')}-${day}`;
        }

        return `${month} ${day}, ${year}`;
    }
}
