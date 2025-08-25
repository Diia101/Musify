import ReplyIcon from "@mui/icons-material/Reply";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { MyContext } from "./NavContext";

export default function NavButton() {
  const { dispatch, navigate } = useContext(MyContext);

  return (
    <IconButton
      color={"black"}
      sx={{ ":focus": { outline: "none" } }}
      onClick={() => {
        dispatch({ type: "back", navigate });
      }}
    >
      <ReplyIcon />
    </IconButton>
  );
}
