import { Navbar } from "./components/Navbar/Navbar";
import "./styles/styles.css";
import { ChevronUp } from "lucide-react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";
import { useEffect, useState } from "react";

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);

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
      {scrollY > 200 && <div className="upArrow" onClick={()=>{
        scrollToTop();
      }}>
        <ChevronUp />
      </div>}
    </>
  );
}

export default App;
