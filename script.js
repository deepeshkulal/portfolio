document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault(); 
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Get the theme toggle element and the link to the CSS file
const themeToggle = document.getElementById('theme-toggle');
const themeLink = document.getElementById('theme-link');

// Initialize the current theme
let currentTheme = 'light_theme.css'; // Set the default theme

// Function to toggle the theme
themeToggle.addEventListener('click', () => {
    // Check the current theme and switch it
    if (currentTheme === 'light_theme.css') {
        themeLink.href = 'dark_theme.css'; // Change to dark theme
        currentTheme = 'dark_theme.css';
    } else {
        themeLink.href = 'light_theme.css'; // Change to light theme
        currentTheme = 'light_theme.css';
    }
});

// Form submission handler
document.querySelector('#contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = e.target.querySelector('input[placeholder="Your Name"]').value;
    const email = e.target.querySelector('input[placeholder="Your Email"]').value;
    const message = e.target.querySelector('textarea[placeholder="Your Message"]').value;

    emailjs.send('service_e0t7rsp', 'template_7ytmk7h', {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function(response) {
        alert('Email sent successfully!');
        // Optionally clear the form after sending
        e.target.reset();
    }, function(error) {
        console.error('Error sending email:', error); // Log the error
        alert('Failed to send email. Please try again later.');
    });
});
