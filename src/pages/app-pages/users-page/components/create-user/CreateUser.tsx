import React from "react";
import APPModal from "../../../../../components/ui/modal/Modal";
import Button from "../../../../../components/ui/button/Button";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';




const CreateUser = ({ open, onClose }) => {

  const handleSubmit = ()=>{
    console.log("handle Submit")
  }


  return (
    <div>
      <APPModal
        open={open}
        onClose={onClose}
        modalType="center"
        size="l"
        title="Create User"
        footerComponent={
            <div className="flex justify-end w-full flex-row gap-2">
              <Button onClick={onClose} variant="outlined"  startIcon={<CloseIcon fontSize="small" />} label="Cancel" size="sm"/>
              <Button  onClick={handleSubmit} startIcon={<SaveIcon fontSize="small"/>}  label="Submit" size="sm"/>
            </div>
        }
      >
        <div className="h-[400px]">
        <h1>Create USER</h1>
        </div>
      </APPModal>
    </div>
  );
};

export default CreateUser;
