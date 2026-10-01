import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Details from "./pages/Details";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task" element={<CreatePage />} />
      <Route path="/task/:id" element={<Details />} />
    </Routes>
  );
};

export default App;
