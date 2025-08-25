import {
  Box,
  Button,
  Container,
  Input,
  Link,
  Modal,
  Typography,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../axiosInstance";

const styles = {
  wholePage: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxWidth: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    backgroundColor: "white",
  },
  second: {
    display: "flex",
    width: "33%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  middlePage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    border: "1px solid black",
    borderRadius: "15px",
    backgroundColor: "#ffdeeb",
    padding: "5% 15%",
    width: "75%",
    height: "75%",
  },
  formMiddle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "15%",
    height: "50%",
  },
  first: {
    display: "flex",
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "75%",
    height: "55%",
    borderRadius: "50%",
    backgroundColor: "#ffdeeb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    border: "1px solid black",
    padding: "5% 15%",
  },
  image: {
    width: "100%",
  },
  thirdContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "75%",
    height: "75%",
  },
  third: {
    display: "flex",
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    backgroundColor: "#fff",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0 5%",
    width: "100%",
    height: "3vh",
    "& .MuiInputBase-input": {
      fontSize: "70%",
    },
  },
  typography: {
    marginBottom: "8px",
    fontWeight: "500",
    color: "#555",
    height: "5% !important",
  },
  links: {
    display: "inline-block",
    marginTop: "10px",
    fontFamily: "Roboto, sans-serif",
    color: "#1976d2",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  passwordBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderRadius: "10px",
    padding: "2%",
  },
  popup: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: 0,
    fontWeight: "bold",
    color: "#000",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    gap: "2rem",
  },
  deleteButton: {
    backgroundColor: "#fd3f92",
    width: "75%",
  },
  simpleButton: {
    width: "75%",
    backgroundColor: "white",
    color: "black",
    border: "1px solid #ffabd0",
  },
  modifyButton: {
    width: "35%",
    backgroundColor: "#fd3f92",
    border: "1px solid #ffabd0",
  },
};

