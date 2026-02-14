import { Navbar } from "./components/Navbar/Navbar";
import "./styles/styles.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  );
}

export default App;
