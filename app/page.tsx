import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Gamepad2,
  Scissors,
  TvMinimalPlay,
  Upload,
  Play,
  Check,
} from "lucide-react";
import Navbar, { Wordmark } from "../components/Navbar";
import SubmitClip from "../components/SubmitClip";
const steps = [
  {
    n: "01",
    title: "CAPTURE",
    text: "Record your funniest, craziest, or most unforgettable gaming moment.",
    Icon: Gamepad2,
  },
  {
    n: "02",
    title: "SUBMIT",
    text: "Upload your clip and tell us where to credit you.",
    Icon: Upload,
  },
  {
    n: "03",
    title: "GET FEATURED",
    text: "We select and edit the best clips into YouTube compilations.",
    Icon: Scissors,
  },
];
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="hero" id="home">
          <Image
            src="/images/crimson-night.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-art"
          />
          <div className="hero-shade" />
          <div className="container hero-content">
            <p className="eyebrow">
              <span className="live-dot" />
              THE HOME OF GAMING HIGHLIGHTS
            </p>
            <div className="hero-brand" aria-hidden="true">
              CRIMSON <span>CLIPS</span>
            </div>
            <h1>
              YOUR GAME.
              <br />
              <em>YOUR MOMENT.</em>
            </h1>
            <p className="hero-copy">
              Epic wins. Hilarious fails. Legendary moments.
              <br className="desktop-break" /> Submit your best gaming clips and
              become part of our next YouTube compilation.
            </p>
            <div className="hero-actions">
              <a href="#submit" className="button">
                <Upload size={21} />
                SUBMIT YOUR CLIP
                <ArrowUpRight size={21} />
              </a>
              <a href="#how-it-works" className="button outline">
                HOW IT WORKS
                <ArrowDown size={18} />
              </a>
            </div>
            <p className="hero-micro">
              BUILT FOR GAMERS. <span>POWERED BY THE COMMUNITY.</span>
            </p>
          </div>
          <div className="hero-bottom container">
            <span>GAMING MOMENTS. EDITED FOR A BIGGER STORY.</span>
            <a href="#how-it-works">
              SCROLL TO EXPLORE <ArrowDown size={15} />
            </a>
          </div>
        </section>
        <div className="ticker" aria-hidden="true">
          <span>EPIC WINS</span>
          <i>✦</i>
          <span>HILARIOUS FAILS</span>
          <i>✦</i>
          <span>UNEXPECTED CHAOS</span>
          <i>✦</i>
          <span>LEGENDARY MOMENTS</span>
          <i>✦</i>
        </div>
        <section className="section steps-section" id="how-it-works">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">FROM YOUR SCREEN TO THE SPOTLIGHT</p>
                <h2>
                  THREE STEPS.
                  <br />
                  ONE BIG <em>MOMENT.</em>
                </h2>
              </div>
              <p>
                You bring the gameplay.
                <br />
                We bring the bigger story.
              </p>
            </div>
            <div className="steps">
              {steps.map(({ n, title, text, Icon }) => (
                <article className="step" key={n}>
                  <div className="step-top">
                    <span className="icon-box">
                      <Icon size={29} />
                    </span>
                    <span className="step-number">{n}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="step-rule" />
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="about section" id="about">
          <div className="container about-layout">
            <div className="editorial-art">
              <Image
                src="/images/crimson-night.webp"
                alt="Crimson-lit waterfront skyline and a sports car at night"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
              />
              <div className="art-overlay" />
              <span className="frame-label">
                <span className="live-dot" />
                THE MOMENTS BETWEEN MISSIONS
              </span>
              <span className="art-word">
                PURE
                <br />
                <em>UNSCRIPTED.</em>
              </span>
              <span className="art-corner">CC / COMMUNITY CUTS</span>
            </div>
            <div className="about-copy">
              <p className="eyebrow">BE PART OF SOMETHING BIGGER</p>
              <h2>
                MADE BY GAMERS.
                <br />
                FOR <em>GAMERS.</em>
              </h2>
              <p>
                Crimson Clips is a community-driven gaming highlights project
                built around the moments worth sharing.
              </p>
              <p>
                From hilarious fails to unforgettable plays, we bring together
                clips from gamers around the world and transform them into
                entertaining YouTube compilations.
              </p>
              <p>
                Starting with GTA VI, we’re building a community where every
                great gaming moment has a chance to be seen.
              </p>
              <div className="about-points">
                <span>
                  <Check size={16} /> Real community moments
                </span>
                <span>
                  <Check size={16} /> Credit to the creators
                </span>
              </div>
              <a href="#submit" className="text-link">
                LET’S MAKE SOMETHING LEGENDARY
                <ArrowUpRight size={19} />
              </a>
            </div>
          </div>
        </section>
        <SubmitClip />
        <section className="community section" id="community">
          <div className="container">
            <span className="community-icon">
              <Play size={27} fill="currentColor" />
            </span>
            <p className="eyebrow">THE STORY DOESN’T END HERE</p>
            <h2>
              THE BEST MOMENTS
              <br />
              DESERVE AN <em>AUDIENCE.</em>
            </h2>
            <p>
              The clips come from you. The compilations live on YouTube.
              <br />
              Our official social links will be announced here.
            </p>
            <div className="socials">
              <button disabled>
                <TvMinimalPlay size={23} />
                YouTube<span>COMING SOON</span>
              </button>
              <button disabled>
                <Play size={21} />
                TikTok<span>COMING SOON</span>
              </button>
            </div>
          </div>
        </section>
        <section className="policies container" aria-label="Site information">
          <details id="submission-terms">
            <summary>Submission terms — demo notice</summary>
            <p>
              This is a frontend demonstration. No submission is collected and
              no publishing licence is granted through this form. Live
              submission terms, including editing and publication permissions,
              attribution, and removal requests, must be provided before uploads
              open. Submit only videos you own or have permission to share.
              Editorial selection is not guaranteed.
            </p>
          </details>
          <details id="privacy">
            <summary>Privacy — demo notice</summary>
            <p>
              This form validates information in your browser only. It does not
              upload videos, send form details, or persist entries. Site hosting
              may process ordinary request information. A complete privacy
              policy and contact details will be published before live
              submissions open.
            </p>
          </details>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-top">
          <div>
            <a href="#home" aria-label="Crimson Clips home">
              <Wordmark />
            </a>
            <p>Your game. Your moment. A bigger story.</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#about">About</a>
            <a href="#how-it-works">How it works</a>
            <a href="#submit">Submit a clip</a>
          </nav>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Crimson Clips.</span>
          <span>Contact details coming soon</span>
          <a href="#privacy">Privacy</a>
          <a href="#submission-terms">Submission terms</a>
        </div>
      </footer>
    </>
  );
}
