import { useAuth } from "@/lib/store/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@radix-ui/themes";
import config from "@/config";


export default function ProfileIcon() {
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogout = async () => {
        try {
            const res = await axios.delete(`${config.API_URL}/logout`, { withCredentials: true });
            console.log(res);
            auth.logout();
        } catch(e) {
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
                onClick={() => navigate("/dashboard")}
            >
                Dashboard
            </Button>
            <Button
                className="px-4 py-2 rounded-md border bg-amber-50 border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors font-medium"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    );
}