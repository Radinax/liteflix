import ky from "ky";

export const api = ky.extend({
  prefixUrl: "http://localhost:3000/",
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // TO-DO handle error response via afterResponse
});
