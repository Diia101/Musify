// import { FixedSizeList } from "react-window";
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axiosInstance from "../../axiosInstance";

const PlaylistSongList = (props) => {
  const Songs = props.songs;
  const setSongs = props.setSongs;
  const setCurrentIndexPlay = props.setCurrentIndexPlay;
  const currentIndexPlay = props.currentIndexPlay;
  const playlistId = props.playlistId;

  const PositionItem = css`
    width: 15vw;
    text-align: center;
    font-size: 20px;
    height: 100%;
  `;

  const TimeItem = css`
    width: 15vw;
    text-align: center;
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

  const ListsItem = css`
    display: flex;
    flex-direction: row;
    width: 100%;
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
    if (currentIndexPlay !== -1) {
      window.open(Songs[currentIndexPlay].url);
    }
  }, [currentIndexPlay, Songs]);
  const playCSS = (index) => (currentIndexPlay == index ? square : triangle);

  const changeOrder = async (oldIndex, newIndex) => {
    try {
      const data = {
        oldIndex: oldIndex,
        newIndex: newIndex,
        changeType: "SHIFT",
      };
      await axiosInstance.put(`/playlists/${playlistId}/song`, data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSong = async (songId) => {
    try {
      await axiosInstance.delete(`/playlists/${playlistId}/song/${songId}`);
      const updatedSongs = Songs.filter((song) => song.id !== songId);
      setSongs(updatedSongs);
    } catch (error) {
      console.error("Eroare la ștergerea melodiei din playlist:", error);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const oldIndex = result.source.index;
    const newIndex = result.destination.index;

    const newItems = Array.from(Songs);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);
    setSongs(newItems);
    changeOrder(oldIndex, newIndex);
  };

  const itemStyle = (isDragging, isLastItem) =>
    css({
      width: "100%",
      userSelect: "none",
      padding: 16,
      margin: "0",
      height: "fit-content",
      backgroundColor: isDragging ? "#ccb2bc" : "#e6c8d4",
      borderBottom: !isDragging && !isLastItem ? "2px #000 solid" : "none",
      borderRadius: "5px",
      color: "#333",
      ":hover": {
        backgroundColor: "#ccb2bc",
      },
    });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            id="playlistSongList"
            {...provided.droppableProps}
            ref={provided.innerRef}
            css={css`
              width: 80%;
              margin: 40px 0px 0px 0px;
            `}
          >
            {Songs.map((item, index) => (
              <Draggable key={item.id} draggableId={item.title} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    css={itemStyle(
                      snapshot.isDragging,
                      index === Songs.length - 1,
                    )}
                  >
                    <div css={ListsItem}>
                      <div
                        css={playCSS(index)}
                        onClick={() => {
                          if (currentIndexPlay == index) {
                            setCurrentIndexPlay(-1);
                          } else {
                            setCurrentIndexPlay(index);
                          }
                        }}
                      ></div>
                      <div css={PositionItem}> {index + 1} </div>
                      {/*<div css={SongItem}>{Songs[index].title}</div>*/}
                      <div css={SongItem}>
                        {Songs[index].title}
                        <button
                          onClick={() => handleDeleteSong(Songs[index].id)}
                          style={{
                            marginLeft: "auto",
                            padding: "4px 8px",
                            fontSize: "14px",
                            backgroundColor: "#ff5c5c",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      <div css={TimeItem}> {Songs[index].duration} min</div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

PlaylistSongList.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setSongs: PropTypes.func.isRequired,
  setCurrentIndexPlay: PropTypes.func.isRequired,
  currentIndexPlay: PropTypes.number.isRequired,
  playlistId: PropTypes.number.isRequired,
};

export default PlaylistSongList;
