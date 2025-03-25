import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/rootLayout/MainLayout";
import Home from "./pages/Home";
import NewCode from "./pages/NewCode";
import NewCategory from "./pages/NewCategory";
import Codes from "./pages/Codes";
import CodePage from "./pages/CodePage";
import ManageCodes from "./pages/ManageCodes";
import ManageCategories from "./pages/ManageCategories";
import ScrollToTop from "./components/common/ScrollRestoration";
import { UserLayout } from "./components/layout/userLayout.tsx/UserLayout";
import { useAuth } from "@clerk/clerk-react";
import LoadingSpinner from "./components/common/LoadingSpinner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <main className="absolute inset-0 mt-12">
      <LoadingSpinner />
    </main>;
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route element={<UserLayout />}>
            <Route path="*" element={<Home />} />
            <Route index element={<Home />} />
            <Route path="codes">
              <Route index element={<Codes />} />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewCode />
                  </ProtectedRoute>
                }
              />
              <Route
                path="manager"
                element={
                  <ProtectedRoute>
                    <ManageCodes />
                  </ProtectedRoute>
                }
              />
              <Route path=":id" element={<CodePage />} />
            </Route>
            <Route path="category">
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="manager"
                element={
                  <ProtectedRoute>
                    <ManageCategories />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
