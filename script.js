/* =====================================================
   PIXELFORGE STUDIO — JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── HAMBURGER MENU ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── FLOATING PARTICLES ──
  const particlesContainer = document.getElementById('particles');
  const PARTICLE_COUNT = 50;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.width = (Math.random() * 3 + 1) + 'px';
    p.style.height = p.style.width;
    p.style.animationDuration = (Math.random() * 15 + 8) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';

    // Alternate colors
    const colors = ['#7c3aed', '#06b6d4', '#8b5cf6', '#22d3ee', '#a78bfa'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    particlesContainer.appendChild(p);
  }

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll(
    '.service-card, .why-card, .process-step, .testimonial-card, .pricing-card, .contact-grid > *, .section-header, .maintenance-inner, .maintenance-text, .maintenance-icon'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── SMOOTH ACTIVE NAV ──
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = '#8b5cf6';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeObserver.observe(s));

  // ── CARD HOVER GLOW TRACKING ──
  document.querySelectorAll('.service-card').forEach(card => {
    const glow = card.querySelector('.card-glow');
    if (!glow) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(124,58,237,0.35), transparent 60%)`;
    });

    card.addEventListener('mouseleave', () => {
      glow.style.background = '';
    });
  });

  // ── COUNTER ANIMATION ──
  const stats = document.querySelectorAll('.stat-num');

  const animateCounter = (el) => {
    const text = el.textContent.trim();
    const match = text.match(/(\d+)([%+★]*)/);
    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = match[2] || '';
    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(s => counterObserver.observe(s));

  // ── CONTACT FORM ──
  const CONTACT_EMAIL = 'romeloud33@proton.me';
  const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const phone   = document.getElementById('contact-phone').value.trim();
    const service = document.getElementById('contact-service').value;
    const budget  = document.getElementById('contact-budget').value;
    const message = document.getElementById('contact-message').value.trim();

    // ── Validate required fields ──
    const required = [
      { el: document.getElementById('contact-name'),    val: name    },
      { el: document.getElementById('contact-email'),   val: email   },
      { el: document.getElementById('contact-service'), val: service },
      { el: document.getElementById('contact-message'), val: message }
    ];

    let hasError = false;
    required.forEach(({ el, val }) => {
      if (!val) {
        hasError = true;
        el.style.borderColor = '#ef4444';
        el.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.2)';
        el.addEventListener('input', () => {
          el.style.borderColor = '';
          el.style.boxShadow   = '';
        }, { once: true });
      }
    });
    if (hasError) return;

    // ── Service & budget readable labels ──
    const serviceLabels = {
      website: 'Website Design & Development',
      social:  'Social Media Management',
      content: 'Content Creation',
      seo:     'SEO Optimization',
      brand:   'Brand Creation',
      bundle:  'Full Digital Suite (Bundle)'
    };
    const budgetLabels = {
      'under1k': 'Under $1,000',
      '1k-3k':   '$1,000 – $3,000',
      '3k-5k':   '$3,000 – $5,000',
      '5k+':     '$5,000+',
      'custom':  "Let's discuss"
    };

    // ── Show loading spinner ──
    const submitBtn = document.getElementById('contact-submit');
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span class="btn-text">Sending</span>
      <span class="btn-spinner"></span>
    `;
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.85';

    // ── Remove any previous error banner ──
    const oldErr = form.querySelector('.form-error-banner');
    if (oldErr) oldErr.remove();

    // ── POST to Formsubmit.co AJAX ──
    try {
      const payload = {
        name,
        email,
        phone:   phone   || 'Not provided',
        service: serviceLabels[service] || service,
        budget:  budgetLabels[budget]   || 'Not specified',
        message,
        _subject: `New Inquiry: ${serviceLabels[service] || service} — ${name}`,
        _template: 'table',
        _captcha:  'false'
      };

      const response = await fetch(FORMSUBMIT_URL, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':       'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success === 'true') {
        // ── Success ──
        form.style.display          = 'none';
        formSuccess.style.display   = 'block';
      } else {
        throw new Error(result.message || 'Submission failed');
      }

    } catch (err) {
      // ── Error state — show banner, re-enable button ──
      submitBtn.innerHTML   = originalBtnHTML;
      submitBtn.disabled    = false;
      submitBtn.style.opacity = '1';

      const errBanner = document.createElement('div');
      errBanner.className = 'form-error-banner';
      errBanner.innerHTML = `
        ⚠️ Something went wrong — please try again or email us directly at
        <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.
      `;
      form.insertBefore(errBanner, submitBtn);
      console.error('Form submission error:', err);
    }
  });

  // ── TICKER PAUSE ON HOVER ──
  const tickerTrack = document.querySelector('.ticker-track');
  if (tickerTrack) {
    tickerTrack.parentElement.addEventListener('mouseenter', () => {
      tickerTrack.style.animationPlayState = 'paused';
    });
    tickerTrack.parentElement.addEventListener('mouseleave', () => {
      tickerTrack.style.animationPlayState = 'running';
    });
  }

  // ── SMOOTH SCROLL for all anchors ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── PRICING CARD TILT ──
  document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      const isFeatured = card.classList.contains('pricing-featured');
      const scale = isFeatured ? 'scale(1.03)' : 'scale(1)';
      card.style.transform = `${scale} perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      const isFeatured = card.classList.contains('pricing-featured');
      card.style.transform = isFeatured ? 'scale(1.03)' : '';
    });
  });

  // ── VOIP WEB PHONE DIALER ──
  // To connect live calls, deploy your Twilio Serverless Function (from Step 5) 
  // and paste its URL in the TWILIO_TOKEN_URL constant below.
  const TWILIO_TOKEN_URL = ''; // E.g., 'https://pixelforge-auth-xxxx-dev.twil.io/token'
  const AGENT_CELL_PHONE = '+14695045883'; // Verified target phone number (United States)
  
  const callWidgetTrigger = document.getElementById('call-widget-trigger');
  const callPanel = document.getElementById('call-panel');
  const callPanelClose = document.getElementById('call-panel-close');
  const btnCall = document.getElementById('btn-call');
  const btnHangup = document.getElementById('btn-hangup');
  const callStatus = document.getElementById('call-status');
  const dialerNumber = document.getElementById('dialer-number');
  
  let isCalling = false;
  let simulatedCallTimeout;
  let twilioDevice = null;
  let activeConnection = null;

  // Toggle Panel
  callWidgetTrigger.addEventListener('click', () => {
    const isHidden = callPanel.style.display === 'none';
    callPanel.style.display = isHidden ? 'block' : 'none';
  });

  callPanelClose.addEventListener('click', () => {
    callPanel.style.display = 'none';
  });

  // Handle Calling
  btnCall.addEventListener('click', async () => {
    // Request microphone access
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      callStatus.textContent = '❌ Microphone access denied';
      callStatus.style.color = '#ef4444';
      return;
    }

    isCalling = true;
    btnCall.style.display = 'none';
    btnHangup.style.display = 'flex';
    callStatus.textContent = 'Connecting via WebRTC...';
    dialerNumber.textContent = 'Calling agent...';

    // If live Twilio URL is configured, use real VoIP connection
    if (TWILIO_TOKEN_URL) {
      try {
        if (!twilioDevice) {
          const res = await fetch(TWILIO_TOKEN_URL);
          const data = await res.json();
          twilioDevice = new Twilio.Device(data.token, {
            codecPreferences: ['opus', 'pcmu'],
            fakeLocalDTMF: true,
            enableIceRestart: true
          });
          
          twilioDevice.on('error', (error) => {
            console.error('Twilio Device Error:', error);
            callStatus.textContent = '❌ Connection error';
            callStatus.style.color = '#ef4444';
          });
        }
        
        activeConnection = await twilioDevice.connect();
        
        activeConnection.on('accept', () => {
          callStatus.textContent = '🟢 Connected (Active)';
          dialerNumber.textContent = 'Talking to: Romeloud';
        });

        activeConnection.on('disconnect', resetPhoneState);
      } catch (err) {
        console.error('VoIP Init Failed:', err);
        callStatus.textContent = '❌ WebRTC Setup Failed';
        callStatus.style.color = '#ef4444';
      }
    } else {
      // Simulate Twilio Connection flow (in dev/local stage)
      simulatedCallTimeout = setTimeout(() => {
        callStatus.textContent = '🟢 Connected (Active)';
        dialerNumber.textContent = 'Talking to: Romeloud';
      }, 2000);
    }
  });

  // Handle Hanging Up
  function resetPhoneState() {
    isCalling = false;
    clearTimeout(simulatedCallTimeout);
    
    if (activeConnection) {
      activeConnection.disconnect();
      activeConnection = null;
    }
    
    btnCall.style.display = 'flex';
    btnHangup.style.display = 'none';
    callStatus.textContent = 'Ready to call over internet';
    callStatus.style.color = '';
    dialerNumber.textContent = 'Calling Agent...';
  }

  btnHangup.addEventListener('click', resetPhoneState);

  console.log('%cPixelForge Studio 🚀', 'color: #7c3aed; font-size: 18px; font-weight: 900;');
  console.log('%cReady to build your digital presence.', 'color: #06b6d4; font-size: 12px;');
});
