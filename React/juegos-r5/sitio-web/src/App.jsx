  import { Routes, Route } from "react-router-dom";
  import Home from "./pages/Home";
  import Game1942 from "./components/game1942/Game1942";
  import SpaceInvaders from "./components/spaceInvaders/SpaceInvaders";

  export default function App() {
    return (
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spaceinvaders" element={<SpaceInvaders/>} />
          <Route path="/game1942" element={<Game1942 />} />
        </Routes>
      </div>
    );
  }
