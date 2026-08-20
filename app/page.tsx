"use client";

import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bug,
  Check,
  Cpu,
  Download,
  Expand,
  Github,
  Linkedin,
  Mail,
  Menu,
  Radar,
  ShieldCheck,
  Terminal,
  X,
} from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";

/* ============================================================
   CONTENT — edit here to replace name, bio, projects, etc.
   ============================================================ */
const profile = {
  first: "SHAMSUDIN",
  last: "AMINULLAH",
  signature: "Shamsudin\nAminullah",
  role: "Cybersecurity Professional & SOC Analyst",
  location: "Dubai, UAE",
  cv: "/Shamsudin-Aminullah-CV.pdf",
  email: "shamsudin279@gmail.com",
  github: "https://github.com/dev-shams",
  linkedin: "https://www.linkedin.com/in/shamsudin-shams",
};

const heroStats = [
  { value: "98.77%", label: "ML detection accuracy" },
  { value: "10+", label: "Security tools in use" },
  { value: "24/7", label: "SOC monitoring mindset" },
];

const projectImages = [
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1400&q=85",
];

const services = [
  {
    bracket: "( 01 )",
    title: "Security Operations",
    copy: "Real-time monitoring across SIEM and NDR platforms — triaging alerts, escalating confirmed threats and documenting every step of the response.",
    icon: Radar,
    rows: ["SIEM Monitoring & Alert Triage", "Incident Investigation & Escalation", "Threat Hunting & Log Analysis"],
  },
  {
    bracket: "( 02 )",
    title: "Threat & Vulnerability Analysis",
    copy: "Practical assessments that surface real exposure, validate risk and turn raw findings into prioritised, defensible remediation.",
    icon: ShieldCheck,
    rows: ["Vulnerability Assessment", "Penetration Testing", "Firewall & Network Review"],
  },
  {
    bracket: "( 03 )",
    title: "Security Research & Engineering",
    copy: "Applied research where machine learning meets defence — phishing detection, malware analysis and intrusion-detection modelling.",
    icon: Cpu,
    rows: ["Phishing Detection Engineering", "Malware & Reverse Analysis", "Machine-Learning Security"],
  },
];

const toolsMarquee = [
  "IBM QRADAR", "ELASTIC STACK", "DARKTRACE", "MICROSOFT DEFENDER",
  "WAZUH", "FORTIGATE", "WIRESHARK", "MITRE ATT&CK", "CISCO ISE", "SOPHOS CENTRAL",
];

const experience = [
  {
    role: "SOC Analyst",
    place: "ITButler E-Services",
    when: "Jan 2026 — Present",
    points: [
      "Monitor security alerts across IBM QRadar, Elastic Stack and Darktrace.",
      "Triage incidents, investigate root cause and escalate confirmed threats.",
      "Hunt anomalous network behaviour and review FortiGate activity.",
      "Document and manage the incident lifecycle end-to-end through GLPI.",
    ],
  },
  {
    role: "Penetration Tester",
    place: "Cyber 50 Defense · Internship",
    when: "Jul 2026 — Present",
    points: [
      "Conducted comprehensive vulnerability assessments and penetration testing for various infrastructures, enhancing overall security posture.",
      "Executed network and web penetration tests, identifying critical vulnerabilities and providing actionable remediation strategies.",
      "Collaborated with cross-functional teams to perform security audits and risk assessments, ensuring compliance with local industry standards.",
    ],
  },
];

