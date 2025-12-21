// OTTO Demo Builder JavaScript

let demoConfig = {
    businessName: '',
    industry: '',
    logo: null,
    brandColor: '#3AB573',
    faqs: [],
    businessHours: '',
    bookingLink: ''
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupFormListeners();
    setupFaqBuilder();
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

    // Booking Link
    document.getElementById('bookingLink').addEventListener('input', function(e) {
        demoConfig.bookingLink = e.target.value;
        updatePreview();
    });

    // Launch Demo Button
    document.getElementById('launchDemoBtn').addEventListener('click', function() {
        saveConfigToStorage();
        window.open('demo-chat.html', '_blank', 'width=400,height=600');
    });

    // View Dashboard Button
    document.getElementById('viewDashboardBtn').addEventListener('click', function() {
        saveConfigToStorage();
        window.location.href = 'demo-dashboard.html';
    });
}

// FAQ Builder
function setupFaqBuilder() {
    document.getElementById('addFaqBtn').addEventListener('click', addFaqField);

    // Add initial listeners
    updateFaqListeners();
}

function addFaqField() {
    const faqList = document.getElementById('faqList');
    if (faqList.children.length >= 5) {
        alert('Maximum 5 FAQs allowed for demo');
        return;
    }

    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item-builder';
    faqItem.innerHTML = `
        <input type="text" placeholder="Question" class="faq-question" required>
        <textarea placeholder="Answer" class="faq-answer" rows="2" required></textarea>
        <button type="button" class="btn-secondary remove-faq-btn">Remove</button>
    `;
    faqList.appendChild(faqItem);

    updateFaqListeners();
}

function updateFaqListeners() {
    const faqItems = document.querySelectorAll('.faq-item-builder');

    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const removeBtn = item.querySelector('.remove-faq-btn');

        question.addEventListener('input', updateFaqsFromForm);
        answer.addEventListener('input', updateFaqsFromForm);

        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                item.remove();
                updateFaqsFromForm();
                updateButtons();
            });
        }
    });
}

function updateFaqsFromForm() {
    const faqItems = document.querySelectorAll('.faq-item-builder');
    demoConfig.faqs = [];

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question').value;
        const answer = item.querySelector('.faq-answer').value;

        if (question && answer) {
            demoConfig.faqs.push({ question, answer });
        }
    });

    updatePreview();
    updateButtons();
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

    const isValid = demoConfig.businessName &&
                    demoConfig.industry &&
                    demoConfig.faqs.length >= 2;

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
        document.getElementById('bookingLink').value = demoConfig.bookingLink || '';

        updatePreview();
        updateButtons();
    }
}
