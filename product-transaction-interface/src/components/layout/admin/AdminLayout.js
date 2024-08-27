"use client";

import React, { useState } from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="bg-gray-200 p-2 w-1/4">
        <h1>Admin</h1>
      </div>
      <div className="w-full p-2 h-screen">{children}</div>
    </div>
  );
};
export default AdminLayout;
