import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/navigation";
import Account from "./pages/account";
import Add from "./pages/add";
import Home from "./pages/home";
import Library from "./pages/library";
import Search from "./pages/search";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
