import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import Navbar, { Wordmark } from "../components/Navbar";
import SubmitClip from "../components/SubmitClip";
import HeroVideo from "../components/HeroVideo";
import ClipWall from "../components/ClipWall";
import { HERO_CLIP } from "../lib/clips";

const steps = [
  {
    n: "01",
    title: "Record it",
    text: "A clutch play, a bug nobody believes, a fail you replayed ten times. If you laughed or yelled, it counts.",
  },
  {
    n: "02",
    title: "Send it",
    text: "Drop the file in the form below with your creator name. Takes about a minute, no account needed.",
  },
  {
    n: "03",
    title: "Watch for it",
    text: "We cut the best clips into a YouTube compilation. Your name goes in the credits, every time.",
  },
];

const facts = [
  ["First game", "GTA VI"],
  ["Formats", "MP4 · MOV · WebM"],
  ["Max size", "500 MB"],
  ["Credit", "Always"],
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="hero" id="home">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-content">
              <p className="eyebrow">
                <span className="live-dot" />
                Now collecting clips
              </p>
              <h1>
                Your clip.
                <br />
                <em>Our cut.</em>
              </h1>
              <p className="hero-copy">
                Send us the play, the fail, or the glitch you still can’t
                explain. The best ones get edited into Crimson Clips
                compilations on YouTube, with your name in the credits.
              </p>
              <div className="hero-actions">
                <a href="#submit" className="button">
                  Submit a clip
                  <ArrowUpRight size={18} />
                </a>
                <a href="#how-it-works" className="button outline">
                  How it works
                  <ArrowDown size={16} />
                </a>
              </div>
            </div>
            <figure className="viewfinder">
              <HeroVideo src={HERO_CLIP.src} />
              <span className="vf-play" aria-hidden="true">
                <Play size={26} fill="currentColor" />
              </span>
              <span className="vf-corner tl" />
              <span className="vf-corner tr" />
              <span className="vf-corner bl" />
              <span className="vf-corner br" />
              <span className="vf-rec">
                <span className="live-dot" /> Most popular clip
              </span>
              <figcaption className="vf-caption">
                <strong>{HERO_CLIP.title}</strong>
                <span>
                  {HERO_CLIP.author} · {HERO_CLIP.game}
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        <dl className="facts container">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <section className="section steps-section" id="how-it-works">
          <div className="container steps-layout">
            <div className="steps-head">
              <p className="eyebrow">How it works</p>
              <h2>
                From your screen
                <br />
                to the <em>edit.</em>
              </h2>
            </div>
            <ol className="steps">
              {steps.map(({ n, title, text }) => (
                <li className="step" key={n}>
                  <span className="step-number">{n}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section wall-section" id="clips">
          <div className="container">
            <div className="wall-head">
              <div>
                <p className="eyebrow">Featured clips</p>
                <h2>
                  The kind of thing
                  <br />
                  we’re <em>looking for.</em>
                </h2>
              </div>
              <p>Hover a clip to preview it.</p>
            </div>
            <ClipWall />
          </div>
        </section>

        <section className="about section" id="about">
          <div className="container about-layout">
            <figure className="player">
              <div className="player-screen">
                <span className="player-play">
                  <Play size={22} fill="currentColor" />
                </span>
              </div>
              <figcaption className="player-bar">
                <span>Compilation #01</span>
                <span className="player-track">
                  <span />
                </span>
                <span>GTA VI</span>
              </figcaption>
            </figure>
            <div className="about-copy">
              <p className="eyebrow">About</p>
              <h2>
                Made by players,
                <br />
                for <em>players.</em>
              </h2>
              <p>
                Crimson Clips is a small community project. Players send
                clips, we pick the best and cut them into compilations on
                YouTube.
              </p>
              <p>
                We’re starting with GTA VI. Fails, flukes and plays that
                shouldn’t have worked all fit. Everything is credited to the
                person who recorded it.
              </p>
              <a href="#submit" className="text-link">
                Send your first clip
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>

        <SubmitClip />

        <section className="community section" id="community">
          <div className="container">
            <p className="eyebrow">Follow along</p>
            <h2>
              Compilations live
              <br />
              on <em>YouTube.</em>
            </h2>
            <p>Official channels will be linked here once they go live.</p>
            <div className="socials">
              <button disabled>
                YouTube<span>Soon</span>
              </button>
              <button disabled>
                TikTok<span>Soon</span>
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
            <p>Your clip. Our cut.</p>
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
