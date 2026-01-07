import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import "./styles/styles.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Content } from "./components/Content/Content";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Content />
    </>
  );
}

export default App;
