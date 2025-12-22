// OTTO Chat Widget - Embed Script
(function() {
    const OTTO_CONFIG = {
        apiUrl: 'https://otto-chat-api.ottoai-official.workers.dev',
        botName: 'OTTO',
        welcomeMessage: "Hey there! 👋 I'm OTTO, the AI assistant for OTTO Automation. Got questions about how we can help your business? Fire away!",
        primaryColor: '#3ab573',
        avatarImage: 'otto-avatar.png'
    };

    // Inject styles
    const styles = document.createElement('style');
    styles.textContent = `
        #otto-chat-widget{--otto-primary:${OTTO_CONFIG.primaryColor};--otto-primary-dark:#2d9c5f;--otto-bg:#1a1a2e;--otto-bg-light:#252542;--otto-text:#ffffff;--otto-text-light:#a0a0b0;--otto-border:#3a3a5a;--otto-shadow:0 10px 40px rgba(0,0,0,0.4);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',sans-serif;position:fixed;bottom:24px;right:24px;z-index:999999}
        #otto-chat-toggle{width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--otto-primary) 0%,var(--otto-primary-dark) 100%);border:none;cursor:pointer;box-shadow:var(--otto-shadow);display:flex;align-items:center;justify-content:center;transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden}
        #otto-chat-toggle:hover{transform:scale(1.08);box-shadow:0 14px 50px rgba(58,181,115,0.4)}
        #otto-chat-toggle:active{transform:scale(.95)}
        #otto-chat-toggle::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,rgba(255,255,255,0.2) 0%,transparent 100%);border-radius:50%}
        #otto-chat-toggle svg{width:28px;height:28px;fill:#fff;transition:all .3s ease}
        #otto-chat-toggle .otto-icon-close{position:absolute;opacity:0;transform:rotate(-90deg) scale(.5)}
        #otto-chat-widget.open #otto-chat-toggle .otto-icon-chat{opacity:0;transform:rotate(90deg) scale(.5)}
        #otto-chat-widget.open #otto-chat-toggle .otto-icon-close{opacity:1;transform:rotate(0) scale(1)}
        #otto-notification-badge{position:absolute;top:-4px;right:-4px;width:20px;height:20px;background:#ef4444;border-radius:50%;color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(0);transition:all .3s ease}
        #otto-notification-badge.show{opacity:1;transform:scale(1)}
        #otto-chat-window{position:absolute;bottom:80px;right:0;width:380px;height:580px;max-height:calc(100vh - 120px);background:var(--otto-bg);border-radius:20px;box-shadow:var(--otto-shadow);display:flex;flex-direction:column;overflow:hidden;opacity:0;visibility:hidden;transform:translateY(40px) scale(.9);transform-origin:bottom right}
        #otto-chat-widget.open #otto-chat-window{visibility:visible;animation:chatBounceIn .5s cubic-bezier(.34,1.56,.64,1) forwards}
        #otto-chat-widget.closing #otto-chat-window{animation:chatBounceOut .3s cubic-bezier(.4,0,.2,1) forwards}
        @keyframes chatBounceIn{0%{opacity:0;transform:translateY(40px) scale(.9)}50%{opacity:1;transform:translateY(-10px) scale(1.02)}70%{transform:translateY(5px) scale(.99)}100%{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes chatBounceOut{0%{opacity:1;transform:translateY(0) scale(1)}30%{transform:translateY(-8px) scale(1.01)}100%{opacity:0;transform:translateY(30px) scale(.9);visibility:hidden}}
        #otto-chat-header{background:linear-gradient(135deg,var(--otto-primary) 0%,var(--otto-primary-dark) 100%);padding:20px;display:flex;align-items:center;gap:14px;flex-shrink:0}
        #otto-avatar{width:48px;height:48px;background:#000;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
        #otto-avatar img{width:100%;height:100%;object-fit:cover}
        #otto-avatar::after{content:'';position:absolute;bottom:2px;right:2px;width:12px;height:12px;background:#22c55e;border:2px solid var(--otto-primary);border-radius:50%}
        #otto-header-info h3{margin:0;color:#fff;font-size:18px;font-weight:700}
        #otto-header-info p{margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:13px}
        #otto-chat-messages{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:16px;scroll-behavior:smooth}
        #otto-chat-messages::-webkit-scrollbar{width:6px}
        #otto-chat-messages::-webkit-scrollbar-track{background:transparent}
        #otto-chat-messages::-webkit-scrollbar-thumb{background:var(--otto-border);border-radius:3px}
        .otto-message{display:flex;gap:10px;max-width:85%;animation:messageSlide .3s ease}
        @keyframes messageSlide{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .otto-message.user{margin-left:auto;flex-direction:row-reverse}
        .otto-message-avatar{width:32px;height:32px;border-radius:50%;background:#000;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}
        .otto-message-avatar img{width:100%;height:100%;object-fit:cover}
        .otto-message.user .otto-message-avatar{background:var(--otto-text);color:#fff;font-size:14px}
        .otto-message-content{background:var(--otto-bg-light);padding:12px 16px;border-radius:18px;border-bottom-left-radius:6px;color:var(--otto-text);font-size:14px;line-height:1.5}
        .otto-message.user .otto-message-content{background:var(--otto-primary);color:#fff;border-radius:18px;border-bottom-right-radius:6px}
        .otto-typing{display:flex;gap:4px;padding:16px}
        .otto-typing span{width:8px;height:8px;background:var(--otto-text-light);border-radius:50%;animation:typingBounce 1.4s infinite}
        .otto-typing span:nth-child(2){animation-delay:.2s}
        .otto-typing span:nth-child(3){animation-delay:.4s}
        @keyframes typingBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
        #otto-chat-input-container{padding:16px;border-top:1px solid var(--otto-border);display:flex;gap:10px;align-items:flex-end;flex-shrink:0;background:#151525}
        #otto-chat-input{flex:1;border:2px solid var(--otto-border);border-radius:24px;padding:12px 18px;font-size:14px;resize:none;max-height:120px;line-height:1.4;outline:none;transition:border-color .2s;font-family:inherit;background:var(--otto-bg-light);color:var(--otto-text)}
        #otto-chat-input:focus{border-color:var(--otto-primary)}
        #otto-chat-input::placeholder{color:var(--otto-text-light)}
        #otto-send-btn{width:44px;height:44px;background:var(--otto-primary);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
        #otto-send-btn:hover{background:var(--otto-primary-dark);transform:scale(1.05)}
        #otto-send-btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
        #otto-send-btn svg{width:20px;height:20px;fill:#fff}
        #otto-powered-by{padding:10px;text-align:center;font-size:11px;color:var(--otto-text-light);background:#101020}
        #otto-powered-by a{color:var(--otto-primary);text-decoration:none;font-weight:600}
        .otto-link{color:var(--otto-primary);text-decoration:underline;font-weight:500;cursor:pointer}
        .otto-link:hover{color:#4eca87}
        @media(max-width:768px){#otto-chat-widget{bottom:16px;right:16px}#otto-chat-window{width:calc(100vw - 32px);max-width:360px;height:60vh;max-height:500px;right:0;bottom:80px}#otto-chat-toggle{width:56px;height:56px}#otto-chat-bubble{max-width:200px;right:0;bottom:70px;font-size:13px;padding:10px 14px}}
        @media(max-width:480px){#otto-chat-window{width:calc(100vw - 32px);max-width:none;height:70vh;max-height:450px;right:0}#otto-chat-bubble{max-width:180px}}
        #otto-chat-bubble{position:absolute;bottom:80px;right:0;background:var(--otto-bg);border:1px solid var(--otto-border);border-radius:16px;padding:14px 18px;max-width:260px;box-shadow:var(--otto-shadow);opacity:0;transform:translateX(20px);transition:all .4s ease;pointer-events:none}
        #otto-chat-bubble.show{opacity:1;transform:translateX(0);pointer-events:auto;cursor:pointer}
        #otto-chat-bubble::after{content:'';position:absolute;bottom:-8px;right:24px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid var(--otto-bg)}
        #otto-chat-bubble p{margin:0;color:var(--otto-text);font-size:14px;line-height:1.4}
        #otto-chat-bubble .otto-bubble-close{position:absolute;top:-8px;right:-8px;width:22px;height:22px;background:var(--otto-bg-light);border:1px solid var(--otto-border);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:12px;color:var(--otto-text-light)}
        #otto-chat-bubble .otto-bubble-close:hover{background:var(--otto-primary);color:#fff}
    `;
    document.head.appendChild(styles);

    // Create widget HTML
    const widget = document.createElement('div');
    widget.id = 'otto-chat-widget';
    widget.innerHTML = `
        <div id="otto-chat-bubble">
            <span class="otto-bubble-close">✕</span>
            <p>Need help? 👇</p>
        </div>
        <button id="otto-chat-toggle" aria-label="Open chat">
            <svg class="otto-icon-chat" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
            <svg class="otto-icon-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            <span id="otto-notification-badge">1</span>
        </button>
        <div id="otto-chat-window">
            <div id="otto-chat-header">
                <div id="otto-avatar"><img src="${OTTO_CONFIG.avatarImage}" alt="OTTO"></div>
                <div id="otto-header-info">
                    <h3>${OTTO_CONFIG.botName}</h3>
                    <p>AI Assistant • Online</p>
                </div>
            </div>
            <div id="otto-chat-messages"></div>
            <div id="otto-chat-input-container">
                <textarea id="otto-chat-input" placeholder="Type your message..." rows="1"></textarea>
                <button id="otto-send-btn" aria-label="Send message">
                    <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
            </div>
            <div id="otto-powered-by">Powered by <a href="https://ottoautomation.net" target="_blank">OTTO Automation</a></div>
        </div>
    `;
    document.body.appendChild(widget);

    // Widget logic
    const toggle = document.getElementById('otto-chat-toggle');
    const messagesContainer = document.getElementById('otto-chat-messages');
    const input = document.getElementById('otto-chat-input');
    const sendBtn = document.getElementById('otto-send-btn');
    const badge = document.getElementById('otto-notification-badge');
    let conversationHistory = [];
    let isFirstOpen = true;

    toggle.addEventListener('click', () => {
        if (widget.classList.contains('open')) {
            widget.classList.add('closing');
            setTimeout(() => widget.classList.remove('open', 'closing'), 300);
        } else {
            widget.classList.add('open');
            badge.classList.remove('show');
            document.getElementById('otto-chat-bubble').classList.remove('show');
            input.focus();
            if (isFirstOpen) {
                isFirstOpen = false;
                setTimeout(() => addMessage(OTTO_CONFIG.welcomeMessage, 'bot'), 500);
            }
        }
    });

    input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });

    sendBtn.addEventListener('click', sendMessage);

    // Parse markdown links [text](url) into clickable HTML links
    function parseLinks(text) {
        return text
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="otto-link">$1</a>')
            .replace(/\n/g, '<br>');
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `otto-message ${sender}`;
        const avatarContent = sender === 'bot'
            ? `<img src="${OTTO_CONFIG.avatarImage}" alt="OTTO">`
            : '👤';
        const formattedText = sender === 'bot' ? parseLinks(text) : text.replace(/\n/g, '<br>');
        messageDiv.innerHTML = `
            <div class="otto-message-avatar">${avatarContent}</div>
            <div class="otto-message-content">${formattedText}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'otto-message bot';
        div.id = 'otto-typing-indicator';
        div.innerHTML = `<div class="otto-message-avatar"><img src="${OTTO_CONFIG.avatarImage}" alt="OTTO"></div><div class="otto-message-content"><div class="otto-typing"><span></span><span></span><span></span></div></div>`;
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function hideTyping() {
        const t = document.getElementById('otto-typing-indicator');
        if (t) t.remove();
    }

    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        input.value = '';
        input.style.height = 'auto';
        conversationHistory.push({ role: 'user', content: text });
        sendBtn.disabled = true;
        showTyping();
        try {
            const res = await fetch(OTTO_CONFIG.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, history: conversationHistory.slice(-10) })
            });
            const data = await res.json();
            hideTyping();
            addMessage(data.response, 'bot');
            conversationHistory.push({ role: 'assistant', content: data.response });
        } catch (e) {
            hideTyping();
            addMessage("Having trouble connecting. Try again or email ottoai.official@gmail.com", 'bot');
        }
        sendBtn.disabled = false;
    }

    // Show notification badge after 3 seconds
    setTimeout(() => { if (!widget.classList.contains('open')) badge.classList.add('show'); }, 3000);

    // Chat bubble logic
    const chatBubble = document.getElementById('otto-chat-bubble');
    const bubbleClose = chatBubble.querySelector('.otto-bubble-close');
    const bubbleText = chatBubble.querySelector('p');
    let bubbleTimeout;

    const randomMessages = [
        "Need help? 👇",
        "Questions? I'm here! 💬",
        "Hey there! 👋",
        "Got questions? 🤔",
        "I can help! 👇"
    ];

    function showBubble(message) {
        if (widget.classList.contains('open')) return;
        clearTimeout(bubbleTimeout);
        bubbleText.textContent = message;
        chatBubble.classList.add('show');
        bubbleTimeout = setTimeout(() => {
            chatBubble.classList.remove('show');
        }, 6000);
    }

    function scheduleRandomBubble() {
        // Random time between 30-90 seconds
        const randomDelay = (Math.random() * 60 + 30) * 1000;
        setTimeout(() => {
            if (!widget.classList.contains('open')) {
                const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
                showBubble(randomMsg);
            }
            scheduleRandomBubble();
        }, randomDelay);
    }

    // First visit: show bubble after 5 seconds, then start random popups
    if (!sessionStorage.getItem('otto_bubble_shown')) {
        setTimeout(() => {
            showBubble("Need help? 👇");
            sessionStorage.setItem('otto_bubble_shown', 'true');
            scheduleRandomBubble();
        }, 5000);
    } else {
        // Already seen initial bubble, just do random ones
        scheduleRandomBubble();
    }

    // Click bubble to open chat
    chatBubble.addEventListener('click', (e) => {
        if (e.target !== bubbleClose) {
            clearTimeout(bubbleTimeout);
            chatBubble.classList.remove('show');
            widget.classList.add('open');
            badge.classList.remove('show');
            input.focus();
            if (isFirstOpen) {
                isFirstOpen = false;
                setTimeout(() => addMessage(OTTO_CONFIG.welcomeMessage, 'bot'), 500);
            }
        }
    });

    // Close bubble
    bubbleClose.addEventListener('click', (e) => {
        e.stopPropagation();
        clearTimeout(bubbleTimeout);
        chatBubble.classList.remove('show');
    });
})();
