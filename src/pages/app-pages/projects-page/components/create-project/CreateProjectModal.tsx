import React, { useState } from "react";
import APPModal from "../../../../../components/ui/modal/Modal";
import Button from "../../../../../components/ui/button/Button";
import InputField from "../../../../../components/ui/inputs/input-field/InputField";
import Select from "../../../../../components/ui/inputs/select-field/SelectField";
import TextArea from "../../../../../components/ui/inputs/text-area/TextArea";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

const CreateProjectModal = ({ open, onClose }: any) => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
    projectKey: "",
    projectOwner: {
      id: "",
      label: "",
      value: "",
    },
  });

  const handleInputChange = () => {

    setProjectData({})
  }
  
  ;

  const handleSubmitProject = () => {
    console.log(projectData ,"pd")
  };

  return (
    <div>
      <APPModal
        open={open}
        onClose={onClose}
        title="Create Project"
        modalType="center"
        size="l"
        footerComponent={
          <div className="flex gap-2 justify-end w-full mr-2">
            {" "}
            <Button
              size="sm"
              label="Cancel"
              startIcon={<CloseIcon />}
              onClick={onClose}
            />
            <Button
              size="sm"
              label="Save"
              startIcon={<SaveIcon />}
              onClick={handleSubmitProject}
            />
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <InputField
              type="text"
              label="Project Name"
              value={projectData.projectName}
              required
              placeholder="Enter Project name"
              onChange={handleInputChange}
              name="projectName"
            />
            <div className="w-1/3">
              <InputField
                type="text"
                label="Project key"
                value={projectData.projectKey}
                placeholder="Ex : APP"
                required
                onChange={handleInputChange}
                name="projectKey"
              />
            </div>
          </div>
          <TextArea
            label="Description"
            placeholder="Enter Project Description"
            onChange={handleInputChange}
            value={projectData.description}
            name="description"
          />
          <Select label="Project Owner" placeholder="Select Project Owner" />
        </div>
      </APPModal>
    </div>
  );
};

export default CreateProjectModal;
