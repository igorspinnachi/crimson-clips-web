/**
 * Clip content for the landing page.
 *
 * Drop your video files into /public/clips/ and edit the entries below.
 * Until a file exists, the card shows a dark placeholder.
 * Tips: MP4 (H.264), 3–8 s, 1280x720, under ~3 MB each, no audio needed.
 */

/** "Most popular clip" shown in the hero. Edit title/author, drop the file in /public/clips/. */
export const HERO_CLIP = {
  src: "/clips/hero.mp4",
  title: "Most popular clip title",
  author: "@creator",
  game: "GTA VI",
};

export type Clip = {
  src: string;
  title: string;
  author: string;
  game: string;
  duration: string;
};

export const CLIPS: Clip[] = [
  {
    src: "/clips/clip-01.mp4",
    title: "Clip title one",
    author: "@creator",
    game: "GTA VI",
    duration: "0:14",
  },
  {
    src: "/clips/clip-02.mp4",
    title: "Clip title two",
    author: "@creator",
    game: "GTA VI",
    duration: "0:09",
  },
  {
    src: "/clips/clip-03.mp4",
    title: "Clip title three",
    author: "@creator",
    game: "GTA VI",
    duration: "0:21",
  },
  {
    src: "/clips/clip-04.mp4",
    title: "Clip title four",
    author: "@creator",
    game: "GTA VI",
    duration: "0:06",
  },
  {
    src: "/clips/clip-05.mp4",
    title: "Clip title five",
    author: "@creator",
    game: "GTA VI",
    duration: "0:17",
  },
  {
    src: "/clips/clip-06.mp4",
    title: "Clip title six",
    author: "@creator",
    game: "GTA VI",
    duration: "0:11",
  },
  {
    src: "/clips/clip-07.mp4",
    title: "Clip title seven",
    author: "@creator",
    game: "GTA VI",
    duration: "0:25",
  },
];

