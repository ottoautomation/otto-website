// OTTO Demo Builder JavaScript

let demoConfig = {
    businessName: '',
    industry: '',
    logo: null,
    brandColor: '#3AB573',
    faqs: [],
    businessHours: ''
};

// Pre-filled FAQs for each business type
const industryFAQs = {
    'Home Services': [
        { question: 'What are your service hours?', answer: 'We offer service 7 days a week from 8am-8pm. Emergency services available 24/7.' },
        { question: 'Do you offer free estimates?', answer: 'Yes! We provide free, no-obligation estimates for all services.' },
        { question: 'What areas do you service?', answer: 'We service the entire metro area and surrounding communities within 50 miles.' },
        { question: 'Are you licensed and insured?', answer: 'Yes, we are fully licensed, bonded, and insured for your protection.' }
    ],
    'Professional Services': [
        { question: 'How much do you charge?', answer: 'Our rates vary by service. We offer a free initial consultation to discuss your needs and provide a quote.' },
        { question: 'What is your experience?', answer: 'Our team has over 20 years of combined experience serving clients in this area.' },
        { question: 'Do you offer free consultations?', answer: 'Yes, we offer a complimentary 30-minute consultation to discuss your needs.' },
        { question: 'How long does the process take?', answer: 'Timelines vary by project. We provide detailed timelines during your consultation.' }
    ],
    'Health & Wellness': [
        { question: 'Do you accept insurance?', answer: 'Yes, we accept most major insurance plans. Contact us to verify your specific coverage.' },
        { question: 'How do I schedule an appointment?', answer: 'You can book online, call us, or use this chat to schedule your appointment.' },
        { question: 'What are your office hours?', answer: 'We\'re open Monday-Friday 8am-6pm, and Saturday 9am-2pm.' },
        { question: 'Are you accepting new patients?', answer: 'Yes! We\'re currently accepting new patients and can often schedule within a week.' }
    ],
    'Real Estate': [
        { question: 'What areas do you serve?', answer: 'We serve the entire metro area and have extensive knowledge of all local neighborhoods.' },
        { question: 'How much is your commission?', answer: 'Our commission is competitive and we\'d be happy to discuss the details during a consultation.' },
        { question: 'How long does it take to sell a home?', answer: 'Average time varies by market conditions, typically 30-60 days with our proven marketing strategy.' },
        { question: 'Do you offer free home valuations?', answer: 'Yes! We provide complimentary, no-obligation home valuations.' }
    ],
    'Restaurants': [
        { question: 'What are your hours?', answer: 'We\'re open Monday-Thursday 11am-10pm, Friday-Saturday 11am-11pm, Sunday 10am-9pm.' },
        { question: 'Do you take reservations?', answer: 'Yes, we accept reservations online or by phone. Walk-ins are always welcome!' },
        { question: 'Do you offer catering?', answer: 'Yes! We provide full catering services for events of all sizes.' },
        { question: 'What are your most popular dishes?', answer: 'Our signature dishes include our house special and chef\'s tasting menu.' }
    ],
    'E-Commerce': [
        { question: 'What is your return policy?', answer: 'We offer 30-day returns on all items in original condition with tags attached.' },
        { question: 'How long does shipping take?', answer: 'Standard shipping is 5-7 business days. Express shipping available for 2-3 day delivery.' },
        { question: 'Do you ship internationally?', answer: 'Yes, we ship to most countries worldwide. Shipping costs calculated at checkout.' },
        { question: 'Do you offer free shipping?', answer: 'Yes! Free shipping on all orders over $50.' }
    ],
    'Auto Services': [
        { question: 'Do you offer free diagnostics?', answer: 'Yes, we provide complimentary diagnostics with any repair service.' },
        { question: 'How long will my repair take?', answer: 'Most repairs are completed same-day. We\'ll provide an accurate timeline when we assess your vehicle.' },
        { question: 'Do you offer warranties?', answer: 'Yes, all our work comes with a comprehensive warranty for your peace of mind.' },
        { question: 'Can I wait while my car is serviced?', answer: 'Absolutely! We have a comfortable waiting area with WiFi and refreshments.' }
    ],
    'Beauty & Spa': [
        { question: 'Do I need an appointment?', answer: 'Appointments are recommended to guarantee your preferred time, but we accept walk-ins based on availability.' },
        { question: 'What services do you offer?', answer: 'We offer a full range of services including hair, nails, facials, massage, and waxing.' },
        { question: 'What are your prices?', answer: 'Our prices vary by service. Check our services page or book a consultation for details.' },
        { question: 'Do you sell gift certificates?', answer: 'Yes! Gift certificates are available in any amount and make perfect gifts.' }
    ],
    'Construction': [
        { question: 'Are you licensed and insured?', answer: 'Yes, we are fully licensed, bonded, and insured with all required certifications.' },
        { question: 'Do you provide free estimates?', answer: 'Yes, we offer free, detailed estimates for all projects.' },
        { question: 'How long will my project take?', answer: 'Project timelines vary. We provide detailed schedules during the estimate process.' },
        { question: 'Do you offer financing?', answer: 'Yes, we partner with lenders to offer flexible financing options for qualified customers.' }
    ],
    'Education': [
        { question: 'What subjects do you tutor?', answer: 'We offer tutoring in all core subjects including math, science, English, and test prep.' },
        { question: 'Do you offer online or in-person sessions?', answer: 'We offer both! Choose what works best for your schedule and learning style.' },
        { question: 'What are your rates?', answer: 'Rates vary by subject and session length. Contact us for current pricing and package deals.' },
        { question: 'Do you offer a free trial session?', answer: 'Yes! We offer a complimentary first session to ensure we\'re the right fit.' }
    ],
    'Financial Services': [
        { question: 'What services do you offer?', answer: 'We provide comprehensive financial planning, investment management, tax services, and insurance solutions.' },
        { question: 'How do you charge for your services?', answer: 'We offer transparent fee structures. Schedule a consultation to discuss options that fit your needs.' },
        { question: 'Are you a fiduciary?', answer: 'Yes, we are legally bound to act in your best interest at all times.' },
        { question: 'Do you offer free consultations?', answer: 'Yes, we provide complimentary initial consultations to discuss your financial goals.' }
    ],
    'Pet Services': [
        { question: 'What are your hours?', answer: 'We\'re open Monday-Friday 8am-6pm, Saturday 9am-4pm. Emergency services available 24/7.' },
        { question: 'Do you accept walk-ins?', answer: 'We recommend appointments, but we do our best to accommodate walk-ins for urgent needs.' },
        { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, debit cards, cash, and pet insurance.' },
        { question: 'Do you offer grooming services?', answer: 'Yes! We offer full grooming services including baths, haircuts, and nail trims.' }
    ],
    'Marketing & Creative': [
        { question: 'What services do you provide?', answer: 'We offer full-service marketing including branding, digital marketing, content creation, and advertising.' },
        { question: 'How much do your services cost?', answer: 'We offer custom packages based on your needs and budget. Let\'s discuss your goals!' },
        { question: 'What is your typical project timeline?', answer: 'Timelines vary by project scope. We provide detailed schedules during our initial consultation.' },
        { question: 'Can you show me your portfolio?', answer: 'Absolutely! We\'d love to share our work and discuss how we can help your business grow.' }
    ],
    'IT & Technology': [
        { question: 'Do you offer 24/7 support?', answer: 'Yes! We provide round-the-clock support to ensure your systems stay running smoothly.' },
        { question: 'What is your response time?', answer: 'Critical issues are addressed within 1 hour. Standard requests within 4 business hours.' },
        { question: 'Do you support both Mac and PC?', answer: 'Yes, we support all major operating systems and platforms.' },
        { question: 'Do you offer remote support?', answer: 'Yes! Most issues can be resolved remotely for faster service.' }
    ],
    'Other': [
        { question: 'What are your business hours?', answer: 'We\'re open Monday-Friday 9am-5pm. Contact us anytime and we\'ll respond promptly!' },
        { question: 'How can I get a quote?', answer: 'Simply provide some details about your needs and we\'ll get back to you with a custom quote.' },
        { question: 'Do you offer free consultations?', answer: 'Yes! We offer complimentary consultations to discuss your needs and how we can help.' },
        { question: 'What makes you different?', answer: 'We pride ourselves on exceptional service, expertise, and putting our customers first.' }
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadConfigFromStorage();
    setupFormListeners();
    updatePreview();
});

// Form Listeners
function setupFormListeners() {
    // Business Name
    document.getElementById('businessName').addEventListener('input', function(e) {
        demoConfig.businessName = e.target.value;
        updateLogoInitials();
        updatePreview();
        updateButtons();
    });

    // Industry
    document.getElementById('industry').addEventListener('change', function(e) {
        demoConfig.industry = e.target.value;

        // Auto-populate FAQs based on industry
        if (demoConfig.industry && industryFAQs[demoConfig.industry]) {
            demoConfig.faqs = industryFAQs[demoConfig.industry];
        } else {
            demoConfig.faqs = [];
        }

        updatePreview();
        updateButtons();
    });

    // Logo Upload
    document.getElementById('logoUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                demoConfig.logo = event.target.result;
                document.getElementById('logoPreview').innerHTML = `<img src="${event.target.result}" alt="Logo">`;
                updatePreview();
            };
            reader.readAsDataURL(file);
        }
    });

    // Brand Color
    document.getElementById('brandColor').addEventListener('input', function(e) {
        demoConfig.brandColor = e.target.value;
        updatePreview();
    });

    // Business Hours
    document.getElementById('businessHours').addEventListener('input', function(e) {
        demoConfig.businessHours = e.target.value;
        updatePreview();
    });

    // Launch Demo Button
    document.getElementById('launchDemoBtn').addEventListener('click', function() {
        if (this.disabled) {
            showValidationMessage();
            return;
        }
        saveConfigToStorage();
        window.open('demo-chat.html', '_blank', 'width=400,height=600');
    });

    // View Dashboard Button
    document.getElementById('viewDashboardBtn').addEventListener('click', function() {
        if (this.disabled) {
            showValidationMessage();
            return;
        }
        saveConfigToStorage();
        window.location.href = 'demo-dashboard.html';
    });

    // Reset Demo Button
    document.getElementById('resetDemoBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to reset your demo? This will clear all your customizations.')) {
            localStorage.removeItem('ottoDemoConfig');
            location.reload();
        }
    });
}


