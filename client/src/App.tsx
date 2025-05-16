import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "@pages/404";
import Home from "@pages/Home";

const App = () => {
    return (<>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    </>);
}

export default App;
