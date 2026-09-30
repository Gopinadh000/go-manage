import React, { useEffect, useState } from "react";
import APPModal from "../../../../../components/ui/modal/Modal";
import Button from "../../../../../components/ui/button/Button";
import InputField from "../../../../../components/ui/inputs/input-field/InputField";
import Select from "../../../../../components/ui/inputs/select-field/SelectField";
import TextArea from "../../../../../components/ui/inputs/text-area/TextArea";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useApi } from "../../../../../services/api";
import { useGraphQL } from "../../../../../services/api/useGrapghQL";
import { CREATE_PROJECT_MUTATION } from "../../../../../graphql/mutations/project.mutations";

const CreateProjectModal = ({ open, onClose, refreshTable }: any) => {
  const {GET} =useApi()
  const {execute , loading } = useGraphQL();

  const [members, setMembers]=useState([])
  const [projectData, setProjectData] = useState({
  projectName: "",
  projectKey: "",
  description: "",
  ownerId: 0,
  isPrivate: false,
});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = event.target;

  setProjectData((previous) => ({
    ...previous,
    [name]: value,
  }));
};

const handleMemberChange =(e)=> {


  const value = e.target.value

   setProjectData((previous) => ({
      ...previous,
      ownerId: value,
    }))
}

  const handleSubmitProject = async () => {

    const payload = {
      name : projectData.projectName.trim(),
      key : projectData.projectKey.trim(),
      description : projectData.description.trim(),
      ownerId : + projectData.ownerId,
    }

    const payloadInput = {
       input : {
         ...payload
       }
    }

    try{
      const responseData =  await execute(CREATE_PROJECT_MUTATION , payloadInput )
      refreshTable()
      onClose()
      setProjectData("")
      console.log("Created project:", responseData);
    }catch(error){
      console.error("Create project failed:", error);

    }
  };


  const getProjectMembers = async ()=>{
    const resData = await GET('projects/members');
    const mem = resData?.data?.members
    setMembers(mem)
  }

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProjectMembers()
  },[])

  

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
              disabled={loading ? true :  false}
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
          <Select label="Project Owner" name="projectOwner" placeholder="Select Project Owner"  options={members} onChange={(value)=>handleMemberChange(value)} />
        </div>
      </APPModal>
    </div>
  );
};

export default CreateProjectModal;
