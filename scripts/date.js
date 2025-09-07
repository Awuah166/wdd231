// Populate the current year and a readable "Last Modified" timestamp.
// Runs on DOMContentLoaded so it works when loaded with `defer` or normally.
document.addEventListener('DOMContentLoaded', () => {
    // Fill current year if an element with id="year" exists
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Fill last modified if an element with id="lastModified" exists
    const lastEl = document.getElementById('lastModified');
    if (lastEl) {
        const raw = document.lastModified;

        // Try to parse the browser-provided string into a Date.
        // Some browsers return an empty string or a locale string that Date() can parse.
        const parsed = new Date(raw);
        let formatted;

        if (raw && !Number.isNaN(parsed.getTime())) {
            // Format in a user-friendly, locale-aware way with date and time.
            formatted = parsed.toLocaleString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } else if (raw) {
            // If parsing failed, fall back to showing the raw string.
            formatted = raw;
        } else {
            formatted = 'Unknown';
        }

        lastEl.textContent = formatted;
    }
});
