import axios from "axios";
import { SERVER_URL } from "../config";

class CrisesService {
  server = SERVER_URL;

  list = async () => {
    try {
      const response = await axios.get(`${this.server}/api/crisis`);
      return response;
    } catch (error) {
      console.error("list error", error);
      throw error;
    }
  };

  create = async (data: any) => {
    try {
      const response = await axios.post(`${this.server}/api/crisis/`, data);
      return response;
    } catch (error) {
      console.error("create error", error);
      throw error;
    }
  };
}

export default new CrisesService();
