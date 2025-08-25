import { css } from "@emotion/react";
import PropTypes from "prop-types";
import ArtistComposition from "./ArtistComposition";

export default function Stage({ artists }) {
  const singerAttributes = [
    { type: "singer", x: "50%", y: "15px" },
    { type: "drummer", x: "40%", y: "45%" },
    { type: "left-guitar", x: "5%", y: "10%" },
    { type: "right-guitar", x: "80%", y: "10%" },
  ];
  return (
    <>
      <div
        css={css`
          width: 600px;
          height: 300px;
          position: relative;
        `}
      >
        <div
          css={css`
            position: absolute;
            width: 100%;
            height: 100%;
          `}
        >
          <img
            src="/Icons/artist-icons/stage.jpg"
            width={"100%"}
            height={"100%"}
          />
        </div>

        {artists.map((artist, index) => {
          return (
            <>
              <div
                css={css`
                  position: absolute;
                  bottom: ${singerAttributes[index].y};
                  left: ${singerAttributes[index].x};
                `}
              >
                <ArtistComposition
                  user={artist}
                  type={singerAttributes[index].type}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

Stage.propTypes = {
  artists: PropTypes.array.isRequired,
};
