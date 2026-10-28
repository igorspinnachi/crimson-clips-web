import type {
  AdminSubmission,
  AdminActivity,
  AdminPreferences,
} from "../types/admin";
export const DEMO_DATE = "2026-10-28";
const creators = [
  "NeonDrifter",
  "PixelVandal",
  "MidnightMako",
  "ClutchCassette",
  "VioletRacer",
  "GhostCircuit",
  "TurboMango",
  "NovaNomad",
  "CrimsonCoyote",
  "LagoonLegend",
  "EchoArcade",
  "VelvetVortex",
  "RogueRaccoon",
  "StaticSparrow",
  "LunarLynx",
  "DriftDahlia",
  "ArcadeAtlas",
  "MossyMeteor",
  "CopperComet",
  "RetroRaven",
  "CobaltCrow",
  "PepperPilot",
  "SolarSkater",
  "MoonlitMoth",
];
const games = ["GTA VI", "Cyberpunk 2077", "Forza Horizon 5", "Fortnite"];
const categories = ["Funny", "Epic", "Fail", "Unexpected", "Other"];
const statuses: AdminSubmission["status"][] = [
  "Pending",
  "Under Review",
  "Selected",
  "Published",
  "Pending",
  "Rejected",
  "Selected",
  "Pending",
  "Published",
  "Under Review",
  "Rejected",
  "Selected",
];
const descriptions = [
  "A perfectly planned getaway became a three-car pileup. The last few seconds are the best part.",
  "My cleanest last-second escape yet. Keep the original reaction audio if this makes the cut.",
  "We tried the same jump six times. This was the one attempt nobody expected to work.",
  "A quiet session with friends turned into complete chaos. The timing was entirely accidental.",
  "One unexpected move changed the whole round. The full lead-up is included for context.",
];
export const mockSubmissions: AdminSubmission[] = creators.map(
  (creator, i) => ({
    id: `CC-${String(1048 - i).padStart(4, "0")}`,
    creator,
    email: `${creator.toLowerCase()}@example.com`,
    game: games[i % games.length],
    category: categories[i % categories.length],
    submittedAt: `2026-10-${String(28 - Math.floor(i / 2)).padStart(2, "0")}T${String(18 - (i % 9)).padStart(2, "0")}:24:00Z`,
    description: descriptions[i % descriptions.length],
    social: `https://example.com/creators/${creator.toLowerCase()}`,
    filename: `${creator.toLowerCase()}_highlight_${i + 1}.${i % 3 === 0 ? "mov" : i % 3 === 1 ? "mp4" : "webm"}`,
    sizeMB: 34 + i * 13.6,
    format: i % 3 === 0 ? "MOV" : i % 3 === 1 ? "MP4" : "WebM",
    status: statuses[i % statuses.length],
    notes:
      i % 5 === 0
        ? "Check the reaction audio and opening seconds before shortlisting."
        : "",
    compilationUrl: "",
  }),
);
export const initialActivity: AdminActivity[] = [
  {
    id: "seed-1",
    submissionId: "CC-1045",
    creator: "ClutchCassette",
    message: "Marked Published in the fictional demo dataset",
    time: "Demo history",
  },
  {
    id: "seed-2",
    submissionId: "CC-1047",
    creator: "PixelVandal",
    message: "Editorial queue prepared for this preview",
    time: "Demo history",
  },
];
export const defaultPreferences: AdminPreferences = {
  displayName: "Demo Administrator",
  emailAlerts: false,
  weeklyDigest: true,
  compactRows: false,
  defaultPageSize: 8,
};
