import { Navbar } from "./components/Navbar/Navbar";
import "./styles/styles.css";
import { ChevronUp } from "lucide-react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";
import { useEffect, useState } from "react";

function App() {
  const [isExpanded, setIsExpanded] = useState(() => window.scrollY > 200);

  useEffect(() => {
    const onScroll = () => setIsExpanded(window.scrollY > 200);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    </>
  );
}

export default App;
