import spaceMonkeyCover from "@/assets/images/covers/space-monkey.png";
import unforgivenCover from "@/assets/images/covers/unforgiven.jpg";

import spaceMonkeyAudio from "@/assets/audio/space-monkey.mp3";
import unforgivenAudio from "@/assets/audio/unforgiven.mp3";
import timeInABottleAudio from "@/assets/audio/time-in-a-bottle.mp3";

export const MUSIC_MOCK = [
  {
    id: 1,
    src: spaceMonkeyAudio,
    coverSrc: spaceMonkeyCover,
    songName: "Space Monkey",
    authorName: "Placebo",
    duration: 231000,
  },
  {
    id: 2,
    src: unforgivenAudio,
    coverSrc: unforgivenCover,
    songName: "Unforgiven",
    authorName: "Metallica",
    duration: 386000,
  },
  {
    id: 3,
    src: timeInABottleAudio,
    coverSrc: null,
    songName: "Time In A Bottle",
    authorName: "Jim Croce",
    duration: 145000,
  },
];
