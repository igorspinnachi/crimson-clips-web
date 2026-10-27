"use client";
import { useId, useRef, useState, type FormEvent, type DragEvent } from "react";
import {
  Upload,
  ArrowUpRight,
  FileVideo,
  X,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { CATEGORIES, MAX_FILE_BYTES } from "../lib/constants";
import { validateVideo } from "../lib/validation";
export default function SubmitClip() {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const result = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "checked">("idle");
  const [dragging, setDragging] = useState(false);
  function choose(candidate?: File) {
    setStatus("idle");
    setError("");
    setFile(null);
    if (!candidate) return;
    const validationError = validateVideo(candidate, MAX_FILE_BYTES);
    if (validationError) setError(validationError);
    else setFile(candidate);
    if (input.current) input.current.value = "";
  }
  function drop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length !== 1) {
      setError("Please choose one video at a time.");
      setStatus("idle");
      return;
    }
    choose(e.dataTransfer.files[0]);
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!file) {
      setError("Choose a video before checking your submission.");
      input.current?.focus();
      return;
    }
    setStatus("checking");
    // Local validation only: no request, file transfer or simulated upload progress.
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve()),
    );
    setStatus("checked");
    requestAnimationFrame(() => result.current?.focus());
  }
  return (
    <section id="submit" className="section submit-section">
      <div className="container submit-layout">
        <div className="submit-intro">
          <p className="eyebrow">YOUR NEXT BIG MOMENT STARTS HERE</p>
          <h2>
            GOT A CLIP
            <br />
            WORTH <em>SHARING?</em>
          </h2>
          <p>
            Send us your best gaming moment. Our team might feature it in an
            upcoming Crimson Clips compilation.
          </p>
          <div className="submission-note">
            <ShieldCheck size={25} />
            <div>
              <strong>Your moment. Your credit.</strong>
              <p>
                Tell us your creator name and where to find you. Selected clips
                will be credited.
              </p>
            </div>
          </div>
          <span className="side-index">
            MAKE IT
            <br />
            UNFORGETTABLE.
          </span>
        </div>
        <form
          className="submission-form"
          onSubmit={submit}
          onChange={() => setStatus("idle")}
        >
          <div className="form-top">
            <span className="eyebrow">THE SUBMISSION DESK</span>
            <span className="demo-pill">DEMO MODE</span>
          </div>
          <p className="demo-notice">
            Try the form locally. Files and personal details are not uploaded or
            saved.
          </p>
          <div className="form-grid">
            <label>
              Creator name <span>*</span>
              <input
                name="creator"
                required
                maxLength={80}
                autoComplete="nickname"
                placeholder="Your gaming nickname"
              />
            </label>
            <label>
              Email address <span>*</span>
              <input
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
            <label>
              Game title <span>*</span>
              <select name="game" defaultValue="GTA VI">
                <option>GTA VI</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Clip category <span>*</span>
              <select name="category" defaultValue="Funny">
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
          <label htmlFor={id}>
            Your video <span>*</span>
          </label>
          <div
            className={`dropzone ${dragging ? "dragging" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={drop}
          >
            <input
              ref={input}
              id={id}
              className="file-input"
              type="file"
              accept=".mp4,.mov,.webm,video/mp4,video/quicktime,video/webm"
              aria-describedby={`${id}-help ${id}-error`}
              aria-invalid={!!error}
              onChange={(e) => choose(e.target.files?.[0])}
            />
            <Upload size={30} />
            <strong>Drop your moment here</strong>
            <span>
              or <u>browse files</u>
            </span>
            <small id={`${id}-help`}>MP4, MOV, WEBM · UP TO 500 MB</small>
          </div>
          {file && (
            <div className="file-row">
              <FileVideo size={22} />
              <span>
                <strong>{file.name}</strong>
                <small>
                  {(file.size / 1024 / 1024).toFixed(1)} MB · Ready for local
                  validation
                </small>
              </span>
              <button
                type="button"
                aria-label="Remove selected video"
                onClick={() => {
                  setFile(null);
                  setStatus("idle");
                }}
              >
                <X size={19} />
              </button>
            </div>
          )}
          <p id={`${id}-error`} className="error" role="alert">
            {error}
          </p>
          <label>
            Creator social profile <span className="optional">optional</span>
            <input
              name="social"
              type="url"
              placeholder="https://"
              maxLength={500}
            />
          </label>
          <label>
            Behind the moment <span className="optional">optional</span>
            <textarea
              name="notes"
              rows={3}
              maxLength={2000}
              placeholder="Set the scene. What happened?"
            />
          </label>
          <label className="checkbox">
            <input name="permission" type="checkbox" required />
            <span>
              I own this video or have permission to submit it, and agree to the{" "}
              <a href="#submission-terms">submission terms</a>. <b>*</b>
            </span>
          </label>
          <button
            className="button form-button"
            type="submit"
            disabled={status === "checking"}
          >
            {status === "checking" ? "CHECKING…" : "CHECK MY SUBMISSION"}
            <ArrowUpRight size={20} />
          </button>
          {status === "checking" && (
            <progress aria-label="Checking local submission" />
          )}
          {status === "checked" && (
            <div className="checked" tabIndex={-1} ref={result} role="status">
              <CheckCircle2 size={22} />
              <span>
                <strong>Your submission passes local checks.</strong>Demo only —
                nothing was uploaded or sent. Live submissions are not available
                yet.
              </span>
            </div>
          )}
          <p className="form-fineprint">
            Selection is editorial. Submitting a clip does not guarantee a
            feature.
          </p>
        </form>
      </div>
    </section>
  );
}
