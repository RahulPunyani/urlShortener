import { Routes, Route } from "react-router";
import LoginComponent from "./components/ui/LoginComponent";
import UrlShortnerComponent from "./components/ui/UrlShortenerComponent";
import ProtectedRoute from "./components/ui/ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" Component={LoginComponent}></Route>
      <Route
        path="/url-shorten"
        element={
          <ProtectedRoute>
            <UrlShortnerComponent />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/" Component={LoginComponent}></Route>
    </Routes>
  );
};

export default AppRoutes;
