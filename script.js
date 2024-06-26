document.addEventListener("DOMContentLoaded", function() {
    var collapsibleButtons = document.querySelectorAll(".collapsible-btn");
    var sidebar = document.getElementById("sidebar");
    var listIcon = document.getElementById("list-icon");
    var sidebarWrapper = document.querySelector(".sidebar-wrapper");
    var mainContent = document.getElementById("main-content");

    // Function to handle collapsible content display
    collapsibleButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
            // Adjust the height of the scrollable table after collapsing
            adjustTableHeight();
        });
    });

    // Function to handle sidebar toggle
    listIcon.addEventListener("click", function() {
        if (sidebar.classList.contains("collapsed")) {
            sidebar.classList.remove("collapsed");
            sidebarWrapper.classList.remove("collapsed");
            mainContent.classList.add("expanded");
            listIcon.src = 'assets/sidebar-icon-active.png'; // Change icon when sidebar is open
        } else {
            sidebar.classList.add("collapsed");
            sidebarWrapper.classList.add("collapsed");
            mainContent.classList.remove("expanded");
            listIcon.src = 'assets/sidebar-icon.png'; // Change icon when sidebar is closed
        }
        // Force a redraw of the table headers to fix the border issue
        forceRedraw(mainContent);
        // Adjust the height of the scrollable table after collapsing
        adjustTableHeight();
    });

    // Function to adjust the height of the scrollable table
    function adjustTableHeight() {
        var tableContainer = document.querySelector('.table-container');
        var scrollableTable = document.getElementById('scrollableTable');
        if (tableContainer && scrollableTable) {
            scrollableTable.style.height = `calc(100% - ${tableContainer.offsetTop}px)`;
        }
    }

    // Drag and Drop for Table Columns
    let dragSrcEl = null;
    let dragIndex = null;
    let dropIndex = null;

    function handleDragStart(e) {
        dragSrcEl = this;
        dragIndex = this.cellIndex;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.innerHTML);
        this.classList.add('dragging');
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary for allowing drops
        }
        e.dataTransfer.dropEffect = 'move';
        let targetRect = this.getBoundingClientRect();
        let offset = e.clientX - targetRect.left;

        if (offset < targetRect.width / 2) {
            dropIndex = this.cellIndex;
            if (dragIndex > dropIndex) {
                addDragIndicator(this, 'left');
            } else {
                removeDragIndicators();
            }
        } else {
            dropIndex = this.cellIndex + 1;
            if (dragIndex < dropIndex - 1) {
                addDragIndicator(this, 'right');
            } else {
                removeDragIndicators();
            }
        }

        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
        removeDragIndicators();
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (dragSrcEl !== this && dragIndex !== null && dropIndex !== null) {
            let table = document.querySelector("#scrollableTable table");
            for (let row of table.rows) {
                if (row.cells.length > 1) {
                    let draggedCell = row.cells[dragIndex];
                    if (dropIndex >= row.cells.length) {
                        row.appendChild(draggedCell);
                    } else {
                        let referenceCell = row.cells[dropIndex];
                        row.insertBefore(draggedCell, referenceCell);
                    }
                }
            }
        }
        removeDragIndicators();
        return false;
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        let cols = document.querySelectorAll('#scrollableTable th');
        cols.forEach(function(col) {
            col.classList.remove('over');
        });
        removeDragIndicators();
        dragSrcEl = null;
        dragIndex = null;
        dropIndex = null;
    }

    function addDragIndicator(column, position) {
        removeDragIndicators();

        let indicator = document.createElement('div');
        indicator.classList.add('drag-indicator');
        if (position === 'left') {
            indicator.style.left = '0';
        } else if ( position === 'right') {
            indicator.style.right = '0';
        }
        column.appendChild(indicator);

        // Add event listeners to prevent default drag behavior
        indicator.addEventListener('dragover', function(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'move';
            return false;
        }, false);

        indicator.addEventListener('dragenter', function(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            return false;
        }, false);
    }

    function removeDragIndicators() {
        let indicators = document.querySelectorAll('.drag-indicator');
        indicators.forEach(function(indicator) {
            indicator.remove();
        });
    }

    let cols = document.querySelectorAll('#scrollableTable th');
    cols.forEach(function(col) {
        col.setAttribute('draggable', true);
        col.addEventListener('dragstart', handleDragStart, false);
        col.addEventListener('dragenter', handleDragEnter, false);
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragleave', handleDragLeave, false);
        col.addEventListener('drop', handleDrop, false);
        col.addEventListener('dragend', handleDragEnd, false);
    });

    // Function to force a redraw of the table headers
    function forceRedraw(element) {
        var display = element.style.display;
        element.style.display = 'none';
        element.offsetHeight; // Force reflow
        element.style.display = display;
    }

    // Initial adjustment of the table height
    adjustTableHeight();
});
