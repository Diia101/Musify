import { css } from "@emotion/react";
import { Box, LinearProgress } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

export default function LinearDeterminate({ duration }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress != 100) {
          const diff = 0.2;
          return oldProgress + diff;
        }
      });
    }, 200);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: "100%" }}
      />
      <p
        css={css`
          margin: 0;
          width: fit-content;
          height: fit-content;
        `}
      >
        {duration}
      </p>
    </Box>
  );
}

LinearDeterminate.propTypes = {
  duration: PropTypes.number.isRequired,
};
