import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BackToTopButton from "./components/Common/BackToTopButton";
import FloatingCallButton from "./components/Common/FloatingCallButton";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body-md antialiased">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
      <FloatingCallButton
        phoneNumber="09612-888777"
        position="bottom-left"
        showAfterScroll={300}
      />
    </div>
  );
}

export default App;
