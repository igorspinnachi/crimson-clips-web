"use client";
import { useState } from "react";
import { Bell, Palette, SlidersHorizontal, UserRound } from "lucide-react";
import { useAdmin } from "./AdminProvider";
import { PageHeading, ConfirmButton } from "./AdminUI";
export default function SettingsPage() {
  const { preferences, updatePreferences, reset } = useAdmin();
  const [message, setMessage] = useState("");
  return (
    <>
      <PageHeading
        eyebrow="MAKE THE WORKSPACE YOURS"
        title="Small details. Better workflow."
        description="Preview preferences for this browser session. No account or settings are saved."
      />
      <div className="admin-settings-grid">
        <section className="admin-panel admin-padded">
          <div className="admin-panel-heading">
            <h2>
              <UserRound size={18} />
              Administrator profile
            </h2>
            <span className="admin-mini-tag">PLACEHOLDER</span>
          </div>
          <div className="admin-settings-profile">
            <span className="admin-avatar">DA</span>
            <div>
              <strong>Demo administrator</strong>
              <p>No authenticated account</p>
            </div>
          </div>
          <label className="admin-field">
            Display name
            <input
              maxLength={60}
              value={preferences.displayName}
              onChange={(e) =>
                updatePreferences({ displayName: e.target.value })
              }
            />
          </label>
          <label className="admin-field">
            Email address
            <input readOnly value="admin@example.com" />
          </label>
          <p className="admin-help">
            The display name updates the sidebar only. This is not account
            management.
          </p>
        </section>
        <section className="admin-panel admin-padded">
          <div className="admin-panel-heading">
            <h2>
              <Palette size={18} />
              Appearance
            </h2>
          </div>
          <div className="admin-theme-preview">
            <span>
              CRIMSON<span>CLIPS</span>
            </span>
            <div>
              <i />
              <i />
              <i />
              <i />
            </div>
            <strong>After hours.</strong>
            <small>Signature dark theme</small>
          </div>
          <p className="admin-help">
            Crimson accents, deep burgundy surfaces and high-contrast
            typography. This preview uses the fixed Crimson Clips theme.
          </p>
          <label className="admin-setting-row">
            <span>
              <strong>Compact table rows</strong>
              <small>Show more submissions with less spacing.</small>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={preferences.compactRows}
              onChange={(e) =>
                updatePreferences({ compactRows: e.target.checked })
              }
            />
          </label>
        </section>
        <section className="admin-panel admin-padded">
          <div className="admin-panel-heading">
            <h2>
              <Bell size={18} />
              Notifications preview
            </h2>
          </div>
          <p className="admin-help">
            These switches only demonstrate the interface. No emails or
            notifications will be sent.
          </p>
          <label className="admin-setting-row">
            <span>
              <strong>New submission alerts</strong>
              <small>Preview an email alert preference.</small>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={preferences.emailAlerts}
              onChange={(e) =>
                updatePreferences({ emailAlerts: e.target.checked })
              }
            />
          </label>
          <label className="admin-setting-row">
            <span>
              <strong>Weekly editorial digest</strong>
              <small>Preview a weekly summary preference.</small>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={preferences.weeklyDigest}
              onChange={(e) =>
                updatePreferences({ weeklyDigest: e.target.checked })
              }
            />
          </label>
        </section>
        <section className="admin-panel admin-padded">
          <div className="admin-panel-heading">
            <h2>
              <SlidersHorizontal size={18} />
              General preferences
            </h2>
          </div>
          <label className="admin-field">
            Submissions per page
            <select
              value={preferences.defaultPageSize}
              onChange={(e) =>
                updatePreferences({ defaultPageSize: Number(e.target.value) })
              }
            >
              <option value={8}>8 submissions</option>
              <option value={12}>12 submissions</option>
              <option value={24}>24 submissions</option>
            </select>
          </label>
          <div className="admin-setting-row">
            <span>
              <strong>Time zone</strong>
              <small>Demo timestamps use UTC consistently.</small>
            </span>
            <span className="admin-mini-tag">UTC</span>
          </div>
          <p className="admin-help">
            Preferences update instantly within the admin preview. Refreshing
            the page resets everything.
          </p>
        </section>
      </div>
      <section className="admin-reset-panel">
        <div>
          <h2>A fresh start</h2>
          <p>
            Restore fictional submissions, internal notes and preferences to
            their initial values.
          </p>
        </div>
        <ConfirmButton
          label="Reset demo workspace"
          title="Reset this demo workspace?"
          description="All status changes, notes, compilation links and preferences in this session will return to the original fictional data."
          className="admin-button danger"
          onConfirm={() => {
            reset();
            setMessage(
              "Demo workspace reset. All temporary changes have been cleared.",
            );
          }}
        />
      </section>
      <p className="admin-feedback" role="status">
        {message}
      </p>
    </>
  );
}
