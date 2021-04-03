import { toast } from "react-toastify";
import axios from "axios";

import config from "../config";

export const api = axios.create({
  baseURL: config.API_URL,
});

export const snackbarError = (error: any, options?: any) => {
  error.response.data.error.errors.forEach((e: any) => {
    toast.error(e.messages.en, options);
  });
};

export const snackbarInfo = (message: string, options?: any) =>
  toast.error(message, options);
