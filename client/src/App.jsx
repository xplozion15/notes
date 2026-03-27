import { Navbar } from "./components/Navbar/Navbar";
import "./styles/styles.css";
import { ChevronUp } from "lucide-react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState(() => window.scrollY > 200);

  //useEffect to show the error whenever the state changes which is being received from the admin routes component through other components redirect using navigate/usenavigate method
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      //navigate to current path and reset the state of reacr router navigate so that refresh doesnt show the toast again
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, location.state, navigate]);

  //useeffect to scroll up when scroll up button is clicked
  useEffect(() => {
    const onScroll = () => setIsExpanded(window.scrollY > 200);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // a small use effect to show welcome toast
  useEffect(() => {
    toast.success("Welcome to my blog page");
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <Content />
      </div>
      <Footer />
      {isExpanded && (
        <div
          className="upArrow"
          onClick={() => {
            scrollToTop();
          }}
        >
          <ChevronUp />
        </div>
      )}
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "var(--background-color-main)",
            color: "var(--text-color-main)",
            border: "2px solid var(--background-color-main)",
            borderRadius: "var(--border-radius-small)",
          },
        }}
      />
    </>
  );
}

export default App;
