interface Artist {
  id: number;
  name: string;
  slug: string;
}

interface Date {
  published: string;
  released: string;
}

interface Duration {
  milliseconds: number;
  minutes: string;
}

// interface Formats {}

interface Genre {
  id: number;
  name: string;
  slug: string;
}

interface Dynamic {
  id: number;
  url: string;
}

interface Large {
  height: number;
  id: number;
  url: string;
  width: number;
}

interface Medium {
  height: number;
  id: number;
  url: string;
  width: number;
}

interface Small {
  height: number;
  id: number;
  url: string;
  width: number;
}

interface Images {
  dynamic: Dynamic;
  large: Large;
  medium: Medium;
  small: Small;
}

interface Label {
  id: number;
  name: string;
  slug: string;
}

interface Offset {
  end: number;
  start: number;
}

interface Mp3 {
  offset: Offset;
  url: string;
}

interface Mp4 {
  offset?: string;
  url?: string;
}

interface Preview {
  mp3: Mp3;
  mp4: Mp4;
}

interface Price {
  code: string;
  display: string;
  symbol: string;
  value: number;
}

interface Release {
  id: number;
  name: string;
  slug: string;
}

interface Remixer {
  id: number;
  name: string;
  slug: string;
}

interface Dynamic2 {
  id: number;
  url: string;
}

interface Large2 {
  height: number;
  id: number;
  url: string;
  width: number;
}

interface Waveform {
  dynamic: Dynamic2;
  large: Large2;
}

export interface TrackResponse {
  active: boolean;
  artists: Artist[];
  audio_format: string;
  bpm: number;
  component: string;
  //   component_type?: any;
  date: Date;
  duration: Duration;
  exclusive: boolean;
  //   formats: Formats;
  genres: Genre[];
  guest_pick: boolean;
  hype: boolean;
  id: number;
  images: Images;
  is_available_for_streaming: boolean;
  key: string;
  label: Label;
  mix: string;
  name: string;
  preorder: boolean;
  preview: Preview;
  price: Price;
  purchase: number;
  //   purchase_type?: any;
  release: Release;
  remixers: Remixer[];
  sale_type: string;
  slug: string;
  sponsored: boolean;
  //   sub_genres: any[];
  title: string;
  type: string;
  waveform: Waveform;
}

export interface ErrorRequest {
  status: number;
  message: string;
}
