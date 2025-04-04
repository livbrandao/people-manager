import "./App.css";
import SidebarNavigation from "./components/Common/SidebarNavigation.jsx";

function App() {
  return (
    <div className="flex h-screen bg-[#DBDBDB]">
      <SidebarNavigation />

      <div className="flex-1 ">{/* Conteúdo da página */}</div>
    </div>
  );
}

export default App;
