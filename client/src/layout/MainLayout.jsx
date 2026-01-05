import { Navbar } from "../components/Navbar/Navbar";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Content } from "../components/Content/Content";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Content />
    </>
  );
};

export { MainLayout };
