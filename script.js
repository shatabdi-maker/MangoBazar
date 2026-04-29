// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
avLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for CTA buttons
document.querySelectorAll('.hero-cta .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const text = this.innerText;
        if (text.includes('অর্ডার')) {
            document.getElementById('varieties').scrollIntoView({ behavior: 'smooth' });
        } else if (text.includes('ধরন')) {
            document.getElementById('varieties').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add to cart functionality
const cartButtons = document.querySelectorAll('.btn-add-cart');
let cart = JSON.parse(localStorage.getItem('mangoBazarCart')) || [];

cartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.mango-card');
        const mangoName = card.querySelector('h3').innerText;
        const mangoPrice = card.querySelector('.price').innerText;

        const item = {
            id: Date.now(),
            name: mangoName,
            price: mangoPrice,
            quantity: 1,
            timestamp: new Date().toLocaleString()
        };

        cart.push(item);
        localStorage.setItem('mangoBazarCart', JSON.stringify(cart));

        // Show confirmation
        showNotification(`${mangoName} কার্টে যোগ করা হয়েছে!`);
        this.style.backgroundColor = '#2ecc71';
        this.innerText = '✓ যোগ করা হয়েছে';

        setTimeout(() => {
            this.style.backgroundColor = '';
            this.innerText = 'কার্টে যোগ করুন';
        }, 2000);
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.mango-card, .feature-card, .review-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Counter animation for discounts
function animateCounter(element, target, duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.innerText = target + '%';
            clearInterval(counter);
        } else {
            element.innerText = Math.floor(start) + '%';
        }
    }, 16);
}

// Scroll to top button
function createScrollTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #FF6B35;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.pointerEvents = 'auto';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.pointerEvents = 'none';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize scroll to top button
createScrollTopButton();

// Get cart count from localStorage
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('mangoBazarCart')) || [];
    return cart.length;
}

// Log cart status
console.log('MangoBazar loaded successfully!');
console.log('Items in cart:', updateCartCount());
