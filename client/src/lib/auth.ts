import axios from "axios";
import config from "@/config";

export const logout = () => {
    try {
        (async () => {
            await axios.delete(`${config.API_URL}/logout`, {
                withCredentials: true,
            });
        })()
    } catch (e: any) {
    }
}