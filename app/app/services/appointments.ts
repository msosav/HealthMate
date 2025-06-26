import axios from "axios";
import { SERVER_URL } from "../config";

class AppointmentsService {
  server = SERVER_URL;

  list = async () => {
    try {
      const response = await axios.get(`${this.server}/api/appointments`);
      return response;
    } catch (error) {
      console.error("list error", error);
      throw error;
    }
  };

  create = async (data: any) => {
    try {
      const response = await axios.post(
        `${this.server}/api/appointments/`,
        data
      );
      return response;
    } catch (error) {
      console.error("create error", error);
      throw error;
    }
  };
}

export default new AppointmentsService();
