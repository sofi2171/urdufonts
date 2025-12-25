// Fonts data
const fonts = [
    {
        name: "Nastaliq",
        fileName: "nastaliq.ttf",
        sample: "اردو کی خوبصورتی",
        description: "Best for traditional Urdu calligraphy",
        size: "2.1 MB"
    },
    {
        name: "Naskh",
        fileName: "naskh.ttf",
        sample: "علم حاصل کرو",
        description: "Clear and easy to read",
        size: "1.8 MB"
    },
    {
        name: "Kufi",
        fileName: "kufi.ttf",
        sample: "اسلامی فن",
        description: "Classical Islamic style",
        size: "2.3 MB"
    },
    {
        name: "Thuluth",
        fileName: "thuluth.ttf",
        sample: "خطاطی کا فن",
        description: "Beautiful for calligraphy",
        size: "2.0 MB"
    },
    {
        name: "Diwani",
        fileName: "diwani.ttf",
        sample: "عثمانی طرز",
        description: "Beautiful Ottoman era font",
        size: "1.9 MB"
    },
    {
        name: "Ruqaa",
        fileName: "ruqaa.ttf",
        sample: "آسان لکھاوٹ",
        description: "For everyday use",
        size: "1.6 MB"
    }
];

// DOM Elements
const fontsGrid = document.getElementById('fontsGrid');

// Load fonts on page load
document.addEventListener('DOMContentLoaded', function() {
    loadFonts();
    setupSmoothScrolling();
});

// Load and display fonts
function loadFonts() {
    fontsGrid.innerHTML = '';
    
    fonts.forEach((font, index) => {
        const fontCard = createFontCard(font, index);
        fontsGrid.appendChild(fontCard);
    });
}

// Create font card element
function createFontCard(font, index) {
    const card = document.createElement('div');
    card.className = 'font-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <h3 class="font-name">${font.name}</h3>
        <div class="font-sample" style="font-family: '${font.name}', 'Noto Nastaliq Urdu', serif;">
            ${font.sample}
        </div>
        <div class="font-info">
            <p>${font.description}</p>
            <p><strong>سائز:</strong> ${font.size}</p>
        </div>
        <button class="download-btn" onclick="downloadFont('${font.fileName}', '${font.name}')">
            ڈاؤن لوڈ کریں
        </button>
    `;
    
    return card;
}

// Download font function
function downloadFont(fileName, fontName) {
    const button = event.target;
    const originalText = button.textContent;
    
    // Show ad modal first
    showAdModal(fileName, fontName, button, originalText);
}

// Show advertisement modal
function showAdModal(fileName, fontName, button, originalText) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'ad-modal';
    modal.innerHTML = `
        <div class="ad-content">
            <div class="ad-header">
                <h3>Please wait - Advertisement</h3>
                <span class="ad-timer" id="adTimer">5</span>
            </div>
            <div class="ad-body">
                <!-- Sample Ad Content -->
                <div class="sample-ad">
                    <h4>🎨 Design Tools Sale!</h4>
                    <p>Get 50% off on premium design software</p>
                    <img src="https://via.placeholder.com/300x200/4CAF50/white?text=Your+Ad+Here" alt="Advertisement">
                    <p>Limited time offer - Don't miss out!</p>
                </div>
            </div>
            <div class="ad-footer">
                <button class="download-after-ad" id="downloadBtn" disabled>
                    Download ${fontName} (<span id="countdown">5</span>s)
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Start countdown
    let countdown = 5;
    const timer = setInterval(() => {
        countdown--;
        document.getElementById('adTimer').textContent = countdown;
        document.getElementById('countdown').textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(timer);
            const downloadBtn = document.getElementById('downloadBtn');
            downloadBtn.disabled = false;
            downloadBtn.innerHTML = `Download ${fontName} Now!`;
            downloadBtn.onclick = () => {
                startDownload(fileName, fontName, button, originalText);
                document.body.removeChild(modal);
            };
        }
    }, 1000);
    
    // Close modal on outside click
    modal.onclick = (e) => {
        if (e.target === modal && countdown <= 0) {
            document.body.removeChild(modal);
        }
    };
}

// Actual download function
function startDownload(fileName, fontName, button, originalText) {
    // Show loading state
    button.innerHTML = '<span class="loading"></span> Downloading...';
    button.disabled = true;
    
    // Simulate download process
    setTimeout(() => {
        // Create download link
        const link = document.createElement('a');
        link.href = `assets/fonts/${fileName}`;
        link.download = fileName;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
        
        // Show success message
        showNotification(`${fontName} downloaded successfully!`, 'success');
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#000' : '#333'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1001;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize Monetag
function initializeMonetag() {
    // Monetag configuration
    window.monetag = window.monetag || [];
    
    // Push banner ads
    if (document.getElementById('monetag-banner-1')) {
        window.monetag.push({
            "zone": 7208309,
            "container": "monetag-banner-1"
        });
    }
    
    if (document.getElementById('monetag-banner-2')) {
        window.monetag.push({
            "zone": 7208310,
            "container": "monetag-banner-2"
        });
    }
    
    // Initialize pop-under
    window.monetag.push({"zone": 7208307});
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeMonetag, 1000);
});

// Observe font cards for animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const fontCards = document.querySelectorAll('.font-card');
        fontCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 100);
});

