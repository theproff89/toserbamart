// script.js

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {

    // Search functionality
    const searchForm = document.querySelector('.form-inline');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            alert(`Mencari: ${query}`);
            // You can add your search logic here
        } else {
            alert('Masukkan kata kunci untuk mencari.');
        }
    });

    // Newsletter subscription form functionality
    const newsletterForm = document.querySelector('.newsletter-section form');
    const emailInput = document.getElementById('email');

    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value.trim();
        if (validateEmail(email)) {
            alert(`Berlangganan berhasil dengan email: ${email}`);
            // You can add your subscription logic here
        } else {
            alert('Masukkan alamat email yang valid.');
        }
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
