import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import RouteGuard from "./components/RouteGuard";

// Pages & Components
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
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
                <Route path="/courses/:id" element={<JobPage />} />
                <Route
                  path="/courses/add-job"
                  element={
                    <RouteGuard requireAuth={true}>
                      <AddJobPage />
                    </RouteGuard>
                  }
                />
                <Route
                  path="/edit-job/:id"
                  element={
                    <RouteGuard requireAuth={true}>
                      <EditJobPage />
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