// Update Logo Initials
function updateLogoInitials() {
    if (!demoConfig.logo && demoConfig.businessName) {
        const initials = demoConfig.businessName
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);

        document.getElementById('logoPreview').textContent = initials || 'AC';
    }
}

// Update Preview
function updatePreview() {
    const preview = document.getElementById('chatbotPreview');

    if (!demoConfig.businessName) {
        preview.innerHTML = `
            <div style="text-align: center; padding-top: 100px; color: var(--color-text-secondary);">
                <p>👆 Fill out the form to see your AI assistant</p>
            </div>
        `;
        return;
    }

    const logoHtml = demoConfig.logo
        ? `<img src="${demoConfig.logo}" alt="Logo" style="width: 40px; height: 40px; border-radius: 50%;">`
        : `<div style="width: 40px; height: 40px; background: ${demoConfig.brandColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #000;">${demoConfig.businessName.substring(0, 2).toUpperCase()}</div>`;

    preview.innerHTML = `
        <div style="display: flex; flex-direction: column; height: 100%; background: #1a1a1a; border-radius: 8px; overflow: hidden; border: 2px solid ${demoConfig.brandColor};">
            <!-- Chat Header -->
            <div style="background: ${demoConfig.brandColor}; color: #000; padding: 15px; display: flex; align-items: center; gap: 10px;">
                ${logoHtml}
                <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 16px;">${demoConfig.businessName}</div>
                    <div style="font-size: 12px; opacity: 0.8;">AI Assistant - Online</div>
                </div>
            </div>

            <!-- Chat Messages -->
            <div style="flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px;">
                <!-- Welcome Message -->
                <div style="background: rgba(58, 181, 115, 0.1); padding: 12px; border-radius: 8px; border-left: 3px solid ${demoConfig.brandColor};">
                    <div style="font-size: 14px; color: #fff;">Hi! I'm the AI assistant for ${demoConfig.businessName}. How can I help you today?</div>
                </div>

                ${demoConfig.faqs.length > 0 ? `
                <div style="margin-top: 10px;">
                    <div style="font-size: 12px; color: #999; margin-bottom: 8px;">Quick questions:</div>
                    ${demoConfig.faqs.slice(0, 3).map(faq => `
                        <div style="background: #0a0a0a; padding: 8px 12px; border-radius: 6px; margin-bottom: 6px; font-size: 13px; color: ${demoConfig.brandColor}; cursor: pointer;">
                            ${faq.question}
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>

            <!-- Chat Input -->
            <div style="padding: 15px; border-top: 1px solid #333;">
                <div style="display: flex; gap: 10px; align-items: center; background: #0a0a0a; padding: 10px; border-radius: 8px; border: 1px solid #333;">
                    <input type="text" placeholder="Type your message..." style="flex: 1; background: transparent; border: none; color: #fff; outline: none; font-size: 14px;">
                    <div style="background: ${demoConfig.brandColor}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                        <span style="color: #000; font-weight: 700;">→</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Update Buttons
function updateButtons() {
    const launchBtn = document.getElementById('launchDemoBtn');
    const dashboardBtn = document.getElementById('viewDashboardBtn');

    const isValid = demoConfig.businessName && demoConfig.industry;

    launchBtn.disabled = !isValid;
    dashboardBtn.disabled = !isValid;

    if (isValid) {
        launchBtn.style.opacity = '1';
        launchBtn.style.cursor = 'pointer';
        dashboardBtn.style.opacity = '1';
        dashboardBtn.style.cursor = 'pointer';
    } else {
        launchBtn.style.opacity = '0.5';
        launchBtn.style.cursor = 'not-allowed';
        dashboardBtn.style.opacity = '0.5';
        dashboardBtn.style.cursor = 'not-allowed';
    }

    // Update progress bar
    updateProgress();
}

// Update Progress Bar
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const completionBadge = document.getElementById('completionBadge');

    if (!progressFill || !progressPercent) return;

    let completedSteps = 0;
    const totalSteps = 3;

    // Check each required field
    if (demoConfig.businessName) completedSteps++;
    if (demoConfig.industry) completedSteps++;
    if (demoConfig.brandColor) completedSteps++;

    const percentage = Math.round((completedSteps / totalSteps) * 100);

    progressFill.style.width = percentage + '%';
    progressPercent.textContent = percentage + '%';

    // Show completion badge when 100%
    if (completionBadge) {
        if (percentage === 100) {
            completionBadge.style.display = 'block';
        } else {
            completionBadge.style.display = 'none';
        }
    }
}

// Save to LocalStorage
function saveConfigToStorage() {
    localStorage.setItem('ottoDemoConfig', JSON.stringify(demoConfig));
}

// Load from LocalStorage
function loadConfigFromStorage() {
    const saved = localStorage.getItem('ottoDemoConfig');
    if (saved) {
        demoConfig = JSON.parse(saved);
        // Populate form
        document.getElementById('businessName').value = demoConfig.businessName || '';
        document.getElementById('industry').value = demoConfig.industry || '';
        document.getElementById('brandColor').value = demoConfig.brandColor || '#3AB573';
        document.getElementById('businessHours').value = demoConfig.businessHours || '';

        // Restore logo
        if (demoConfig.logo) {
            document.getElementById('logoPreview').innerHTML = `<img src="${demoConfig.logo}" alt="Logo">`;
        } else {
            updateLogoInitials();
        }

        // Auto-populate FAQs based on loaded industry
        if (demoConfig.industry && industryFAQs[demoConfig.industry]) {
            demoConfig.faqs = industryFAQs[demoConfig.industry];
        }

        updatePreview();
        updateButtons();
    }
}

// Show Validation Message
function showValidationMessage() {
    let missingFields = [];

    if (!demoConfig.businessName) missingFields.push('Business Name');
    if (!demoConfig.industry) missingFields.push('Industry');

    const message = 'Please fill out the following required fields:\n\n' +
                    missingFields.map(field => '• ' + field).join('\n');

    alert(message);
}
