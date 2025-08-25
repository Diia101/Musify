import { css } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  Input,
  Link,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Bubble from "./Bubble";

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

const styles = {
  container: {
    maxWidth: "100vw",
    padding: "0",
    width: "100vw",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
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
  box_left: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbe4ec",
    width: "35%",
    height: "100%",
    border: "1px solid black",
  },
  box_right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: "100%",
  },
  otherBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "7%",
    // gap: "20px",
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
    margin: "10% 10% 10% 10%",
    borderRadius: "20px",
    fontFamily: "Roboto",
    border: "1px solid #000",
  },
  textField: {
    backgroundColor: "white",
    borderRadius: "5px",
    margin: "0 0 7% 0",
    padding: "0 5%",
    fontFamily: "Roboto",
    border: "1px solid black",
  },
  leftTextField: {
    backgroundColor: "#fff",
    borderRadius: "5px",
    // margin: "0 10% 7% 0",
    padding: "0 5%",
    border: "1px solid black",
    fontFamily: "Roboto",
    width: "100%",
  },
  rightTextField: {
    backgroundColor: "#fff",
    borderRadius: "5px",
    // margin: "0 0 7% 10%",
    padding: "0 5%",
    fontFamily: "Roboto",
    border: "1px solid black",
    width: "100%",
  },
  typography: {
    margin: 0,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#000",
  },
  rightTypography: {
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
};

const registerSuccessToast = () => {
  toast.success("Register sucessful!", {
    position: "bottom-center",
    style: {
      background: "#00bf00",
    },
  });
};

const registerFailToast = (message) => {
  toast.error(message, {
    position: "bottom-center",
    style: {
      background: "#d0342c",
    },
  });
};

const Register = ({ onNavigate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8081/user/register", data);
      registerSuccessToast();
      onNavigate("login");
    } catch (error) {
      registerFailToast(
        error.response.data.message || error.response.data.messages,
      );
    }
  };

  const CountrySelect = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      axios
        .get(
          "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code",
        )
        .then((response) => {
          const countriesData = response.data.countries.map((country) => ({
            ...country,
            label: country.label,
          }));
          setCountries(countriesData);
          setSelectedCountry(
            countriesData.find(
              (c) => c.value === response.data.userSelectValue.value,
            ),
          );
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
          setLoading(false);
        });
    }, []);

    return (
      <Select
        data-testid="countrySelect"
        required
        name="country"
        id="standard-basic"
        variant="standard"
        color="warning"
        {...register("country", { required: "Country is required" })}
        error={!!errors.country}
        helpertext={errors.country ? errors.country.message : ""}
        style={styles.textField}
        disableUnderline
        value={selectedCountry.label}
        onChange={(event) => setSelectedCountry(event.target.value)}
        loading={loading}
      >
        {countries.map((country) => (
          <MenuItem key={country.label} value={country.label}>
            {country.label}
          </MenuItem>
        ))}
      </Select>
    );
  };

  return (
    <Container style={styles.container}>
      <Box style={styles.box_left}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          style={styles.form}
        >
          <Box style={{ width: "100%", textAlign: "center" }}>
            <h2 style={{ margin: "0" }}>Register to start using Musify</h2>
            <br></br>
            <hr style={styles.hr}></hr>
            <br></br>
          </Box>
          <Box style={styles.otherBox}>
            <Box
              css={css`
                width: 45%;
              `}
            >
              <Typography
                variant="subtitle1"
                align="left"
                style={styles.typography}
              >
                First Name
              </Typography>
              <Input
                placeholder="Your First Name"
                required
                name="firstname"
                type="text"
                id="standard-basic"
                variant="standard"
                autoFocus
                color="warning"
                {...register("firstname", {
                  required: "First Name is required",
                })}
                error={!!errors.firstname}
                helpertext={errors.firstname ? errors.firstname.message : ""}
                style={styles.leftTextField}
                disableUnderline
              />
            </Box>
            <Box
              css={css`
                width: 45%;
              `}
            >
              <Typography
                variant="subtitle1"
                align="left"
                style={styles.rightTypography}
              >
                Last Name
              </Typography>
              <Input
                placeholder="Your Last Name"
                required
                name="lastname"
                type="text"
                id="standard-basic"
                variant="standard"
                color="warning"
                {...register("lastname", { required: "Last Name is required" })}
                error={!!errors.lastname}
                helpertext={errors.lastname ? errors.lastname.message : ""}
                style={styles.rightTextField}
                disableUnderline
              />
            </Box>
          </Box>
          <Typography
            variant="subtitle1"
            align="left"
            style={styles.typography}
          >
            Email
          </Typography>
          <Input
            placeholder="Email@domain.com"
            required
            name="email"
            type="email"
            id="standard-basic"
            variant="standard"
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
            {...register("userPassword", { required: "Password is required" })}
            error={!!errors.userPassword}
            helpertext={errors.userPassword ? errors.userPassword.message : ""}
            style={styles.textField}
            disableUnderline
          />
          <Typography
            variant="subtitle1"
            align="left"
            style={styles.typography}
          >
            Country
          </Typography>
          <CountrySelect />
          <Typography
            variant="subtitle1"
            align="left"
            style={styles.typography}
          >
            Birthdate
          </Typography>
          <Input
            required
            name="birthday"
            type="date"
            id="standard-basic"
            variant="standard"
            color="warning"
            {...register("birthday", { required: "Birthdate is required" })}
            error={!!errors.birthday}
            helpertext={errors.birthday ? errors.birthday.message : ""}
            style={styles.textField}
            disableUnderline
          />
          <Button type="submit" variant="contained" style={styles.submitButton}>
            Register
          </Button>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <Typography style={styles.registerRouting} variant="subtitle1">
              Already have an account?
            </Typography>
            <Link
              onClick={() => {
                onNavigate("login");
              }}
              underline="hover"
              variant="subtitle1"
              // style={styles.registerRouting}
              style={{
                color: "#3d77c9",
                fontFamily: "Roboto",
                cursor: "pointer",
              }}
            >
              Log in here
            </Link>
          </Box>
        </Box>
      </Box>
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
};

Register.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default Register;
