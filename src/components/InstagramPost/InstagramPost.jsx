import { InstagramEmbed } from "react-social-media-embed";

const InstagramPost = ({ url }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <InstagramEmbed url={url} width={328} height={510} />
    </div>
  );
};

export default InstagramPost;