const ProfilePage = ({ onNavigate }) => {
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    country: "",
  });
  const [open, setOpen] = useState(false);
  const [areDetailsDisabled, setAreDetailsDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [oldPassword, setPasswordValue] = useState("*********");
  const [reEnteredOldPassword, setAgainValue] = useState("*********");
  const [newPassword, setNewValue] = useState("*********");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          const id = jwtDecode(token).sub;
          const response = await axiosInstance.get(`user/${id}`);
          setUserDetails(response.data);
        } else {
          setUserDetails(null);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, []);

  const successToast = (message) => {
    toast.success(message, {
      position: "bottom-center",
      style: {
        background: "#00BF00",
      },
    });
  };

  const failToast = (message) => {
    toast.error(message, {
      position: "bottom-center",
      style: {
        background: "#D0342C",
      },
    });
  };

  const onSelfDelete = async () => {
    try {
      await axiosInstance.delete(`user`);
      localStorage.setItem("jwt", "");
      localStorage.setItem("user-artist-id", null);
      localStorage.setItem("artist-flag", false);
      localStorage.setItem("isAdmin", "");
      localStorage.setItem("route", "");
      localStorage.setItem("userId", "");
      onNavigate("login");
      successToast("You have successfully deleted your account!");
    } catch (error) {
      failToast("We were unable to delete yout account!");
    }
  };

  const handleVisibleChange = () => {
    setVisible(!visible);
    if (!visible) {
      setPasswordValue("");
      setAgainValue("");
      setNewValue("");
    } else {
      setPasswordValue("*********");
      setAgainValue("*********");
      setNewValue("*********");
    }
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleReenteredPasswordChange = (event) => {
    setAgainValue(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewValue(event.target.value);
  };

  const handleDetailsChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const onChangePassword = async () => {
    try {
      const id = localStorage.getItem("userId");
      await axiosInstance.put(
        `http://localhost:8081/user/${id}/change-password`,
        { oldPassword, reEnteredOldPassword, newPassword },
      );
      successToast("Your password has been changed!");
    } catch (error) {
      console.error("Error updating details:", error);
      failToast(
        error.response.data.message ||
          error.response.data.messages ||
          "Update failed",
      );
    }
  };

  const onDetailsChange = async () => {
    try {
      const id = localStorage.getItem("userId");
      await axiosInstance.put(`http://localhost:8081/user/${id}`, userDetails);
      successToast("Your modifications have been saved!");
    } catch (error) {
      failToast(
        error.response.data.message ||
          error.response.data.messages ||
          "Update failed",
      );
    }
  };

  return (
    userDetails && (
      <Container style={styles.wholePage}>
        <Container style={styles.first}>
          <div style={styles.imageContainer}>
            <img src="../../artwork/mus_girl.png" style={styles.image} />
          </div>
        </Container>
        <Container style={styles.second}>
          <div style={styles.middlePage}>
            <Box
              css={{
                marginTop: "15%",
                height: "15%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div css={{ fontSize: "5vh" }}>My Profile</div>
            </Box>
            <Box style={styles.formMiddle}>
              <Box>
                <Typography variant="subtitle1" style={styles.typography}>
                  First Name
                </Typography>
                <Input
                  disabled={areDetailsDisabled}
                  value={userDetails.firstname}
                  onChange={handleDetailsChange}
                  name="firstname"
                  type="text"
                  id="standard-basic"
                  color="warning"
                  style={styles.textField}
                  disableUnderline
                />
              </Box>
              <Box>
                <Typography variant="subtitle1" style={styles.typography}>
                  Last Name
                </Typography>
                <Input
                  disabled={areDetailsDisabled}
                  value={userDetails.lastname}
                  onChange={handleDetailsChange}
                  name="lastname"
                  type="text"
                  id="standard-basic"
                  color="warning"
                  style={styles.textField}
                  disableUnderline
                />
              </Box>
              <Box>
                <Typography variant="subtitle1" style={styles.typography}>
                  Country
                </Typography>
                <Input
                  disabled={areDetailsDisabled}
                  value={userDetails.country}
                  onChange={handleDetailsChange}
                  name="country"
                  type="text"
                  id="standard-basic"
                  color="warning"
                  style={styles.textField}
                  disableUnderline
                />
              </Box>
              <Link
                style={styles.links}
                underline="hover"
                onClick={() => {
                  setAreDetailsDisabled(!areDetailsDisabled);
                }}
              >
                Change details
              </Link>
              {!areDetailsDisabled && (
                <Button
                  variant="contained"
                  css={{
                    visibility: !areDetailsDisabled ? "visible" : "hidden",
                    width: "30%",
                    backgroundColor: "#fd3f92",
                    border: "1px solid #ffabd0",
                    marginTop: "15%",
                  }}
                  onClick={onDetailsChange}
                >
                  Save
                </Button>
              )}
            </Box>
          </div>
        </Container>
        <Container style={styles.third}>
          <div style={styles.thirdContainer}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: "70%",
                border: "1px solid black",
                padding: "5% 15%",
                borderRadius: "15px",
                backgroundColor: "#ffdeeb",
                width: "100%",
              }}
            >
              <Box
                css={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1" style={styles.typography}>
                  Old Password
                </Typography>
                <Input
                  disabled={!visible}
                  value={oldPassword}
                  onChange={handlePasswordChange}
                  required
                  name="password"
                  type="password"
                  id="oldPassword"
                  variant="standard"
                  style={styles.textField}
                  disableUnderline
                />

                <Typography
                  variant="subtitle1"
                  style={styles.typography}
                  visible={false}
                >
                  Old Password Again
                </Typography>
                <Input
                  disabled={!visible}
                  value={reEnteredOldPassword}
                  onChange={handleReenteredPasswordChange}
                  required
                  name="password"
                  type="password"
                  id="reenteredOldPassword"
                  variant="standard"
                  style={styles.textField}
                  disableUnderline
                />
                <Typography variant="subtitle1" style={styles.typography}>
                  New Password
                </Typography>
                <Input
                  disabled={!visible}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  required
                  name="password"
                  type="password"
                  id="newPassword"
                  variant="standard"
                  style={styles.textField}
                  disableUnderline
                />
              </Box>
              <Link
                data-testid="changePasswordLink"
                style={styles.links}
                underline="hover"
                onClick={handleVisibleChange}
              >
                Change password
              </Link>
              <Button
                data-testid="changePasswordButton"
                variant="contained"
                sx={{
                  visibility: visible ? "visible" : "hidden",
                  backgroundColor: "#fd3f92",
                }}
                style={styles.modifyButton}
                css={{ marginTop: "15%" }}
                onClick={onChangePassword}
              >
                save
              </Button>
            </Box>
            <Box
              css={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid black",
                borderRadius: "15px",
                backgroundColor: "#ffdeeb",
                height: "20%",
                width: "100%",
              }}
            >
              <Button
                onClick={() => setOpen(true)}
                variant="contained"
                style={styles.modifyButton}
              >
                Delete account!
              </Button>
              <Modal
                style={styles.popup}
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="reset-password-modal"
                aria-describedby="reset-password-form"
              >
                <Box style={styles.modal}>
                  <img src="../../Icons/del_icon.png" />
                  <Typography
                    id="reset-password-modal"
                    variant="h3"
                    component="h2"
                    style={styles.typography}
                  >
                    We are sorry to see you go!
                  </Typography>
                  <Typography
                    id="reset-password-modal"
                    variant="h6"
                    component="h2"
                    style={styles.typography}
                  >
                    Are you sure you want to delete your account?
                  </Typography>
                  <br></br>
                  <Box style={styles.form}>
                    <Button
                      onClick={onSelfDelete}
                      variant="contained"
                      style={styles.deleteButton}
                    >
                      DELETE ACCOUNT
                    </Button>
                    <Button
                      onClick={() => setOpen(false)}
                      variant="contained"
                      style={styles.simpleButton}
                    >
                      Go BACK
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Box>
          </div>
        </Container>
      </Container>
    )
  );
};

ProfilePage.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default ProfilePage;
