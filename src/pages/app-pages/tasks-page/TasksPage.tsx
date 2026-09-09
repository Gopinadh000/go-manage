import React, { useState } from "react";
import PageHeader from "../../../components/ui/page-header/PageHeader";
import Button from "../../../components/ui/button/Button";
import { AddOutlined } from "@mui/icons-material";
import Tabs from "../../../components/ui/tabs/Tabs";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";

const taskTabs = [
  {
    id: "list",
    key: "list",
    label: "List",
    icon: <FormatListBulletedIcon sx={{ fontSize: 20 }} />,
    default :true
  },
  {
    id: "board",
    key: "board",
    label: "Board",
    icon: <ViewKanbanOutlinedIcon sx={{ fontSize: 20 }} />,
    default : false
  },
];



const TasksPage = () => {
  const [open , setOpen] = useState(false);


  return ( <div className="h-full  border-app-border rounded-md flex flex-col overflow-hidden">
      <PageHeader
        title="Tasks"
        subtitle="Track and manage your personal tasks"
        children={
          <div className="flex items-center gap-4">
            <Tabs
  tabs={taskTabs}
  defaultTab="list"
/>


             <Button
            startIcon={<AddOutlined />}
            label="Add Project"
            size="sm"
            onClick={() => {
              setOpen(true);
            }}
          />


            </div>
         
        }
      />
      <div className="flex-1 min-h-0 ">
       

      </div>
    </div>)
};

export default TasksPage;
