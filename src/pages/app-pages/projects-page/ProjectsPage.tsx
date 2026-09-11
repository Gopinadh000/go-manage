
import PageHeader from "../../../components/ui/page-header/PageHeader";
import { AddOutlined } from "@mui/icons-material";
import { useState } from "react";
import Button from "../../../components/ui/button/Button";
import ProjectsDataTable from "./components/projects-datatable/ProjectsDataTable";
import CreateProjectModal from "./components/create-project/CreateProjectModal";

const ProjectsPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full  border-app-border rounded-md flex flex-col overflow-hidden">
      <PageHeader
        title="Projects"
        subtitle="6 projects in your workspace"
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
        <ProjectsDataTable />
      </div>
      <CreateProjectModal  open={open}  onClose={()=> setOpen(false)}  />
    </div>
  );
};

export default ProjectsPage;
