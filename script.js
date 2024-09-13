document.addEventListener("DOMContentLoaded", function() {
    var iconContainers = document.querySelectorAll(".icon-container");
    var sidebar = document.getElementById("sidebar");
    var mainContent = document.getElementById("main-content");
    var activeLine = document.getElementById("active-line");
    var sidebarContents = document.querySelectorAll(".sidebar-content");

    // Set the default active content to "Search Results" on page load
    var defaultActiveContent = document.querySelector('#database-content');
    var defaultActiveIcon = document.querySelector('.icon-container[data-target="database-content"]');

    if (defaultActiveContent && defaultActiveIcon) {
        // Add active class to "Search Results" content and icon
        sidebarContents.forEach(function(content) {
            content.classList.remove('active');
        });
        defaultActiveContent.classList.add('active');

        iconContainers.forEach(function(container) {
            container.classList.remove('active');
        });
        defaultActiveIcon.classList.add('active');

        // Update the vertical line position next to the "Search Results" icon
        updateActiveLinePosition();
    }

    // Store active sidebar content before form submission and restore it afterward
    var form = document.getElementById('ge_display_form');
    var updateButton = document.querySelector('.update-display-btn');
    var activeSidebarContent;

    if (form && updateButton) {
        updateButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Save the currently active sidebar content before the update
            activeSidebarContent = document.querySelector('.sidebar-content.active');

            // Simulate the table update or make the necessary update logic here
            setTimeout(function() {
                // Simulate form submission or refresh the table data
                console.log("Table is updating...");

                // Restore the active sidebar content (Display Options) after the update
                if (activeSidebarContent) {
                    sidebarContents.forEach(function(content) {
                        content.classList.remove('active');
                    });
                    activeSidebarContent.classList.add('active');

                    iconContainers.forEach(function(container) {
                        container.classList.remove('active');
                    });
                    document.querySelector('.icon-container[data-target="' + activeSidebarContent.id + '"]').classList.add('active');

                    // Update the vertical line position again
                    updateActiveLinePosition();
                }

                // Optionally, submit the form after the table update logic
                form.submit();
            }, 1000); // Simulating delay for table update, adjust as needed
        });
    }

    // Help Page Specific Code
    if (document.getElementById("help-page-content")) {
        var submenuItems = document.querySelectorAll("#help-sidebar li.has-submenu > a");

        submenuItems.forEach(function(submenuItem) {
            submenuItem.addEventListener("click", function(e) {
                e.preventDefault();
                var parentLi = this.parentElement;
                var submenu = this.nextElementSibling;

                // Close all other submenus
                submenuItems.forEach(function(item) {
                    var itemParentLi = item.parentElement;
                    var itemSubmenu = item.nextElementSibling;

                    if (itemParentLi !== parentLi) {
                        itemSubmenu.style.maxHeight = null;
                        itemParentLi.classList.remove("open");
                    }
                });

                // Toggle the clicked submenu
                if (parentLi.classList.contains("open")) {
                    submenu.style.maxHeight = null;
                    parentLi.classList.remove("open");
                } else {
                    submenu.style.maxHeight = submenu.scrollHeight + "px";
                    parentLi.classList.add("open");
                }
            });
        });

        var sidebarLinks = document.querySelectorAll("#help-sidebar a");
        var contentSections = document.querySelectorAll(".help-content-section");

        sidebarLinks.forEach(function(link) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                var targetId = this.getAttribute("href").substring(1);
                var targetElement = document.getElementById(targetId);
                var parentLi = this.parentElement;

                // If it's a submenu item, do not apply active class to it
                if (parentLi.classList.contains("has-submenu")) {
                    // Handle parent menu item activation
                    sidebarLinks.forEach(function(link) {
                        link.classList.remove("active");
                    });
                    this.classList.add("active");

                    // Show the corresponding content section
                    contentSections.forEach(function(section) {
                        if (section.contains(targetElement)) {
                            section.classList.add("active");
                            var subSections = section.querySelectorAll("div[id]");
                            subSections.forEach(function(subSection) {
                                subSection.classList.remove("highlight");
                            });
                            document.querySelector('#help-page-content').scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                        } else {
                            section.classList.remove("active");
                        }
                    });
                } else {
                    // Handle submenu item activation
                    var parentMenu = parentLi.closest('li.has-submenu');
                    sidebarLinks.forEach(function(link) {
                        link.classList.remove("active");
                    });
                    if (parentMenu) {
                        parentMenu.querySelector('a').classList.add("active");
                    }

                    // Show the corresponding content section and highlight the subsection
                    contentSections.forEach(function(section) {
                        if (section.contains(targetElement)) {
                            section.classList.add("active");
                            var subSections = section.querySelectorAll("div[id]");
                            subSections.forEach(function(subSection) {
                                subSection.classList.remove("highlight");
                            });
                            targetElement.classList.add("highlight");

                            var offset = targetElement.offsetTop;
                            document.querySelector('#help-page-content').scrollTo({
                                top: offset,
                                behavior: "smooth"
                            });

                            // Remove the highlight after 3 seconds
                            setTimeout(function() {
                                targetElement.classList.remove("highlight");
                            }, 3000);
                        } else {
                            section.classList.remove("active");
                        }
                    });
                }

                // Change the URL without reloading the page
                history.pushState(null, null, '#' + targetId);
            });
        });

        // Set the default active link and content
        var defaultActiveLink = document.querySelector('#help-sidebar a[href="#user-guide"]');
        if (defaultActiveLink) {
            defaultActiveLink.classList.add("active");
            document.getElementById("user-guide").classList.add("active");
        }

        // Add event listener for "GExplore User Guide" to maintain background color and close submenus
        var userGuideLink = document.querySelector('#help-sidebar a[href="#user-guide"]');
        if (userGuideLink) {
            userGuideLink.addEventListener("click", function(e) {
                e.preventDefault();

                // Close all open submenus
                submenuItems.forEach(function(item) {
                    var itemParentLi = item.parentElement;
                    var itemSubmenu = item.nextElementSibling;

                    itemSubmenu.style.maxHeight = null;
                    itemParentLi.classList.remove("open");
                });

                // Activate the "GExplore User Guide" link
                sidebarLinks.forEach(function(link) {
                    link.classList.remove("active");
                });
                this.classList.add("active");
                document.getElementById("user-guide").classList.add("active");
                document.querySelector('#help-page-content').scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                history.pushState(null, null, '#user-guide');
            });
        }

        // Check for URL fragment on page load
        if (window.location.hash) {
            var targetId = window.location.hash.substring(1);
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Activate the corresponding sidebar link
                sidebarLinks.forEach(function(link) {
                    link.classList.remove("active");
                    if (link.getAttribute("href").substring(1) === targetId) {
                        link.classList.add("active");
                    }
                });

                // Show the corresponding content section
                contentSections.forEach(function(section) {
                    if (section.contains(targetElement)) {
                        section.classList.add("active");
                        var subSections = section.querySelectorAll("div[id]");
                        subSections.forEach(function(subSection) {
                            subSection.classList.remove("highlight");
                        });
                        targetElement.classList.add("highlight");

                        var offset = targetElement.offsetTop;
                        document.querySelector('#help-page-content').scrollTo({
                            top: offset,
                            behavior: "smooth"
                        });

                        // Remove the highlight after 3 seconds
                        setTimeout(function() {
                            targetElement.classList.remove("highlight");
                        }, 3000);
                    } else {
                        section.classList.remove("active");
                    }
                });
            }
        }
    }

    // Copy icon tooltip handling
    var copyIcon = document.getElementById("copy-icon");
    if (copyIcon) {
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
    }

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














    



    const tableCells = document.querySelectorAll('#scrollableTable td');

    tableCells.forEach(cell => {
        if (cell.scrollWidth > cell.clientWidth) {
            cell.classList.add('overflow');
        }
    });

    // Loop through each cell and check if it's empty, and make sure it's not in the checkbox_col class
    tableCells.forEach(cell => {
        if (cell.textContent.trim() === '' && !cell.classList.contains('checkbox_col') && !cell.classList.contains('pic_col')) {
            cell.textContent = 'N/A'; // Replace empty content with "N/A"
            cell.style.cursor = 'auto'; // Set cursor to 'auto' for empty cells
            cell.setAttribute('data-na', 'true'); // Mark N/A cells to exclude from hover
        }
    });

    tableCells.forEach(cell => {
        cell.addEventListener('click', function (event) {
            // Exclude cells from the pic_col, checkbox_col classes, or empty cells (with N/A)
            if (
                this.classList.contains('pic_col') ||
                this.classList.contains('checkbox_col') ||
                this.textContent.trim() === 'N/A' // Prevent modal for N/A cells
            ) {
                return; // Don't trigger the modal
            }
    
            // Prevent modal from opening if an <a> element inside the cell is clicked
            if (event.target.tagName === 'A') {
                return;
            }
    
            const fullText = this.textContent.trim();
    
            // Create modal elements if they don't exist
            let modal = document.getElementById('myModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'myModal';
                modal.classList.add('modal');
                document.body.appendChild(modal);
    
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <p id="modal-text"></p>
                    </div>
                `;
            }
    
            // Set the text in the modal
            const modalText = document.getElementById('modal-text');
            modalText.textContent = fullText;
    
            // Apply custom styles for seq_col class (monospace font and word-wrap)
            if (this.classList.contains('seq_col')) {
                modalText.style.wordWrap = 'break-word';
                modalText.style.fontFamily = '"Courier New", Courier, monospace';
            } else {
                // Reset to default styles for other columns
                modalText.style.wordWrap = 'normal';
                modalText.style.fontFamily = '';
            }
    
            // Display the modal
            modal.style.display = 'block';
    
            // Close the modal when the close button is clicked
            modal.querySelector('.close').onclick = function () {
                modal.style.display = 'none';
            };
    
            // Close the modal when clicking outside the modal content
            window.onclick = function (event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
        });
    });
    



    







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





    
    







    // Table Search Feature 
    const searchInput = document.getElementById('table-search');
    const nextButton = document.getElementById('search-next');
    const prevButton = document.getElementById('search-prev');
    const searchCount = document.getElementById('search-count'); // Display search count
    const clearSearchButton = document.getElementById('clear-search'); // X (close) button

    let searchResults = [];
    let currentIndex = -1;
    let searchTerm = '';

    // Function to clear existing highlights in the table
    function clearHighlights() {
        searchResults.forEach(cell => cell.classList.remove('highlighted'));
        searchResults = [];
        currentIndex = -1;
        updateSearchCount(); // Update the count to show 0 of 0 when cleared
    }

    // Function to highlight the currently selected cell
    function highlightCurrentCell() {
        searchResults.forEach(cell => cell.classList.remove('highlighted')); // Clear existing highlights

        // Highlight the current cell and scroll to it
        if (searchResults[currentIndex]) {
            searchResults[currentIndex].classList.add('highlighted');
            searchResults[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Function to find and store all matches in the table
    function highlightMatches(searchTerm) {
        clearHighlights(); // Clear previous results and highlights
        if (!searchTerm) return; // Return if search term is empty

        const tableCells = document.querySelectorAll('#scrollableTable td');
        tableCells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                searchResults.push(cell);
            }
        });

        if (searchResults.length > 0) {
            currentIndex = 0; // Start by highlighting the first match
            highlightCurrentCell();
            updateSearchCount(); // Update the count
        }
    }

    // Function to navigate between matches
    function navigateResults(direction) {
        if (searchResults.length === 0) return; // If no results, do nothing

        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % searchResults.length; // Loop to the beginning if at the end
        } else if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + searchResults.length) % searchResults.length; // Loop to the end if at the beginning
        }
        highlightCurrentCell();
        updateSearchCount(); // Update the count on navigation
    }

    // Function to update the search count display
    function updateSearchCount() {
        if (searchResults.length > 0) {
            searchCount.textContent = `${currentIndex + 1} of ${searchResults.length}`;
        } else {
            searchCount.textContent = '0 of 0';
        }
    }

    // Function to reset the search feature and clear modal text highlights
    function resetSearch() {
        searchInput.value = ''; // Clear input
        clearHighlights(); // Clear table highlights
        clearSearchButton.style.display = 'none'; // Hide the clear button
        searchTerm = ''; // Clear the search term

        // Reset modal content if open
        const modalText = document.getElementById('modal-text');
        if (modalText) {
            modalText.innerHTML = modalText.textContent; // Remove any highlights by setting raw text
        }

        updateSearchCount(); // Reset search count to 0 of 0
    }

    // Event listener for search input
    searchInput.addEventListener('input', function () {
        searchTerm = this.value;
        highlightMatches(searchTerm);

        // Show or hide the clear (escape) button based on the input value
        if (this.value.length > 0) {
            clearSearchButton.style.display = 'inline'; // Show clear button
        } else {
            clearSearchButton.style.display = 'none'; // Hide clear button
        }
    });

    // Event listener for the clear (escape) button
    clearSearchButton.addEventListener('click', function () {
        resetSearch();
    });

    // Event listeners for next and previous buttons
    nextButton.addEventListener('click', function () {
        navigateResults('next');
    });

    prevButton.addEventListener('click', function () {
        navigateResults('prev');
    });

    // Modal functionality with term highlighting
    document.querySelectorAll('#scrollableTable td').forEach(cell => {
        cell.addEventListener('click', function (event) {
            // Prevent modal for cells that are empty, contain N/A, or belong to pic_col/checkbox_col
            if (
                event.target.tagName === 'A' || 
                cell.classList.contains('pic_col') || 
                cell.classList.contains('checkbox_col') || 
                cell.textContent.trim() === 'N/A' // Prevent modal for N/A cells
            ) {
                return;
            }

            const fullText = this.textContent.trim();
            let modal = document.getElementById('myModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'myModal';
                modal.classList.add('modal');
                document.body.appendChild(modal);

                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <p id="modal-text"></p>
                    </div>
                `;
            }

            // Highlight the searched term within the modal
            const modalText = document.getElementById('modal-text');
            if (searchTerm) {
                const highlightedText = fullText.replace(new RegExp(searchTerm, 'gi'), match => `<span class="term-highlight">${match}</span>`);
                modalText.innerHTML = highlightedText;
            } else {
                modalText.textContent = fullText; // No search term, display the full text without highlights
            }

            // Apply custom styles for seq_col class (monospace font and word-wrap)
            if (this.classList.contains('seq_col')) {
                modalText.style.wordWrap = 'break-word';
                modalText.style.fontFamily = '"Courier New", Courier, monospace';
            } else {
                modalText.style.wordWrap = 'normal';
                modalText.style.fontFamily = '';
            }

            // Display the modal
            modal.style.display = 'block';

            // Close the modal when the close button is clicked
            modal.querySelector('.close').onclick = function () {
                modal.style.display = 'none';
            };

            // Close the modal when clicking outside the modal content
            window.onclick = function (event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
        });
    });












    // Function to escape CSV data, handle commas, double quotes, and line breaks
    function escapeCsvField(field) {
        if (!field) {
            return ''; // Return an empty string for missing data
        }
        if (field.includes(",") || field.includes("\n") || field.includes('"')) {
            return `"${field.replace(/"/g, '""')}"`; // Escape double quotes and wrap field in quotes
        }
        return field;
    }

    // Updated Export functions

    // Get visible table data for export and handle missing data, line breaks, and ignore checkbox and pic columns
    function getVisibleTableData() {
        var table = document.querySelector("#scrollableTable table");

        // Filter out the checkbox column and hidden columns by class name
        var headers = Array.from(table.querySelectorAll('thead th'))
            .filter(th => th.style.display !== 'none' && !th.classList.contains('checkbox_col') && !th.classList.contains('pic_col'));

        var rows = Array.from(table.querySelectorAll('tbody tr'));
        var data = rows.map(row => {
            var cells = Array.from(row.querySelectorAll('td'))
                .filter(td => td.style.display !== 'none' && !td.classList.contains('checkbox_col') && !td.classList.contains('pic_col'));

            var rowData = {};
            cells.forEach((cell, index) => {
                rowData[headers[index].textContent.trim()] = (cell.textContent || '').trim(); // Handle missing data with an empty string
            });
            return rowData;
        });

        return { headers: headers.map(header => header.textContent.trim()), data: data };
    }

    // Escape CSV field to handle commas, line breaks, and quotes
    function escapeCsvField(value) {
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            // Escape double quotes and wrap the value in double quotes
            return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
    }

    // Export data as CSV with proper escaping for line breaks, commas, and missing data
    function exportAsCSV({ headers, data }) {
        var csv = headers.map(escapeCsvField).join(',') + '\n';
        csv += data.map(row => headers.map(header => escapeCsvField(row[header] || "")).join(',')).join('\n'); // Handle missing data and escape content
        downloadFile('data.csv', csv, 'text/csv');
    }

    // Export data as TXT with tab separation, handle line breaks and missing data
    function exportAsTXT({ headers, data }) {
        var txt = headers.join('\t') + '\n';
        txt += data.map(row => headers.map(header => (row[header] || "").replace(/\n/g, ' ')).join('\t')).join('\n'); // Handle missing data and line breaks
        downloadFile('data.txt', txt, 'text/plain');
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

    // Event listener for CSV export button
    var exportCsvButton = document.getElementById("export-csv-button");
    if (exportCsvButton) {
        exportCsvButton.addEventListener("click", function() {
            var tableData = getVisibleTableData();
            exportAsCSV(tableData);
        });
    }

    // Event listener for TXT export button
    var exportTxtButton = document.getElementById("export-txt-button");
    if (exportTxtButton) {
        exportTxtButton.addEventListener("click", function() {
            var tableData = getVisibleTableData();
            exportAsTXT(tableData);
        });
    }










    // New code for enabling/disabling the search button based on form inputs
    var searchButton = document.getElementById("search-button");
    if (searchButton) {
        var inputs = document.querySelectorAll('.form-group input[type="text"], .form-group textarea, .form-group select');

        function checkFormFields() {
            let isFilled = false;
            inputs.forEach(function(input) {
                if (input.value.trim() !== "") {
                    isFilled = true;
                }
            });

            if (isFilled) {
                searchButton.disabled = false; // Enable the button
            } else {
                searchButton.disabled = true; // Disable the button
            }
        }

        // Add event listeners to all inputs, textareas, and select elements
        inputs.forEach(function(input) {
            input.addEventListener('input', checkFormFields);
            input.addEventListener('change', checkFormFields); // Also listen to change events for select elements
        });

        // Initial check in case the form is pre-filled (e.g., browser autofill)
        checkFormFields();
    }

    // Show and hide help content on click
    var helpIcons = document.querySelectorAll(".search-page-help-icon");
    helpIcons.forEach(function(icon) {
        icon.addEventListener("click", function() {
            var helpContent = this.closest(".form-group")?.querySelector(".search-page-help-content");

            // Specific handling for different help content sections
            if (!helpContent) {
                // If no direct form-group help content, check by title
                if (this.closest(".search-param-column-full").querySelector("h4").textContent.includes("Expression Profiles")) {
                    helpContent = document.querySelector(".search-for-expression-help-content");
                } else if (this.closest(".search-param-column-full").querySelector("h4").textContent.includes("Sample Profiles")) {
                    helpContent = this.closest(".search-param-column-full").querySelector(".search-page-help-content");
                }
            }

            if (helpContent) {
                helpContent.style.display = helpContent.style.display === "block" ? "none" : "block";
            }
        });
    });

    // Check if we're on the Expression Search page (Stage, Tissue, or Embryo)
    if (
        document.body.id === "stage-expression-page" || 
        document.body.id === "tissue-expression-page" ||
        document.body.id === "embryo-expression-page"
    ) {
        console.log("Expression Search page detected");

        var searchButton = document.getElementById("search-button");
        if (searchButton) {
            console.log("Search button found:", searchButton);

            var inputs = document.querySelectorAll('.form-group input[type="text"], .form-group textarea, .form-group select');

            // Log initial state of the search button
            console.log("Initial button disabled state:", searchButton.disabled);

            // Define default values for each page type
            var defaultValues;

            if (document.body.id === "stage-expression-page") {
                defaultValues = {
                    1: "e0", 2: "e11", 3: "L2", 4: "Dauer", 5: "L4male"
                };
            } else if (document.body.id === "tissue-expression-page") {
                defaultValues = {
                    1: "", 2: "5", 3: "0.05", 4: "Body_wall_muscle", 5: "Seam_cells", 6: "Ciliated_sensory_neurons",
                    7: "Intestine", 8: "Germline"
                };
            } else if (document.body.id === "embryo-expression-page") {
                defaultValues = {
                    1: "hypodermis", 2: "intestine", 3: "pharynx", 4: "muscle", 5: "neuron", 
                    6: "t0", 7: "t0", 8: "t0", 9: "t0", 10: "t0"
                };
            }

            function checkFormFields() {
                let isFilled = false;

                inputs.forEach(function(input, index) {
                    let inputValue = input.value.trim();
                    console.log(`Input ${index}:`, inputValue);

                    // Check if it's different from the default value (if applicable)
                    if (inputValue !== "" && (!defaultValues.hasOwnProperty(index) || inputValue !== defaultValues[index])) {
                        isFilled = true;
                    }
                });

                console.log("Is any input filled?", isFilled);

                if (isFilled) {
                    searchButton.disabled = false; // Enable the button
                    console.log("Button enabled");
                } else {
                    searchButton.disabled = true; // Disable the button
                    console.log("Button disabled");
                }
            }

            // Add event listeners to all inputs, textareas, and select elements
            inputs.forEach(function(input, index) {
                console.log(`Adding event listeners to input ${index}`);
                input.addEventListener('input', checkFormFields);
                input.addEventListener('change', checkFormFields); // Also listen to change events for select elements
            });

            // Use setTimeout to delay the initial check, allowing time for any autofill
            setTimeout(function() {
                console.log("Initial check after timeout");
                checkFormFields();
            }, 100);
        } else {
            console.log("Search button not found");
        }
    } else {
        console.log("Not an Expression Search page");
    }

});
