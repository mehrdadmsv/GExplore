document.addEventListener('DOMContentLoaded', () => {
    // Get the table element
    const table = document.getElementById('results');
    const headers = table.querySelectorAll('th');

    let currentSortIndex = null;
    let isAscending = true;

    headers.forEach((header, index) => {
        // Add click event listener to each sortable table header
        if (header.classList.contains('sortable')) { // Ensure it's only for sortable columns
            header.addEventListener('click', () => {
                if (currentSortIndex === index) {
                    isAscending = !isAscending; // Toggle sorting direction
                } else {
                    isAscending = true; // Default to ascending for a new column
                }

                currentSortIndex = index;
                sortTableByColumn(table, index, isAscending);
                updateHeaderArrow(headers, index, isAscending);
            });
        }
    });

    // Function to sort the table by column
    function sortTableByColumn(table, columnIndex, ascending = true) {
        const tbody = table.querySelector('tbody');
        const rowsArray = Array.from(tbody.querySelectorAll('tr'));
        const sortOrder = ascending ? 1 : -1;

        rowsArray.sort((a, b) => {
            const aText = a.cells[columnIndex].textContent.trim();
            const bText = b.cells[columnIndex].textContent.trim();

            // Determine if this is one of the numeric columns
            const isNumericColumn = ['gpos_col', 'ppos_col', 'protsize_col'].some(className =>
                headers[columnIndex].classList.contains(className)
            );

            // Handle sorting based on type
            if (isNumericColumn) {
                // Numeric comparison
                const aValue = parseFloat(aText.replace(/,/g, '')) || 0;
                const bValue = parseFloat(bText.replace(/,/g, '')) || 0;
                return sortOrder * (aValue - bValue);
            } else {
                // Text comparison (case-insensitive)
                const aValue = aText.toLowerCase();
                const bValue = bText.toLowerCase();
                return sortOrder * aValue.localeCompare(bValue);
            }
        });

        // Clear existing rows and append sorted rows
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        rowsArray.forEach(row => tbody.appendChild(row));
    }

    // Function to update arrow indicators in table headers
    function updateHeaderArrow(headers, columnIndex, ascending) {
        headers.forEach((header, index) => {
            // Remove previous sorted classes
            header.classList.remove('sorted-asc', 'sorted-desc');

            // Add sorted class depending on the sorting direction
            if (index === columnIndex) {
                header.classList.add(ascending ? 'sorted-asc' : 'sorted-desc');
            }
        });
    }
});
