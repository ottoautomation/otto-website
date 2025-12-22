// OTTO Onboarding Form JavaScript - Complete Rewrite

let currentStep = 1;
let totalSteps = 8; // Default for Starter (skips step 8)
let selectedPlan = 'starter';
let formData = {};
let faqCount = 0;
let maxFaqs = 25; // Default for Starter

// Plan configurations
const planConfig = {
    starter: {
        name: 'Starter Plan',
        badge: 'starter',
        totalSteps: 8, // 1-7, then 9 (skip 8)
        skipSteps: [8],
        maxFaqs: 25,
        features: [
            'Custom branded chatbot',
            'Up to 25 FAQ questions',
            '3 conversation paths',
            'Lead capture (name, email, phone)',
            'Email & SMS notifications',
            'Booking request collection',
            '1 monthly update',
            'Email support (1 business day)'
        ]
    },
    pro: {
        name: 'Pro Plan',
        badge: 'pro',
        totalSteps: 9,
        skipSteps: [],
        maxFaqs: 100,
        features: [
            'Everything in Starter',
            'Up to 100 FAQ questions',
            '10 conversation workflows',
            'Smart lead qualification',
            'Google Calendar sync',
            'CRM integration (Zapier/Make)',
            'Analytics dashboard',
            '3 monthly updates',
            'Priority support (4-hour response)'
        ]
    },
    elite: {
        name: 'Elite Plan',
        badge: 'elite',
        totalSteps: 9,
        skipSteps: [],
        maxFaqs: 999, // Unlimited
        features: [
            'Everything in Pro',
            'Unlimited FAQ questions',
            '25 conversation workflows',
            'Email follow-up sequences',
            'SMS follow-ups',
            'Department routing',
            'Human handoff capability',
            'Advanced support flows',
            '8 monthly updates',
            'VIP support (2-hour response)'
        ]
    }
};

// Step names for progress bar
const stepNames = {
    starter: ['Business', 'Location', 'Branding', 'Services', 'FAQs', 'Leads', 'Booking', 'Review'],
    pro: ['Business', 'Location', 'Branding', 'Services', 'FAQs', 'Leads', 'Booking', 'Integrations', 'Review'],
    elite: ['Business', 'Location', 'Branding', 'Services', 'FAQs', 'Leads', 'Booking', 'Integrations', 'Review']
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    selectedPlan = (urlParams.get('plan') || 'starter').toLowerCase();

    if (!planConfig[selectedPlan]) {
        selectedPlan = 'starter';
    }

    initializePlan();
    setupEventListeners();
    initializeFAQs();
    updateProgressBar();
});

// Initialize based on plan
function initializePlan() {
    const config = planConfig[selectedPlan];
    maxFaqs = config.maxFaqs;

    // Update plan badge
    const planBadge = document.getElementById('planBadge');
    planBadge.textContent = config.name;
    planBadge.className = 'plan-badge ' + config.badge;

    // Update plan info box
    const planInfoBox = document.getElementById('planInfoBox');
    planInfoBox.innerHTML = `
        <h3>What's Included in Your ${config.name}</h3>
        <ul>
            ${config.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
    `;

    // Update FAQ description
    const faqDesc = document.getElementById('faqDescription');
    if (selectedPlan === 'elite') {
        faqDesc.textContent = 'Add unlimited FAQs. OTTO will answer these automatically.';
    } else {
        faqDesc.textContent = `Add up to ${maxFaqs} questions customers ask most often. OTTO will answer these automatically.`;
    }

    // Show/hide Pro features step
    if (selectedPlan === 'starter') {
        document.getElementById('proFeaturesStep').style.display = 'none';
    } else {
        document.getElementById('proFeaturesStep').style.display = '';
        document.getElementById('advancedFeaturesTitle').textContent =
            selectedPlan === 'elite' ? 'Elite Features & Integrations' : 'Pro Features & Integrations';
    }

    // Show Elite-only features
    if (selectedPlan === 'elite') {
        document.getElementById('eliteFeatures').style.display = 'block';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Form submission
    document.getElementById('onboardingForm').addEventListener('submit', handleSubmit);

    // Color picker
    const colorInput = document.getElementById('brandColor');
    if (colorInput) {
        colorInput.addEventListener('input', function(e) {
            document.getElementById('colorHex').textContent = e.target.value.toUpperCase();
        });
    }

    // Logo upload
    const logoUpload = document.getElementById('logoUpload');
    if (logoUpload) {
        logoUpload.addEventListener('change', handleLogoUpload);
    }

    // Booking toggle
    document.querySelectorAll('input[name="booking_enabled"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('bookingDetails').style.display =
                this.value === 'yes' ? 'block' : 'none';
        });
    });
}

