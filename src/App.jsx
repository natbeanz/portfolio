import React, { useState, useEffect, useRef } from "react";

export default function App() {
  // Existing states & refs
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const aboutLeftRef = useRef(null);
  const aboutRightRef = useRef(null);

  // Add new state for contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "contact"];
      let current = "hero";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 80) {
          current = id;
        }
      });
      setActiveSection(current);
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-left");
          if (entry.target === aboutLeftRef.current && aboutRightRef.current) {
            aboutRightRef.current.classList.add("slide-right");
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (aboutLeftRef.current) {
      observer.observe(aboutLeftRef.current);
    }

    return () => {
      if (aboutLeftRef.current) {
        observer.unobserve(aboutLeftRef.current);
      }
    };
  }, []);

  // Contact form handlers
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:natashalim0403@gmail.com?subject=Contact%20from%20${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.email)}`;
    window.location.href = mailtoLink;
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-sans bg-background-color text-text-color scroll-smooth">
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-secondary-accent bg-opacity-90 shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div
            className="text-2xl font-bold cursor-pointer text-background-color"
            onClick={() => scrollTo("hero")}
          >
            Natasha Lim
          </div>
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`cursor-pointer hover:text-secondary-accent ${
                  activeSection === item.id
                    ? "text-background-color font-semibold"
                    : "text-main-accent hover:text-secondary-accent"
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="hero-section h-screen flex flex-col justify-center items-center text-center px-4"
      >
        <h1 className="text-5xl font-bold mb-4 text-background-color hero-typing">
          Hi, I'm Natasha Lim</h1>
        <p className="text-lg max-w-2xl">
          An aspiring web developer creating clean, modern, and user-friendly experiences.
        </p>
        <button
          onClick={() => scrollTo("contact")}
          className="mt-6 px-6 py-3 bg-main-accent text-text-color font-semibold rounded-lg shadow hover:bg-opacity-80 transition"
        >
          Contact Me
        </button>
      </section>

      {/* About Me */}
      <section id="about" className="py-16 px-4 bg-transparent pt-16">
        <div className="max-w-6xl mx-auto about-wrapper">
          {/* Left: text card with accent behind */}
          <div
            className="about-left relative"
            ref={aboutLeftRef}
          >
            <div className="about-accent" aria-hidden="true"></div>
            <div className="about-card">
              <h2 className="about-title">About Me</h2>
              <p className="about-body">
                I’m a student at the University of Queensland, studying a Bachelor of Information Technology with a major in UX Design.<br />
                I’m passionate about designing intuitive and meaningful websites and apps that
                improve user experiences.<br />
                In my free time, I enjoy running, playing volleyball, reading, experimenting with 3D rendering software,
                and exploring emerging design tools and trends.
              </p>
            </div>
          </div>

          {/* Right: circular image */}
          <div
            className="about-right relative"
            ref={aboutRightRef}
          >
            <div className="about-image">
              <img src="/inc/about-img.jpg" alt="Natasha" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 px-4 bg-main-accent text-center">
        <h2 className="text-4xl font-bold mb-6 text-text-color mt-10"
            style={{fontSize: "2.2rem"}}
        >
          Past Projects</h2>
        <div className="max-w-6xl mx-auto space-y-[10px]">
          {[
            {
              title: "Newish Communications Website Redesign",
              desc: "Helped redesign and develop the Newish website using WordPress, Elementor, and custom code, creating a modern, professional, and accessible online presence for the company. I am also responsible for maintaining and updating the site, ensuring it remains up-to-date and functional.",
              img: "/inc/newish-img.png",
              link: "https://www.newish.com.au/",
            },
            {
              title: "Allison Rushby Website",
              desc: "Designed and developed a custom Squarespace website for author Allison Rushby, showcasing her books and engaging readers. Used Figma to design, and a combination of Squarespace and custom coding to create a visually appealing, user-friendly site with custom layouts, interactive elements, and seamless navigation. Collaborated closely with the author to ensure the design reflected her brand and effectively promoted her work.",
              img: "/inc/allison-img.png",
              link: "https://www.allisonrushby.com/",
            },
            {
              title: "The Ceramic Studio Concept Design",
              desc: "As part of a probation project for my internship at Newish, I designed a concept website for The Ceramic Studio, a local pottery studio. Using Figma, I created a modern and on-brand that showcased the studio’s offerings, including classes, workshops, and product offerings. I worked closely with the Marketing team to ensure the design reflected the studio's customers and brand identity.",
              iframeSrc: "https://embed.figma.com/design/3iENuLQd1DuwH7yfaVJMxB/Newish-Probation-Project--The-Ceramic-Studio?node-id=0-1&embed-host=share",
              isFigma: true,
            },
            {
              title: "Ascentsia Law Corporation Website",
              desc: "Led the development of a fully custom WordPress web and mobile website from scratch using PHP, JavaScript, and TailwindCSS, without templates or page builders. Designed a responsive, SEO-optimized site tailored specifically to the firm’s branding and operational needs, enhancing user experience and client accessibility. Collaborated closely with the Business Development Manager to align the website with the company’s marketing goals.",
              img: "/inc/ascentsia-img.png",
              link: "https://www.ascentsialawcorp.com/",
            },
            {
              title: "Portfolio Website",
              desc: "Built a modern personal portfolio website using Vite and React, focusing on clean, efficient code and smooth user experience. Designed and developed responsive layouts, reusable components, and interactive elements to showcase projects effectively. Emphasized accessibility, performance, and maintainability throughout the site.",
              img: "/inc/portfolio-img.png",
            },
            {
              title: "Interactive Plant Discovery Platform",
              desc: "YayPlants! is a Figma-designed web prototype that helps users explore, identify, and learn about native flora in Queensland. The project features an intuitive homepage, plant catalogue, detailed species pages, and a camera-based plant finder. Created for a class project, it emphasizes user-friendly navigation, engaging visuals, and clear plant information to make plant discovery fun and accessible for all nature enthusiasts.",
              img: "/inc/figma-img.png",
            },
          ].map((p, i) => (
            <div
              key={i}
              className="project-container slide-right rounded-lg p-8 bg-background-color"
              style={{ minHeight: "300px" }}
            >
              {/* Title centered above */}
              <h3 className="project-title text-2xl font-semibold mb-6 text-text-color text-center">
                {p.title === "Ascentsia Law Corporation Website" ? (
                  <a
                    href="https://www.ascentsialawcorp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-color font-semibold no-underline hover:underline"
                  >
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h3>

              {/* Container for image and description, side by side */}
              <div className="flex items-start gap-6">
                {p.iframeSrc ? (
                  <iframe
                    src={p.iframeSrc}
                    title={p.title}
                    className="project-image rounded-md flex-shrink-0 w-[40%] h-60"
                    frameBorder="0"
                    loading="lazy"
                    sandbox={p.isFigma ? undefined : "allow-same-origin allow-scripts allow-popups allow-forms"}
                    allowFullScreen={p.isFigma}
                  ></iframe>
                ) : p.link ? (
                    <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-[50%] h-60 relative group block"
                  >
                    <img
                      src={p.img}
                      alt={`${p.title} preview`}
                      className="project-image rounded-md w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
                    />
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    </span>
                  </a>
                ) : (
                  <img
                    src={p.img}
                    alt={`${p.title} preview`}
                    className="project-image rounded-md flex-shrink-0 w-[40%] h-60 object-cover"
                  />
                )}

                <p className="project-desc flex-grow text-text-color text-left">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="skills-section py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6"
        style={{fontSize: "2.2rem"}}
        >
          Skills and Experiences</h2>

        {/*
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          
          {["React", "JavaScript", "HTML", "CSS", "Node.js", "TailwindCSS"].map(
            (skill, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-background-color rounded-full shadow text-text-color font-medium"
              >
                {skill}
              </span>
            )
          )}
        </div>
        */}

        <h3 className="text-2xl font-semibold mb-4">My Resume</h3>
        <iframe
          src="/inc/my-resume.pdf"
          title="Resume PDF"
          width="80%"
          height="600px"
          className="mx-auto border-2 rounded-lg shadow-lg max-w-2xl"
        ></iframe>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4 bg-background-color">
        <div className="max-w-6xl mx-auto">
          {/* Left side: Title + textarea */}
          <div className="md:w-1/2 flex flex-col justify-start">
            <h2 className="text-4xl font-bold mb-6 text-text-color text-left"
            style={{fontSize: "2.2rem"}}>
              Contact Me
            </h2>
            <p>Thanks for checking out my portfolio! I’m currently open for new opportunities and eager to collaborate on exciting projects. Feel free to reach out with any inquiries or to discuss how we can work together. Looking forward to hearing from you!
            </p>
          </div>

          {/* Right side: inputs + button */}
          <form
            onSubmit={handleSubmit}
            className="md:w-1/2 flex flex-col justify-center gap-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="input-field resize-none"
            />
            <button type="submit" className="btn-submit">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Natasha Lim. All rights reserved.</p>
      </footer>

    </div>
  );
}
