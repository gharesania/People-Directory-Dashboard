import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import People from "./Pages/People";
import Layout from "./Pages/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="directory" element={<People />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