// Initialize FAQ section
function initializeFAQs() {
    // Add initial FAQs based on plan
    const initialFaqs = selectedPlan === 'starter' ? 3 : 5;
    for (let i = 0; i < initialFaqs; i++) {
        addFAQ();
    }
}

// Add FAQ field
function addFAQ() {
    if (faqCount >= maxFaqs) {
        alert(`Maximum ${maxFaqs} FAQs allowed for your plan.`);
        return;
    }

    faqCount++;
    const container = document.getElementById('faqContainer');
    const faqDiv = document.createElement('div');
    faqDiv.className = 'faq-item';
    faqDiv.id = `faq-${faqCount}`;
    faqDiv.innerHTML = `
        <div class="faq-item-header">
            <span class="faq-number">${faqCount}</span>
            ${faqCount > 2 ? `<button type="button" class="faq-remove" onclick="removeFAQ(${faqCount})">×</button>` : ''}
        </div>
        <div class="form-field" style="margin-bottom: var(--spacing-sm);">
            <input type="text" name="faq_q_${faqCount}" placeholder="Question: e.g., What are your hours?" ${faqCount <= 2 ? 'required' : ''}>
        </div>
        <div class="form-field" style="margin-bottom: 0;">
            <textarea name="faq_a_${faqCount}" placeholder="Answer: e.g., We're open Monday-Friday 9am-5pm..." style="min-height: 70px;" ${faqCount <= 2 ? 'required' : ''}></textarea>
        </div>
    `;
    container.appendChild(faqDiv);

    // Update add button text
    updateAddFaqButton();
}

// Remove FAQ
function removeFAQ(id) {
    const faq = document.getElementById(`faq-${id}`);
    if (faq) {
        faq.remove();
        renumberFAQs();
    }
}

// Renumber FAQs after removal
function renumberFAQs() {
    const faqs = document.querySelectorAll('#faqContainer .faq-item');
    faqCount = faqs.length;
    faqs.forEach((faq, index) => {
        const num = index + 1;
        faq.querySelector('.faq-number').textContent = num;
    });
    updateAddFaqButton();
}

// Update add FAQ button
function updateAddFaqButton() {
    const btn = document.getElementById('addFaqBtn');
    if (faqCount >= maxFaqs) {
        btn.style.display = 'none';
    } else {
        btn.style.display = '';
        btn.textContent = `+ Add Another FAQ (${faqCount}/${maxFaqs === 999 ? '∞' : maxFaqs})`;
    }
}

// Toggle checkbox card
function toggleCheckbox(card) {
    const checkbox = card.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    card.classList.toggle('selected', checkbox.checked);
}

// Update progress bar
function updateProgressBar() {
    const progressSteps = document.getElementById('progressSteps');
    const names = stepNames[selectedPlan];
    const config = planConfig[selectedPlan];

    progressSteps.innerHTML = '';

    let displayStep = 0;
    for (let i = 1; i <= 9; i++) {
        if (config.skipSteps.includes(i)) continue;
        displayStep++;

        const step = document.createElement('div');
        step.className = 'progress-step';

        const actualCurrent = getDisplayStepNumber(currentStep);
        if (displayStep < actualCurrent) {
            step.classList.add('completed');
        } else if (displayStep === actualCurrent) {
            step.classList.add('active');
        }

        step.innerHTML = `
            <div class="step-circle">${displayStep}</div>
            <div class="step-label">${names[displayStep - 1] || ''}</div>
        `;

        progressSteps.appendChild(step);
    }
}

// Get display step number (accounting for skipped steps)
function getDisplayStepNumber(actualStep) {
    const config = planConfig[selectedPlan];
    let display = actualStep;
    for (const skip of config.skipSteps) {
        if (actualStep > skip) display--;
    }
    return display;
}

