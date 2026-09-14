import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  Globe,
  GraduationCap,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Phone,
  Sparkles,
  Target,
  Users2,
  X,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const eventFormLinks: Record<string, string> = {
  'IPL Auction': 'https://forms.gle/ra4yJpgrsRf96Ux29',
  'Best Economist Team': 'https://forms.gle/tR3wBEeSn284nLWq6',
  'Debate': 'https://forms.gle/xJo3s1AdFhE7jABn8',
  'Quiz': 'https://forms.gle/RSRxUhmzFQPKVCbL6',
  'Treasure Hunt': 'https://forms.gle/xJo3s1AdFhF7jABn8',
  'Paper Presentation': 'https://forms.gle/rP5eAExQagfuWAYx6',
};

// Replace this with your deployed Google Apps Script web app URL.
// See the setup instructions provided after the code changes.
const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

const events = [
  { number: '01', name: 'IPL Auction', type: 'Strategy arena', detail: 'Build your dream team, read the room, and make every bid count.' },
  { number: '02', name: 'Best Economist Team', type: 'Case challenge', detail: 'Turn data, markets and sharp thinking into one winning call.' },
  { number: '03', name: 'Debate', type: 'Ideas in motion', detail: 'Bring your point of view. Leave with a better one.' },
  { number: '04', name: 'Quiz', type: 'Fast & curious', detail: 'A sprint through business, culture, and everything between.' },
  { number: '05', name: 'Treasure Hunt', type: 'Campus quest', detail: 'Decode clues. Chase the unexpected. Own the finish line.' },
  { number: '06', name: 'Paper Presentation', type: 'Research spotlight', detail: 'Share a question worth asking and a perspective worth hearing.' },
];

const coordinators = [
  { role: 'Technical Coordinator', name: 'Rahul K R', phone: '+91 8304950075' },
  { role: 'Head Coordinator', name: 'Mariyam Susan Manoj', phone: '+91 7593027822' },
  { role: 'Finance Coordinator', name: 'Rosmin Tresa', phone: '' },
  { role: 'Sponsorship Coordinator', name: 'Anasooya N A', phone: '' },
  { role: 'Marketing Coordinator', name: 'Aalfiya Khadeeja Araf', phone: '' },
  { role: 'Media Coordinator', name: 'Jayakrishnan J R', phone: '' },
];

const cbsPillars = [
  { icon: BookOpen, title: 'Teaching', copy: 'Flagship MSc in Econometrics and Financial Technology, with plans for a doctoral program and a Masters in Public Economics and Policy.' },
  { icon: Microscope, title: 'Research', copy: 'Scientific analysis of budgets across all levels of government, and the impact of budgetary policy on economy and society.' },
  { icon: Users2, title: 'Outreach', copy: 'Public lectures, workshops, and annual budget awareness meetings with expert speakers for the wider community.' },
];

const cbsThrust = [
  'Local government budgeting with a focus on Kerala',
  'Fiscal relations between states and sub-states',
  'Comprehensive budget archive for historical analysis',
  'Political economy of Kerala budgets since the princely state',
  'Public debt analysis and management recommendations',
  'State Budget Observatory for transparent discussion',
];

