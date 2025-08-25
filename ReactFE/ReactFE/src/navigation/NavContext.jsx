import { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const MyContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "navigate": {
      const present = state.present;
      if (present.destination !== action.payload.destination)
        return {
          past: [...state.past, state.present],
          present: action.payload,
        };
      else
        return {
          past: state.past,
          present: state.present,
        };
    }
    case "back": {
      if (state.past.length != 0) {
        const lastIndex = state.past.length - 1;
        const newPast = state.past.slice(0, lastIndex);
        const newPresent = state.past[lastIndex] || null;
        const present = state.present;
        if (present.domain !== "/") {
          present.navigate(newPresent.domain);
        } else if (newPresent?.navigate) {
          present.navigate(newPresent.destination);
        }

        return {
          past: newPast,
          present: newPresent,
        };
      } else
        return {
          past: state.past,
          present: state.present,
        };
    }
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

const MyProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    past: [],
    present: { destination: "/", domain: "/", navigate },
  });

  return (
    <MyContext.Provider value={{ state, dispatch, navigate }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
