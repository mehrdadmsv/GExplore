// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function() {
    // Elements related to the sidebar and main content
    var iconContainers = document.querySelectorAll(".icon-container");
    var sidebar = document.getElementById("sidebar");
    var mainContent = document.getElementById("main-content");
    var activeLine = document.getElementById("active-line");
    var sidebarContents = document.querySelectorAll(".sidebar-content");

    // Copy icon tooltip handling
    var copyIcon = document.getElementById("copy-icon");
    var tooltip = copyIcon.nextElementSibling;
    var tooltipTimeout;

    // Show tooltip on mouse enter
    copyIcon.addEventListener("mouseenter", function() {
        clearTimeout(tooltipTimeout);
        tooltip.textContent = "Copy List";
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";

        tooltipTimeout = setTimeout(function() {
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = "0";
        }, 3000);
    });

    // Hide tooltip on mouse leave
    copyIcon.addEventListener("mouseleave", function() {
        clearTimeout(tooltipTimeout);
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = "0";
    });

    // Copy list content to clipboard on click
    copyIcon.addEventListener("click", function(e) {
        e.stopPropagation();
        var listInfo = document.querySelector(".list-info p").textContent;

        navigator.clipboard.writeText(listInfo).then(function() {
            console.log("Text copied to clipboard");
            tooltip.textContent = "List Copied";
            tooltip.style.visibility = "visible";
            tooltip.style.opacity = "1";
            setTimeout(function() {
                tooltip.style.visibility = "hidden";
                tooltip.style.opacity = "0";
                tooltip.textContent = "Copy List";
            }, 3000);
        }).catch(function(err) {
            console.error("Failed to copy text: ", err);
        });
    });

    // Update the position of the active line indicator
    function updateActiveLinePosition() {
        var activeIcon = document.querySelector(".icon-container.active");
        if (activeIcon) {
            var iconRect = activeIcon.getBoundingClientRect();
            var sidebarRect = document.getElementById("sidebar-icon-container").getBoundingClientRect();
            activeLine.style.top = (iconRect.top - sidebarRect.top) + "px";
        }
    }

    // Event listeners for icon container interactions
    iconContainers.forEach(function(iconContainer) {
        // Handle icon click events
        iconContainer.addEventListener("click", function() {
            var targetId = this.getAttribute("data-target");
            var isSidebarOpen = !sidebar.classList.contains("collapsed");

            // Update active icon state
            iconContainers.forEach(function(container) {
                container.classList.remove("active");
            });
            this.classList.add("active");

            updateActiveLinePosition();

            // Toggle sidebar visibility
            if (isSidebarOpen && sidebar.querySelector(`#${targetId}`).classList.contains("active")) {
                sidebar.classList.remove("expanded");
                sidebar.classList.add("collapsed");
                mainContent.classList.add("shifted");
                activeLine.style.opacity = 0;
            } else {
                sidebarContents.forEach(function(content) {
                    content.classList.remove("active");
                    if (content.id === targetId) {
                        content.classList.add("active");
                    }
                });
                if (sidebar.classList.contains("collapsed")) {
                    sidebar.classList.remove("collapsed");
                    sidebar.classList.add("expanded");
                    mainContent.classList.remove("shifted");
                }
                activeLine.style.opacity = 1;
            }
            adjustTableHeight();
        });

        // Show tooltip on icon hover
        iconContainer.addEventListener("mouseenter", function() {
            var tooltip = this.querySelector('.tooltip-text');
            if (tooltip) {
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
                
                setTimeout(function() {
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.opacity = '0';
                }, 3000);
            }
        });

        // Hide tooltip when mouse leaves the icon
        iconContainer.addEventListener("mouseleave", function() {
            var tooltip = this.querySelector('.tooltip-text');
            if (tooltip) {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            }
        });
    });

    // Adjust the height of the table container dynamically
    function adjustTableHeight() {
        var tableContainer = document.querySelector('.table-container');
        var scrollableTable = document.getElementById('scrollableTable');
        if (tableContainer && scrollableTable) {
            scrollableTable.style.height = `calc(100% - ${tableContainer.offsetTop}px)`;
        }
    }

    updateActiveLinePosition();
    window.addEventListener("resize", updateActiveLinePosition);

    // Variables for drag-and-drop functionality
    let dragSrcEl = null;
    let dragIndex = null;
    let dropIndex = null;

    // Handle the start of a drag event
    function handleDragStart(e) {
        dragSrcEl = this;
        dragIndex = this.cellIndex;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.innerHTML);
        this.classList.add('dragging');
    }

    // Handle dragging over a droppable area
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
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

    // Handle the entering of a droppable area
    function handleDragEnter(e) {
        this.classList.add('over');
    }

    // Handle the leaving of a droppable area
    function handleDragLeave(e) {
        this.classList.remove('over');
        removeDragIndicators();
    }

    // Handle the drop event
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

    // Handle the end of a drag event
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

    // Add visual indicators for drag positions
    function addDragIndicator(column, position) {
        removeDragIndicators();

        let indicator = document.createElement('div');
        indicator.classList.add('drag-indicator');
        if (position === 'left') {
            indicator.style.left = '0';
        } else if (position === 'right') {
            indicator.style.right = '0';
        }
        column.appendChild(indicator);

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

    // Remove all drag indicators from the DOM
    function removeDragIndicators() {
        let indicators = document.querySelectorAll('.drag-indicator');
        indicators.forEach(function(indicator) {
            indicator.remove();
        });
    }

    // Add drag-and-drop event listeners to table columns
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

    adjustTableHeight();

    // Column visibility handling
    var columnCheckboxes = document.querySelectorAll('.display-option-form input[type="checkbox"]');
    var updateDisplayButton = document.querySelector('.update-display-btn');

    // Toggle visibility of table columns based on checkbox state
    function toggleColumnVisibility() {
        var visibilityMap = {};

        columnCheckboxes.forEach(function(checkbox) {
            var columnClasses = checkbox.getAttribute('data-column') || checkbox.getAttribute('data-columns');
            if (columnClasses) {
                var columns = columnClasses.split(',');
                columns.forEach(function(columnClass) {
                    if (visibilityMap[columnClass] === undefined) {
                        visibilityMap[columnClass] = false; // Default to hidden
                    }
                    if (checkbox.checked) {
                        visibilityMap[columnClass] = true; // Mark as visible if any checkbox requires it
                    }
                });
            }
        });

        Object.keys(visibilityMap).forEach(function(columnClass) {
            var columnElements = document.querySelectorAll('.' + columnClass.trim());
            columnElements.forEach(function(column) {
                column.style.display = visibilityMap[columnClass] ? '' : 'none';
            });
        });
    }

    updateDisplayButton.addEventListener('click', toggleColumnVisibility);
    toggleColumnVisibility();

    // Export functions

    // Get visible table data for export
    function getVisibleTableData() {
        var table = document.querySelector("#scrollableTable table");
        var headers = Array.from(table.querySelectorAll('thead th')).filter(th => th.style.display !== 'none' && th.className !== 'protein-domains-column');
        var rows = Array.from(table.querySelectorAll('tbody tr'));
        var data = rows.map(row => {
            var cells = Array.from(row.querySelectorAll('td')).filter(td => td.style.display !== 'none' && td.className !== 'protein-domains-column');
            var rowData = {};
            cells.forEach((cell, index) => {
                rowData[headers[index].textContent.trim()] = cell.textContent.trim();
            });
            return rowData;
        });
        return { headers: headers.map(header => header.textContent.trim()), data: data };
    }

    // Export data as JSON
    function exportAsJSON({ headers, data }) {
        var json = JSON.stringify(data, null, 2);
        downloadFile('data.json', json, 'application/json');
    }

    // Export data as XML
    function exportAsXML({ headers, data }) {
        var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<items>\n';
        data.forEach(item => {
            xml += `  <item>\n`;
            headers.forEach(header => {
                xml += `    <${header.replace(/ /g, '_')}>${item[header]}</${header.replace(/ /g, '_')}>\n`;
            });
            xml += `  </item>\n`;
        });
        xml += '</items>';
        downloadFile('data.xml', xml, 'application/xml');
    }

    // Export data as CSV
    function exportAsCSV({ headers, data }) {
        var csv = headers.join(',') + '\n';
        csv += data.map(row => headers.map(header => row[header]).join(',')).join('\n');
        downloadFile('data.csv', csv, 'text/csv');
    }

    // Export data as TXT
    function exportAsTXT({ headers, data }) {
        var txt = headers.join('\t') + '\n';
        txt += data.map(row => headers.map(header => row[header]).join('\t')).join('\n');
        downloadFile('data.txt', txt, 'text/plain');
    }

    // Export data as SQL
    function exportAsSQL({ headers, data }) {
        var sql = 'CREATE TABLE IF NOT EXISTS data_table (' + headers.join(' TEXT, ') + ' TEXT);\n';
        data.forEach(item => {
            sql += `INSERT INTO data_table (${headers.join(', ')}) VALUES ('${headers.map(header => item[header]).join("', '")}');\n`;
        });
        downloadFile('data.sql', sql, 'text/sql');
    }

    // Helper function to download files
    function downloadFile(filename, content, mimeType) {
        var blob = new Blob([content], { type: mimeType });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Event listener for the export button
    var exportButton = document.getElementById("export-button");
    exportButton.addEventListener("click", function() {
        var selectedFormat = document.querySelector('input[name="export-format"]:checked').value;
        var tableData = getVisibleTableData();
        
        // Export data based on selected format
        switch (selectedFormat) {
            case 'json':
                exportAsJSON(tableData);
                break;
            case 'xml':
                exportAsXML(tableData);
                break;
            case 'csv':
                exportAsCSV(tableData);
                break;
            case 'txt':
                exportAsTXT(tableData);
                break;
            case 'sql':
                exportAsSQL(tableData);
                break;
            default:
                alert('Please select a format to export.');
        }
    });
});
