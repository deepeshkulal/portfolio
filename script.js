document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault(); 
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight; 
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight; 
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Theme toggle with persistence
const themeToggle = document.getElementById('theme-toggle');
const themeLink = document.getElementById('theme-link');

let currentTheme = localStorage.getItem('theme') || 'light_theme.css'; 
themeLink.href = currentTheme;

themeToggle.addEventListener('click', () => {
    if (currentTheme === 'light_theme.css') {
        themeLink.href = 'dark_theme.css'; 
        currentTheme = 'dark_theme.css';
    } else {
        themeLink.href = 'light_theme.css'; 
        currentTheme = 'light_theme.css';
    }
    localStorage.setItem('theme', currentTheme);
});

// Form submission with validation and loading state
document.querySelector('#contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = e.target.querySelector('input[placeholder="Your Name"]').value;
    const email = e.target.querySelector('input[placeholder="Your Email"]').value;
    const message = e.target.querySelector('textarea[placeholder="Your Message"]').value;

    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Simple email format validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Disable the submit button and show loading message
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    emailjs.send('service_e0t7rsp', 'template_7ytmk7h', {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function(response) {
        alert('Email sent successfully!');
        e.target.reset();
    }, function(error) {
        console.error('Error sending email:', error); 
        alert('Failed to send email. Please try again later.');
    })
    .finally(() => {
        // Re-enable the submit button and reset its text
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });
});
