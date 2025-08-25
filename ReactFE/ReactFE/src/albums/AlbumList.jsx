import { css } from "@emotion/react";
import { ListItem } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { FixedSizeList } from "react-window";

const Albums = (props) => {
  const { songs, currentIndexPlay, setCurrentIndexPlay } = props;

  const PositionItem = css`
    width: 15vw;
    text-align: center;
    border-right: 1px solid #000;
    font-size: 20px;
    height: 100%;
  `;
  const TimeItem = css`
    width: 15vw;
    text-align: center;
    border-left: 1px solid #000;
    padding-left: 5px;
    font-size: 20px;
    height: 100%;
  `;
  const SongItem = css`
    width: 70vw;
    text-align: left;
    margin-left: 5px;
    font-size: 20px;
    display: flex;
    gap: 15px;
    align-items: center;
    height: 100%;
    flex-direction: row;
    jutify-content: center;
  `;

  const Position = css`
    width: 15vw;
    text-align: center;
    border-right: 1px solid #000;
    margin-right: 5px;
    font-size: 23px;
  `;
  const Time = css`
    width: 15vw;
    text-align: center;
    border-left: 1px solid #000;
    margin-right: 5px;
    font-size: 23px;
  `;
  const Song = css`
    width: 70vw;
    text-align: center;
    font-size: 23px;
  `;

  const Title = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 81%;
    border-bottom: 1px solid #000;
    margin-top: 40px;
  `;

  const ListsItem = css`
    &:hover {
    &:hover {
      background-color: #e6c8d4;
    }
    cursor: pointer;
    height: 40px;
  `;

  const triangle = css`
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-left: 20px solid #ec3b83;
    border-bottom: 15px solid transparent;
    margin: 0px 5px 0px 10px;
  `;

  const square = css`
    width: 20px;
    height: 20px;
    background-color: #ec3b83;
  `;

  useEffect(() => {
    if (currentIndexPlay !== -1) window.open(songs[currentIndexPlay].url);
  }, [currentIndexPlay, songs]);

  const renderRow = ({ index, style }) => {
    const playCSS = () => (currentIndexPlay === index ? square : triangle);
    return (
      <>
        <ListItem
          id="songList"
          component="div"
          disablePadding
          css={ListsItem}
          style={style}
        >
          <div css={PositionItem}>{index + 1}</div>
          <div css={SongItem}>
            <div
              css={playCSS}
              onClick={() => {
                if (currentIndexPlay === index) {
                  setCurrentIndexPlay(-1);
                } else {
                  setCurrentIndexPlay(index);
                }
              }}
            ></div>
            {songs[index].title}
          </div>
          <div css={TimeItem}>{songs[index].duration} min</div>
        </ListItem>
      </>
    );
  };

  return (
    <>
      <div css={Title}>
        <div css={Position}>Position</div>
        <div css={Song}>Song</div>
        <div css={Time}>Time</div>
      </div>
      <FixedSizeList
        className="songList"
        height={400}
        width="81%"
        itemSize={50}
        itemCount={songs.length}
        overscanCount={15}
      >
        {renderRow}
      </FixedSizeList>
    </>
  );
};

Albums.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  play: PropTypes.bool.isRequired,
  setPlay: PropTypes.func.isRequired,
  index: PropTypes.number,
  currentIndexPlay: PropTypes.number.isRequired,
  setCurrentIndexPlay: PropTypes.func.isRequired,
};

export default Albums;
