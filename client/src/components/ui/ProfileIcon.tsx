import { useState } from "react";
import { useAuth } from "@lib/store/auth";
import { useNavigate } from "react-router-dom";


export default function ProfileIcon() {
    const navigate = useNavigate();
    const auth = useAuth();
    const [imageError, setImageError] = useState(false);
    const userInitial = auth.user?.name[0].toUpperCase();
    
    return (
    <div className="relative group text-primary">
        <div className="w-10 h-10 rounded-full text-inherit bg-gray-300 flex items-center justify-center cursor-pointer"
            onClick={() => {
                navigate("/dashboard");

                // logout();
                // auth.logout();
                // toast.success("Logged out successfully");
            }}
        >
            {!imageError ?
                <img 
                    src="/path/to/profile-icon.png" 
                    className="w-full h-full rounded-full"
                    onError={() => setImageError(true)} 
                /> : (
                <span className="text-inherit text-lg font-bold">
                    {userInitial}
                </span>
                )
            }
        </div>
    </div>)
}