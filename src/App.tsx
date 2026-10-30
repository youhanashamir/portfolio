import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { Reveal } from "@/components/ui";
import {
  about,
  approach,
  availability,
  contact,
  education,
  languages,
  projects,
  selectedExperience,
  services,
  spokenLanguages,
  support,
  tools,
} from "@/data";
import type { Project } from "@/data";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const featuredProject = projects[0];
const remainingProjects = projects.slice(1);

function ProjectPreview({ project, featured = false }: { project: Project; featured?: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className={`preview-module ${featured ? "preview-featured" : ""}`}>
      {project.previewImage && !imageFailed ? (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="preview-viewport preview-link"
          aria-label={`Visit ${project.name} website — ${project.domain}`}
          title={`Visit ${project.name} — ${project.domain}`}
        >
          <img
            src={project.previewImage}
            alt={`${project.name} website screenshot`}
            loading={featured ? "eager" : "lazy"}
            onError={() => setImageFailed(true)}
            className="saved-preview"
          />
          <span className="preview-visit-badge" aria-hidden="true">
            Visit site ↗
          </span>
        </a>
      ) : (
        <div className="preview-viewport">
          <div className="preview-empty">
            <span className="font-display text-2xl font-bold text-ink">{project.name}</span>
            <span className="mt-2 text-sm font-medium text-muted">
              Add a screenshot path for this project in <code>src/data.ts</code>
            </span>
          </div>
        </div>
      )}

      <div className="preview-toolbar">
        <span className="screenshot-caption">Website screenshot</span>
        <a href={project.url} target="_blank" rel="noreferrer" className="open-site-link">
          Visit website <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <Reveal className="project-item">
      <ProjectPreview project={project} />
      <div className="project-copy">
        <div>
          <a href={project.url} target="_blank" rel="noreferrer" className="project-title">
            {project.name}
          </a>
          <p className="mt-2 text-[0.94rem] font-medium text-muted">{project.sector}</p>
          <p className="mt-1 text-[0.86rem] font-semibold text-faint">{project.platform}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-paper text-ink">
        <header className="site-header">
          <div className="header-inner">
            <a href="#home" className="brand-name">
              Youhana Shamir
            </a>

            <nav className="desktop-nav" aria-label="Main navigation">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </nav>

            <a href="#contact" className="header-contact">
              Get in touch <span aria-hidden="true">↓</span>
            </a>
            <button
              type="button"
              className={`menu-button ${menuOpen ? "is-open" : ""}`}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>

          {menuOpen && (
            <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-menu-link"
                >
                  {item.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mobile-menu-link text-brand"
              >
                Get in touch <span aria-hidden="true">↓</span>
              </a>
            </nav>
          )}
        </header>

        <main>
          <section id="home" className="scroll-mt-24">
            <div className="hero-intro">
              <Reveal y={12}>
                <p className="eyebrow">
                  {contact.role} <span className="eyebrow-divider" /> {contact.location}
                </p>
                <h1 className="hero-name mt-7">
                  Youhana <span>Shamir</span>
                </h1>
              </Reveal>

              <div className="hero-subline">
                <Reveal className="hero-copy" delay={0.08}>
                  <p>
                    Shopify storefronts and WordPress websites, built and supported for real
                    businesses.
                  </p>
                </Reveal>
                <Reveal className="hero-actions" delay={0.12}>
                  <a href="#work" className="button-primary">
                    Explore selected work <span aria-hidden="true">↓</span>
                  </a>
                  <a href="#contact" className="button-secondary">
                    Contact me
                  </a>
                </Reveal>
              </div>
            </div>

            <Reveal y={10}>
              <ProjectPreview project={featuredProject} featured />
            </Reveal>

            <div className="feature-caption">
              <div>
                <p className="eyebrow">Featured website</p>
                <h2 className="mt-2 font-display text-[1.35rem] font-bold tracking-[-0.035em] text-ink">
                  {featuredProject.name}
                </h2>
              </div>
              <p className="feature-sector">{featuredProject.sector} <span /> {featuredProject.platform}</p>
            </div>
          </section>

          <section id="work" className="work-section scroll-mt-24">
            <div className="page-wrap">
              <Reveal>
                <div className="section-heading-row">
                  <div>
                    <p className="eyebrow">Selected work</p>
                    <h2 className="section-title mt-5">Made for the people behind the business.</h2>
                  </div>
                  <p className="section-description">
                    Explore live websites across fashion, retail, healthcare, security,
                    hospitality and community work.
                  </p>
                </div>
              </Reveal>

              <div className="project-grid">
                {remainingProjects.map((project) => (
                  <ProjectItem key={project.domain} project={project} />
                ))}
              </div>
            </div>
          </section>

          <section id="services" className="services-section scroll-mt-24">
            <div className="page-wrap">
              <Reveal>
                <div className="section-heading-row">
                  <div>
                    <p className="eyebrow">What I do</p>
                    <h2 className="section-title mt-5">Thoughtful development. Practical support.</h2>
                  </div>
                  <p className="section-description">
                    Websites that work properly and make a business easy to understand.
                  </p>
                </div>
              </Reveal>

              <div className="service-grid">
                {services.map((service, index) => (
                  <Reveal key={service.title} delay={index * 0.08}>
                    <article className="service-column">
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-intro">{service.intro}</p>
                      <ul className="service-list">
                        {service.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section id="about" className="about-section scroll-mt-24">
            <div className="page-wrap about-grid">
              <Reveal>
                <p className="eyebrow">About me</p>
                <h2 className="section-title mt-5">Built around the work, not the noise.</h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="about-lead">{about}</p>
                <div className="about-detail">
                  <p className="eyebrow">Selected experience</p>
                  <p>{selectedExperience}</p>
                </div>
                <div className="about-detail">
                  <p className="eyebrow">How I work</p>
                  <p>{approach}</p>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="tools-section">
            <div className="page-wrap tools-grid">
              <Reveal>
                <p className="eyebrow">Tools and languages</p>
                <h2 className="tools-heading">The things I work with.</h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="tools-copy">{languages.join(" / ")}</p>
                <div className="thin-rule" />
                <p className="tools-copy">{tools.join(" / ")}</p>
                <p className="tools-secondary">{education.join(" / ")}</p>
                <p className="tools-secondary">{spokenLanguages.join(" / ")}</p>
              </Reveal>
            </div>
          </section>

          <section className="after-launch-section">
            <div className="page-wrap after-launch-grid">
              <Reveal>
                <p className="eyebrow">After launch</p>
                <h2 className="after-launch-title">Good work keeps working.</h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="after-launch-copy">{support}</p>
                <p className="availability-copy">{availability}</p>
              </Reveal>
            </div>
          </section>
        </main>

        <footer id="contact" className="contact-section scroll-mt-24">
          <div className="page-wrap">
            <Reveal>
              <p className="eyebrow">Contact</p>
              <h2 className="contact-title">Let&rsquo;s make something useful.</h2>
            </Reveal>

            <div className="contact-grid">
              <Reveal>
                <p className="contact-summary">
                  {contact.name}, {contact.role} based in {contact.location}.
                </p>
                <a href={contact.emailHref} className="button-light contact-cta">
                  Send an email <span aria-hidden="true">↗</span>
                </a>
              </Reveal>

              <dl className="contact-details">
                <div>
                  <dt>WhatsApp</dt>
                  <dd>
                    <a href={contact.whatsappHref} target="_blank" rel="noreferrer">
                      {contact.whatsapp}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd><a href={contact.emailHref}>{contact.email}</a></dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{contact.location}</dd>
                </div>
              </dl>
            </div>

            <div className="footer-bottom">
              <span>{contact.name}</span>
              <a href="#home">Back to top ↑</a>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}