// Modal functions for Privacy Policy and Terms
function openModal(type) {
    const modal = document.getElementById('policyModal');
    const content = document.getElementById('modalContent');
    
    if (type === 'privacy') {
        content.innerHTML = `
            <h2>Privacy Policy</h2>
            <div class="modal-text">
                <h3>Information We Collect</h3>
                <p>We collect minimal information necessary to provide our font download service. This may include:</p>
                <ul>
                    <li>Download statistics and usage data</li>
                    <li>Browser information for compatibility</li>
                    <li>IP address for security purposes</li>
                </ul>

                <h3>How We Use Information</h3>
                <p>The information we collect is used to:</p>
                <ul>
                    <li>Improve our font collection and website</li>
                    <li>Ensure website security and prevent abuse</li>
                    <li>Analyze usage patterns to enhance user experience</li>
                </ul>

                <h3>Data Protection</h3>
                <p>We are committed to protecting your privacy and do not sell or share personal information with third parties.</p>

                <h3>Cookies</h3>
                <p>Our website may use cookies to enhance user experience and for analytics purposes.</p>

                <h3>Contact</h3>
                <p>If you have questions about this privacy policy, contact us at:</p>
                <p><strong>Email:</strong> sufiangsufiang15@gmail.com</p>
                <p><strong>Phone:</strong> 03447814644</p>
            </div>
        `;
    } else if (type === 'terms') {
        content.innerHTML = `
            <h2>Terms of Service</h2>
            <div class="modal-text">
                <h3>Font Usage License</h3>
                <p>The fonts provided on this website are free for:</p>
                <ul>
                    <li>Personal use</li>
                    <li>Commercial use</li>
                    <li>Educational purposes</li>
                    <li>Non-profit organizations</li>
                </ul>

                <h3>Restrictions</h3>
                <p>You may not:</p>
                <ul>
                    <li>Redistribute or resell the fonts</li>
                    <li>Claim ownership of the fonts</li>
                    <li>Modify the font files without permission</li>
                </ul>

                <h3>Disclaimer</h3>
                <p>Fonts are provided "as is" without warranty. We are not responsible for any issues arising from font usage.</p>

                <h3>Website Usage</h3>
                <p>By using this website, you agree to:</p>
                <ul>
                    <li>Use the service responsibly</li>
                    <li>Not attempt to harm or disrupt the website</li>
                    <li>Respect intellectual property rights</li>
                </ul>

                <h3>Contact</h3>
                <p>For questions about these terms, contact us at:</p>
                <p><strong>Email:</strong> sufiangsufiang15@gmail.com</p>
                <p><strong>Phone:</strong> 03447814644</p>
            </div>
        `;
    } else if (type === 'contact') {
        content.innerHTML = `
            <h2>Contact Us</h2>
            <div class="modal-text">
                <div style="text-align: center; padding: 2rem;">
                    <h3>Get in Touch</h3>
                    <p style="margin: 2rem 0; font-size: 1.2rem;">Have questions about our fonts or need support? We're here to help!</p>
                    
                    <div style="margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 10px;">
                        <h4>📞 Phone</h4>
                        <p style="font-size: 1.3rem; font-weight: bold; color: #333; margin: 1rem 0;">
                            <a href="tel:03447814644" style="color: #000; text-decoration: none;">03447814644</a>
                        </p>
                    </div>
                    
                    <div style="margin: 2rem 0; padding: 1.5rem; background: #f8f9fa; border-radius: 10px;">
                        <h4>📧 Email</h4>
                        <p style="font-size: 1.3rem; font-weight: bold; color: #333; margin: 1rem 0;">
                            <a href="mailto:sufiangsufiang15@gmail.com?subject=Urdu Fonts Inquiry&body=Hello, I have a question about your fonts..." style="color: #000; text-decoration: none;">sufiangsufiang15@gmail.com</a>
                        </p>
                    </div>
                    
                    <div style="margin: 3rem 0;">
                        <h4>Quick Contact</h4>
                        <a href="tel:03447814644" style="display: inline-block; background: #000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 10px;">📞 Call Now</a>
                        <a href="mailto:sufiangsufiang15@gmail.com?subject=Urdu Fonts Support Request&body=Hi,%0D%0A%0D%0AI need help with:%0D%0A%0D%0AThank you!" style="display: inline-block; background: #000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 10px;">📧 Send Email</a>
                    </div>
                    
                    <div style="margin: 2rem 0; padding: 1rem; border-top: 1px solid #ddd;">
                        <h4>Business Hours</h4>
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('policyModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('policyModal');
    if (event.target === modal) {
        closeModal();
    }
}