import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex w-full min-h-screen">

      <div className="w-[15%] min-w-60 shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>

    </div>
  );
}