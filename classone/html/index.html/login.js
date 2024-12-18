function users() {
    // Get input values and error message element
    const info = document.querySelector('#info'); // Error display area
    const phoneNumber = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();

    // Step 1: Input Validation - Check if fields are empty
    if (!phoneNumber || !password) {
        displayMessage(info, 'Please fill in all required fields!', 'red');
        return;
    }

    // Step 2: Retrieve stored user data from localStorage
    const userData = localStorage.getItem('userData');

    if (!userData) {
        // No data exists in localStorage
        alert('No registered users found. Redirecting to Sign-up page.');
        redirectToPage('register.html');
        return;
    }

    // Step 3: Parse stored data and search for a match
    const users = JSON.parse(userData); // Convert string back to array of objects
    const isValidUser = users.some(user => 
        user.phoneNumber === phoneNumber && user.userPassword === password
    );

    // Step 4: Perform actions based on validation result
    if (isValidUser) {
        alert('Login successful!');
        redirectToPage('index.html');
    } else {
        displayMessage(info, 'Incorrect phone number or password.', 'red');
        clearInputFields(['phone', 'password']);
    }
}

// Helper function to display messages
function displayMessage(element, message, color) {
    element.innerText = message;
    element.style.color = color;
}

// Helper function to clear input fields
function clearInputFields(fieldIds) {
    fieldIds.forEach(id => document.getElementById(id).value = '');
}

// Helper function to redirect to another page
function redirectToPage(url) {
    setTimeout(() => location.href = url, 1500);
}
