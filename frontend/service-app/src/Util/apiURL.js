export const apiURL = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:3333"
    : "https://frozen-headland-16038.herokuapp.com";
};