const projects = [
  {
    no: "01.",
    title: "Phishing Email Detection Tool",
    desc: "A live, calibrated machine-learning app separating phishing from legitimate email on a 5,020-dimension hybrid feature space.",
    tags: ["Python", "scikit-learn", "Flask", "Railway"],
    href: "https://phishing-detection-tool-production.up.railway.app",
    metric: { value: "98.77%", label: "held-out accuracy" },
    image: projectImages[0],
  },
  {
    no: "02.",
    title: "Machine-Learning NIDS",
    desc: "Network intrusion-detection research classifying DoS, Probe, R2L and U2R traffic through careful feature engineering.",
    tags: ["Python", "Random Forest", "NIDS"],
    href: undefined,
    metric: { value: "4", label: "attack classes" },
    image: projectImages[1],
  },
  {
    no: "03.",
    title: "Malware Analysis & Exploit Research",
    desc: "Static and dynamic malware analysis — from PDF droppers and XOR decoding through to stack-based exploitation research.",
    tags: ["IDA Pro", "OllyDbg", "Forensics"],
    href: undefined,
    metric: { value: "IT/OT", label: "threat surface" },
    image: projectImages[2],
  },
  {
    no: "04.",
    title: "Cyber-Physical Systems Security",
    desc: "An IT-to-OT incident investigation for a simulated water-treatment attack, mapped end-to-end to MITRE ATT&CK.",
    tags: ["Wireshark", "Wazuh", "MITRE ATT&CK"],
    href: undefined,
    metric: { value: "MITRE", label: "ATT&CK mapped" },
    image: projectImages[3],
  },
];

const skillGroups = [
  { idx: "01", title: "SOC & Monitoring", icon: Radar, items: ["IBM QRadar", "Elastic Stack", "Darktrace", "Microsoft Defender", "Wazuh", "FortiGate", "GLPI"] },
  { idx: "02", title: "Threat & Vulnerability", icon: ShieldCheck, items: ["Vulnerability Assessment", "Penetration Testing", "Threat Hunting", "MITRE ATT&CK", "Cisco ISE", "Sophos Central"] },
  { idx: "03", title: "Malware & Forensics", icon: Bug, items: ["IDA Pro", "OllyDbg", "Static Analysis", "Dynamic Analysis", "Digital Forensics"] },
  { idx: "04", title: "Security Engineering", icon: Terminal, items: ["Python", "scikit-learn", "Flask", "Random Forest", "Machine Learning", "Railway"] },
];

const certifications = [
  { title: "Certified in Cybersecurity (CC)", issuer: "ISC2 · Coursera", year: "2026", image: "/certs/isc2-cc.jpg" },
  { title: "Splunk Core Certified Power User", issuer: "Splunk", year: "2026", image: "/certs/splunk-power-user.jpg" },
  { title: "Network Defense", issuer: "Cisco Networking Academy", year: "2026", image: "/certs/cisco-network-defense.jpg" },
];

/* ============================================================
   ANIMATION PRIMITIVES
   ============================================================ */
