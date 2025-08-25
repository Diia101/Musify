import { css } from "@emotion/react";
import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";

export default function ArtistComposition({ user, type }) {
  const loadMusicIntrument = () => {
    switch (type) {
      case "drummer":
        return (
          <>
            <img
              src="/Icons/artist-icons/drums.png"
              css={css`
                position: absolute;
                bottom: 0;
              `}
              width={"80px"}
              height={"80px"}
            />
          </>
        );
      case "left-guitar":
        return (
          <>
            <img
              src="/Icons/artist-icons/bass-left.png"
              css={css`
                position: absolute;
                bottom: 15px;
                left: 15px;
              `}
              width={"60px"}
              height={"60px"}
            />
          </>
        );
      case "right-guitar":
        return (
          <>
            <img
              src="/Icons/artist-icons/bass-right.png"
              css={css`
                position: absolute;
                bottom: 15px;
                right: 15px;
              `}
              width={"60px"}
              height={"60px"}
            />
          </>
        );
    }
  };

  return (
    <>
      <Tooltip
        title={user.firstname + " " + user.lastname}
        arrow
        placement="top"
      >
        <div
          css={css`
            width: 100px;
            height: 100px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            transition: transform 0.3s ease;

            &:hover {
              transform: scale(1.1);
            }
          `}
        >
          <img
            src="/Icons/artist-icons/man.png"
            css={css`
              position: absolute;
            `}
          />
          {loadMusicIntrument()}
        </div>
      </Tooltip>
    </>
  );
}

ArtistComposition.propTypes = {
  type: PropTypes.string.isRequired,
  user: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
};
