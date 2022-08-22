import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import BannersList from "./components/bannersList";
import BannerForm from "./components/forms/bannerForm";
import LayoutApp from "./components/layout/BaseApp";

function App() {
  return (
    <div className="bg-zinc-900 h-screen text-white">
      <div className="flex items-center justify-center h-full">
        <BrowserRouter>
          <LayoutApp>
            <Routes>
              <Route path="/" element={<BannersList />} />
              <Route path="/create-banner" element={<BannerForm />} />
              <Route path="/edit-banner/:id" element={<BannerForm />} />
            </Routes>
          </LayoutApp>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;