document.addEventListener('DOMContentLoaded', function() {
    loadEntriesFromLocalStorage();
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    if (!name || !email || !password || !dob || !termsAccepted) {
        alert('Please fill all fields and accept the terms and conditions.');
        return;
    }
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    if (!validateDOB(dob)) {
        alert('Date of Birth must be between 18 and 55 years.');
        return;
    }

    saveEntryToLocalStorage(name, email, password, dob, termsAccepted);

    document.getElementById('registrationForm').reset();

    loadEntriesFromLocalStorage();
});

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function validateDOB(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age >= 18 && age <= 55;
}

function saveEntryToLocalStorage(name, email, password, dob, termsAccepted) {
    const entries = getEntriesFromLocalStorage();
    entries.push({ name, email, password, dob, termsAccepted });
    localStorage.setItem('formEntries', JSON.stringify(entries));
}

function getEntriesFromLocalStorage() {
    const entries = localStorage.getItem('formEntries');
    return entries ? JSON.parse(entries) : [];
}

function loadEntriesFromLocalStorage() {
    const entries = getEntriesFromLocalStorage();
    const tableBody = document.querySelector('#entriesTable tbody');
    tableBody.innerHTML = ''; // Clear the table body

    entries.forEach(entry => {
        const newRow = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = entry.name;
        newRow.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = entry.email;
        newRow.appendChild(emailCell);

        const passwordCell = document.createElement('td');
        passwordCell.textContent = entry.password; // To Mask the password entry.password.replace(/./g, '*')
        newRow.appendChild(passwordCell);

        const dobCell = document.createElement('td');
        dobCell.textContent = entry.dob;
        newRow.appendChild(dobCell);

        const termsCell = document.createElement('td');
        termsCell.textContent = entry.termsAccepted ? 'true' : 'false';
        newRow.appendChild(termsCell);

        tableBody.appendChild(newRow);
    });
}