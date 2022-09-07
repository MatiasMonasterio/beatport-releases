import type { Track } from "@br/core";

export const mockTracks: Track[] = [
  {
    artists: [{ id: 5709, name: "Chris Liebing", slug: "chris-liebing" }],
    artwork:
      "https://geo-media.beatport.com/image_size/100x100/ce303d53-f197-4bb2-ab46-ae05a01ec1c9.jpg",
    bpm: 126,
    favorite: false,
    genre: { id: 3, name: "Electronica", slug: "electronica" },
    id: 16658140,
    key: "E♭ min",
    label: { id: 20854, name: "MUTE", slug: "mute" },
    mix: "Radio Slave Another Dub",
    name: "Another Day (feat. Polly Scattergood)",
    preview: "https://geo-samples.beatport.com/track/6f0a2d57-6bae-408c-987d-b56bdcafe16a.LOFI.mp3",
    released: 1656028800000,
    remixers: [{ id: 6073, name: "Radio Slave", slug: "radio-slave" }],
  },
];

export const track: Track = {
  artists: [{ id: 5709, name: "Chris Liebing", slug: "chris-liebing" }],
  artwork:
    "https://geo-media.beatport.com/image_size/100x100/ce303d53-f197-4bb2-ab46-ae05a01ec1c9.jpg",
  bpm: 126,
  favorite: false,
  genre: { id: 3, name: "Electronica", slug: "electronica" },
  id: 16658140,
  key: "E♭ min",
  label: { id: 20854, name: "MUTE", slug: "mute" },
  mix: "Radio Slave Another Dub",
  name: "Another Day (feat. Polly Scattergood)",
  preview: "https://geo-samples.beatport.com/track/6f0a2d57-6bae-408c-987d-b56bdcafe16a.LOFI.mp3",
  released: 1656028800000,
  remixers: [{ id: 6073, name: "Radio Slave", slug: "radio-slave" }],
};
