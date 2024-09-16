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









    // Toggle views + modal deactivation in expanded + Table search feature

    // Get references to the toggle buttons (condensed vs expanded)
    var condensedButton = document.getElementById("condensed-view");
    var expandedButton = document.getElementById("expanded-view");
    var table = document.getElementById('scrollableTable');

    // Function to expand the table cells (switch to expanded view)
    function expandTableView() {

        // Clear existing highlights before switching views
        clearHighlights(); 


        var tableCells = document.querySelectorAll('#scrollableTable td');
        tableCells.forEach(function (cell) {
            // Remove text truncation styles (e.g., ellipses)
            cell.style.whiteSpace = 'normal';
            cell.style.overflow = 'visible';
            cell.style.textOverflow = 'unset';
            cell.style.wordWrap = 'break-word'; // Ensure long words are wrapped
            cell.style.verticalAlign = 'top'; // Align content to the top
        });

        table.classList.add('expanded-view');
        table.classList.remove('condensed-view');

        // Update button states
        condensedButton.classList.remove('active');
        expandedButton.classList.add('active');

        // Reapply modal logic (to respect the current view)
        applyModalLogic();

        // Reset search logic after view change
        resetSearch();
    }

    // Function to apply the condensed view (ellipsis view)
    function collapseTableView() {
        
        var tableCells = document.querySelectorAll('#scrollableTable td');
        tableCells.forEach(function (cell) {
            // Reapply text truncation styles (e.g., ellipses)
            cell.style.whiteSpace = 'nowrap';
            cell.style.overflow = 'hidden';
            cell.style.textOverflow = 'ellipsis'; // Reapply ellipsis
            cell.style.verticalAlign = 'middle'; // Center-align for condensed view

            // Check if the cell is empty and replace with "N/A"
            if (cell.textContent.trim() === '' &&
                !cell.classList.contains('checkbox_col') &&
                !cell.classList.contains('pic_col')) {
                cell.textContent = 'N/A'; // Replace empty content with "N/A"
                cell.style.cursor = 'auto'; // Set cursor to 'auto' for empty cells
                cell.setAttribute('data-na', 'true'); // Mark N/A cells to exclude from hover
            }
        });

        table.classList.remove('expanded-view');
        table.classList.add('condensed-view');

        // Check for overflow and apply the 'overflow' class to show custom ellipsis
        checkForOverflow();

        // Update button states
        expandedButton.classList.remove('active');
        condensedButton.classList.add('active');

        // Reapply modal logic (to respect the current view)
        applyModalLogic();
    }

    // Function to check for overflowing content and apply the 'overflow' class
    function checkForOverflow() {
        const tableCells = document.querySelectorAll('#scrollableTable td');

        tableCells.forEach(cell => {
            // Check if the content of the cell is overflowing
            if (cell.scrollWidth > cell.clientWidth) {
                // Add the 'overflow' class if content is overflowing
                cell.classList.add('overflow');
            } else {
                // Remove the 'overflow' class if there's no overflow
                cell.classList.remove('overflow');
            }
        });
    }

    // Function to apply modal logic to the table cells
    function applyModalLogic() {
        const tableCells = document.querySelectorAll('#scrollableTable td');

        tableCells.forEach(cell => {
            cell.addEventListener('click', function (event) {
                var table = document.getElementById('scrollableTable');

                if (table.classList.contains('expanded-view')) {
                    console.log("Expanded view is active. Modal not triggered.");
                    return;
                }

                if (
                    this.classList.contains('pic_col') ||
                    this.classList.contains('checkbox_col') ||
                    this.textContent.trim() === 'N/A'
                ) {
                    return;
                }

                if (event.target.tagName === 'A') {
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

                const modalText = document.getElementById('modal-text');
                // Highlight the search term in the modal, if any
                if (searchTerm) {
                    const highlightedText = fullText.replace(new RegExp(searchTerm, 'gi'), match => `<span class="term-highlight">${match}</span>`);
                    modalText.innerHTML = highlightedText;
                } else {
                    modalText.textContent = fullText;
                }

                if (this.classList.contains('seq_col')) {
                    modalText.style.wordWrap = 'break-word';
                    modalText.style.fontFamily = '"Courier New", Courier, monospace';
                } else {
                    modalText.style.wordWrap = 'normal';
                    modalText.style.fontFamily = '';
                }

                modal.style.display = 'block';

                modal.querySelector('.close').onclick = function () {
                    modal.style.display = 'none';
                };

                window.onclick = function (event) {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                };
            });
        });
    }

    // Event listener for the expanded view button
    expandedButton.addEventListener('click', function () {
        expandTableView();
        resetSearch(); // Reset search when view changes
    });

    // Event listener for the condensed view button
    condensedButton.addEventListener('click', function () {
        collapseTableView();
        resetSearch(); // Reset search when view changes
    });

    // Apply condensed view (ellipses) by default when the page loads
    collapseTableView();

    // -------------------- Table Search Feature -------------------- //

    const searchInput = document.getElementById('table-search');
    const nextButton = document.getElementById('search-next');
    const prevButton = document.getElementById('search-prev');
    const searchCount = document.getElementById('search-count');
    const clearSearchButton = document.getElementById('clear-search');

    let searchResults = [];
    let currentIndex = -1;
    let searchTerm = '';
    let termMatches = []; // Store individual matches for expanded view

    function clearHighlights() {
        searchResults.forEach((cell) => {
            const highlightedTerms = cell.querySelectorAll('.term-highlight');
            highlightedTerms.forEach((term) => term.outerHTML = term.innerHTML); // Remove term highlights
            cell.classList.remove('highlighted');
        });
        searchResults = [];
        termMatches = [];
        currentIndex = -1;
        updateSearchCount();
    }

    function highlightCurrentCell() {
        if (table.classList.contains('condensed-view')) {
            // Condensed view: Highlight the entire cell
            searchResults.forEach((cell) => cell.classList.remove('highlighted'));
            if (searchResults[currentIndex]) {
                const currentCell = searchResults[currentIndex];
                currentCell.classList.add('highlighted');
    
                // Scroll to center the current cell in the table with smooth scrolling
                const parent = currentCell.closest('#scrollableTable');
                const cellRect = currentCell.getBoundingClientRect();
                const parentRect = parent.getBoundingClientRect();
    
                parent.scrollTo({
                    top: parent.scrollTop + (cellRect.top - parentRect.top) - (parentRect.height / 2) + (cellRect.height / 2),
                    left: parent.scrollLeft + (cellRect.left - parentRect.left) - (parentRect.width / 2) + (cellRect.width / 2),
                    behavior: 'smooth' // Smooth scroll transition
                });
            }
        } else if (table.classList.contains('expanded-view')) {
            // Expanded view: Highlight individual terms within a cell
            searchResults.forEach((cell) => {
                const highlightedTerms = cell.querySelectorAll('.term-highlight');
                highlightedTerms.forEach((term) => term.outerHTML = term.innerHTML); // Remove old highlights
            });
    
            const { cell, matchIndex } = termMatches[currentIndex];
            const highlightedText = cell.innerHTML.replace(
                new RegExp(`(${searchTerm})`, 'gi'),
                (match, p1, offset) => (offset === matchIndex ? `<span class="term-highlight">${match}</span>` : match)
            );
            cell.innerHTML = highlightedText;
            const highlightedTerm = cell.querySelector('.term-highlight');
    
            if (highlightedTerm) {
                // Scroll to center the current highlighted term in the table with smooth scrolling
                const parent = cell.closest('#scrollableTable');
                const termRect = highlightedTerm.getBoundingClientRect();
                const parentRect = parent.getBoundingClientRect();
    
                parent.scrollTo({
                    top: parent.scrollTop + (termRect.top - parentRect.top) - (parentRect.height / 2) + (termRect.height / 2),
                    left: parent.scrollLeft + (termRect.left - parentRect.left) - (parentRect.width / 2) + (termRect.width / 2),
                    behavior: 'smooth' // Smooth scroll transition
                });
            }
        }
    }
    

    function highlightMatches(searchTerm) {
        clearHighlights();

        if (!searchTerm) return;

        const tableCells = document.querySelectorAll('#scrollableTable td');
        if (table.classList.contains('condensed-view')) {
            // Condensed view: Highlight entire cells containing the search term
            tableCells.forEach((cell) => {
                if (cell.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                    searchResults.push(cell);
                }
            });
        } else if (table.classList.contains('expanded-view')) {
            // Expanded view: Find and count individual matches within cells
            tableCells.forEach((cell) => {
                const cellText = cell.textContent.toLowerCase();
                const matches = [...cellText.matchAll(new RegExp(searchTerm.toLowerCase(), 'gi'))];
                if (matches.length > 0) {
                    searchResults.push(cell);
                    matches.forEach((match) => {
                        termMatches.push({
                            cell,
                            matchIndex: match.index, // Store the index of each match
                        });
                    });
                }
            });
        }

        if (table.classList.contains('condensed-view') && searchResults.length > 0) {
            currentIndex = 0;
            highlightCurrentCell();
        } else if (table.classList.contains('expanded-view') && termMatches.length > 0) {
            currentIndex = 0;
            highlightCurrentCell();
        }

        updateSearchCount(); // Update counts after finding results
    }

    function navigateResults(direction) {
        if (table.classList.contains('condensed-view')) {
            if (searchResults.length === 0) return;
            currentIndex = (direction === 'next')
                ? (currentIndex + 1) % searchResults.length
                : (currentIndex - 1 + searchResults.length) % searchResults.length;
            highlightCurrentCell();
        } else if (table.classList.contains('expanded-view')) {
            if (termMatches.length === 0) return;
            currentIndex = (direction === 'next')
                ? (currentIndex + 1) % termMatches.length
                : (currentIndex - 1 + termMatches.length) % termMatches.length;
            highlightCurrentCell();
        }

        updateSearchCount(); // Update counts after navigating
    }

    function updateSearchCount() {
        if (table.classList.contains('condensed-view')) {
            if (searchResults.length > 0) {
                searchCount.textContent = `${currentIndex + 1} of ${searchResults.length}`;
            } else {
                searchCount.textContent = '0 of 0';
            }
        } else if (table.classList.contains('expanded-view')) {
            if (termMatches.length > 0) {
                searchCount.textContent = `${currentIndex + 1} of ${termMatches.length}`;
            } else {
                searchCount.textContent = '0 of 0';
            }
        }
    }

    function resetSearch() {
        searchInput.value = '';
        clearHighlights();
        clearSearchButton.style.display = 'none';
        searchTerm = '';
        updateSearchCount();
    }

    // Event listener for search input
    searchInput.addEventListener('input', function () {
        searchTerm = this.value;
        highlightMatches(searchTerm);
        clearSearchButton.style.display = this.value.length > 0 ? 'inline' : 'none';
    });

    clearSearchButton.addEventListener('click', resetSearch);

    nextButton.addEventListener('click', function () {
        navigateResults('next');
    });

    prevButton.addEventListener('click', function () {
        navigateResults('prev');
    });


    // Apply search logic once when the page is loaded








    



    







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
