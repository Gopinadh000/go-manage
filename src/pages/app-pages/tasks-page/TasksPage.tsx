import React, { useState } from "react";
import PageHeader from "../../../components/ui/page-header/PageHeader";
import Button from "../../../components/ui/button/Button";
import { AddOutlined } from "@mui/icons-material";

const TasksPage = () => {
  const [open , setOpen] = useState(false);

  return ( <div className="h-full  border-app-border rounded-md flex flex-col overflow-hidden">
      <PageHeader
        title="Tasks"
        subtitle="Track and manage your personal tasks"
        children={
          <Button
            startIcon={<AddOutlined />}
            label="Add Project"
            size="sm"
            onClick={() => {
              setOpen(true);
            }}
          />
        }
      />
      <div className="flex-1 min-h-0 ">
       

      </div>
    </div>)
};

export default TasksPage;
