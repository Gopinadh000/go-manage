import { useState } from "react"
import Button from "../../../components/ui/button/Button"
import APPModal from "../../../components/ui/modal/Modal"
import PageHeader from "../../../components/ui/page-header/PageHeader"
import { AddOutlined } from "@mui/icons-material"
import DataTable from "../../../components/ui/data-table/DataTable";
import usersdata from "./mock-data.json"

const UsersPage = () => {
  const [open , setOpen] = useState(false)


  return (
    <div className="h-full  border-app-border rounded-md flex flex-col overflow-hidden">
      <PageHeader 
      title="Users" 
      subtitle="Manage team members and roles." 
      children={<Button startIcon={<AddOutlined />} label="Create User" size="sm" onClick={() => {setOpen(true)}} />} />
     <div className="flex-1 min-h-0">
      <DataTable rowKey="userPublicId"  headers={usersdata.data.headers}  items={usersdata.data.items}/>
     </div>
      <APPModal open={open} onClose={() => setOpen(false)} modalType="side" size="lg" sideInset="true" />
    </div>
  )
}

export default UsersPage
