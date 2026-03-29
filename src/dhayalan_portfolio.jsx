import { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  Database,
  Layers,
  Cpu,
  Award,
  ChevronDown,
  Terminal,
  GitBranch,
  Boxes,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

const NAV_LINKS = [
  "about",
  "expertise",
  "experience",
  "projects",
  "skills",
  "contact",
];

const SKILLS = {
  Backend: [
    "Ruby on Rails",
    "Ruby",
    "Node.js",
    "GoLang",
    "Java",
    "REST APIs",
    "Web Services",
  ],
  Frontend: [
    "ReactJS",
    "JavaScript",
    "jQuery",
    "AngularJS",
    "HTML5",
    "CSS3",
    "ERB",
  ],
  Blockchain: [
    "Hyperledger Fabric",
    "Solidity",
    "Ethers.js",
    "Web3.js",
    "Smart Contracts",
    "ChainCode",
    "Hardhat",
    "OpenZeppelin",
    "Thirdweb",
  ],
  Databases: [
    "PostgreSQL",
    "MySQL",
    "Oracle",
    "MongoDB",
    "Firebase",
    "Neon Serverless",
  ],
  DevOps: [
    "Docker",
    "Kubernetes",
    "Jenkins",
    "Git",
    "SVN",
    "CI/CD",
    "Heroku",
    "Selenium",
  ],
};

const EXPERTISE = [
  {
    icon: <Code2 size={22} />,
    title: "Full-Stack Rails",
    color: "#e53e3e",
    desc: "12+ years architecting and delivering production Rails applications. Expert in MVC patterns, API design, legacy migration, and performance tuning.",
  },
  {
    icon: <Globe size={22} />,
    title: "Node.js & React",
    color: "#3182ce",
    desc: "Building modern frontends and real-time backends. Delivered features across OpenGov, HCL VoltMX and multiple enterprise-scale apps.",
  },
  {
    icon: <Shield size={22} />,
    title: "Blockchain / Web3",
    color: "#805ad5",
    desc: "Certified Blockchain Professional (IIIT Bangalore). Hands-on with Hyperledger Fabric, Solidity smart contracts, and decentralised app development.",
  },
  {
    icon: <Layers size={22} />,
    title: "Cloud & DevOps",
    color: "#319795",
    desc: "Docker, Kubernetes, Jenkins CI/CD pipelines. Comfortable configuring infrastructure from scratch on Linux environments.",
  },
  {
    icon: <Cpu size={22} />,
    title: "Team Leadership",
    color: "#d69e2e",
    desc: "Led cross-functional engineering teams, owned sprint planning, mentoring and delivering projects on schedule across global clients.",
  },
  {
    icon: <Zap size={22} />,
    title: "Performance Engineering",
    color: "#38a169",
    desc: "Query optimisation, caching strategies, load-time improvements and scalability patterns across healthcare, finance and e-commerce domains.",
  },
];

const EXPERIENCE = [
  {
    role: "Senior Engineer / Tech Lead",
    company: "HCL Technologies",
    period: "May 2020 – Present",
    color: "#68d391",
    tags: ["NW.JS", "Node.js", "JavaScript", "Selenium"],
    desc: "Leading tooling engineering for HCL VoltMX low-code platform. Managed sprint cadence, drove rebranding from Temenos Kony, addressed security vulnerabilities and improved test coverage.",
  },
  {
    role: "Lead Consultant",
    company: "Abacus Staffing @ IBM ISL",
    period: "Nov 2017 – May 2020",
    color: "#63b3ed",
    tags: ["Rails 3.2", "Ruby 2", "Docker", "Jenkins"],
    desc: "Single-handedly migrated a legacy provisioning tool (SPAS) to Rails 3.2 / Ruby 2. Built custom deployment scripts, configured Jenkins and QA VMs using Docker.",
  },
  {
    role: "Senior Team Lead",
    company: "Persistent Systems",
    period: "Feb 2017 – Nov 2017",
    color: "#f6ad55",
    tags: ["Rails 5", "ReactJS", "PostgreSQL"],
    desc: "Led a 12-person team on OpenGov's cloud budgeting and reporting platform. Delivered features and bug fixes on Rails + React stack; created application setup documentation.",
  },
  {
    role: "Senior Software Engineer",
    company: "Xoriant Solutions",
    period: "Dec 2015 – Feb 2017",
    color: "#b794f4",
    tags: ["Rails 4", "AngularJS", "PostgreSQL"],
    desc: "Delivered Knox—MediaMath's revenue monitoring and reporting tool. Built channel partner report end-to-end, improved query builder performance, and implemented pagination.",
  },
  {
    role: "Senior Analyst Programmer",
    company: "SRM Technologies",
    period: "Feb 2014 – Oct 2020",
    color: "#fc8181",
    tags: ["Rails 3", "BrowserCMS", "Heroku", "PayPal"],
    desc: "Worked on Keep Memory Alive fundraising platform. Implemented event registration, ticketing and donation flows with PayPal SDK. Handled Heroku deployments.",
  },
  {
    role: "Senior Software Engineer",
    company: "UnitedHealth Group",
    period: "Apr 2012 – Jul 2013",
    color: "#81e6d9",
    tags: ["Rails 2/3", "MySQL", "Elasticsearch"],
    desc: "Maintained DPCA—a national diabetes health initiative. Handled incidents, enhancements, automated jobs, DB performance tuning and release hotfixes across 20-person team.",
  },
  {
    role: "Software Engineer",
    company: "Qatalys / Anubavam / Amshuhu",
    period: "Feb 2008 – Mar 2012",
    color: "#fbb6ce",
    tags: ["Ruby on Rails", "MySQL", "SVN"],
    desc: "Early career roles building web apps: online deal sites, social networks, video game trading portals and internal bug-trackers. Honed full-stack Rails fundamentals.",
  },
];

const PROJECTS = [
  {
    name: "HCL VoltMX Tooling",
    client: "HCL Technologies",
    color: "#2d3748",
    tags: ["NW.JS", "Node.js", "Selenium"],
    desc: "Low-code platform tooling suite. Led engineering team, resolved Chrome Zero-Day, improved security and test coverage for an enterprise developer platform.",
  },
  {
    name: "SPAS – IBM Provisioning",
    client: "IBM ISL",
    color: "#1a365d",
    tags: ["Rails 3.2", "Ruby 2", "Docker", "Jenkins", "Oracle"],
    desc: "Manual provisioning tool for IBM Watson Campaign Automation. Solo full-stack migration from Rails 2 to 3.2 with Docker-based CI pipeline.",
  },
  {
    name: "OpenGov Budgeting Platform",
    client: "OpenGov",
    color: "#1c4532",
    tags: ["Rails 5", "ReactJS", "PostgreSQL", "JIRA"],
    desc: "Cloud SaaS for public-sector budgeting and open data. Led 12-person team delivering features and fixes across Rails + React.",
  },
  {
    name: "Knox – Revenue Monitor",
    client: "MediaMath",
    color: "#44337a",
    tags: ["Rails 4", "AngularJS", "PostgreSQL"],
    desc: "Internal reporting tool for ads and campaign revenue. Built channel-partner report, overhauled query builder logic, improved fees-page load times.",
  },
  {
    name: "Keep Memory Alive",
    client: "Lou Ruvo Center",
    color: "#7b341e",
    tags: ["Rails 3", "BrowserCMS", "Heroku", "PayPal"],
    desc: "Fundraising platform for brain health research. Event registration, ticketing and donation features powered by PayPal SDK.",
  },
  {
    name: "DPCA Health Initiative",
    client: "UnitedHealth Group",
    color: "#234e52",
    tags: ["Rails 2/3", "MySQL", "Elasticsearch", "Delayed Jobs"],
    desc: "National diabetes prevention coalition app serving UHG members. Performance tuning, background jobs, hotfixes and enhancements.",
  },
  {
    name: "E2G2 Business Directory",
    client: "E2G2, Inc.",
    color: "#1a202c",
    tags: ["Ruby on Rails", "MySQL", "Git"],
    desc: "Online business licensing and certified directory platform. Streamlined sign-ups, renewals and local marketplace integration.",
  },
  {
    name: "DP&L Rebate Portal",
    client: "Dayton Power & Light",
    color: "#2c3e50",
    tags: ["Rails 3", "MySQL", "RSpec", "jQuery"],
    desc: "End-to-end rebate management system. Managed entire development lifecycle, XLS exports, and RSpec model validation suite.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const titles = [
    "Full Stack Rails Engineer",
    "Blockchain Developer",
    "Senior Technical Lead",
    "18+ Years Experience",
  ];
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    let i = 0,
      current = titles[titleIdx],
      forward = true;
    const id = setInterval(() => {
      if (forward) {
        setTyped(current.slice(0, i + 1));
        i++;
        if (i === current.length) {
          forward = false;
          setTimeout(() => {}, 1200);
          clearInterval(id);
          setTimeout(() => setTitleIdx((p) => (p + 1) % titles.length), 2000);
        }
      }
    }, 70);
    return () => clearInterval(id);
  }, [titleIdx]);

  useEffect(() => {
    const handler = () => {
      const secs = NAV_LINKS.map((id) => document.getElementById(id)).filter(
        Boolean,
      );
      const current = secs
        .reverse()
        .find((s) => window.scrollY >= s.offsetTop - 120);
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        background: "#0a0c10",
        color: "#e2e8f0",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Syne:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0c10; } ::-webkit-scrollbar-thumb { background: #2d3748; border-radius: 2px; }
        html { scroll-behavior: smooth; }
        .nav-link { cursor: pointer; padding: 6px 12px; border-radius: 6px; font-size: 12px; letter-spacing: 0.08em; transition: all 0.2s; color: #a0aec0; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; }
        .nav-link:hover, .nav-link.active { color: #63b3ed; background: rgba(99,179,237,0.08); }
        .card-hover { transition: transform 0.3s, box-shadow 0.3s; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        .tag { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 10px; font-weight: 600; letter-spacing: 0.06em; background: rgba(99,179,237,0.1); color: #63b3ed; border: 1px solid rgba(99,179,237,0.2); margin: 3px 2px; }
        .skill-pill { display: inline-block; padding: 5px 14px; border-radius: 6px; font-size: 11px; font-weight: 600; margin: 4px; border: 1px solid; cursor: default; transition: all 0.2s; }
        .skill-pill:hover { transform: scale(1.05); }
        .timeline-dot { width: 12px; height: 12px; border-radius: 50%; background: #63b3ed; box-shadow: 0 0 12px #63b3ed; flex-shrink: 0; margin-top: 6px; }
        .glow-text { text-shadow: 0 0 40px rgba(99,179,237,0.4); }
        .section-label { font-size: 11px; letter-spacing: 0.2em; color: #63b3ed; text-transform: uppercase; font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .section-label::before { content: '//'; color: #4a5568; }
        .cursor { display: inline-block; width: 2px; height: 1.1em; background: #63b3ed; margin-left: 3px; animation: blink 0.8s infinite; vertical-align: middle; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .grid-bg { background-image: linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px); background-size: 40px 40px; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } }
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
      `}</style>

      {/* NAV */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(10,12,16,0.75)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(99,179,237,0.1)",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 60,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
            onClick={() => scrollTo("about")}
          >
            <Terminal size={18} color="#63b3ed" />
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              dhayalan<span style={{ color: "#63b3ed" }}>.dev</span>
            </span>
          </div>
          <nav className="desktop-nav" style={{ display: "flex", gap: 4 }}>
            {NAV_LINKS.map((id) => (
              <span
                key={id}
                className={`nav-link ${activeSection === id ? "active" : ""}`}
                onClick={() => scrollTo(id)}
              >
                {id}
              </span>
            ))}
          </nav>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "1px solid rgba(99,179,237,0.3)",
              borderRadius: 6,
              color: "#63b3ed",
              padding: "6px 10px",
              cursor: "pointer",
              display: "none",
              alignItems: "center",
            }}
          >
            ☰
          </button>
        </div>
        {mobileOpen && (
          <div
            style={{
              background: "rgba(10,12,16,0.97)",
              padding: "12px 24px 20px",
              borderTop: "1px solid rgba(99,179,237,0.1)",
            }}
          >
            {NAV_LINKS.map((id) => (
              <div
                key={id}
                className={`nav-link ${activeSection === id ? "active" : ""}`}
                style={{ display: "block", marginBottom: 4 }}
                onClick={() => scrollTo(id)}
              >
                {id}
              </div>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="about"
        className="grid-bg"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,179,237,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(128,90,213,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <FadeIn delay={0}>
            <div className="section-label">
              Full Stack Engineer · Hyderabad, IN
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(42px, 7vw, 88px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#fff",
                marginBottom: 8,
              }}
              className="glow-text"
            >
              Dhayalan
              <br />
              <span style={{ color: "#63b3ed" }}>I J K</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div
              style={{
                fontSize: "clamp(14px, 2.5vw, 20px)",
                color: "#a0aec0",
                marginBottom: 32,
                minHeight: "1.6em",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span style={{ color: "#4a5568" }}>$</span>{" "}
              <span style={{ color: "#68d391" }}>{typed}</span>
              <span className="cursor" />
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p
              style={{
                maxWidth: 580,
                fontSize: 15,
                lineHeight: 1.85,
                color: "#718096",
                marginBottom: 40,
              }}
            >
              Seasoned software professional with{" "}
              <span style={{ color: "#e2e8f0", fontWeight: 600 }}>
                18+ years
              </span>{" "}
              building scalable web applications and enterprise platforms. 12+
              years of Ruby on Rails expertise, certified{" "}
              <span style={{ color: "#e2e8f0", fontWeight: 600 }}>
                Blockchain Professional
              </span>{" "}
              from IIIT Bangalore, and a proven track record leading teams
              across healthcare, finance, and e-commerce.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginBottom: 48,
              }}
            >
              <a
                href="https://github.com/dhayalan"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e2e8f0",
                  textDecoration: "none",
                  fontSize: 13,
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.borderColor = "#63b3ed")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
                }
              >
                <Github size={15} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/dhayalan-karunakaran/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  borderRadius: 8,
                  background: "rgba(99,179,237,0.1)",
                  border: "1px solid rgba(99,179,237,0.3)",
                  color: "#63b3ed",
                  textDecoration: "none",
                  fontSize: 13,
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "rgba(99,179,237,0.2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "rgba(99,179,237,0.1)")
                }
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <a
                href="https://twitter.com/Dhayalan"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  borderRadius: 8,
                  background: "rgba(29,161,242,0.1)",
                  border: "1px solid rgba(29,161,242,0.3)",
                  color: "#1da1f2",
                  textDecoration: "none",
                  fontSize: 13,
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "rgba(29,161,242,0.2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "rgba(29,161,242,0.1)")
                }
              >
                <Twitter size={15} /> Twitter
              </a>
              <a
                href="https://www.credential.net/ebad860b-fcbe-4966-85a3-50fc9e56d7c6"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  borderRadius: 8,
                  background: "rgba(128,90,213,0.1)",
                  border: "1px solid rgba(128,90,213,0.3)",
                  color: "#b794f4",
                  textDecoration: "none",
                  fontSize: 13,
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "rgba(128,90,213,0.2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "rgba(128,90,213,0.1)")
                }
              >
                <Award size={15} /> Blockchain Cert
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[
                ["18+", "Years Exp."],
                ["12+", "Rails Years"],
                ["25+", "Projects"],
                ["2", "Awards"],
              ].map(([num, label]) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: 32,
                      color: "#fff",
                    }}
                  >
                    {num}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#4a5568",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          <div
            onClick={() => scrollTo("expertise")}
            style={{
              cursor: "pointer",
              color: "#4a5568",
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <ChevronDown size={20} />
          </div>
        </div>
        <style>{`@keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }`}</style>
      </section>

      {/* EXPERTISE */}
      <section
        id="expertise"
        style={{ padding: "100px 24px", background: "#0d1117" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div className="section-label">Core Competencies</div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 48px)",
                color: "#fff",
                marginBottom: 12,
                letterSpacing: "-0.02em",
              }}
            >
              Where I Deliver
            </h2>
            <p
              style={{
                color: "#4a5568",
                fontSize: 14,
                marginBottom: 56,
                maxWidth: 480,
              }}
            >
              A decade-plus of shipped software across six domains, distilled
              into six core strengths.
            </p>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            {EXPERTISE.map((ex, i) => (
              <FadeIn key={ex.title} delay={i * 0.08}>
                <div
                  className="card-hover"
                  style={{
                    padding: 28,
                    borderRadius: 12,
                    background: "#0a0c10",
                    border: `1px solid rgba(${ex.color === "#e53e3e" ? "229,62,62" : ex.color === "#3182ce" ? "49,130,206" : ex.color === "#805ad5" ? "128,90,213" : ex.color === "#319795" ? "49,151,149" : ex.color === "#d69e2e" ? "214,158,46" : "56,161,105"},0.2)`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: ex.color,
                      opacity: 0.7,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 14,
                      color: ex.color,
                    }}
                  >
                    {ex.icon}
                    <span
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#fff",
                      }}
                    >
                      {ex.title}
                    </span>
                  </div>
                  <p
                    style={{ fontSize: 13, lineHeight: 1.8, color: "#718096" }}
                  >
                    {ex.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section
        id="experience"
        style={{ padding: "100px 24px", background: "#0a0c10" }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div className="section-label">Career History</div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 48px)",
                color: "#fff",
                marginBottom: 60,
                letterSpacing: "-0.02em",
              }}
            >
              Experience Timeline
            </h2>
          </FadeIn>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 5,
                top: 0,
                bottom: 0,
                width: 1,
                background:
                  "linear-gradient(to bottom, #63b3ed, rgba(99,179,237,0.1))",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {EXPERIENCE.map((exp, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div style={{ display: "flex", gap: 28, paddingBottom: 40 }}>
                    <div className="timeline-dot" style={{ marginTop: 8 }} />
                    <div style={{ flex: 1, paddingBottom: 8 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: 4,
                          marginBottom: 4,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 700,
                            fontSize: 17,
                            color: "#e2e8f0",
                          }}
                        >
                          {exp.role}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: "#4a5568",
                            fontFamily: "'JetBrains Mono', monospace",
                            marginTop: 3,
                          }}
                        >
                          {exp.period}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: exp.color,
                          marginBottom: 10,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <GitBranch size={12} /> {exp.company}
                      </div>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#718096",
                          lineHeight: 1.8,
                          marginBottom: 10,
                        }}
                      >
                        {exp.desc}
                      </p>
                      <div>
                        {exp.tags.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        style={{ padding: "100px 24px", background: "#0d1117" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div className="section-label">Selected Work</div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 48px)",
                color: "#fff",
                marginBottom: 12,
                letterSpacing: "-0.02em",
              }}
            >
              Key Projects
            </h2>
            <p
              style={{
                color: "#4a5568",
                fontSize: 14,
                marginBottom: 56,
                maxWidth: 480,
              }}
            >
              A curated selection of impactful systems built across 17 years of
              professional engineering.
            </p>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 18,
            }}
          >
            {PROJECTS.map((proj, i) => (
              <FadeIn key={proj.name} delay={i * 0.06}>
                <div
                  className="card-hover"
                  style={{
                    padding: 24,
                    borderRadius: 12,
                    background: "#0a0c10",
                    border: "1px solid rgba(255,255,255,0.06)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: `radial-gradient(ellipse at top left, ${proj.color}22 0%, transparent 60%)`,
                      pointerEvents: "none",
                    }}
                  />
                  <div style={{ marginBottom: 12 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 4,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontWeight: 700,
                          fontSize: 15,
                          color: "#e2e8f0",
                          flex: 1,
                        }}
                      >
                        {proj.name}
                      </h3>
                      <ExternalLink
                        size={13}
                        color="#4a5568"
                        style={{ marginTop: 3, flexShrink: 0 }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#4a5568",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {proj.client}
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#718096",
                      lineHeight: 1.8,
                      marginBottom: 14,
                      flex: 1,
                    }}
                  >
                    {proj.desc}
                  </p>
                  <div>
                    {proj.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        style={{ padding: "100px 24px", background: "#0a0c10" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div className="section-label">Technical Arsenal</div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 4vw, 48px)",
                color: "#fff",
                marginBottom: 60,
                letterSpacing: "-0.02em",
              }}
            >
              Skills Cloud
            </h2>
          </FadeIn>
          {Object.entries(SKILLS).map(([cat, skills], ci) => {
            const palettes = {
              Backend: {
                bg: "rgba(229,62,62,0.08)",
                border: "rgba(229,62,62,0.25)",
                text: "#fc8181",
                hdr: "#e53e3e",
              },
              Frontend: {
                bg: "rgba(49,130,206,0.08)",
                border: "rgba(49,130,206,0.25)",
                text: "#63b3ed",
                hdr: "#3182ce",
              },
              Blockchain: {
                bg: "rgba(128,90,213,0.08)",
                border: "rgba(128,90,213,0.25)",
                text: "#b794f4",
                hdr: "#805ad5",
              },
              Databases: {
                bg: "rgba(49,151,149,0.08)",
                border: "rgba(49,151,149,0.25)",
                text: "#81e6d9",
                hdr: "#319795",
              },
              DevOps: {
                bg: "rgba(56,161,105,0.08)",
                border: "rgba(56,161,105,0.25)",
                text: "#9ae6b4",
                hdr: "#38a169",
              },
            };
            const p = palettes[cat];
            return (
              <FadeIn key={cat} delay={ci * 0.1}>
                <div
                  style={{
                    marginBottom: 32,
                    padding: "22px 24px",
                    borderRadius: 12,
                    background: p.bg,
                    border: `1px solid ${p.border}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: p.hdr,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Boxes size={14} /> {cat}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {skills.map((s) => (
                      <span
                        key={s}
                        className="skill-pill"
                        style={{
                          background: p.bg,
                          borderColor: p.border,
                          color: p.text,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}

          <FadeIn delay={0.5}>
            <div
              style={{
                marginTop: 48,
                padding: "28px 32px",
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(99,179,237,0.08), rgba(128,90,213,0.06))",
                border: "1px solid rgba(99,179,237,0.2)",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#4a5568",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Certifications & Education
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#e2e8f0",
                    marginBottom: 2,
                  }}
                >
                  Advanced Certificate in Blockchain Technology
                </div>
                <div style={{ fontSize: 12, color: "#63b3ed" }}>
                  IIIT Bangalore & upGrad · Dec 2022 – Aug 2023 · CGPA 3.59/4
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#4a5568",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Degree
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#e2e8f0",
                    marginBottom: 2,
                  }}
                >
                  Master of Computer Applications (MCA)
                </div>
                <div style={{ fontSize: 12, color: "#63b3ed" }}>
                  SASTRA Deemed University · 2004 – 2006 · 76%
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#4a5568",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Awards
                </div>
                <div
                  style={{ fontSize: 13, color: "#e2e8f0", marginBottom: 2 }}
                >
                  ⭐ Star of the Month – June 2021
                </div>
                <div style={{ fontSize: 13, color: "#e2e8f0" }}>
                  🏆 O Infinity, Achievers' League – June 2023
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          padding: "100px 24px 60px",
          background: "#0d1117",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,179,237,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div className="section-label" style={{ justifyContent: "center" }}>
              Let's Connect
            </div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 5vw, 64px)",
                color: "#fff",
                marginBottom: 16,
                letterSpacing: "-0.03em",
              }}
            >
              Get In Touch
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "#718096",
                lineHeight: 1.8,
                marginBottom: 48,
              }}
            >
              Open to senior engineering roles, technical leadership
              opportunities, and blockchain projects. Let's build something
              great together.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 48,
              }}
            >
              <a
                href="mailto:dhayalan.ijk@gmail.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 26px",
                  borderRadius: 10,
                  background: "rgba(99,179,237,0.1)",
                  border: "1px solid rgba(99,179,237,0.3)",
                  color: "#63b3ed",
                  textDecoration: "none",
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "rgba(99,179,237,0.2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "rgba(99,179,237,0.1)")
                }
              >
                <Mail size={16} /> dhayalan.ijk@gmail.com
              </a>
              <a
                href="tel:+919344626897"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 26px",
                  borderRadius: 10,
                  background: "rgba(29,161,242,0.1)",
                  border: "1px solid rgba(29,161,242,0.3)",
                  color: "#1da1f2",
                  textDecoration: "none",
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.borderColor = "#63b3ed")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
                }
              >
                <Phone size={16} /> +91 93446 26897
              </a>
              <a
                href="https://twitter.com/Dhayalan"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 26px",
                  borderRadius: 10,
                  background: "rgba(29,161,242,0.1)",
                  border: "1px solid rgba(29,161,242,0.3)",
                  color: "#1da1f2",
                  textDecoration: "none",
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "rgba(29,161,242,0.2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "rgba(29,161,242,0.1)")
                }
              >
                <Twitter size={16} /> @Dhayalan
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                color: "#4a5568",
                fontSize: 13,
              }}
            >
              <MapPin size={14} /> Hyderabad, Telangana, India
            </div>
          </FadeIn>
        </div>
        <div
          style={{
            maxWidth: 1200,
            margin: "60px auto 0",
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "#2d3748",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            © 2026 Dhayalan Isabella Jackulin Karunakaran
          </span>
          <span
            style={{
              fontSize: 12,
              color: "#2d3748",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Full Stack Rails Engineer · Blockchain Professional
          </span>
        </div>
      </section>
    </div>
  );
}
