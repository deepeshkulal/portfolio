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

const themeToggle = document.getElementById('theme-toggle');
const themeLink = document.getElementById('theme-link');

let currentTheme = 'light_theme.css'; 

themeToggle.addEventListener('click', () => {
    if (currentTheme === 'light_theme.css') {
        themeLink.href = 'dark_theme.css'; 
        currentTheme = 'dark_theme.css';
    } else {
        themeLink.href = 'light_theme.css'; 
        currentTheme = 'light_theme.css';
    }
});

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
        e.target.reset();
    }, function(error) {
        console.error('Error sending email:', error); 
        alert('Failed to send email. Please try again later.');
    });
});
