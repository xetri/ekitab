import { Loader } from "lucide-react";

export default function Spinner() {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader className="animate-spin w-5 h-5" />
        </div>
    );
}