// Basic interactions: mobile menu toggle, scenario simulator, smooth scroll
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const toggle = document.querySelector('.menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    if (toggle && mobileNav) {
        toggle.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            if (expanded) {
                mobileNav.hidden = true;
                mobileNav.setAttribute('aria-hidden', 'true');
            } else {
                mobileNav.hidden = false;
                mobileNav.setAttribute('aria-hidden', 'false');
            }
        });
    }

    // Scenario simulator
    const feedbackCopy = {
        'language-a': {
            text: 'Speaking louder can feel patronising and overlooks intercultural communication styles (Hofstede).',
            tone: 'warning'
        },
        'language-b': {
            text: '★ Best: non-verbal empathy, CQ Action, and dignity by showing choices patiently.',
            tone: 'positive'
        },
        'language-c': {
            text: 'Avoidance lowers emotional intelligence and passes the challenge to others without learning.',
            tone: 'warning'
        },
        'distress-a': {
            text: '“Calm down” dismisses emotions and can escalate trauma responses.',
            tone: 'warning'
        },
        'distress-b': {
            text: '★ Aligns with trauma-informed care: regulate yourself, give space, then co-create safety.',
            tone: 'positive'
        },
        'distress-c': {
            text: 'Escalating to security too soon may increase distress and erode trust.',
            tone: 'warning'
        },
        'custom-a': {
            text: 'Assuming rudeness reinforces bias and blocks belonging.',
            tone: 'warning'
        },
        'custom-b': {
            text: '★ Acknowledges cultural dimensions (Hofstede) and respects intersectional identities.',
            tone: 'positive'
        },
        'custom-c': {
            text: 'Forcing conversation prioritises your comfort over the guest’s communication style.',
            tone: 'warning'
        },
        'choice-a': {
            text: 'Pushing food removes autonomy and can feel paternalistic.',
            tone: 'warning'
        },
        'choice-b': {
            text: '★ Centers autonomy: offers alternatives, honours choice, and keeps hospitality warm.',
            tone: 'positive'
        },
        'choice-c': {
            text: 'Public questioning risks shame and undermines psychological safety.',
            tone: 'warning'
        }
    };

    const scenarioChoices = document.querySelectorAll('.scenario-choice');
    scenarioChoices.forEach(choice => {
        choice.addEventListener('click', function () {
            const btn = this;
            const scenarioCard = btn.closest('.scenario-card');
            if (!scenarioCard) return;
            const feedbackId = btn.dataset.feedback;
            const feedbackEl = scenarioCard.querySelector('.scenario-feedback');
            scenarioCard.querySelectorAll('.scenario-choice').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            if (feedbackEl) {
                const copy = feedbackCopy[feedbackId];
                feedbackEl.textContent = copy ? copy.text : 'Thanks for reflecting on this choice.';
                feedbackEl.classList.remove('positive', 'warning');
                if (copy?.tone) feedbackEl.classList.add(copy.tone);
            }
        });
    });

    const resetBtn = document.querySelector('.reset-scenarios');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            scenarioChoices.forEach(choice => choice.classList.remove('active'));
            document.querySelectorAll('.scenario-feedback').forEach(fb => {
                fb.textContent = '';
                fb.classList.remove('positive', 'warning');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
});
