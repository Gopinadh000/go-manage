import { useState } from "react"
import Button from "../../../components/ui/button/Button"
import PageHeader from "../../../components/ui/page-header/PageHeader"
import { AddOutlined } from "@mui/icons-material"
import UsersDataTable from "./components/users-datatable/UsersDataTable"
import CreateUser from "./components/create-user/CreateUser"


const UsersPage = () => {
  const [open , setOpen] = useState(false)


  return (
    <div className="h-full  border-app-border rounded-md flex flex-col overflow-hidden">
      <PageHeader 
      title="Users" 
      subtitle="Manage team members and roles." 
      children={<Button startIcon={<AddOutlined />} label="Create User" size="sm" onClick={() => {setOpen(true)}} />} />
     <div className="flex-1 min-h-0 ">
       <UsersDataTable />
     </div> 
      <CreateUser  open={open} onClose={()=> setOpen(false)}/>
    </div>
  )
}

export default UsersPage