// Get next valid step
function getNextStep(current) {
    const config = planConfig[selectedPlan];
    let next = current + 1;
    while (config.skipSteps.includes(next) && next <= 9) {
        next++;
    }
    return next > 9 ? 9 : next;
}

// Get previous valid step
function getPrevStep(current) {
    const config = planConfig[selectedPlan];
    let prev = current - 1;
    while (config.skipSteps.includes(prev) && prev >= 1) {
        prev--;
    }
    return prev < 1 ? 1 : prev;
}

// Navigate to next step
function nextStep() {
    if (!validateStep(currentStep)) {
        return;
    }

    saveStepData(currentStep);

    const nextStepNum = getNextStep(currentStep);
    if (nextStepNum <= 9) {
        document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
        currentStep = nextStepNum;
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');

        if (currentStep === 9) {
            populateReviewSummary();
        }

        updateProgressBar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Navigate to previous step
function prevStep() {
    const prevStepNum = getPrevStep(currentStep);
    if (prevStepNum >= 1) {
        document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
        currentStep = prevStepNum;
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');

        updateProgressBar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Validate current step
function validateStep(step) {
    const section = document.querySelector(`[data-step="${step}"]`);
    const requiredFields = section.querySelectorAll('[required]');

    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.focus();
            field.style.borderColor = '#ef4444';
            setTimeout(() => { field.style.borderColor = ''; }, 3000);
            return false;
        }
    }
    return true;
}

// Save step data
function saveStepData(step) {
    const section = document.querySelector(`[data-step="${step}"]`);
    const inputs = section.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        } else if (input.type === 'radio') {
            if (input.checked) formData[input.name] = input.value;
        } else if (input.type === 'file') {
            // Handled separately
        } else {
            formData[input.name] = input.value;
        }
    });
}

// Handle logo upload
function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert('Logo file must be under 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('logoPreview');
            preview.innerHTML = `<img src="${event.target.result}" alt="Logo Preview">`;
            preview.classList.add('active');
            formData.logo_data = event.target.result;
            formData.logo_filename = file.name;
        };
        reader.readAsDataURL(file);
    }
}

// Populate review summary
function populateReviewSummary() {
    // Collect all FAQs
    const faqs = [];
    document.querySelectorAll('#faqContainer .faq-item').forEach((item, index) => {
        const q = item.querySelector(`input[name^="faq_q"]`)?.value;
        const a = item.querySelector(`textarea[name^="faq_a"]`)?.value;
        if (q && a) faqs.push({ question: q, answer: a });
    });
    formData.faqs = faqs;

    // Collect selected features
    const selectedFeatures = [];
    document.querySelectorAll('.checkbox-card.selected input').forEach(input => {
        selectedFeatures.push(input.name);
    });

    const summary = document.getElementById('reviewSummary');
    summary.innerHTML = `
        <div class="review-section">
            <h4>Business Information</h4>
            <div class="review-grid">
                <div class="review-item"><strong>Business:</strong> <span>${formData.business_name || 'N/A'}</span></div>
                <div class="review-item"><strong>Industry:</strong> <span>${formatIndustry(formData.industry)}</span></div>
                <div class="review-item"><strong>Phone:</strong> <span>${formData.business_phone || 'N/A'}</span></div>
                <div class="review-item"><strong>Email:</strong> <span>${formData.business_email || 'N/A'}</span></div>
                <div class="review-item"><strong>Website:</strong> <span>${formData.business_website || 'N/A'}</span></div>
                <div class="review-item"><strong>Service Area:</strong> <span>${formData.service_area || 'N/A'}</span></div>
            </div>
        </div>

        <div class="review-section">
            <h4>Hours & Availability</h4>
            <div class="review-grid">
                <div class="review-item"><strong>Hours:</strong> <span>${formData.business_hours || 'N/A'}</span></div>
                <div class="review-item"><strong>Timezone:</strong> <span>${formData.timezone || 'N/A'}</span></div>
                <div class="review-item"><strong>Emergency:</strong> <span>${formData.emergency_available === 'yes' ? 'Yes, 24/7' : formData.emergency_available === 'limited' ? 'Limited' : 'No'}</span></div>
            </div>
        </div>

        <div class="review-section">
            <h4>Branding</h4>
            <div class="review-grid">
                <div class="review-item"><strong>Brand Color:</strong> <span style="display:inline-block;width:20px;height:20px;background:${formData.brand_color};border-radius:4px;vertical-align:middle;margin-right:8px;"></span>${formData.brand_color || '#3AB573'}</div>
                <div class="review-item"><strong>Chatbot Name:</strong> <span>${formData.chatbot_name || 'OTTO (default)'}</span></div>
                <div class="review-item"><strong>Logo:</strong> <span>${formData.logo_filename || 'Not uploaded'}</span></div>
            </div>
        </div>

        <div class="review-section">
            <h4>FAQs Added (${faqs.length})</h4>
            <ul class="review-list">
                ${faqs.slice(0, 5).map(f => `<li>${f.question}</li>`).join('')}
                ${faqs.length > 5 ? `<li>...and ${faqs.length - 5} more</li>` : ''}
            </ul>
        </div>

        <div class="review-section">
            <h4>Booking & Notifications</h4>
            <div class="review-grid">
                <div class="review-item"><strong>Booking:</strong> <span>${formData.booking_enabled === 'yes' ? 'Enabled' : 'Disabled'}</span></div>
                <div class="review-item"><strong>Notification Email:</strong> <span>${formData.notification_email || 'N/A'}</span></div>
                <div class="review-item"><strong>SMS Notifications:</strong> <span>${formData.notification_sms || 'Not set'}</span></div>
            </div>
        </div>

        ${selectedPlan !== 'starter' ? `
        <div class="review-section">
            <h4>Integrations</h4>
            <div class="review-grid">
                <div class="review-item"><strong>Calendar:</strong> <span>${formatProvider(formData.calendar_provider)}</span></div>
                <div class="review-item"><strong>CRM:</strong> <span>${formatProvider(formData.crm_provider)}</span></div>
            </div>
        </div>
        ` : ''}

        ${selectedFeatures.length > 0 ? `
        <div class="review-section">
            <h4>Selected Features</h4>
            <ul class="review-list">
                ${selectedFeatures.map(f => `<li>${formatFeatureName(f)}</li>`).join('')}
            </ul>
        </div>
        ` : ''}
    `;
}

