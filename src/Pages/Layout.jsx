import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Side_Bar from "../Components/Side_Bar/Side_Bar";

const Layout = () => {
  return (
    <div style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
      {/* Header */}
      <Header />

      {/* Main content area with sidebar + routed content */}
      <div className="d-flex" style={{ height: "calc(100vh - 70px)" }}>
        {/* Sidebar */}
        <Side_Bar />

        {/* Dynamic content from routes */}
        <div className="flex-grow-1 p-3 overflow-auto border border-secondary-subtle rounded m-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;