function Reveal({ children, className = "", delay = 0, y = 30 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Services accordion: the section pins and steps through the services in equal scroll amounts —
   whichever one is active expands to reveal its detail; the others stay collapsed. */
function ServicesAccordion() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const n = services.length;
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -r.top / total));
      setActive(Math.min(n - 1, Math.floor(p * n)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);
  return (
    <div className="service-scroll" ref={wrapRef} style={reduce ? undefined : { height: `${services.length * 75}vh` }}>
      <div className="service-sticky">
        <div className="service-accordion">
          {services.map((s, i) => {
            const open = reduce || active === i;
            return (
              <div className={`service-block ${open ? "active" : ""}`} key={s.title}>
                <div className="service-bracket">{s.bracket}</div>
                <div className="service-body">
                  <div className="service-row-top">
                    <h3>{s.title}</h3>
                    <SpinMark size={26} className="service-mark" />
                  </div>
                  <div className="service-detail">
                    <div className="service-detail-inner">
                      <p>{s.copy}</p>
                      <ul className="service-rows">
                        {s.rows.map((r, ri) => (
                          <li key={r}><span className="n">0{ri + 1}</span>{r}<ArrowUpRight className="arr" size={20} /></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Magnetic({ children, className = "", strength = 0.4, scale = 1.12 }: { children: React.ReactNode; className?: string; strength?: number; scale?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.3 });
  const [active, setActive] = useState(false);
  const move = (e: React.PointerEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  return (
    <motion.span
      className={`magnetic ${className}`}
      style={{ x: sx, y: sy }}
      animate={{ scale: active ? scale : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      onPointerEnter={() => setActive(true)}
      onPointerMove={move}
      onPointerLeave={() => { x.set(0); y.set(0); setActive(false); }}
    >
      {children}
    </motion.span>
  );
}

/* Custom cursor — 50px violet circle with glow + mix-blend difference (reference style). */
function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 38, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 600, damping: 38, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    // Native cursor stays visible; the violet circle trails it (reference behaviour).
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); setVisible(true); };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!(t.closest && t.closest("a, button, [data-hover], input, textarea, label")));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  return (
    <motion.div
      className="cursor-main"
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      animate={{ scale: hover ? 1.85 : 1, opacity: visible ? (hover ? 0.32 : 1) : 0 }}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 20 }, opacity: { duration: 0.2 } }}
    />
  );
}

function Marquee({ items, icon = true, duration = 34 }: { items: string[]; icon?: boolean; duration?: number }) {
  const group = (
    <span>
      {items.map((t) => (
        <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "1.6rem" }}>
          {t}
          {icon ? <SpinMark size={26} /> : <span style={{ color: "var(--violet)" }}>/</span>}
        </span>
      ))}
    </span>
  );
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee-track" style={{ animationDuration: `${duration}s` }}>
        {group}
        {group}
      </div>
    </section>
  );
}

/* Spinning 6-petal florette mark (replaces the static sparkle icon). */
function SpinMark({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={`spin-mark ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path key={a} d="M12 12C9.5 8 9.5 3.4 12 1C14.5 3.4 14.5 8 12 12Z" transform={`rotate(${a} 12 12)`} />
      ))}
    </svg>
  );
}

/* Per-letter roll: on hover each letter slides up and an identical copy rolls up to replace it. */
function RollText({ text }: { text: string }) {
  return (
    <span className="roll" aria-hidden="true">
      {text.split("").map((ch, i) => {
        const c = ch === " " ? " " : ch;
        const delay = `${i * 24}ms`;
        return (
          <span className="roll-char" key={i}>
            <b style={{ transitionDelay: delay }}>{c}</b>
            <b style={{ transitionDelay: delay }}>{c}</b>
          </span>
        );
      })}
    </span>
  );
}

/* One signature line that "writes" itself left-to-right with a glowing pen tip. */
function SigLine({ text, active, reduce, delay, dur }: { text: string; active: boolean; reduce: boolean | null; delay: number; dur: number }) {
  const hidden = { clipPath: "inset(-45% 100% -55% -4%)" };
  const shown = { clipPath: "inset(-45% -4% -55% -4%)" };
  const ease = [0.6, 0, 0.38, 1] as const;
  return (
    <span className="sig-line-wrap">
      <motion.span
        className="sig-line"
        initial={reduce ? shown : hidden}
        animate={active || reduce ? shown : hidden}
        transition={{ delay, duration: dur, ease }}
      >
        {text}
      </motion.span>
      {!reduce && active && (
        <motion.span
          className="sig-pen"
          aria-hidden="true"
          initial={{ left: "0%", opacity: 0, y: 0 }}
          animate={{ left: "100%", opacity: [0, 1, 1, 0], y: [0, -7, 5, -3, 0] }}
          transition={{
            left: { delay, duration: dur, ease },
            opacity: { delay, duration: dur + 0.15, times: [0, 0.06, 0.92, 1] },
            y: { delay, duration: dur, ease: "easeInOut" },
          }}
        />
      )}
    </span>
  );
}

function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) { onDone(); return; }
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [reduce, onDone]);
  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="preloader-stage">
        <span className="preloader-name-mask">
          <motion.span
            className="preloader-name"
            initial={{ y: "118%" }}
            animate={{ y: "0%" }}
            transition={{ delay: 0.6, duration: 0.85, ease: [0.7, 0, 0.2, 1] }}
          >
            SHAMSUDIN AMINULLAH
          </motion.span>
        </span>
        <svg className="preloader-scribble" viewBox="0 0 1000 200" fill="none" aria-hidden="true">
          <motion.path
            d="M28,150 C240,58 470,68 620,130 C706,166 762,150 762,112 C762,86 724,84 718,112 C709,152 822,168 976,110"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { delay: 0.25, duration: 1.3, ease: [0.6, 0, 0.35, 1] }, opacity: { delay: 0.25, duration: 0.2 } }}
          />
        </svg>
      </div>
      <button className="skip-intro" type="button" onClick={onDone}>Skip</button>
    </motion.div>
  );
}

/* ============================================================
   HORIZONTAL PROJECT SHOWCASE — portrait cards, scroll-driven
   ============================================================ */
function Showcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return;
      setTravel(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      setVh(window.innerHeight);
    };
    calc();
    window.addEventListener("resize", calc);
    const t = setTimeout(calc, 400);
    return () => { window.removeEventListener("resize", calc); clearTimeout(t); };
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const wrapStyle: CSSProperties = travel > 0 && vh > 0 ? { height: `${vh + travel}px` } : {};

  return (
    <section className="showcase" ref={wrapRef} style={wrapStyle} aria-label="Featured project showcase">
      <div className="showcase-sticky">
        <motion.div className="showcase-track" ref={trackRef} style={{ x }}>
          {projects.map((p) => (
            <article className="panel" key={p.title}>
              <div className="panel-card">
                <div className="panel-art">
                  <img src={p.image} alt={`${p.title} preview`} loading="lazy" />
                  <span className="panel-num">{p.no}</span>
                  <div className="panel-badge">
                    <ShieldCheck size={20} />
                    <span><b>{p.metric.value}</b><small>{p.metric.label}</small></span>
                  </div>
                </div>
                <div className="panel-foot">
                  <div className="panel-foot-main">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="tag-row">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                  </div>
                  {p.href ? (
                    <a className="round-link" href={p.href} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}>
                      <ArrowUpRight size={26} />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Home() {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Lenis smooth scroll (skipped for reduced-motion)
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.length > 1) { e.preventDefault(); lenis.scrollTo(href, { offset: 0 }); }
    };
    document.addEventListener("click", onClick);
    return () => { cancelAnimationFrame(raf); document.removeEventListener("click", onClick); lenis.destroy(); lenisRef.current = null; };
  }, [reduce]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lightbox: lock scroll + close on Escape while open
  useEffect(() => {
    if (!lightbox) return;
    lenisRef.current?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => {
      lenisRef.current?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const closeMenu = () => setMenuOpen(false);
  const toTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const navLinks: [string, string][] = [
    ["Services", "services"], ["Experience", "experience"], ["Projects", "projects"],
    ["Skills", "skills"], ["Contact", "contact"],
  ];

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader key="preloader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${lightbox.title} certificate`}
            onClick={() => setLightbox(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.img
              className="lightbox-img"
              src={lightbox.src}
              alt={`${lightbox.title} certificate`}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            />
            <button className="lightbox-close" type="button" onClick={() => setLightbox(null)} aria-label="Close certificate">
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {!reduce && <CustomCursor />}

      <motion.div className="scroll-progress" style={{ scaleX: progressX }} aria-hidden="true" />
      <div className="nebula" aria-hidden="true" />
      <div className="star-field" aria-hidden="true" />
      <a className="skip-link" href="#main">Skip to content</a>

      {/* NAV */}
      <header className="topbar">
        <a href="#hero" className="brand nav-link" aria-label={`${profile.first} ${profile.last}, home`}>
          <b>&lt;</b><RollText text={profile.first} /><b>/&gt;</b>
        </a>
        <nav className="desktop-nav" aria-label="Primary">
          {navLinks.map(([label, id], i) => (
            <Magnetic key={id} scale={1} strength={0.3}>
              <a href={`#${id}`} className="nav-link" aria-label={label}>
                <RollText text={i < navLinks.length - 1 ? `${label},` : label} />
              </a>
            </Magnetic>
          ))}
        </nav>
        <Magnetic className="menu-magnetic" strength={0.5} scale={1.08}>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </Magnetic>
      </header>

      <motion.nav
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        initial={false}
        animate={{ clipPath: menuOpen ? "circle(150% at calc(100% - 3.4rem) 3.4rem)" : "circle(0% at calc(100% - 3.4rem) 3.4rem)" }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        aria-label="Mobile"
      >
        {navLinks.map(([label, id]) => (
          <a key={id} href={`#${id}`} className="nav-link mm-link" onClick={closeMenu} aria-label={label}>
            <RollText text={label} />
          </a>
        ))}
      </motion.nav>

      <main id="main">
        {/* HERO */}
        <section id="hero" className="hero">
          <motion.div className="hero-frame" initial={reduce ? false : { scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2400&q=88" alt="Dark network infrastructure and server hardware" />
          </motion.div>
          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-inner">
            <h1 className="signature">
              {profile.signature.split("\n").map((line, i) => (
                <SigLine key={i} text={line} active={!loading} reduce={reduce} delay={0.55 + i * 0.85} dur={0.9} />
              ))}
              <motion.span
                className="sig-underline"
                aria-hidden="true"
                initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                animate={!loading || reduce ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.55 + 2 * 0.85, duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
              />
            </h1>
            <motion.p className="sub" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}>
              Cybersecurity Professional & <b>SOC Analyst</b><br />based in {profile.location}
            </motion.p>
            <motion.div className="hero-cta" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7 }}>
              <a className="button button-violet" href={profile.cv} download><Download size={16} /> Download CV</a>
              <a className="text-link" href="#contact">Get in touch <ArrowUpRight size={16} /></a>
            </motion.div>
          </div>

          <motion.div className="hero-stats" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
            {heroStats.map((s) => <div className="stat" key={s.label}><b>{s.value}</b><span>{s.label}</span></div>)}
          </motion.div>

          <div className="social-pills">
            <Magnetic><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a></Magnetic>
            <Magnetic><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a></Magnetic>
            <Magnetic><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={17} /></a></Magnetic>
          </div>

          <a href="#about" className="scroll-cue">SCROLL <ArrowDownRight size={16} /></a>
        </section>

        {/* ABOUT */}
        <section id="about" className="about shell">
          <Reveal className="about-copy">
            <p className="eyebrow"><SpinMark size={20} /> About Me</p>
            <h2 className="display-h2">The analyst<br />behind the work.</h2>
            <p>I&apos;m a cybersecurity professional focused on <b>defensive security</b> — living in the space between detection and response, where noisy signals become clear, defensible decisions.</p>
            <p>My day-to-day is SOC monitoring, threat hunting and incident investigation. Outside of it, I build and research: <b>machine-learning detection</b>, malware analysis and intrusion-detection modelling that turn ideas into deployed, measurable tools.</p>
          </Reveal>
          <Reveal className="about-visual" delay={0.1}>
            <img src={projectImages[1]} alt="Abstract code and security tooling" loading="lazy" />
            <div className="about-chip">
              <div><b>{profile.location}</b></div>
              <span className="dot" aria-hidden="true" />
            </div>
          </Reveal>
        </section>

        {/* SERVICES */}
        <section id="services" className="services shell">
          <Reveal className="services-head">
            <p className="eyebrow"><SpinMark size={20} /> What I do</p>
            <h2 className="display-h2">Security operations,<br /><em>advanced defence.</em></h2>
            <p>I work across the full signal-to-response cycle — finding what matters, understanding the risk, and helping teams act with confidence and evidence.</p>
          </Reveal>
          <ServicesAccordion />
        </section>

        <Marquee items={toolsMarquee} />

        {/* EXPERIENCE */}
        <section id="experience" className="experience shell">
          <div className="experience-grid">
            <Reveal className="exp-side">
              <p className="eyebrow"><SpinMark size={20} /> Career <span>& experience</span></p>
              <h2 className="display-h2">One clear<br />mission.</h2>
              <p>Protecting what matters — from the SOC console to independent security research. Here is where the work happens.</p>
            </Reveal>
            <div className="timeline">
              {experience.map((e, i) => (
                <Reveal key={e.role} delay={i * 0.08}>
                  <article className="exp-card">
                    <div className="exp-top">
                      <h3 className="exp-role">{e.role}</h3>
                      <span className="exp-when">{e.when}</span>
                    </div>
                    <p className="exp-place">at <b>{e.place}</b></p>
                    <ul>{e.points.map((p) => <li key={p}><Check /> {p}</li>)}</ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS INTRO */}
        <section id="projects" className="projects-intro shell">
          <Reveal>
            <p className="eyebrow"><SpinMark size={20} /> Projects</p>
            <h2 className="display-h2">Security work,<br />crafted with <span>purpose.</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>Hands-on projects spanning machine learning, defensive monitoring, malware analysis and cyber-physical system security — meticulously built and documented.</p>
          </Reveal>
        </section>

        {/* HORIZONTAL SHOWCASE */}
        <Showcase />

        {/* SKILLS */}
        <section id="skills" className="skills shell">
          <Reveal className="skills-head">
            <div>
              <p className="eyebrow"><SpinMark size={20} /> Toolkit</p>
              <h2 className="display-h2">My <span>stack.</span></h2>
            </div>
            <p style={{ maxWidth: "22rem", color: "var(--muted)", lineHeight: 1.8 }}>The platforms, techniques and languages I reach for across the detection, analysis and engineering workflow.</p>
          </Reveal>
          <div className="skills-grid">
            {skillGroups.map((g) => {
              const Icon = g.icon;
              return (
                <Reveal key={g.title}>
                  <div className="skill-card">
                    <div className="sc-top"><span className="idx">{g.idx}</span><h3>{g.title}</h3><Icon size={20} strokeWidth={1.5} /></div>
                    <div className="skill-pills">{g.items.map((it) => <span key={it}>{it}</span>)}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="certs shell">
          <Reveal className="certs-head">
            <div>
              <p className="eyebrow"><SpinMark size={20} /> Certifications</p>
              <h2 className="display-h2">Credentials &amp;<br /><span>certifications.</span></h2>
            </div>
            <p className="certs-intro">Industry certifications and training that back the hands-on work — continually growing as I deepen my security practice.</p>
          </Reveal>
          <div className="cert-grid">
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.06}>
                <article className="cert-card">
                  <button className="cert-thumb" type="button" onClick={() => setLightbox({ src: c.image, title: c.title })} aria-label={`View ${c.title} certificate`}>
                    <img src={c.image} alt={`${c.title} certificate`} loading="lazy" />
                    <span className="cert-year">{c.year}</span>
                  </button>
                  <h3>{c.title}</h3>
                  <p className="cert-issuer">{c.issuer}</p>
                  <button className="cert-link" type="button" onClick={() => setLightbox({ src: c.image, title: c.title })}>View certificate <Expand size={13} /></button>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact shell">
          <Reveal className="contact-head">
            <p className="eyebrow"><SpinMark size={20} /> Contact</p>
            <h2>LET&apos;S BUILD<br />A <span>SAFER</span> FUTURE.</h2>
          </Reveal>
          <Reveal className="contact-body" delay={0.12}>
            <p>Have a security project, an analysis request, or a role where I can make a difference? Let&apos;s talk.</p>
            <a className="email-link" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={26} /></a>
            <div className="contact-actions">
              <a className="button button-violet" href={`mailto:${profile.email}?subject=Security%20project%20enquiry`}>Start a conversation <ArrowUpRight size={16} /></a>
              <a className="button button-ghost" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
            </div>
          </Reveal>
          <footer className="site-footer">
            <a href="#hero">Back to top <ArrowUpRight size={13} /></a>
          </footer>
        </section>
      </main>

      <motion.button
        className="to-top" type="button" onClick={toTop}
        aria-label="Back to top"
        initial={false}
        animate={{ opacity: showTop ? 1 : 0, pointerEvents: showTop ? "auto" : "none", scale: showTop ? 1 : 0.8 }}
        transition={{ duration: 0.25 }}
      >
        <ArrowUpRight size={18} style={{ transform: "rotate(-45deg)" }} />
      </motion.button>
    </>
  );
}
