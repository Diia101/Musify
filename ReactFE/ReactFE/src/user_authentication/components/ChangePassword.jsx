import { Box, Button, Container, Input, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../axiosInstance";

const styles = {
  container: {
    border: 0,
    margin: "0 0 0 -400px ",
    width: "80%",
    height: "80%",
    alignItems: "left",
    justifyContent: "left",
    flexDirection: "column",
  },
  box: {
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    backgroundColor: "#fff",
    borderRadius: "5px",
    margin: "0 0 2% 0",
    padding: "0 2%",
    fontFamily: "Roboto",
  },
  countryField: {
    backgroundColor: "#fff",
    borderRadius: "5px",
    margin: "0 0 7% 0",
    padding: "0 2%",
    fontFamily: "Roboto",
    width: "240px",
  },
  typography: {
    margin: 0,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#000",
  },
  links: {
    fontFamily: "Roboto",
    color: "black",
  },
  submitButton: {
    backgroundColor: "#fff",
    color: "black",
    fontWeight: "bold",
    borderRadius: "20px",
    fontFamily: "Roboto",
    margin: "0 0 0 75px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
};

const updateSuccessToast = () => {
  toast.success("Update sucessful!", {
    position: "bottom-center",
    style: {
      background: "#00bf00",
    },
  });
};

const updateFailToast = (message) => {
  toast.error(message, {
    position: "bottom-center",
    style: {
      background: "#d0342c",
    },
  });
};

const ChangePassword = ({ onNavigate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        updateFailToast("No token found");
        return;
      }

      console.log(data);
      const id = jwtDecode(token).sub;
      await axiosInstance.put(
        `http://localhost:8081/user/${id}/change-password`,
        data,
      );
      updateSuccessToast();
      onNavigate("profile");
    } catch (error) {
      console.error("Error updating details:", error);
      updateFailToast(
        error.response.data.message ||
          error.response.data.messages ||
          "Update failed",
      );
    }
  };

  return (
    <Container style={styles.container}>
      <Box>
        <h1>My Profile</h1>
        <br></br>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        style={styles.form}
      >
        <Box>
          <Typography
            variant="subtitle1"
            align="left"
            style={styles.typography}
          >
            Old Password
          </Typography>
          <Input
            required
            autoFocus
            placeholder="Old Password"
            name="oldpassword"
            type="password"
            id="standard-basic"
            variant="standard"
            color="warning"
            {...register("oldPassword", {
              required: "Field is required",
            })}
            error={!!errors.oldPassword}
            helpertext={errors.oldPassword ? errors.oldPassword.message : ""}
            style={styles.textField}
            disableUnderline
          />
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            align="left"
            style={styles.typography}
          >
            Re-enter Old Password
          </Typography>
          <Input
            required
            placeholder="Old Password"
            name="oldpassreentered"
            type="password"
            id="standard-basic"
            variant="standard"
            color="warning"
            {...register("reEnteredOldPassword", {
              required: "Field is required",
            })}
            error={!!errors.reEnteredOldPassword}
            helpertext={
              errors.reEnteredOldPassword
                ? errors.reEnteredOldPassword.message
                : ""
            }
            style={styles.textField}
            disableUnderline
          />
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            align="left"
            style={styles.typography}
          >
            New Password
          </Typography>
          <Input
            required
            placeholder="New Password"
            name="newpass"
            type="password"
            id="standard-basic"
            variant="standard"
            color="warning"
            {...register("newPassword", {
              required: "Field is required",
            })}
            error={!!errors.newPassword}
            helpertext={errors.newPassword ? errors.newPassword.message : ""}
            style={styles.textField}
            disableUnderline
          />
        </Box>
        <Box>
          <Button type="submit" variant="contained" style={styles.submitButton}>
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

ChangePassword.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default ChangePassword;
