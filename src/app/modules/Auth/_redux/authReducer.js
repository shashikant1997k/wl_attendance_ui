import baseURL from "../../../baseurl";

let user = localStorage.getItem("user");
let tkn = localStorage.getItem("accessToken");

export const initialState = {
  user: user !== null && JSON.parse(user) ? JSON.parse(user) : null,
  accessToken: tkn !== null ? tkn : null,
};

export const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      localStorage.setItem("user", JSON.stringify(action.user));
      localStorage.setItem("accessToken", action.accessToken);
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
      };
    case actionTypes.LOGOUT:
      localStorage.clear();
      console.log(action);
      fetch(`${baseURL}/userLogout/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: action.accessToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Logged out...");
        })
        .catch((err) => {
          console.log(`Error- ${err}`);
        });
      return {};

    default:
      return state;
  }
};

export default authReducer;
