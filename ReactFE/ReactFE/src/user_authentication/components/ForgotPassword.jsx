import { css } from "@emotion/react";
import { Box, Button, Container, Input, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Bubble from "./Bubble";

const styles = {
  container: {
    border: "1px solid black",
    width: "35%",
    maxWidth: "35%",
    height: "100%",
    maxHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    backgroundColor: "#fbe4ec",
    flexDirection: "column",
  },
  box: {
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoBox: {
    height: "100%",
    width: "65%",
    maxWidth: "65%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#fff",
    color: "black",
    fontWeight: "bold",
    margin: "17% 10% 10% 10%",
    borderRadius: "20px",
    fontFamily: "Roboto",
    border: "1px solid black",
  },
  textField: {
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "0 5%",
    fontFamily: "Roboto",
    width: "100%",
  },
  typography: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#000",
  },
  registerRouting: {
    fontFamily: "Roboto",
    color: "black",
  },
  hr: {
    display: "block",
    height: "0px",
    borderTop: "1px solid black",
    margin: 0,
    padding: 0,
  },
  popup: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: 0,
    fontWeight: "bold",
    color: "#000",
  },
  modal: {
    padding: "10px",
    border: "1px solid black",
    borderRadius: "5px",
    backgroundColor: "#fbe4ec",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

const bubbles = [
  { width: 120, color: "#ffabcf", position: { x: 0, y: 70 }, time: 4 },
  { width: 78, color: "#9fb0cc", position: { x: -20, y: 170 }, time: 5.8 },
  { width: 100, color: "#f1bfcb", position: { x: 60, y: 20 }, time: 3.8 },
  { width: 123, color: "#4b99db", position: { x: 150, y: -60 }, time: 4.8 },
  { width: 79, color: "#ffabcf", position: { x: 235, y: -90 }, time: 5.1 },
  { width: 115, color: "#96d7e9", position: { x: 330, y: -75 }, time: 4.6 },
  { width: 70, color: "#b0c0e1", position: { x: 355, y: 33 }, time: 6 },
  { width: 122, color: "#ffabcf", position: { x: 265, y: 128 }, time: 8 },
  { width: 50, color: "#f1bfcb", position: { x: 200, y: 100 }, time: 3.1 },
  { width: 50, color: "#f1bfcb", position: { x: 130, y: 135 }, time: 3.6 },
  { width: 60, color: "#b0c0e1", position: { x: 265, y: 250 }, time: 4.3 },
  { width: 95, color: "#ffabcf", position: { x: 195, y: 280 }, time: 3.7 },
  { width: 80, color: "#96d7e9", position: { x: 117, y: 290 }, time: 4.7 },
  { width: 60, color: "#9fb0cc", position: { x: 78, y: 270 }, time: 4.1 },
];

export default function ForgotPassword() {
  const [value, setValue] = useState("");
  const { token } = useParams();

  const onSubmit = async () => {
    const newpass = value;
    const newpassuri = encodeURIComponent(newpass);
    try {
      await axios.post(
        `http://localhost:8081/user/resetPassword?token=${token}&password=${newpassuri}`,
      );
      toast.success("Password reset successful!", {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error("Failed to reset password", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
        justifyContent: "flex-start",
      }}
    >
      <Container maxWidth="xs" style={styles.container}>
        <Box style={styles.box}>
          <Box style={styles.form}>
            <Box css={{ margin: "10% 0" }}>
              <h2>Change Your Password</h2>
              <br></br>
              <hr style={styles.hr}></hr>
              <br></br>
            </Box>
            <div
              css={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1" style={styles.typography}>
                New Password
              </Typography>
            </div>
            <Input
              placeholder="New Password"
              required
              name="password"
              type="password"
              id="password"
              variant="standard"
              autoComplete="current-password"
              style={styles.textField}
              onChange={(event) => setValue(event.target.value)}
              disableUnderline
            />
            <Button
              onClick={onSubmit}
              variant="contained"
              style={styles.submitButton}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Container>
      <Container style={styles.logoBox}>
        <div
          css={css`
            width: fit-content;
            height: fit-content;
            position: relative;
          `}
        >
          <img src="../../logo/mus_main.png" />
          {bubbles.map((bubble, index) => {
            return (
              <Bubble
                width={bubble.width}
                color={bubble.color}
                position={bubble.position}
                time={bubble.time}
                key={index}
              />
            );
          })}
        </div>

        <img src="../../logo/mus_text.png" />
      </Container>
      <Toaster />
    </div>
  );
}
