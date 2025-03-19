import { HashRouter, Route, Routes, } from "react-router-dom"
import MainLayout from "./components/layout/rootLayout/MainLayout"
import Home from "./pages/Home"
import { NewCode } from "./pages/NewCode"
import { NewCategory } from "./pages/NewCategory"
import { Codes } from "./pages/Codes"
import { CodePage } from "./pages/CodePage"
import { ManageCodes } from "./pages/ManageCodes"
import { ManageCategories } from "./pages/ManageCategories"
import { AdminLayout } from "./components/layout/adminLayout.tsx/AdminLayout"
import ScrollToTop from "./components/common/ScrollRestoration"

function App() {

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route element={<AdminLayout />}>
            <Route path="codes" >
              <Route index element={<Codes />} />
              <Route path="new" element={<NewCode />} />
              <Route path="manager" element={<ManageCodes />} />
              <Route path=":id" element={<CodePage />} />
            </Route>
            <Route path="category" >
              <Route path="new" element={<NewCategory />} />
              <Route path="manager" element={<ManageCategories />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