function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [activeSection, setActiveSection] = useState('home');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [regInterest, setRegInterest] = useState('');
  const [regStatus, setRegStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  useEffect(() => {
    document.title = 'SPARDHA 3.0';
    const target = new Date('2026-09-29T09:00:00+05:30').getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    const context = gsap.context(() => {
      gsap.from('.hero-kicker, .hero-title-row, .hero-title-badge, .hero-copy, .hero-actions', {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });
      gsap.from('.hero-title-version', { scale: 0.5, opacity: 0, duration: 1.3, ease: 'back.out(1.7)', delay: 0.6 });
      gsap.from('.hero-mark', { scale: 0.7, opacity: 0, duration: 1.2, ease: 'back.out(1.5)', delay: 0.2 });
      gsap.to('.hero-orbit', { rotation: 360, duration: 28, repeat: -1, ease: 'none' });
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.from(element, {
          y: 50,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 84%' },
        });
      });
      gsap.utils.toArray<HTMLElement>('.event-row').forEach((element, index) => {
        gsap.from(element, {
          x: index % 2 ? 45 : -45,
          opacity: 0,
          duration: 0.75,
          delay: index * 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%' },
        });
      });
      gsap.to('.marquee-track', { xPercent: -50, duration: 24, repeat: -1, ease: 'none' });
    }, pageRef);

    const sectionIds = ['home', 'events', 'partners', 'about'];
    const observers = sectionIds.map((id) => {
      const section = document.getElementById(id);
      if (!section) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveSection(id);
      }, { rootMargin: '-35% 0px -55% 0px' });
      observer.observe(section);
      return observer;
    });

    return () => {
      context.revert();
      observers.forEach((observer) => observer?.disconnect());
      clearInterval(interval);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const openRegister = (interest?: string) => {
    setRegInterest(interest ?? '');
    setRegStatus('idle');
    setRegisterOpen(true);
  };

  const closeRegister = () => {
    setRegisterOpen(false);
    setRegStatus('idle');
  };

  const handleEventRegistration = async () => {
    const formUrl = eventFormLinks[regInterest];
    if (!formUrl) return;
    setRegStatus('submitting');
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: regInterest,
          timestamp: new Date().toISOString(),
        }),
      });
      setRegStatus('done');
    } catch {
      setRegStatus('error');
    }
    window.open(formUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div ref={pageRef} className="site-shell">
      <header className="site-header">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Back to top">
          <img src={`${import.meta.env.BASE_URL}images/image.png`} alt="Spardha" />
          <span>SPARDHA<span className="brand-year"> 3.0</span></span>
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          {['home', 'events', 'partners', 'about'].map((item) => (
            <button key={item} className={activeSection === item ? 'nav-link active' : 'nav-link'} onClick={() => scrollTo(item)}>
              {item}
            </button>
          ))}
          <button className="nav-cta" onClick={() => openRegister()}>Register <ArrowRight size={15} /></button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section id="home" className="hero-section section-grid">
          <div className="hero-content">
            <p className="eyebrow hero-kicker"><span className="eyebrow-line" /> Centre for Budget Studies presents</p>
            <h1 className="hero-title">
              <span className="hero-title-row">
                <span className="hero-title-word">SPARDHA</span>
                <span className="hero-title-version"><em>3.0</em></span>
              </span>
              <span className="hero-title-badge">The game is on</span>
            </h1>
            <p className="hero-copy">A national level inter-collegiate fest where ideas get louder, talent gets sharper, and the campus comes alive.</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => scrollTo('events')}>Explore events <ArrowDown size={17} /></button>
              <button className="text-link" onClick={() => openRegister()}>Save your spot <ArrowRight size={17} /></button>
            </div>
            <div className="hero-meta">
              <span><CalendarDays size={17} /> 29 — 30 September 2026</span>
              <span><MapPin size={17} /> Kochi, Kerala</span>
            </div>
            <div className="countdown">
              <div className="countdown-block"><strong>{String(countdown.days).padStart(2, '0')}</strong><span>days</span></div>
              <div className="countdown-sep">:</div>
              <div className="countdown-block"><strong>{String(countdown.hours).padStart(2, '0')}</strong><span>hours</span></div>
              <div className="countdown-sep">:</div>
              <div className="countdown-block"><strong>{String(countdown.minutes).padStart(2, '0')}</strong><span>minutes</span></div>
              <div className="countdown-sep">:</div>
              <div className="countdown-block"><strong>{String(countdown.seconds).padStart(2, '0')}</strong><span>seconds</span></div>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-mark"><img src={`${import.meta.env.BASE_URL}images/image.png`} alt="" /></div>
            <span className="art-note note-top">National level</span>
            <span className="art-note note-side">Inter-collegiate<br />fest</span>
            <span className="art-number">3.0</span>
            <div className="scroll-cue"><span>Scroll to enter</span><ArrowDown size={15} /></div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true"><div className="marquee-track"><span>IDEAS IN MOTION</span><i>✳</i><span>PEOPLE TO WATCH</span><i>✳</i><span>SPARDHA 3.0</span><i>✳</i><span>THE GAME IS ON</span><i>✳</i><span>IDEAS IN MOTION</span><i>✳</i><span>PEOPLE TO WATCH</span><i>✳</i><span>SPARDHA 3.0</span><i>✳</i><span>THE GAME IS ON</span><i>✳</i></div></div>

        <section id="events" className="events-section">
          <div className="events-bg-orb orb-a" />
          <div className="events-bg-orb orb-b" />
          <div className="events-heading section-grid reveal"><div><p className="eyebrow"><span className="eyebrow-line" /> 01 / The arena</p><h2>Pick your<br /><span>playground.</span></h2></div><p>Six ways to make your mark. One weekend to remember your name.</p></div>
          <div className="events-list">
            {events.map((event) => <button className="event-row" key={event.name} onClick={() => setSelectedEvent(event)}><span className="event-number">{event.number}</span><span className="event-name">{event.name}</span><span className="event-type">{event.type}</span><ArrowRight className="event-arrow" size={22} /></button>)}
          </div>
          <div className="event-detail reveal"><div><span className="eyebrow">Now viewing</span><h3>{selectedEvent.name}</h3><p>{selectedEvent.detail}</p></div><button className="button button-light" onClick={() => openRegister(selectedEvent.name)}>Enter this event <ArrowRight size={17} /></button></div>
        </section>

        <section id="partners" className="partners-section">
          <div className="partners-header section-grid reveal">
            <div className="section-intro"><p className="eyebrow"><span className="eyebrow-line" /> 02 / The multiplier</p><h2>Good brands<br /><span>back <em>bold</em> ideas.</span></h2></div>
            <p className="partners-sub">Associate your brand with Spardha 3.0 — reach 100+ high-achieving students, researchers, and young professionals across campus and digital platforms.</p>
          </div>
          <div className="contact-section reveal">
            <div className="contact-header">
              <span className="contact-badge"><Users2 size={16} /> Contact & Coordination</span>
              <h3>Connect with the<br /><span>Spardha team.</span></h3>
              <p>Reach out to our coordinators for sponsorship, partnerships, or any event-related queries.</p>
            </div>
            <div className="contact-grid">{coordinators.map((c) => <div className="contact-card" key={c.role}><span className="contact-role">{c.role}</span><span className="contact-name">{c.name}</span>{c.phone && <span className="contact-phone"><Phone size={13} /> {c.phone}</span>}</div>)}</div>
            <div className="contact-footer">
              <span className="contact-info-item"><Mail size={14} /> spardhacbs@gmail.com</span>
              <span className="contact-info-item"><Instagram size={14} /> @spardha.cbs</span>
              <span className="contact-info-item"><Globe size={14} /> spardhacbs.github.io/SPARDHA/</span>
            </div>
          </div>
        </section>

        <section className="highlight-strip section-grid reveal">
          <div className="highlight-stats">
            <div className="hs-item"><span className="hs-num">6+</span><span className="hs-label">colleges</span></div>
            <div className="hs-divider" />
            <div className="hs-item"><span className="hs-num">100+</span><span className="hs-label">participants</span></div>
            <div className="hs-divider" />
            <div className="hs-item"><span className="hs-num">2</span><span className="hs-label">days</span></div>
            <div className="hs-divider" />
            <div className="hs-item"><span className="hs-num">1</span><span className="hs-label">unforgettable weekend</span></div>
          </div>
          <div className="highlight-venue reveal">
            <span className="eyebrow"><span className="eyebrow-line" /> The venue</span>
            <h3>Cochin University of<br /><span>Science & Technology</span></h3>
            <p>CUSAT campus, Kochi — where curiosity meets infrastructure, and the atmosphere pulses with energy from dawn to midnight.</p>
            <div className="venue-tags"><span>Kochi</span><span>Kerala</span><span>India</span></div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-fest section-grid">
            <div className="section-intro reveal"><p className="eyebrow"><span className="eyebrow-line" /> 03 / The why</p><h2>Not just a fest.<br /><span>A <em>force</em> of nature.</span></h2></div>
            <div className="about-copy reveal"><p className="large-copy">Spardha is where sharp minds, wild ideas, and a little bit of friendly chaos meet.</p><p>Presented by the Centre for Budget Studies at Cochin University of Science and Technology, Spardha 3.0 is built for people who show up curious and leave inspired.</p><div className="about-stats"><div><strong>06</strong><span>signature events</span></div><div><strong>02</strong><span>electric days</span></div><div><strong>01</strong><span>campus takeover</span></div></div></div>
            <div className="about-stamp reveal"><Sparkles size={22} /><span>Make your<br /><strong>mark.</strong></span><ArrowRight size={19} /></div>
          </div>

          <div className="cbs-section">
            <div className="cbs-header reveal">
              <p className="eyebrow"><span className="eyebrow-line" /> The organiser</p>
              <h2>Centre for Budget<br /><span>Studies <em>(CBS)</em></span></h2>
            </div>
            <div className="cbs-body reveal">
              <p className="cbs-lead">Established by CUSAT in 2012, CBS is a pioneering institution dedicated to the in-depth analysis of budgets, fiscal management, and their impact on governance structures in India.</p>
              <p>From the days budgets were mere statements of accounts to their evolution into powerful policy documents, CBS stands at the intersection of research, teaching, and public outreach — one of only a handful of institutions in India specialising in budgetary studies.</p>
            </div>
          </div>

          <div className="cbs-pillars section-grid">
            {cbsPillars.map(({ icon: Icon, title, copy }) => (
              <div className="pillar reveal" key={title}>
                <span className="pillar-icon"><Icon size={22} /></span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>

          <div className="cbs-thrust-section section-grid">
            <div className="cbs-thrust-intro reveal">
              <p className="eyebrow"><span className="eyebrow-line" /> Thrust areas</p>
              <h3>Where we <em>focus.</em></h3>
              <p className="cbs-vision"><Target size={16} /> Vision: a Centre of Excellence in teaching, research and community outreach within ten years.</p>
            </div>
            <div className="cbs-thrust-list reveal">
              {cbsThrust.map((item) => (
                <div className="thrust-item" key={item}><Check size={16} /><span>{item}</span></div>
              ))}
            </div>
          </div>

          <div className="cbs-program reveal">
            <span className="pillar-icon"><GraduationCap size={22} /></span>
            <div>
              <h3>Flagship programme</h3>
              <p>MSc in Econometrics and Financial Technology — equipping students with the skills to excel in econometrics and fintech, nurtured by experienced faculty and industry experts.</p>
            </div>
          </div>
        </section>

        <section className="final-section">
          <div className="final-content">
            <div className="final-logo"><img src={`${import.meta.env.BASE_URL}images/image.png`} alt="Spardha" /></div>
            <p className="eyebrow"><span className="eyebrow-line" /> 29 — 30 / 09 / 26 · Kochi, Kerala</p>
            <h2>See you<br /><span>in the arena.</span></h2>
            <button className="button button-dark" onClick={() => openRegister()}>Register now <ArrowRight size={17} /></button>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><img src={`${import.meta.env.BASE_URL}images/image.png`} alt="" /><span>SPARDHA 3.0</span></div><div className="footer-contact"><span><Mail size={14} /> spardhacbs@gmail.com</span><span><Phone size={14} /> +91 83045 90075</span></div><div className="footer-social"><a href="https://instagram.com" aria-label="Instagram"><Instagram size={17} /></a><button onClick={() => scrollTo('home')}>Back to top <ArrowDown size={15} /></button></div></footer>
      {registerOpen && <div className="modal-backdrop" role="presentation" onClick={closeRegister}><div className="register-modal" role="dialog" aria-modal="true" aria-labelledby="register-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={closeRegister} aria-label="Close registration"><X size={20} /></button><p className="eyebrow"><span className="eyebrow-line" /> Your move</p><h2 id="register-title">Ready to<br /><em>play?</em></h2><p>Pick your event and proceed to register.</p><form onSubmit={(event) => { event.preventDefault(); closeRegister(); }}><label>Choose your interest<select value={regInterest} onChange={(e) => { setRegInterest(e.target.value); setRegStatus('idle'); }}><option value="" disabled>Select one</option>{events.map((event) => <option key={event.name} value={event.name}>{event.name}</option>)}</select></label>{regInterest && eventFormLinks[regInterest] && (<a className="event-reg-link" onClick={handleEventRegistration}>{`Proceed to ${regInterest} Registration`}<ArrowRight size={15} /></a>)}{regStatus === 'submitting' && <span className="reg-status">Sending your details…</span>}{regStatus === 'done' && <span className="reg-status">Details recorded. Opening form…</span>}{regStatus === 'error' && <span className="reg-status error">Could not reach the tracker, but the form will still open.</span>}</form></div></div>}
    </div>
  );
}

export default App;
