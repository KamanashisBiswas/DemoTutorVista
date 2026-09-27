import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BackToTopButton from "./components/Common/BackToTopButton";
import FloatingCallButton from "./components/Common/FloatingCallButton";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <BackToTopButton />
      <FloatingCallButton
        phoneNumber="01329-266008"
        position="bottom-left"
        showAfterScroll
      />
    </>
  );
}

export default App;
