import { BrowserRouter } from "react-router";
import AppRoutes from "./AppRoutes";
import "./App.css";

function App() {

  return (
    <BrowserRouter>
      <AppRoutes></AppRoutes>
    </BrowserRouter>
  );
}

export default App;
