import { css } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  Input,
  Link,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled, { keyframes } from "styled-components";
import Bubble from "./Bubble";

const waveAnimation = keyframes`
  0% {
    border-radius: 0;
    transform: scale(0.1);
    opacity: 1;
  }
  100% {
    border-radius: 50px;
    transform: scale(1.5);
    opacity: 0;
  }
`;

const WaveContainer = styled.div`
  position: relative;
  border: 1px solid black;
  border-radius: 0px;
  width: 35%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color: #fbe4ec;
`;

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
    maxWidth: "100%",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
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
    width: "80%",
  },
  submitButton: {
    backgroundColor: "#fff",
    color: "black",
    fontWeight: "bold",
    margin: "7% 10% 10% 10%",
    borderRadius: "20px",
    fontFamily: "Roboto",
    border: "1px solid black",
  },
  textField: {
    backgroundColor: "#fff",
    borderRadius: "5px",
    margin: "0 0 7% 0",
    padding: "0 2%",
    fontFamily: "Roboto",
    border: "1px solid black",
  },
  typography: {
    margin: 0,
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

export default function LoginForm({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginSuccessToast = () => {
    toast.success("Login successful!", {
      position: "bottom-center",
      style: {
        background: "#00BF00",
      },
    });
  };

  const loginFailToast = (message) => {
    toast.error(message, {
      position: "bottom-center",
      style: {
        background: "#D0342C",
      },
    });
  };

  const onSubmit = async (data) => {
    let response;
    try {
      response = await axios.post("http://localhost:8081/user/login", data);
      await new Promise((resolve) => setTimeout(resolve, 650));
      loginSuccessToast();
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("jwt", response.data.jwt);
      localStorage.setItem("isAdmin", response.data.isAdmin);
      if (response.data.artist) {
        localStorage.setItem("user-artist-id", response.data.artist.artistId);
        localStorage.setItem("artist-flag", true);
      } else {
        localStorage.setItem("user-artist-id", null);
        localStorage.setItem("artist-flag", false);
      }
      onNavigate("home");
    } catch (error) {
      loginFailToast(
        error.response.data.message || error.response.data.messages,
      );
    }
  };

  const handleClick = () => {
    onNavigate("register");
  };

  const onResetPassword = async () => {
    const input = document.getElementById("reset-email");

    try {
      const email = input.value;
      console.log(input.value);
      await axios.post(
        `http://localhost:8081/user/forgotPassword?email=${email}`,
      );
      toast.success("Password reset email sent!", {
        position: "bottom-center",
      });
      handleClose();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, {
          position: "bottom-center",
        });
      } else {
        toast.error("Failed to send reset email", {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <Container style={styles.container}>
      <WaveContainer>
        <Box style={styles.box}>
          <Box>
            <h2>Login to Musify</h2>
            <br></br>
            <hr style={styles.hr}></hr>
            <br></br>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            style={styles.form}
          >
            <Typography
              variant="subtitle1"
              align="left"
              style={styles.typography}
            >
              Email
            </Typography>
            <Input
              placeholder="Email"
              required
              name="email"
              type="email"
              id="standard-basic"
              variant="standard"
              autoComplete="email"
              autoFocus
              color="warning"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helpertext={errors.email ? errors.email.message : ""}
              style={styles.textField}
              disableUnderline
            />
            <Typography
              variant="subtitle1"
              align="left"
              style={styles.typography}
            >
              Password
            </Typography>
            <Input
              placeholder="Password"
              required
              name="password"
              type="password"
              id="password"
              variant="standard"
              autoComplete="current-password"
              {...register("userPassword", {
                required: "Password is required",
              })}
              error={!!errors.userPassword}
              helpertext={
                errors.userPassword ? errors.userPassword.message : ""
              }
              style={styles.textField}
              disableUnderline
            />
            <Link
              style={{
                color: "#3d77c9",
                fontFamily: "Roboto",
                cursor: "pointer",
              }}
              underline="hover"
              variant="subtitle1"
              onClick={handleOpen}
            >
              Forgot your password?
            </Link>
            <Button
              type="submit"
              variant="contained"
              style={styles.submitButton}
            >
              Sign In
            </Button>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <Typography style={styles.registerRouting} variant="subtitle1">
              Don’t have an account?
            </Typography>
            <Link
              onClick={handleClick}
              underline="hover"
              variant="subtitle1"
              style={{
                color: "#3d77c9",
                fontFamily: "Roboto",
                cursor: "pointer",
              }}
            >
              Register here
            </Link>
          </Box>

          <Modal
            style={styles.popup}
            open={open}
            onClose={handleClose}
            aria-labelledby="reset-password-modal"
            aria-describedby="reset-password-form"
          >
            <Box style={styles.modal}>
              <Typography
                id="reset-password-modal"
                variant="h6"
                component="h2"
                style={styles.typography}
              >
                Reset Password
              </Typography>
              <br></br>
              <Box style={styles.form}>
                <Typography
                  variant="subtitle1"
                  align="left"
                  style={styles.typography}
                >
                  Email
                </Typography>
                <Input
                  placeholder="Name@domain.com"
                  required
                  name="resetEmail"
                  type="email"
                  id="reset-email"
                  variant="standard"
                  autoComplete="email"
                  autoFocus
                  color="warning"
                  style={styles.textField}
                  disableUnderline
                />
                <Button
                  onClick={onResetPassword}
                  variant="contained"
                  style={styles.submitButton}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </WaveContainer>
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
    </Container>
  );
}
LoginForm.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};
