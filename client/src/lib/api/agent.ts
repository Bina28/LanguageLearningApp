import axios from "axios";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.response.use(
  async (response) => {
    try {
      await sleep(1000);
      return response;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  async (error) => {
    try {
      await sleep(1000);

      if (!error.response) {
        console.error("Network error");
        return Promise.reject(error);
      }

      const { status, data } = error.response;

      switch (status) {
        case 400:
          toast.error("Bad Request");
          break;
        case 401:
          toast.error("Unauthorized");
          break;
        case 404:
          router.navigate("/not-found");
          break;
        case 500:
          console.error("Server Error", data);
          break;
        default:
          console.error("Unknown error", data);
          break;
      }

      return Promise.reject(error);
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }
);

export default agent;
