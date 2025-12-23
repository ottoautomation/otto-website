// OTTO Demo Builder JavaScript

let demoConfig = {
    businessName: '',
    industry: '',
    customIndustry: '',
    logo: null,
    brandColor: '#3AB573',
    faqs: [],
    businessHours: ''
};

// Pre-filled FAQs for each business type (5 FAQs each)
const industryFAQs = {
    'Home Services': [
        { question: 'What are your service hours?', answer: 'We offer service 7 days a week from 8am-8pm. Emergency services available 24/7.' },
        { question: 'Do you offer free estimates?', answer: 'Yes! We provide free, no-obligation estimates for all services.' },
        { question: 'What areas do you service?', answer: 'We service the entire metro area and surrounding communities within 50 miles.' },
        { question: 'Are you licensed and insured?', answer: 'Yes, we are fully licensed, bonded, and insured for your protection.' },
        { question: 'How quickly can you come out?', answer: 'For most service calls, we can schedule you within 24-48 hours. Emergency services are available same-day.' }
    ],
    'Professional Services': [
        { question: 'How much do you charge?', answer: 'Our rates vary by service. We offer a free initial consultation to discuss your needs and provide a quote.' },
        { question: 'What is your experience?', answer: 'Our team has over 20 years of combined experience serving clients in this area.' },
        { question: 'Do you offer free consultations?', answer: 'Yes, we offer a complimentary 30-minute consultation to discuss your needs.' },
        { question: 'How long does the process take?', answer: 'Timelines vary by project. We provide detailed timelines during your consultation.' },
        { question: 'What makes you different from competitors?', answer: 'We focus on personalized service, transparent communication, and delivering results that exceed expectations.' }
    ],
    'Health & Wellness': [
        { question: 'Do you accept insurance?', answer: 'Yes, we accept most major insurance plans. Contact us to verify your specific coverage.' },
        { question: 'How do I schedule an appointment?', answer: 'You can book online, call us, or use this chat to schedule your appointment.' },
        { question: 'What are your office hours?', answer: 'We\'re open Monday-Friday 8am-6pm, and Saturday 9am-2pm.' },
        { question: 'Are you accepting new patients?', answer: 'Yes! We\'re currently accepting new patients and can often schedule within a week.' },
        { question: 'What should I bring to my first visit?', answer: 'Please bring your ID, insurance card, any relevant medical records, and a list of current medications.' }
    ],
    'Real Estate': [
        { question: 'What areas do you serve?', answer: 'We serve the entire metro area and have extensive knowledge of all local neighborhoods.' },
        { question: 'How much is your commission?', answer: 'Our commission is competitive and we\'d be happy to discuss the details during a consultation.' },
        { question: 'How long does it take to sell a home?', answer: 'Average time varies by market conditions, typically 30-60 days with our proven marketing strategy.' },
        { question: 'Do you offer free home valuations?', answer: 'Yes! We provide complimentary, no-obligation home valuations.' },
        { question: 'Can you help me find a rental property?', answer: 'Absolutely! We assist with both buying/selling and rental properties. Let us know what you\'re looking for.' }
    ],
    'Restaurants': [
        { question: 'What are your hours?', answer: 'We\'re open Monday-Thursday 11am-10pm, Friday-Saturday 11am-11pm, Sunday 10am-9pm.' },
        { question: 'Do you take reservations?', answer: 'Yes, we accept reservations online or by phone. Walk-ins are always welcome!' },
        { question: 'Do you offer catering?', answer: 'Yes! We provide full catering services for events of all sizes.' },
        { question: 'What are your most popular dishes?', answer: 'Our signature dishes include our house special and chef\'s tasting menu.' },
        { question: 'Do you accommodate dietary restrictions?', answer: 'Yes! We offer vegetarian, vegan, gluten-free, and allergy-friendly options. Just let your server know.' }
    ],
    'E-Commerce': [
        { question: 'What is your return policy?', answer: 'We offer 30-day returns on all items in original condition with tags attached.' },
        { question: 'How long does shipping take?', answer: 'Standard shipping is 5-7 business days. Express shipping available for 2-3 day delivery.' },
        { question: 'Do you ship internationally?', answer: 'Yes, we ship to most countries worldwide. Shipping costs calculated at checkout.' },
        { question: 'Do you offer free shipping?', answer: 'Yes! Free shipping on all orders over $50.' },
        { question: 'How can I track my order?', answer: 'Once your order ships, you\'ll receive an email with tracking information. You can also check your order status in your account.' }
    ],
    'Auto Services': [
        { question: 'Do you offer free diagnostics?', answer: 'Yes, we provide complimentary diagnostics with any repair service.' },
        { question: 'How long will my repair take?', answer: 'Most repairs are completed same-day. We\'ll provide an accurate timeline when we assess your vehicle.' },
        { question: 'Do you offer warranties?', answer: 'Yes, all our work comes with a comprehensive warranty for your peace of mind.' },
        { question: 'Can I wait while my car is serviced?', answer: 'Absolutely! We have a comfortable waiting area with WiFi and refreshments.' },
        { question: 'Do you work on all vehicle makes and models?', answer: 'Yes, our certified technicians work on all makes and models, both domestic and foreign.' }
    ],
    'Beauty & Spa': [
        { question: 'Do I need an appointment?', answer: 'Appointments are recommended to guarantee your preferred time, but we accept walk-ins based on availability.' },
        { question: 'What services do you offer?', answer: 'We offer a full range of services including hair, nails, facials, massage, and waxing.' },
        { question: 'What are your prices?', answer: 'Our prices vary by service. Check our services page or book a consultation for details.' },
        { question: 'Do you sell gift certificates?', answer: 'Yes! Gift certificates are available in any amount and make perfect gifts.' },
        { question: 'What\'s your cancellation policy?', answer: 'We ask for 24 hours notice for cancellations. Late cancellations may be subject to a fee.' }
    ],
    'Construction': [
        { question: 'Are you licensed and insured?', answer: 'Yes, we are fully licensed, bonded, and insured with all required certifications.' },
        { question: 'Do you provide free estimates?', answer: 'Yes, we offer free, detailed estimates for all projects.' },
        { question: 'How long will my project take?', answer: 'Project timelines vary. We provide detailed schedules during the estimate process.' },
        { question: 'Do you offer financing?', answer: 'Yes, we partner with lenders to offer flexible financing options for qualified customers.' },
        { question: 'Do you handle permits?', answer: 'Yes, we handle all necessary permits and inspections as part of our service.' }
    ],
    'Education': [
        { question: 'What subjects do you tutor?', answer: 'We offer tutoring in all core subjects including math, science, English, and test prep.' },
        { question: 'Do you offer online or in-person sessions?', answer: 'We offer both! Choose what works best for your schedule and learning style.' },
        { question: 'What are your rates?', answer: 'Rates vary by subject and session length. Contact us for current pricing and package deals.' },
        { question: 'Do you offer a free trial session?', answer: 'Yes! We offer a complimentary first session to ensure we\'re the right fit.' },
        { question: 'How do you match students with tutors?', answer: 'We carefully match students based on learning style, subject needs, and personality for the best results.' }
    ],
    'Financial Services': [
        { question: 'What services do you offer?', answer: 'We provide comprehensive financial planning, investment management, tax services, and insurance solutions.' },
        { question: 'How do you charge for your services?', answer: 'We offer transparent fee structures. Schedule a consultation to discuss options that fit your needs.' },
        { question: 'Are you a fiduciary?', answer: 'Yes, we are legally bound to act in your best interest at all times.' },
        { question: 'Do you offer free consultations?', answer: 'Yes, we provide complimentary initial consultations to discuss your financial goals.' },
        { question: 'What\'s the minimum investment amount?', answer: 'We work with clients at various levels. Contact us to discuss how we can help with your specific situation.' }
    ],
    'Pet Services': [
        { question: 'What are your hours?', answer: 'We\'re open Monday-Friday 8am-6pm, Saturday 9am-4pm. Emergency services available 24/7.' },
        { question: 'Do you accept walk-ins?', answer: 'We recommend appointments, but we do our best to accommodate walk-ins for urgent needs.' },
        { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, debit cards, cash, and pet insurance.' },
        { question: 'Do you offer grooming services?', answer: 'Yes! We offer full grooming services including baths, haircuts, and nail trims.' },
        { question: 'Are you accepting new clients?', answer: 'Yes! We\'re always happy to welcome new furry friends to our family.' }
    ],
    'Marketing & Creative': [
        { question: 'What services do you provide?', answer: 'We offer full-service marketing including branding, digital marketing, content creation, and advertising.' },
        { question: 'How much do your services cost?', answer: 'We offer custom packages based on your needs and budget. Let\'s discuss your goals!' },
        { question: 'What is your typical project timeline?', answer: 'Timelines vary by project scope. We provide detailed schedules during our initial consultation.' },
        { question: 'Can you show me your portfolio?', answer: 'Absolutely! We\'d love to share our work and discuss how we can help your business grow.' },
        { question: 'Do you offer ongoing support?', answer: 'Yes! We offer monthly retainer packages for ongoing marketing support and campaign management.' }
    ],
    'IT & Technology': [
        { question: 'Do you offer 24/7 support?', answer: 'Yes! We provide round-the-clock support to ensure your systems stay running smoothly.' },
        { question: 'What is your response time?', answer: 'Critical issues are addressed within 1 hour. Standard requests within 4 business hours.' },
        { question: 'Do you support both Mac and PC?', answer: 'Yes, we support all major operating systems and platforms.' },
        { question: 'Do you offer remote support?', answer: 'Yes! Most issues can be resolved remotely for faster service.' },
        { question: 'Do you offer cybersecurity services?', answer: 'Absolutely! We provide comprehensive security assessments, monitoring, and protection for your business.' }
    ],
    'Cleaning Services': [
        { question: 'What cleaning services do you offer?', answer: 'We offer residential and commercial cleaning, deep cleaning, move-in/move-out cleaning, and regular maintenance.' },
        { question: 'Do you bring your own supplies?', answer: 'Yes! We bring all necessary cleaning supplies and equipment. We can also use your preferred products if requested.' },
        { question: 'Are your cleaners background checked?', answer: 'Yes, all our team members are thoroughly vetted, background checked, and insured.' },
        { question: 'How do you price your services?', answer: 'Pricing is based on home size and service type. We offer free estimates for all new clients.' },
        { question: 'Do you offer recurring cleaning schedules?', answer: 'Yes! We offer weekly, bi-weekly, and monthly cleaning schedules with discounted rates.' }
    ],
    'Photography & Videography': [
        { question: 'What types of photography do you offer?', answer: 'We specialize in weddings, portraits, events, commercial, and product photography.' },
        { question: 'How much do you charge?', answer: 'Our packages start at various price points. Contact us to discuss your specific needs and get a custom quote.' },
        { question: 'How long until I receive my photos?', answer: 'Edited photos are typically delivered within 2-4 weeks, depending on the project scope.' },
        { question: 'Do you travel for shoots?', answer: 'Yes! We\'re available for travel within the region and beyond. Travel fees may apply for distant locations.' },
        { question: 'Can I see your portfolio?', answer: 'Of course! Check out our website gallery or we can send you samples from similar projects.' }
    ],
    'Fitness & Personal Training': [
        { question: 'Do you offer personal training?', answer: 'Yes! We offer one-on-one personal training, small group sessions, and customized workout plans.' },
        { question: 'What are your membership options?', answer: 'We have monthly memberships, class packages, and personal training bundles to fit your goals and budget.' },
        { question: 'Do you offer a free trial?', answer: 'Yes! New members can try a free class or consultation to see if we\'re the right fit.' },
        { question: 'What are your hours?', answer: 'We\'re open Monday-Friday 5am-10pm, Saturday-Sunday 7am-8pm.' },
        { question: 'Do you have nutrition coaching?', answer: 'Yes! We offer nutrition guidance and meal planning as part of our training packages.' }
    ],
    'Event Planning': [
        { question: 'What types of events do you plan?', answer: 'We handle weddings, corporate events, parties, conferences, and special celebrations of all sizes.' },
        { question: 'How far in advance should I book?', answer: 'For larger events like weddings, we recommend 6-12 months. Smaller events can be planned in as little as 4-6 weeks.' },
        { question: 'What\'s included in your services?', answer: 'Our packages include venue coordination, vendor management, day-of coordination, and more. Fully customizable to your needs.' },
        { question: 'Do you offer partial planning services?', answer: 'Yes! We offer full planning, partial planning, and day-of coordination packages.' },
        { question: 'How do you charge for your services?', answer: 'We offer flat-rate packages and percentage-based pricing. Let\'s discuss what works best for your event.' }
    ],
    'Landscaping & Lawn Care': [
        { question: 'What services do you provide?', answer: 'We offer lawn maintenance, landscape design, tree trimming, irrigation, and seasonal cleanup services.' },
        { question: 'Do you offer free estimates?', answer: 'Yes! We provide free on-site estimates for all new projects.' },
        { question: 'How often will you service my lawn?', answer: 'Our maintenance plans typically include weekly or bi-weekly visits during the growing season.' },
        { question: 'Are you licensed and insured?', answer: 'Yes, we are fully licensed and insured for all landscaping work.' },
        { question: 'Do you offer snow removal?', answer: 'Yes! We provide snow removal and winter services to keep your property safe year-round.' }
    ],
    'Moving & Storage': [
        { question: 'How do you calculate moving costs?', answer: 'Pricing is based on distance, home size, and services needed. We offer free in-home or virtual estimates.' },
        { question: 'Do you provide packing services?', answer: 'Yes! We offer full packing, partial packing, and unpacking services with all necessary materials included.' },
        { question: 'Are my belongings insured during the move?', answer: 'Yes, we provide basic coverage and offer additional insurance options for valuable items.' },
        { question: 'How far in advance should I book?', answer: 'We recommend booking 2-4 weeks in advance, especially during peak moving season (summer months).' },
        { question: 'Do you offer storage solutions?', answer: 'Yes! We have secure short-term and long-term storage options available.' }
    ],
    'Legal Services': [
        { question: 'What areas of law do you practice?', answer: 'Our firm handles family law, personal injury, business law, estate planning, and criminal defense.' },
        { question: 'Do you offer free consultations?', answer: 'Yes, we offer a free initial consultation to discuss your case and legal options.' },
        { question: 'How much do you charge?', answer: 'Fees vary by case type. We offer hourly rates, flat fees, and contingency arrangements depending on the matter.' },
        { question: 'How quickly can you respond to my case?', answer: 'We respond to all inquiries within 24 hours and prioritize urgent legal matters.' },
        { question: 'Do you handle cases in other states?', answer: 'We\'re licensed in this state, but we work with partner firms for matters in other jurisdictions.' }
    ],
    'Childcare & Daycare': [
        { question: 'What ages do you accept?', answer: 'We accept children from 6 weeks to 12 years old, with age-appropriate programs for each group.' },
        { question: 'What are your hours?', answer: 'We\'re open Monday-Friday 6:30am-6:30pm to accommodate working parents.' },
        { question: 'What\'s your staff-to-child ratio?', answer: 'We maintain low ratios: 1:4 for infants, 1:6 for toddlers, and 1:10 for preschoolers.' },
        { question: 'Do you provide meals?', answer: 'Yes! We provide healthy breakfast, lunch, and snacks. We accommodate allergies and dietary restrictions.' },
        { question: 'How do I enroll my child?', answer: 'Schedule a tour with us and we\'ll walk you through enrollment. Spots fill quickly, so we recommend visiting soon!' }
    ],
    'Roofing & Gutters': [
        { question: 'Do you offer free roof inspections?', answer: 'Yes! We provide free inspections and estimates for all roofing projects.' },
        { question: 'What types of roofing do you install?', answer: 'We work with asphalt shingles, metal roofing, tile, and flat roof systems.' },
        { question: 'Do you handle insurance claims?', answer: 'Yes, we work directly with insurance companies and can help you navigate the claims process.' },
        { question: 'How long does a roof replacement take?', answer: 'Most residential roof replacements are completed in 1-3 days, depending on size and complexity.' },
        { question: 'Do you offer warranties?', answer: 'Yes! We offer manufacturer warranties on materials plus our own workmanship warranty.' }
    ],
    'Appliance Repair': [
        { question: 'What appliances do you repair?', answer: 'We service all major appliances including refrigerators, washers, dryers, dishwashers, ovens, and more.' },
        { question: 'Do you offer same-day service?', answer: 'Yes! We offer same-day and next-day appointments for most repair needs.' },
        { question: 'How much is a service call?', answer: 'Our diagnostic fee is applied toward the repair cost if you proceed. No hidden fees.' },
        { question: 'Do you work on all brands?', answer: 'Yes, our technicians are trained to work on all major appliance brands.' },
        { question: 'Are your repairs guaranteed?', answer: 'Yes! All our repairs come with a warranty on parts and labor.' }
    ],
    'Flooring': [
        { question: 'What flooring types do you install?', answer: 'We install hardwood, laminate, vinyl, tile, carpet, and luxury vinyl plank (LVP).' },
        { question: 'Do you offer free estimates?', answer: 'Yes! We provide free in-home measurements and estimates.' },
        { question: 'How long does installation take?', answer: 'Most rooms can be completed in 1-2 days. Whole-home projects typically take 3-5 days.' },
        { question: 'Do you remove old flooring?', answer: 'Yes, removal and disposal of old flooring is included in our installation service.' },
        { question: 'Do you offer financing?', answer: 'Yes! We offer flexible financing options to fit your budget.' }
    ],
    'Therapy & Counseling': [
        { question: 'Do you accept insurance?', answer: 'Yes, we accept most major insurance plans. We can verify your benefits before your first session.' },
        { question: 'Do you offer virtual sessions?', answer: 'Yes! We offer both in-person and secure video telehealth sessions.' },
        { question: 'What types of therapy do you provide?', answer: 'We offer individual, couples, family, and group therapy for anxiety, depression, trauma, and more.' },
        { question: 'How long are sessions?', answer: 'Standard sessions are 50-60 minutes. Initial assessments may run longer.' },
        { question: 'Are you accepting new clients?', answer: 'Yes! We\'re currently accepting new clients and can usually schedule within 1-2 weeks.' }
    ],
    'Catering': [
        { question: 'What types of events do you cater?', answer: 'We cater weddings, corporate events, private parties, and special occasions of all sizes.' },
        { question: 'How far in advance should I book?', answer: 'We recommend booking 2-4 weeks in advance, or 2-3 months for large events and weddings.' },
        { question: 'Do you accommodate dietary restrictions?', answer: 'Absolutely! We offer vegetarian, vegan, gluten-free, kosher, and allergy-friendly options.' },
        { question: 'What\'s included in your catering packages?', answer: 'Our packages include food, setup, serving staff, and cleanup. Rentals available upon request.' },
        { question: 'Do you offer tastings?', answer: 'Yes! We offer complimentary tastings for events over a certain size. Ask us for details.' }
    ],
    'Printing & Signs': [
        { question: 'What printing services do you offer?', answer: 'We offer business cards, banners, signs, vehicle wraps, promotional items, and large format printing.' },
        { question: 'How fast can you complete my order?', answer: 'Standard turnaround is 3-5 business days. Rush orders available for an additional fee.' },
        { question: 'Do you offer design services?', answer: 'Yes! Our in-house designers can create custom artwork or work with your existing files.' },
        { question: 'What file formats do you accept?', answer: 'We accept PDF, AI, EPS, PSD, and high-resolution JPG/PNG files.' },
        { question: 'Do you offer installation for signs?', answer: 'Yes! We provide professional installation for all signage products.' }
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

        const customIndustryGroup = document.getElementById('customIndustryGroup');
        const customFaqSection = document.getElementById('customFaqSection');

        if (demoConfig.industry === 'Other') {
            // Show custom industry and FAQ fields
            if (customIndustryGroup) customIndustryGroup.style.display = 'block';
            if (customFaqSection) {
                customFaqSection.style.display = 'block';
                // Initialize with 2 empty FAQ fields if none exist
                const customFaqList = document.getElementById('customFaqList');
                if (customFaqList && customFaqList.children.length === 0) {
                    addCustomFaqField();
                    addCustomFaqField();
                }
            }
            // Clear preset FAQs
            demoConfig.faqs = [];
        } else {
            // Hide custom fields
            if (customIndustryGroup) customIndustryGroup.style.display = 'none';
            if (customFaqSection) customFaqSection.style.display = 'none';
            demoConfig.customIndustry = '';

            // Auto-populate FAQs based on industry
            if (demoConfig.industry && industryFAQs[demoConfig.industry]) {
                demoConfig.faqs = [...industryFAQs[demoConfig.industry]];
            } else {
                demoConfig.faqs = [];
            }
        }

        updatePreview();
        updateButtons();
    });

    // Custom Industry Input
    const customIndustryInput = document.getElementById('customIndustry');
    if (customIndustryInput) {
        customIndustryInput.addEventListener('input', function(e) {
            demoConfig.customIndustry = e.target.value;
            updatePreview();
            updateButtons();
        });
    }

    // Add Custom FAQ Button
    const addCustomFaqBtn = document.getElementById('addCustomFaqBtn');
    if (addCustomFaqBtn) {
        addCustomFaqBtn.addEventListener('click', function() {
            const customFaqList = document.getElementById('customFaqList');
            if (customFaqList && customFaqList.children.length < 5) {
                addCustomFaqField();
            }
            // Hide button if max reached
            if (customFaqList && customFaqList.children.length >= 5) {
                this.style.display = 'none';
            }
        });
    }

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
        : `<div style="width: 40px; height: 40px; background: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: ${demoConfig.brandColor};">${demoConfig.businessName.substring(0, 2).toUpperCase()}</div>`;

    preview.innerHTML = `
        <div style="display: flex; flex-direction: column; height: 100%; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
            <!-- Chat Header -->
            <div style="background: ${demoConfig.brandColor}; color: #fff; padding: 16px; display: flex; align-items: center; gap: 12px;">
                ${logoHtml}
                <div style="flex: 1;">
                    <div style="font-weight: 600; font-size: 15px;">${demoConfig.businessName}</div>
                    <div style="font-size: 12px; opacity: 0.9; display: flex; align-items: center; gap: 5px;">
                        <span style="width: 8px; height: 8px; background: #4ade80; border-radius: 50%; display: inline-block;"></span>
                        Online
                    </div>
                </div>
            </div>

            <!-- Chat Messages -->
            <div style="flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; background: #f9fafb;">
                <!-- Bot Message -->
                <div style="background: #fff; padding: 12px 16px; border-radius: 18px; border: 1px solid #e5e7eb; max-width: 85%; font-size: 14px; color: #1f2937; line-height: 1.5; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                    Hi! I'm the AI assistant for ${demoConfig.businessName}. How can I help you today?
                </div>

                <!-- Sample User Message -->
                <div style="background: ${demoConfig.brandColor}; padding: 12px 16px; border-radius: 18px 18px 4px 18px; max-width: 75%; font-size: 14px; color: #fff; align-self: flex-end; line-height: 1.5;">
                    ${demoConfig.faqs.length > 0 ? demoConfig.faqs[0].question : 'What services do you offer?'}
                </div>

                <!-- Bot Response -->
                <div style="background: #fff; padding: 12px 16px; border-radius: 18px; border: 1px solid #e5e7eb; max-width: 85%; font-size: 14px; color: #1f2937; line-height: 1.5; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                    ${demoConfig.faqs.length > 0 ? demoConfig.faqs[0].answer : 'We offer a wide range of services tailored to your needs. How can I help you today?'}
                </div>
            </div>

            <!-- Chat Input -->
            <div style="padding: 16px; background: #fff; border-top: 1px solid #e5e7eb;">
                <div style="display: flex; gap: 10px; align-items: center; background: #f9fafb; padding: 8px 12px; border-radius: 24px; border: 1.5px solid #e5e7eb;">
                    <input type="text" placeholder="Type your message..." style="flex: 1; background: transparent; border: none; color: #1f2937; outline: none; font-size: 14px; padding: 8px 4px;">
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

    // For "Other" industry, also require custom industry description
    let isValid = demoConfig.businessName && demoConfig.industry;
    if (demoConfig.industry === 'Other') {
        isValid = isValid && demoConfig.customIndustry;
    }

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

        // Handle "Other" industry
        if (demoConfig.industry === 'Other') {
            const customIndustryGroup = document.getElementById('customIndustryGroup');
            const customFaqSection = document.getElementById('customFaqSection');
            const customIndustryInput = document.getElementById('customIndustry');

            if (customIndustryGroup) customIndustryGroup.style.display = 'block';
            if (customFaqSection) customFaqSection.style.display = 'block';
            if (customIndustryInput) customIndustryInput.value = demoConfig.customIndustry || '';

            // Restore custom FAQs
            if (demoConfig.faqs && demoConfig.faqs.length > 0) {
                const customFaqList = document.getElementById('customFaqList');
                if (customFaqList) {
                    customFaqList.innerHTML = '';
                    demoConfig.faqs.forEach((faq, index) => {
                        const faqItem = document.createElement('div');
                        faqItem.className = 'faq-item-builder';
                        faqItem.innerHTML = `
                            <input type="text" class="faq-question" placeholder="Question (e.g., What are your hours?)" data-index="${index}" value="${faq.question || ''}">
                            <textarea class="faq-answer" placeholder="Answer (e.g., We're open Mon-Fri 9am-5pm)" data-index="${index}">${faq.answer || ''}</textarea>
                            <button type="button" class="remove-faq-btn" onclick="removeCustomFaq(this)">Remove</button>
                        `;
                        customFaqList.appendChild(faqItem);

                        // Add event listeners
                        const questionInput = faqItem.querySelector('.faq-question');
                        const answerInput = faqItem.querySelector('.faq-answer');
                        questionInput.addEventListener('input', updateCustomFaqs);
                        answerInput.addEventListener('input', updateCustomFaqs);
                    });
                }
            }
        } else {
            // Auto-populate FAQs based on loaded industry
            if (demoConfig.industry && industryFAQs[demoConfig.industry]) {
                demoConfig.faqs = [...industryFAQs[demoConfig.industry]];
            }
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
    if (demoConfig.industry === 'Other' && !demoConfig.customIndustry) missingFields.push('Industry Description');

    const message = 'Please fill out the following required fields:\n\n' +
                    missingFields.map(field => '• ' + field).join('\n');

    alert(message);
}

// Add Custom FAQ Field
function addCustomFaqField() {
    const customFaqList = document.getElementById('customFaqList');
    if (!customFaqList) return;

    const faqIndex = customFaqList.children.length;
    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item-builder';
    faqItem.innerHTML = `
        <input type="text" class="faq-question" placeholder="Question (e.g., What are your hours?)" data-index="${faqIndex}">
        <textarea class="faq-answer" placeholder="Answer (e.g., We're open Mon-Fri 9am-5pm)" data-index="${faqIndex}"></textarea>
        <button type="button" class="remove-faq-btn" onclick="removeCustomFaq(this)">Remove</button>
    `;

    customFaqList.appendChild(faqItem);

    // Add event listeners for the new fields
    const questionInput = faqItem.querySelector('.faq-question');
    const answerInput = faqItem.querySelector('.faq-answer');

    questionInput.addEventListener('input', updateCustomFaqs);
    answerInput.addEventListener('input', updateCustomFaqs);
}

// Remove Custom FAQ
function removeCustomFaq(button) {
    const faqItem = button.parentElement;
    faqItem.remove();
    updateCustomFaqs();

    // Show add button again if under limit
    const addBtn = document.getElementById('addCustomFaqBtn');
    const customFaqList = document.getElementById('customFaqList');
    if (addBtn && customFaqList && customFaqList.children.length < 5) {
        addBtn.style.display = 'block';
    }
}

// Update Custom FAQs in config
function updateCustomFaqs() {
    const customFaqList = document.getElementById('customFaqList');
    if (!customFaqList) return;

    demoConfig.faqs = [];
    const faqItems = customFaqList.querySelectorAll('.faq-item-builder');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question').value.trim();
        const answer = item.querySelector('.faq-answer').value.trim();

        if (question && answer) {
            demoConfig.faqs.push({ question, answer });
        }
    });

    updatePreview();
    updateButtons();
}
