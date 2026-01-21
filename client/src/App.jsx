import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import "./styles/styles.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <Content />
      </div>
      <Footer />
    </>
  );
}

export default App;
