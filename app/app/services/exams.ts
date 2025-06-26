import axios from "axios";
import { SERVER_URL } from "../config";

class ExmasService {
  server = SERVER_URL;

  list = async () => {
    try {
      const response = await axios.get(`${this.server}/api/exams`);
      return response;
    } catch (error) {
      console.error("list error", error);
      throw error;
    }
  };

  create = async (data: any) => {
    try {
      let payload = data;
      let headers = {};
      // If data contains a file, use FormData
      if (data && data.file) {
        payload = new FormData();
        payload.append("name", data.name);
        payload.append("date", data.examDate);
        payload.append("analyze_with_ai", String(data.analyzeWithAI));
        // Append file (expects { uri, name, type })
        payload.append("file", {
          uri: data.file.uri,
          name: data.file.name || "file",
          type:
            data.file.mimeType || data.file.type || "application/octet-stream",
        });
        headers = { "Content-Type": "multipart/form-data" };
      }
      const response = await axios.post(
        `${this.server}/api/exams/`,
        payload,
        headers && Object.keys(headers).length ? { headers } : undefined
      );
      return response;
    } catch (error) {
      console.error("create error", error);
      throw error;
    }
  };
}

export default new ExmasService();
