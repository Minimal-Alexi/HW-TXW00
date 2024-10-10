import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import RouteGuard from "./components/RouteGuard";

// Pages & Components
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import AddCoursePage from "./pages/AddCoursePage";
import CoursePage from "./pages/CoursePage";
import EditCoursePage from "./pages/EditCoursePage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses/:id" element={<CoursePage />} />
                <Route
                  path="/courses/add-course"
                  element={
                    <RouteGuard requireAuth={true}>
                      <AddCoursePage />
                    </RouteGuard>
                  }
                />
                <Route
                  path="/edit-course/:id"
                  element={
                    <RouteGuard requireAuth={true}>
                      <EditCoursePage />
                    </RouteGuard>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <RouteGuard requireAuth={false}>
                      <Signup />
                    </RouteGuard>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <RouteGuard requireAuth={false}>
                      <Login />
                    </RouteGuard>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
  );
};

export default App;