// Function to open a URL
function openUrl(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Function to validate a URL
function isValidUrl(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
        return false;
    }
}

// Get references for add and remove elements
const addButton = document.getElementById('addButton'); // Add Link button
const buttonContainer = document.querySelector('.button-container'); // Container for dynamic buttons
const removeLinkButton = document.getElementById('removeLinkButton'); // Remove Link button
const removeModal = document.getElementById('removeModal'); // Modal for link removal
const linkList = document.getElementById('linkList'); // List of links in modal
const confirmRemoveButton = document.getElementById('confirmRemoveButton'); // Confirm Remove button
const cancelRemoveButton = document.getElementById('cancelRemoveButton'); // Cancel Remove button

// Add Link functionality
addButton.addEventListener('click', () => {
    const buttonText = document.getElementById('buttonText').value.trim();
    const buttonUrl = document.getElementById('buttonUrl').value.trim();

    // Validate inputs without error messages
    if (!buttonText || !isValidUrl(buttonUrl)) {
        // Highlight invalid fields
        if (!buttonText) {
            document.getElementById('buttonText').style.border = '2px solid red';
        } else {
            document.getElementById('buttonText').style.border = '';
        }

        if (!isValidUrl(buttonUrl)) {
            document.getElementById('buttonUrl').style.border = '2px solid red';
        } else {
            document.getElementById('buttonUrl').style.border = '';
        }

        return; // Stop execution if inputs are invalid
    }

    // Reset field borders after validation success
    document.getElementById('buttonText').style.border = '';
    document.getElementById('buttonUrl').style.border = '';

    // Create a new button
    const newButton = document.createElement('button');
    newButton.textContent = buttonText;
    newButton.onclick = () => openUrl(buttonUrl);

    // Append the new button to the container
    buttonContainer.appendChild(newButton);

    // Clear input fields
    document.getElementById('buttonText').value = '';
    document.getElementById('buttonUrl').value = '';
});

// Open the modal and populate the link list
removeLinkButton.addEventListener('click', () => {
    removeModal.style.display = 'block'; // Show the modal
    linkList.innerHTML = ''; // Clear any previous content

    // Add current buttons to the modal for selection
    const buttons = document.querySelectorAll('.button-container button');
    buttons.forEach((button, index) => {
        const linkItem = document.createElement('div');
        linkItem.style.display = 'flex';
        linkItem.style.alignItems = 'center';
        linkItem.style.marginBottom = '5px';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = index; // Store the index to identify the button
        checkbox.style.marginRight = '10px';

        const label = document.createElement('label');
        label.textContent = button.textContent;

        linkItem.appendChild(checkbox);
        linkItem.appendChild(label);
        linkList.appendChild(linkItem);
    });
});

// Confirm removal of selected links
confirmRemoveButton.addEventListener('click', () => {
    const checkboxes = linkList.querySelectorAll('input[type="checkbox"]:checked');
    const buttons = Array.from(document.querySelectorAll('.button-container button'));

    checkboxes.forEach((checkbox) => {
        const index = checkbox.value;
        buttons[index].remove(); // Remove the corresponding button
    });

    removeModal.style.display = 'none'; // Hide the modal
});

// Cancel the removal process
cancelRemoveButton.addEventListener('click', () => {
    removeModal.style.display = 'none'; // Hide the modal
});





// References to toggle button and form
const toggleFormButton = document.getElementById('toggleFormButton');
const addButtonForm = document.getElementById('addButtonForm');

// Toggle form visibility
toggleFormButton.addEventListener('click', () => {
    if (addButtonForm.style.display === 'none' || addButtonForm.style.display === '') {
        addButtonForm.style.display = 'block'; // Show the form
        toggleFormButton.textContent = 'Hide Settings'; // Update button text
    } else {
        addButtonForm.style.display = 'none'; // Hide the form
        toggleFormButton.textContent = 'Settings'; // Update button text
    }
});

// Add Link functionality (reuse from earlier script)
document.getElementById('addButton').addEventListener('click', () => {
    const buttonText = document.getElementById('buttonText').value.trim();
    const buttonUrl = document.getElementById('buttonUrl').value.trim();

    if (!buttonText || !buttonUrl) {
        alert('Please enter both a valid Link Name and URL.');
        return;
    }

    const buttonContainer = document.querySelector('.button-container');

    // Create and add a new button
    const newButton = document.createElement('button');
    newButton.textContent = buttonText;
    newButton.onclick = () => window.open(buttonUrl, '_blank', 'noopener,noreferrer');
    buttonContainer.appendChild(newButton);

    // Clear input fields
    document.getElementById('buttonText').value = '';
    document.getElementById('buttonUrl').value = '';
});