// Format helpers
function formatIndustry(industry) {
    if (!industry) return 'N/A';
    return industry.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function formatProvider(provider) {
    if (!provider || provider === 'none') return 'None';
    const names = {
        'google': 'Google Calendar',
        'outlook': 'Outlook',
        'calendly': 'Calendly',
        'cal.com': 'Cal.com',
        'acuity': 'Acuity',
        'hubspot': 'HubSpot',
        'salesforce': 'Salesforce',
        'pipedrive': 'Pipedrive',
        'zoho': 'Zoho CRM',
        'gohighlevel': 'GoHighLevel',
        'monday': 'Monday.com'
    };
    return names[provider] || provider;
}

function formatFeatureName(name) {
    const names = {
        'collect_address': 'Collect Address',
        'collect_company': 'Collect Company Name',
        'collect_budget': 'Collect Budget',
        'collect_timeline': 'Collect Timeline',
        'collect_referral': 'Collect Referral Source',
        'collect_notes': 'Collect Additional Notes',
        'qualify_budget': 'Budget Qualification',
        'qualify_timeline': 'Timeline Qualification',
        'qualify_decision_maker': 'Decision Maker Check',
        'qualify_project_scope': 'Project Scope',
        'feature_email_sequences': 'Email Follow-up Sequences',
        'feature_sms_followup': 'SMS Follow-ups',
        'feature_dept_routing': 'Department Routing',
        'feature_human_handoff': 'Human Handoff',
        'feature_support_flows': 'Support Flows',
        'feature_sales_automation': 'Sales Automation'
    };
    return names[name] || name;
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    saveStepData(currentStep);

    // Collect all FAQs
    const faqs = [];
    document.querySelectorAll('#faqContainer .faq-item').forEach(item => {
        const q = item.querySelector('input')?.value;
        const a = item.querySelector('textarea')?.value;
        if (q && a) faqs.push({ question: q, answer: a });
    });

    // Collect selected options
    const collectFields = [];
    const qualifyFields = [];
    const eliteFeatures = [];

    document.querySelectorAll('.checkbox-card.selected input').forEach(input => {
        if (input.name.startsWith('collect_')) collectFields.push(input.name.replace('collect_', ''));
        if (input.name.startsWith('qualify_')) qualifyFields.push(input.name.replace('qualify_', ''));
        if (input.name.startsWith('feature_')) eliteFeatures.push(input.name.replace('feature_', ''));
    });

    const clientId = 'CLIENT-' + Date.now();

    const submissionData = {
        clientId: clientId,
        plan: selectedPlan,
        timestamp: new Date().toISOString(),

        // Business Info
        businessName: formData.business_name,
        businessDescription: formData.business_description,
        industry: formData.industry,
        phone: formData.business_phone,
        email: formData.business_email,
        website: formData.business_website,

        // Location & Hours
        serviceArea: formData.service_area,
        timezone: formData.timezone,
        businessHours: formData.business_hours,
        emergencyAvailable: formData.emergency_available,

        // Branding
        brandColor: formData.brand_color,
        welcomeMessage: formData.welcome_message,
        chatbotName: formData.chatbot_name,
        logoFilename: formData.logo_filename,
        logoData: formData.logo_data || null,

        // Services
        services: formData.services,
        pricingInfo: formData.pricing_info,

        // FAQs
        faqs: faqs,
        faqCount: faqs.length,

        // Lead Capture
        collectFields: collectFields,

        // Booking
        bookingEnabled: formData.booking_enabled === 'yes',
        appointmentTypes: formData.appointment_types,
        appointmentDuration: formData.appointment_duration,

        // Notifications
        notificationEmail: formData.notification_email,
        notificationSms: formData.notification_sms,

        // Pro Features
        calendarProvider: formData.calendar_provider,
        calendarLink: formData.calendar_link,
        crmProvider: formData.crm_provider,
        qualifyFields: qualifyFields,

        // Elite Features
        eliteFeatures: eliteFeatures,
        departments: formData.departments,
        deptEmails: formData.dept_emails,

        // Special Requests
        specialRequests: formData.special_requests
    };

    // Save to localStorage
    localStorage.setItem(`otto_onboarding_${clientId}`, JSON.stringify(submissionData));

    // Send to Google Sheets
    sendToGoogleSheets(submissionData);

    // Show success
    document.getElementById('onboardingForm').style.display = 'none';
    document.querySelector('.progress-bar-container').style.display = 'none';
    document.querySelector('.plan-info-box').style.display = 'none';

    // Set subscribe button link
    const subscribeButton = document.getElementById('subscribeButton');
    const monthlyLinks = {
        'starter': 'https://buy.stripe.com/3cI9AU5wj9gdd06cflebu0j',
        'pro': 'https://buy.stripe.com/dRmdRa3obdwt6BIcflebu0k',
        'elite': 'https://buy.stripe.com/7sY5kE9MzakhaRY0wDebu0l'
    };
    subscribeButton.href = monthlyLinks[selectedPlan] || '#';

    document.getElementById('successMessage').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Send to Google Sheets
async function sendToGoogleSheets(data) {
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyFE1fkZXa1DgPABM9xFjLXaBDJ4Yzl1vizS5sGLPhHHo2Dw6Aow-OC_Zq3XtlTGdow/exec';

    const payload = {
        clientId: data.clientId,
        plan: data.plan,
        businessName: data.businessName,
        industry: data.industry,
        email: data.email,
        phone: data.phone,
        website: data.website,
        serviceArea: data.serviceArea,
        hours: data.businessHours,
        emergency: data.emergencyAvailable,
        brandColor: data.brandColor,
        services: data.services,
        faqs: JSON.stringify(data.faqs),
        booking: data.bookingEnabled,
        calendar: data.calendarProvider,
        crm: data.crmProvider,
        specialRequests: data.specialRequests
    };

    try {
        await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        console.log('Saved to Google Sheets');
    } catch (error) {
        console.error('Google Sheets error:', error);
    }
}

// Submit form function (called by button click)
function submitForm() {
    handleSubmit(new Event('submit'));
}

// Make functions global
window.nextStep = nextStep;
window.prevStep = prevStep;
window.addFAQ = addFAQ;
window.removeFAQ = removeFAQ;
window.toggleCheckbox = toggleCheckbox;
window.submitForm = submitForm;
