import axios from "axios";
import { PropTypes } from "prop-types";
import { useEffect } from "react";

async function determineValidity(jwt) {
  const response = await axios.get(`http://localhost:8081/user/validateToken`, {
    params: {
      jwt: jwt,
    },
    headers: {
      Accept: "*/*",
    },
  });
  return response.data.isValid;
}

export const useProtector = (futureRoute, onNavigate) => {
  useEffect(() => {
    const checkValidity = async () => {
      if (futureRoute.route === "register") {
        onNavigate("register", null);
      } else {
        let jwt = localStorage.getItem("jwt");
        const isValid = await determineValidity(jwt);
        if (!jwt || jwt === "" || !isValid) {
          onNavigate("login");
        } else {
          onNavigate(futureRoute.route, futureRoute.params);
        }
      }
    };

    checkValidity();
  }, [futureRoute.route, onNavigate]);
};

useProtector.propTypes = {
  futureRoute: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};
