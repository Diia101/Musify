import {
  Box,
  Button,
  Container,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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
    margin: "0 0 2% 0",
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

const ChangeDetails = ({ onNavigate }) => {
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

      const id = jwtDecode(token).sub;
      await axiosInstance.put(`http://localhost:8081/user/${id}`, data);
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
        required
        name="country"
        id="standard-basic"
        variant="standard"
        color="warning"
        {...register("country", { required: "Country is required" })}
        error={!!errors.country}
        helpertext={errors.country ? errors.country.message : ""}
        style={styles.countryField}
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
            First Name
          </Typography>
          <Input
            required
            autoFocus
            placeholder="New First Name"
            name="firstname"
            type="text"
            id="standard-basic"
            variant="standard"
            color="warning"
            {...register("firstname", {
              required: "First Name is required",
            })}
            error={!!errors.firstname}
            helpertext={errors.firstname ? errors.firstname.message : ""}
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
            Last Name
          </Typography>
          <Input
            required
            placeholder="New Last Name"
            name="lastname"
            type="text"
            id="standard-basic"
            variant="standard"
            color="warning"
            {...register("lastname", {
              required: "Last Name is required",
            })}
            error={!!errors.lastname}
            helpertext={errors.lastname ? errors.lastname.message : ""}
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
            Country
          </Typography>
          <CountrySelect />
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

ChangeDetails.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default ChangeDetails;
