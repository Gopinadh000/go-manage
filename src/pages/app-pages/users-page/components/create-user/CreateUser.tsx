import React, { useState } from "react";
import APPModal from "../../../../../components/ui/modal/Modal";
import Button from "../../../../../components/ui/button/Button";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import InputField from "../../../../../components/ui/inputs/input-field/InputField";
import SelectField from "../../../../../components/ui/inputs/select-field/SelectField";
import DatePickerField from "../../../../../components/ui/inputs/date-picker-field/DatePickerField";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { validateUserField } from "./validation";
import { useApi } from "../../../../../services/api";


const roleOptions = [
  {
    label: "Super Admin",
    value: 1001,
  },
  {
    label: "Manager",
    value: 1002,
  },
  {
    label: "User",
    value: 1003,
  },
];

const CreateUser = ({ open, onClose , refreshTable}) => {

  const { POST } = useApi()

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: null,
    role: 0,
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    dob: false,
    role: false,
  })







  const hanldeInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));


    if(touched[name]){
      const error = validateUserField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };







  const handleSelectChange = (e) => {
    const roleIdValue = e.target.value;
    setUserData((prev) => ({
      ...prev,
      role: roleIdValue,
    }));

    const error = validateUserField("role", roleIdValue);

    setErrors((prev) => ({
      ...prev,
      role: error,
    }));
  };

  const hanldeDateChange = (value) => {
    setUserData((prev) => ({
      ...prev,
      dob: value,
    }));

    const error = validateUserField("dob", value);

    setErrors((prev) => ({
      ...prev,
      dob: error,
    }));
  };


  const handleInputBlur =(e)=> {
    const {name, value}= e.target;

    setTouched((prev) => ({
      ...prev ,
      [name] : true
    }))
    const error = validateUserField(name, value);

    setErrors((prev) => ({
      ...prev ,
      [name] :error,
    }))
  };


  const handleSubmit = async () => {
    const payload = {
      ...userData,
      dob: userData.dob ? userData.dob.format("YYYY-MM-DD") : "",
    };
     
    const resData = await POST("/users/user",  payload);

    if(!resData?.status){
      console.error(resData?.statusMessage)
    }

    if (resData?.status) {
      refreshTable()
      onClose()
    }

   

    setUserData({
       firstName: "",
    lastName: "",
    email: "",
    dob: null,
    role: 0,
    })

    setErrors({
       firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "",
    })
  };

  return (
    <div className="flex">
      <APPModal
        open={open}
        onClose={onClose}
        modalType="center"
        size="l"
        title="Create User"
        footerComponent={
          <div className="flex justify-end w-full flex-row gap-2">
            <Button
              onClick={onClose}
              variant="outlined"
              startIcon={<CloseIcon fontSize="small" />}
              label="Cancel"
              size="sm"
            />
            <Button
              onClick={handleSubmit}
              startIcon={<SaveIcon fontSize="small" />}
              label="Submit"
              size="sm"
            />
          </div>
        }
      >
        <div className="flex flex-col gap-4 min-h-[300px]">
          <div className="flex gap-4">
            <InputField
              label="First Name"
              required
              type={"text"}
              placeholder="first name"
              name={"firstName"}
              onChange={hanldeInputChange}
              error={errors.firstName}
              onBlur={handleInputBlur}
            />
            <InputField
              label="Last Name"
              required
              type={"text"}
              placeholder="last name"
              name={"lastName"}
              onChange={hanldeInputChange}
              error={errors.lastName}
              onBlur={handleInputBlur}
            />
          </div>
          <div>
            <InputField
              label="E mail"
              required
              type={"email"}
              placeholder="e mail"
              name={"email"}
              onChange={hanldeInputChange}
              error={errors.email}
              onBlur={handleInputBlur}
            />
          </div>
          <div className="flex gap-4 w-full">
            <SelectField
              label="Select Role"
              required
              options={roleOptions}
              name="role"
              value={userData.role}
              onChange={(e) => handleSelectChange(e)}
              error={errors.role}
            />
            <DatePickerField
              label="Date of Birth"
              required
              value={userData.dob}
              onChange={(value) => hanldeDateChange(value)}
              error={errors.dob}
            />
          </div>
          <div className="text-app-text-muted border border-app-border rounded-sm p-2">
            <div className="flex items-center text-sm gap-2 text-app-text-muted">
              <InfoOutlinedIcon fontSize="small" />A Password will be
              automatically generated as : FirstnameLastname@DOBYear
            </div>
            <p className="text-[12px] ml-7 text-app-text-muted">
              Example : GopiNadh@1997
            </p>
          </div>
        </div>
      </APPModal>
    </div>
  );
};

export default CreateUser;
