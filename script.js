document.addEventListener('DOMContentLoaded', function () {
    var lockButton = document.getElementById('lockButton');
    var table = document.getElementById('scrollableTable');

    if (!lockButton || !table) {
        console.error('Script setup error: Elements not found.');
        return; // Stop further execution if elements are not found
    }

    lockButton.addEventListener('click', function() {
        console.log('Button clicked.');
        // Toggle between locked and unlocked
        if (table.classList.contains('scroll-locked')) {
            table.classList.remove('scroll-locked');
            table.classList.add('scroll-unlocked');
            console.log('Table unlocked, scrolling enabled.');
        } else {
            table.classList.remove('scroll-unlocked');
            table.classList.add('scroll-locked');
            console.log('Table locked, scrolling disabled.');
        }
    });

    // Add column dragging functionality
    const tableHeaders = table.querySelectorAll('th');
    let draggedHeader = null;
    let draggedIndex = null;

    tableHeaders.forEach((header, index) => {
        header.draggable = true;

        header.addEventListener('dragstart', (e) => {
            draggedHeader = header;
            draggedIndex = index;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', header.outerHTML);
            header.classList.add('dragging');
            highlightColumn(index, true);
        });

        header.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            const overHeader = e.target.closest('th');
            if (overHeader && overHeader !== draggedHeader) {
                const overIndex = Array.from(tableHeaders).indexOf(overHeader);
                if (draggedIndex !== overIndex) {
                    swapColumns(table, draggedIndex, overIndex);
                    draggedIndex = overIndex;
                }
            }
        });

        header.addEventListener('drop', (e) => {
            e.stopPropagation();
            e.preventDefault();
            resetDrag();
        });

        header.addEventListener('dragend', resetDrag);
    });

    function swapColumns(table, fromIndex, toIndex) {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.children;
            const fromCell = cells[fromIndex];
            const toCell = cells[toIndex];
            if (fromIndex > toIndex) {
                row.insertBefore(fromCell, toCell);
            } else {
                row.insertBefore(toCell, fromCell);
            }
        });
    }

    function highlightColumn(index, isDragging) {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            const cell = row.children[index];
            if (isDragging) {
                cell.classList.add('drag-highlight');
            } else {
                cell.classList.remove('drag-highlight');
            }
        });
        table.classList.toggle('drag-dim', isDragging);
    }

    function resetDrag() {
        if (draggedHeader) {
            draggedHeader.classList.remove('dragging');
            highlightColumn(draggedIndex, false);
            draggedHeader = null;
        }
    }
});
