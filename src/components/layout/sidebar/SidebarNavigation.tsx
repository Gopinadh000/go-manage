import { SIDEBAR_ITEMS } from "./sidebar-data";
import { NavLink } from "react-router-dom";
import {
  DashboardOutlined,
  PeopleAltOutlined,
  FolderOutlined,
  TaskOutlined,
  SmartToyOutlined,
  ChatOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { usePermission } from "../../../hooks/usePermission";
import { useSidebar } from "../../../services/context/sidebar-context/SidebarContext";


const SidebarNavigation = () => {
  const {can}   = usePermission()
  const { showExpandedContent, closeSideBar } = useSidebar()

  const iconMap = {
    DashboardOutlined,
    PeopleAltOutlined,
    FolderOutlined,
    TaskOutlined,
    SmartToyOutlined,
    ChatOutlined,
    SettingsOutlined,
  };



  const sidebarItems = SIDEBAR_ITEMS.filter((item) =>{
    return  can(item.permission)
  }
   
);

  return (
    <nav className="flex flex-col gap-2 p-2 tablet:p-3">
      {sidebarItems.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <div key={item.key} className="hover:bg-app-primary-100 w-full rounded-sm outline-none">
            <NavLink
              to={item.path}
              end={item.path === "/"}
              onClick={closeSideBar}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-2 py-2 text-sm font-medium transition-colors ${
                  showExpandedContent ? '' : 'justify-center'
                } ${
                  isActive
                    ? "bg-app-primary-100 text-app-primary-800 rounded-sm hover:rounded-sm before:absolute before:inset-y-0.5 before:left-0 before:w-1 before:rounded-r before:bg-app-primary-500"
                    : "text-app-text-secondary hover:bg-app-surface-muted hover:rounded-sm"
                }`
              }
            >
             {Icon && (
               <span
                 className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm shadow-sm ${
                   showExpandedContent ? 'ml-1' : ''
                 }`}
               >
                 <Icon />
               </span>
             )}
              {showExpandedContent && (
                <span className="truncate">{item.label}</span>
              )}
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
};

export default SidebarNavigation;
