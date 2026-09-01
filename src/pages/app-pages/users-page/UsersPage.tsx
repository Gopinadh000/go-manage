import { useState } from "react"
import Button from "../../../components/ui/button/Button"
import APPModal from "../../../components/ui/modal/Modal"
import PageHeader from "../../../components/ui/page-header/PageHeader"
import { AddOutlined } from "@mui/icons-material"

const UsersPage = () => {
  const [open , setOpen] = useState(false)
  return (
    <div className="h-full border border-app-border rounded-md flex flex-col gap-5">
      <PageHeader 
      title="Users" 
      subtitle="Manage team members and roles." 
      children={<Button startIcon={<AddOutlined />} label="Create User" size="sm" onClick={() => {setOpen(true)}} />} />
     <div className="flex flex-col gap-4">asndi</div>
      <APPModal open={open} onClose={() => setOpen(false)} modalType="side" size="lg" sideInset="true" />
    </div>
  )
}

export default UsersPage
