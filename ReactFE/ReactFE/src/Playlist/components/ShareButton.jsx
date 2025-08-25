import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Zoom,
} from "@mui/material";
import { css, keyframes } from "@emotion/react";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const MessengerIcon = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
    alt="Messenger"
    width="24"
    height="24"
  />
);

const LinkedInIcon = () => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
    alt="LinkedIn"
    width="24"
    height="24"
  />
);

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`;

export default function ShareButton() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const currentUrl =
    window.location.origin +
    location.pathname +
    location.search +
    location.hash;
  const encodedUrl = encodeURIComponent(currentUrl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const notify = (message, bg) =>
    toast.success(message, {
      position: "bottom-center",
      style: { background: bg, color: "#fff" },
    });

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodedUrl}`, "_blank");
    handleClose();
  };

  const handleMessenger = () => {
    navigator.clipboard.writeText(currentUrl);
    notify("Link copied! Paste it in Messenger", "#0084FF");
    window.open(`https://m.me/`, "_blank");
    handleClose();
  };

  const handleInstagram = () => {
    navigator.clipboard.writeText(currentUrl);
    notify("Link copied! Paste it in Instagram DM", "#E1306C");
    window.open("https://www.instagram.com/direct/inbox/", "_blank");
    handleClose();
  };

  const handleLinkedIn = () => {
    navigator.clipboard.writeText(currentUrl);
    notify("Link copied! Paste it in LinkedIn message", "#0077B5");
    window.open("https://www.linkedin.com/messaging/", "_blank");
    handleClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    notify("Link copied!", "#00BF00");
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        css={css`
          border-radius: 10px;
          padding: 6px;
          animation: ${rotate} 2s ease-in-out infinite;
          &:hover {
            background-color: #f4c2d7;
          }
        `}
      >
        <ShareIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Zoom}
      >
        <MenuItem onClick={handleWhatsApp}>
          <ListItemIcon>
            <WhatsAppIcon style={{ color: "#25D366" }} />
          </ListItemIcon>
          <ListItemText primary="WhatsApp" />
        </MenuItem>

        <MenuItem onClick={handleMessenger}>
          <ListItemIcon>
            <MessengerIcon />
          </ListItemIcon>
          <ListItemText primary="Messenger" />
        </MenuItem>

        <MenuItem onClick={handleInstagram}>
          <ListItemIcon>
            <InstagramIcon style={{ color: "#E1306C" }} />
          </ListItemIcon>
          <ListItemText primary="Instagram DM" />
        </MenuItem>

        <MenuItem onClick={handleLinkedIn}>
          <ListItemIcon>
            <LinkedInIcon />
          </ListItemIcon>
          <ListItemText primary="LinkedIn" />
        </MenuItem>

        <MenuItem onClick={handleCopy}>
          <ListItemIcon>
            <ContentCopyIcon style={{ color: "#6c6c6c" }} />
          </ListItemIcon>
          <ListItemText primary="Copy Link" />
        </MenuItem>
      </Menu>
    </>
  );
}
