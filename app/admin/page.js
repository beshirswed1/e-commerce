'use client';

import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function AdminPage() {
  return (
    <div className="flex h-screen">
     
      <div className="flex-1 flex flex-col">
        
        <main className="p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </main>
      </div>
    </div>
  );
}
