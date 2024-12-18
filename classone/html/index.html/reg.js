function sign_up() {
    // Step 1: Check if the user has entered any valid info.
    const firstName = document.getElementById('fname').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const phoneNumber = document.getElementById('tel').value.trim();
    const userPassword = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    const firstNameLength = firstName.length;
    const lastNameLength = lastName.length;
    const phoneLength = phoneNumber.length;
    const passwordLength = userPassword.length;
    const confirmPasswordLength = confirmPassword.length;

    const feedbackMessage = document.querySelector('#info');
    const passwordWarning = document.querySelector('#pwd_warn');
    const nameWarning = document.querySelector('#fname_warn');

    // Step 2: Monitor the info entered.
    if (passwordLength !== 0 && firstNameLength !== 0 && lastNameLength !== 0 && phoneLength !== 0) {
        
        //  using regular expressions.
        
        //  Password should contain at least 4 digits
        const passwordPattern = /\d{4}/;
        if (passwordPattern.test(userPassword)) {
            
            //  First name and last name should contain at least one letter
            const namePattern = /[a-z]/i;
            if (namePattern.test(firstName) && namePattern.test(lastName)) {

                //  Phone number should be at least 11 digits
                const phonePattern = /\d{11,}/;
                if (phonePattern.test(phoneNumber)) {

                    //  Validate and store the gender info
                    const genderRadios = document.getElementsByClassName('status');
                    let selectedGender = null;

                    for (let i = 0; i < genderRadios.length; i++) {
                        if (genderRadios[i].checked) {
                            selectedGender = genderRadios[i].value;
                            break;
                        }
                    }

                    // If gender is not selected, show an alert
                    if (!selectedGender) {
                        alert('Please select a gender.');
                        return;
                    }

                    // Retrieve user data from localStorage
                    let existingUserData = localStorage.getItem('userData');
                    let newUserData = [];

                    //  If no existing data, create new entry
                    if (existingUserData === null || existingUserData === undefined) {
                        newUserData.push({ firstName, lastName, userPassword, phoneNumber, selectedGender });
                        localStorage.setItem('userData', JSON.stringify(newUserData));
                        feedbackMessage.style.background = 'linear-gradient(to right, red, green)';
                        feedbackMessage.style.color = 'aliceblue';
                        feedbackMessage.textContent = 'Registration Successful';
                    } else {
                        //  If data exists, check for duplicates
                        let parsedUserData = JSON.parse(existingUserData);
                        let isUserExisting = false;

                        for (let i = 0; i < parsedUserData.length; i++) {
                            if (parsedUserData[i].firstName === firstName || parsedUserData[i].userPassword === userPassword || parsedUserData[i].phoneNumber === phoneNumber) {
                                isUserExisting = true;
                                break;
                            }
                        }

                        if (isUserExisting) {
                            feedbackMessage.style.background = 'red';
                            feedbackMessage.style.color = 'aliceblue';
                            feedbackMessage.textContent = 'User already exists!';
                            alert('User already exists!');
                        } else {
                            parsedUserData.push({ firstName, lastName, phoneNumber, userPassword, selectedGender });
                            localStorage.setItem('userData', JSON.stringify(parsedUserData));
                            feedbackMessage.style.background = 'linear-gradient(to right, red, green)';
                            feedbackMessage.style.color = 'aliceblue';
                            feedbackMessage.textContent = 'Registration Successful';
                        }
                    }
                } else {
                    // Invalid phone number (should be at least 11 digits)
                    nameWarning.style.color = 'aliceblue';
                    nameWarning.style.backgroundColor = 'red';
                    nameWarning.textContent = 'Phone number must have at least 11 digits';
                }

            } else {
                // Invalid name (should contain letters)
                nameWarning.style.color = 'aliceblue';
                nameWarning.style.backgroundColor = 'red';
                nameWarning.textContent = 'Name must contain letters only';
            }
        } else {
            // Invalid password (should contain at least 4 digits)
            passwordWarning.style.color = 'aliceblue';
            passwordWarning.style.backgroundColor = 'red';
            passwordWarning.textContent = 'Password must contain at least 4 digits';
        }
    } else {
        // Fill all required fields
        feedbackMessage.style.color = 'aliceblue';
        feedbackMessage.style.backgroundColor = 'red';
        feedbackMessage.textContent = 'Please fill all the required fields';
    }
}
