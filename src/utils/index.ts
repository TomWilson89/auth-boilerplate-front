import { toast } from "react-toastify";
import axios from "axios";

import config from "../config";

export const api = axios.create({
  baseURL: config.API_URL,
});

export const snackbar = (error: any) => {
  error.response.data.error.errors.forEach((e: any) => {
    toast.error(e.messages.en);
  });
};
