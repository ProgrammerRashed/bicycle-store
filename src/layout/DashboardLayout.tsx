import SidebarComponent from "@/sidebar/SidebarComponent";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-white">
        <SidebarComponent> 
          <Outlet />
        </SidebarComponent>
    </div>
  );
};

export default DashboardLayout;
