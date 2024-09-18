document.addEventListener("DOMContentLoaded", function() {

    // -------------------- Table Search Feature -------------------- //
    const searchInput = document.getElementById('table-search');
    const nextButton = document.getElementById('search-next');
    const prevButton = document.getElementById('search-prev');
    const searchCount = document.getElementById('search-count');
    const clearSearchButton = document.getElementById('clear-search');

    let searchResults = [];
    let currentIndex = -1;
    let searchTerm = '';
    let termMatches = [];

    function clearHighlights() {
        searchResults.forEach(({ cell }) => {
            const highlightedTerms = cell.querySelectorAll('.term-highlight, .current-term-highlight');
            highlightedTerms.forEach((term) => term.outerHTML = term.innerHTML); // Remove term highlights
        });
        searchResults = [];
        termMatches = [];
        currentIndex = -1;
        updateSearchCount();
    }

    function highlightCurrentTerm() {
        if (termMatches.length === 0) return;

        // Remove 'current-term-highlight' class from the previous current match
        searchResults.forEach(({ cell }) => {
            const currentHighlight = cell.querySelector('.current-term-highlight');
            if (currentHighlight) {
                currentHighlight.classList.remove('current-term-highlight');
                currentHighlight.classList.add('term-highlight');
            }
        });

        const { cell, matchIndex } = termMatches[currentIndex];
        const highlightedTerms = cell.querySelectorAll('.term-highlight');

        if (highlightedTerms.length > 0) {
            const currentTerm = highlightedTerms[matchIndex];
            if (currentTerm) {
                currentTerm.classList.remove('term-highlight');
                currentTerm.classList.add('current-term-highlight');

                // Scroll to center the current highlighted term in the table with smooth scrolling
                const parent = cell.closest('#scrollableTable');
                const termRect = currentTerm.getBoundingClientRect();
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
        const regex = new RegExp(`(${searchTerm})`, 'gi'); // Global and case-insensitive

        tableCells.forEach((cell) => {
            const walker = document.createTreeWalker(cell, NodeFilter.SHOW_TEXT, null, false);
            let node;
            let matchFound = false;

            while ((node = walker.nextNode())) {
                const matches = node.textContent.match(regex);

                if (matches) {
                    matchFound = true;

                    // Split the text content and replace with highlighted span
                    const highlightedFragments = node.textContent.split(regex).map((fragment, index) => {
                        if (index % 2 === 1) {
                            const span = document.createElement('span');
                            span.className = 'term-highlight';
                            span.textContent = fragment;
                            return span;
                        }
                        return document.createTextNode(fragment);
                    });

                    // Replace the original node with the highlighted content
                    highlightedFragments.forEach(fragment => {
                        node.parentNode.insertBefore(fragment, node);
                    });

                    node.parentNode.removeChild(node); // Remove the original text node
                }
            }

            if (matchFound) {
                const termHighlights = cell.querySelectorAll('.term-highlight');
                termHighlights.forEach((match, index) => {
                    termMatches.push({
                        cell,
                        matchIndex: index,
                    });
                });
                searchResults.push({ cell });
            }
        });

        if (termMatches.length > 0) {
            currentIndex = 0;
            highlightCurrentTerm();
        }

        updateSearchCount();
    }


    function navigateResults(direction) {
        if (termMatches.length === 0) return;

        currentIndex = (direction === 'next')
            ? (currentIndex + 1) % termMatches.length
            : (currentIndex - 1 + termMatches.length) % termMatches.length;

        highlightCurrentTerm();
        updateSearchCount(); // Update counts after navigating
    }

    function updateSearchCount() {
        if (termMatches.length > 0) {
            searchCount.textContent = `${currentIndex + 1} of ${termMatches.length}`;
        } else {
            searchCount.textContent = '0 of 0';
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

});
