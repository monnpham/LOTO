import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./page/HomePage/HomePage";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/Spinner/Spinner";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Header />
        <Spinner />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
