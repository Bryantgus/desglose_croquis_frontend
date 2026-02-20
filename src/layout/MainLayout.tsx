import { Outlet } from "react-router-dom";
import Sidebar from "../components/Header-Sidebar/Sidebar";
import Header from "../components/Header-Sidebar/Header";
// import { useWindowSize } from "../hooks/useWindowSize";
export default function MainLayout() {

  // const { width, height} = useWindowSize()

  return (
    <div className="flex w-full min-h-screen relative">
      {/* <div className="absolue top-1 left-1">{width} {height}</div> */}

      <div className="w-[15%] min-w-60 shrink-0">
        <Sidebar />
      </div>

      <main className="min-h-screen w-full bg-slate-900 p-10
    bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] 
    bg-size-[50px_50px]">
        <Header />
        <Outlet />
      </main>

    </div>
  );
}