import { PropTypes } from "prop-types";
import { useContext } from "react";
import { MyContext } from "../navigation/NavContext";
import AlbumCard from "./components/AlbumCard";
import ArtistCard from "./components/ArtistCard";
import MemberCard from "./components/MemberCard";
import PlaylistCard from "./components/PlaylistCard";
import SongCard from "./components/SongCard";

const CardFactory = (type, entity, onNavigate, onDelete) => {
  let content;
  const { state, dispatch } = useContext(MyContext);

  switch (type) {
    case "song":
      content = <SongCard song={entity} onDelete={onDelete} />;
      break;
    case "playlist":
      content = (
        <PlaylistCard
          playlist={entity}
          onClick={() => {
            const destination = `/playlist/${entity.playlistId}`;
            dispatch({
              type: "navigate",
              payload: {
                destination,
                domain: destination,
                navigate: onNavigate,
              },
            });
            onNavigate(destination);
          }}
        />
      );
      break;
    case "album":
      content = <AlbumCard album={entity} />;
      break;
    case "artist":
      content = (
        <ArtistCard
          artist={entity}
          onNavigate={onNavigate}
          onDelete={onDelete}
        />
      );
      break;
    case "member":
      content = <MemberCard member={entity} />;
      break;
  }

  return content;
};

CardFactory.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardFactory;
