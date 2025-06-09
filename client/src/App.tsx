import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import config from "@/config";
import { useAuth } from "@lib/store/auth";
import NotFound from "@pages/404";
import Home from "@pages/Home";
import Publisher from "@/components/pages/Publisher";
import Dashboard from "@pages/Dashboard";
import Book from "@pages/Book";
import AuthModal from "@ui/AuthDialog";
import Navbar from "@ui/Navbar";
import Footer from "@ui/Footer";
import Spinner from "@ui/Spinner";

const App = () => {
    const auth = useAuth();

    useEffect(() => {
        (async () => {
            auth.setLoading(true);
            try {
                const res = await axios.get(config.API_URL + "/me", {
                    withCredentials: true,
                });
                const user = res.data.data;
                auth.login({
                    uid: user.id,
                    name: user.name,
                    email: user.email,
                });
                auth.setLoading(false);
            } catch (e: any) {
                auth.setLoading(false);
            }
        })();
    }, []);

    return (
        auth.loading ? (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <Spinner />
            </div>
        ) :
    <>
        <div className="min-h-screen bg-neutral">
            <AuthModal/>
            <Router>
                <Navbar/>
                <main className="bg-neutral">
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/dashboard" element={<Dashboard/>} />
                        <Route path="/publisher/:publisherId" element={<Publisher/>} />
                        <Route path="/book/:bookId" element={<Book/>} />
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </main>
                {/* <Footer/> */}
            </Router>
            <ToastContainer/>
        </div>
    </>);
}

export default App;
