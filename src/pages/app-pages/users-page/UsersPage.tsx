import { useState } from "react"
import Button from "../../../components/ui/button/Button"
import PageHeader from "../../../components/ui/page-header/PageHeader"
import { AddOutlined } from "@mui/icons-material"
import UsersDataTable from "./components/users-datatable/UsersDataTable"
import CreateUser from "./components/create-user/CreateUser"
import useTableRefresh from "../../../components/ui/data-table/hooks/useTableRefresh"
import Tabs from "../../../components/ui/tabs/Tabs"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import { useSearchParams } from "react-router"

const usersTabs = [
  {
    id: "list",
    key: "list",
    label: "List",
    icon: <FormatListBulletedIcon sx={{ fontSize: 20 }} />,
    default :true
  },
  {
    id: "dashboard",
    key: "dashboard",
    label: "Board",
    icon: <ViewKanbanOutlinedIcon sx={{ fontSize: 20 }} />,
    default : false
  },
];




const UsersPage = () => {
   const [searchParams] = useSearchParams();

  const activeView =
    searchParams.get("view") || "list";

  const [open , setOpen] = useState(false)
    const {refreshKey, refreshTable } =useTableRefresh()

  return (
    <div className="h-full  border-app-border rounded-md flex flex-col overflow-hidden">
      <PageHeader 
      title="Users" 
      subtitle="Manage team members and roles." 
      children={
        <div className="flex gap-4 w-full justify-end">
          <Tabs  tabs={usersTabs} defaultTab="list" variant="segmented"/>
          <Button startIcon={<AddOutlined />} label="Create User" size="sm" onClick={() => {setOpen(true)}} />
        </div>
        }
      />
      <div className="flex-1 min-h-0 ">
         {activeView === "list" && <UsersDataTable  reloadTable={refreshKey} />}
         {activeView === "dashboard" && <h1 className="text-app-text">users dashbaord Board</h1> }
     </div> 
      <CreateUser  open={open} onClose={()=> setOpen(false)}  refreshTable={refreshTable}/>
    </div>
  )
}

export default UsersPage
