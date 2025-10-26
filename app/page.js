import Image from "next/image";
import Sidebar from "./components/sidebar/sidebar";
export default function Home() {
  return (
    <div className="flex ">
      <Sidebar/>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold caret-amber-900 bg-blue-800 text-center">يامصطفى دا الهوم اشتغل هون </h1>

      </main>
    </div>
  );
}
