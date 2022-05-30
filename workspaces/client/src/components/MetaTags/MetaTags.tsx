import { Helmet } from "react-helmet";

interface Props {
  title?: string;
  image?: string;
}

export default function MetaTags({ title, image }: Props): JSX.Element {
  return (
    <Helmet>
      <title>{title} | BeatReleases</title>
      {image && <meta name="image" content={image} />}
    </Helmet>
  );
}
