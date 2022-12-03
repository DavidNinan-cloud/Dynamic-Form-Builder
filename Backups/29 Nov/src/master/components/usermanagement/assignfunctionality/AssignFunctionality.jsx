import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";

import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";

import { Checkbox, FormControlLabel, FormControl, Card } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Controller } from "react-hook-form";

import {
  getFunctionalities,
  getRoleDropdown,
  registerAppointmentFunctionality,
} from "../services/assignfunctionalityServices/AssignFunctionalityServices";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  warningAlert,
  successAlert,
  errorAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import { useNavigate, Navigate } from "react-router-dom";

import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
// import { SubmitButton } from "../../../../Common Components/Buttons/CommonButtons";
import SubmitButton from "../../../../Common Components/Buttons/SubmitButton";

export default function AssignFunctionality() {
  const methods = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    // defaultValues,
  });
  const {
    watch,
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
    control,
    setValue,
    clearErrors,
  } = methods;

  const navigate = useNavigate();
  const { isSuccess, isError, mutate } = useMutation(
    registerAppointmentFunctionality
  );

  const [tableData, setTableData] = useState([]);
  const [roleDropdown, setRoleDropdown] = useState();

  const [finalData, setFinalData] = useState();

  const [openChild, setOpenChild] = React.useState(false);
  const handelOpenChild = () => setOpenChild(true);
  const handleCloseChild = () => {
    if (openChild) {
      setOpenChild(false);
    }
  };

  useEffect(() => {
    getRoleDropdown()
      .then((response) => response.data)
      .then((res) => {
        console.log("prefixes", res.result);
        setRoleDropdown(res.result);
      });
  }, []);

  const [expandPanal, setExpandPanal] = useState([]);
  const calculateExpandArray = (tableArray) => {
    // console.log(tableArray.length)
    let expandData = [...expandPanal];
    for (let i = 0; i < tableArray.length; i++) {
      expandData[i] = false;
    }
    console.log("expand Data", expandData);
    setExpandPanal(expandData);
  };

  const onSubmit = (data) => {
    console.log(data);
    let finalDataObj = {};
    finalDataObj.role = { id: parseInt(data.selectRole.value) };

    finalDataObj.functionalities = tableData;
    console.log("finalData", finalDataObj);
    setFinalData(finalDataObj);
    handelOpenChild();
  };

  const postDataFinal = () => {
    handleCloseChild();
    console.log("finalData", finalData);
    mutate(finalData, {
      onSuccess: (data, variables, context) => {
        successAlert(data.data.body.message);
        console.log("data", data);
        console.log("variables", variables);
        console.log("context", context);
        handleReset();
        navigate(`/masters/usermanagement/employee`);
      },
      onError: (data, variables, context) => {
        errorAlert(data.message);
      },
      onSettled: () => {},
    });
  };
  const handleReset = () => {
    setTableData([]);
  };

const ChildrenOfTheForest = ({indexArr,
    dataArr,}) => {
    return (
    <div>
        {dataArr.subFunction && dataArr.subFunction.map((subSubRow, subSubIndex) => {
        return (
                <div key={subSubIndex} className={subSubRow.permissions ? "ml-10 flex flex-row w-full":"ml-10 flex flex-wrap"} >
                    <div className={subSubRow.permissions ?"w-5/12 ml-10":"w-full ml-10"}>
                    <FormControl
                        sx={{ marginLeft: "5rem" }}
                >
                <Controller
                    render={({ field }) => (
                    <FormControlLabel
                    label={
                        subSubRow.functionality
                        }
                    control={
                        <Checkbox
                            checked={
                                subSubRow.isChecked
                            }
                            defaultChecked={
                                subSubRow.isChecked
                            }
                        onChange={(e) => {
                            let value = e.target.checked;
                            let arr = [...indexArr,subSubIndex]
                            dynamicSubFunc(value,arr)
                            }}
                        />
                            }
                            {...field}
                            type="checkbox"
                            sx={{
                                "& .MuiSvgIcon-root":
                                { fontSize: 20 },
                            }}
                            className="w-full items-center pl-20 md:pl-0 text-gray-800 font-bold tracking-wider mr-2"
                        />
                        )}
                        name={`module[${subSubIndex}].${subSubIndex.functionality}`}
                        control={control}
                        defaultValue={
                            subSubRow.isChecked
                        }
                    />
                    </FormControl>
                    </div>

                    {/* sub sub function */}
                    {subSubRow.subFunction ? (
                        <ChildrenOfTheForest 
                            indexArr={[...indexArr,subSubIndex]}
                            dataArr={subSubRow}
                        />
                    ):""}

                    {/* sub sub permission */}
                    {subSubRow.permissions ? (
                        <div className="w-8/12 mx-auto">
                            <PermissionOfChildrenOfTheForest 
                                indexArr={[...indexArr,subSubIndex]}
                                dataArr={subSubRow}
                            />
                        </div>
                    ):""}
                </div>
        );
    }
    )}
    </div>
    )
}

const PermissionOfChildrenOfTheForest = ({indexArr, dataArr,}) => {
        return (
            <div className="grid grid-cols-4 w-full mx-auto">
                {dataArr.permissions && dataArr.permissions.map((SubpermissionRow,SubpermissionIndex) => {
                    return (
                        <div
                            key={
                                SubpermissionIndex
                            }
                            className="ml-10 "
                        >
                            <FormControl
                                sx={{
                                    marginLeft: {
                                    sm: "7.5rem",
                                    lg: "0rem",
                                },
                                }}
                            >
                            <Controller
                                render={({
                                    field,
                                }) => (
                                <FormControlLabel
                                    label={
                                        SubpermissionRow.permission
                                    }
                                    control={
                                    <Checkbox
                                        checked={
                                            SubpermissionRow.isChecked
                                        }
                                        defaultChecked={
                                            SubpermissionRow.isChecked
                                        }
                                        onChange={(e) => {
                                            let value =e.target.checked;
                                            console.log("value",value);
                                            let arr = [...indexArr,SubpermissionIndex]
                                            setPermissionParents(value,arr)
                                            }}
                                        />
                                    }
                                    {...field}
                                    type="checkbox"
                                    sx={{
                                            "& .MuiSvgIcon-root":
                                        {
                                            fontSize: 20,
                                        },
                                    }}
                                    className="w-full items-center pl-20 md:pl-0 text-gray-800 font-bold tracking-wider mr-2"
                                />
                                )}
                                name={`module[${SubpermissionIndex}]`}
                                control={control}
                                defaultValue={SubpermissionRow.isChecked}
                            />
                            </FormControl>
                        </div>
                    );
                    }
                )}
            </div>
        )
}

// for permissions
const setPermissionParents = (value,indexArr) => {
  console.log("value",value)
  console.log("indexArr",indexArr)
  let arr = [...tableData]

  if(value){
    arr = seekPermissionParents(arr,indexArr,value)
  }else {
      arr = setPermissionParentFalse(arr,indexArr,value)
  }
  console.log("arr",arr)
  setTableData(arr)
}
// true
const seekPermissionParents = (arr,indexArr,value) => {
  arr[indexArr[0]].isChecked = value
  let depth = indexArr.length - 1
  console.log("depth",depth)
    if(depth ==  1){
    arr[indexArr[0]].permissions[indexArr[1]].isChecked = value
    }else if(depth == 2){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].permissions[indexArr[2]].isChecked = value
    }else if(depth == 3){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].permissions[indexArr[3]].isChecked = value
    }else if(depth == 4){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].permissions[indexArr[4]].isChecked = value
  
  }else if(depth == 5){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].permissions[indexArr[5]].isChecked = value
  
  }else if(depth == 6){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].permissions[indexArr[6]].isChecked = value
  
  }else if(depth == 7){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
  
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
  
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].permissions[indexArr[6]].permissions[indexArr[7]].isChecked = value
  
  }else if(depth == 8){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
  
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
  
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].isChecked = value
  
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]].permissions[indexArr[8]].isChecked = value
  
  }else {
    console.log("grand parent called",arr[indexArr[0]])
  }
  
  return arr;
}
// false
const setPermissionParentFalse = (arr,indexArr,value) => {
  console.log("value",value)
  console.log("indexArr",indexArr)

  
  let depth = indexArr.length - 1
  console.log("depth permission",depth)
  if(depth == 1){
    arr[indexArr[0]].permissions[indexArr[1]].isChecked = value
    arr[indexArr[0]] = checkAllPermissionsFalse(arr[indexArr[0]])
    // different scenario
  }else if(depth == 2){
    arr[indexArr[0]].subFunction[indexArr[1]].permissions[indexArr[2]].isChecked = value
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 3){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].permissions[indexArr[3]].isChecked = value
    
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])

  }else if(depth == 4){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].permissions[indexArr[4]].isChecked = value

  // set parents false
  arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
  arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
  arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
  arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 5){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].permissions[indexArr[5]].isChecked = value
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 6){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].permissions[indexArr[6]].isChecked = value
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  
  }else if(depth == 7){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].permissions[indexArr[7]].isChecked = value
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  
  }else if(depth == 8){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]].permissions[indexArr[8]].isChecked = value
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }
  
  return arr
}

const checkAllPermissionsFalse = (parentArr) => {
  let subArr = parentArr.permissions

  let falseTotal = 0
  for (let i = 0;i<subArr.length;i++){
    if(!subArr[i].isChecked){
      falseTotal += 1
    }
  }
  if(falseTotal == subArr.length){
    parentArr.isChecked = false
  }
  // then

  return parentArr
}
// subfunctions *
const dynamicSubFunc = (value,indexArr) => {
    console.log("funnc value",value);
    console.log("funnc indexArr",indexArr);
    let arr = [...tableData]

    // true
    if(value){
        arr = seekParents(arr,indexArr,value)
    }else {
        arr = setAllChildrenFalse(arr,indexArr,value)
    }
    // false

    console.log("arr",arr)
    setTableData(arr)
}

// for false
// for all Children
const setAllChildrenFalse = (arr,indexArr,value) =>{
  
  let depth = indexArr.length
  console.log("depth",depth)
  if(depth == 1){
    arr[indexArr[0]].isChecked = value
    arr[indexArr[0]] = seekChildren(arr[indexArr[0]],value)
  }else if(depth == 2){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]],value)

    // set parents false
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 3){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]],value)
    
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 4){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]],value)

  // set parents false
  arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
  arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
  arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 5){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]],value)
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 6){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]],value)
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  
  }else if(depth == 7){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]],value)
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  
  }else if(depth == 8){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]],value)
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }
  
  return arr;
}

const setParentsFalse = (parentArr) => {
  let subArr = parentArr.subFunction

  let falseTotal = 0
  for (let i = 0;i<subArr.length;i++){
    if(!subArr[i].isChecked){
      falseTotal += 1
    }
  }
  if(falseTotal == subArr.length){
    parentArr.isChecked = false
  }
  // then

  return parentArr
}
// for true
const seekParents = (arr,indexArr,value) =>{
    arr[indexArr[0]].isChecked = value
    let depth = indexArr.length
    console.log("depth",depth)
    if(depth == 2){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]],value)
    }else if(depth == 3){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
      // 
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]],value)
    }else if(depth == 4){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]],value)
    
    }else if(depth == 5){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]],value)
    
    }else if(depth == 6){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]],value)
    
    }else if(depth == 7){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
    
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
    
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]],value)
    
    }else if(depth == 8){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
    
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
    
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].isChecked = value
    
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]],value)
    
    }else {
      console.log("grand parent called",arr[indexArr[0]])
      arr[indexArr[0]] = seekChildren(arr[indexArr[0]],value)
    }
    
    return arr;
}
const seekChildren = (arrChild,value) =>{
  if(arrChild.subFunction){
    let childSubFunc = arrChild.subFunction
    for (let i = 0; i<childSubFunc.length;i++){
      childSubFunc[i].isChecked = value;
      if (childSubFunc[i].subFunction){
        childSubFunc[i].subFunction = setChildren(childSubFunc[i].subFunction,value)
      }
      else if(childSubFunc[i].permissions){
        let childSubPermissions = childSubFunc[i].permissions
        for (let k = 0; k<childSubPermissions.length;k++){
          childSubPermissions[k].isChecked = value;
        }
        childSubFunc[i].permissions = childSubPermissions
      }
    }
    arrChild.subFunction = childSubFunc
  }else if(arrChild.permissions){
    let childSubPermissions = arrChild.permissions
    for (let i = 0; i<childSubPermissions.length;i++){
      childSubPermissions[i].isChecked = value;
    }
    arrChild.permissions = childSubPermissions
  }

  return arrChild
}

const setChildren = (childArr,value) => {
  for(let j = 0; j<childArr.length;j++){
    childArr[j].isChecked = value
    if(childArr[j].subFunction){
      childArr[j].subFunction = setChildren(childArr[j].subFunction,value)
    }
    // else 
    if(childArr[j].permissions){
      childArr[j].permissions = setPermissions(childArr[j].permissions,value)
    } 
    // else {
    //   return childArr
    // }
  }
  return childArr
}

const setPermissions = (childPermission,value) => {
  for (let i = 0; i<childPermission.length;i++){
    childPermission[i].isChecked = value;
  }
  return childPermission
}


  return (
    <div className="py-1 min-h-screen mt-14 px-8">
      <p className="text-center text-2xl ">
        <Typography variant="h4" sx={{ marginY: "2rem" }}>
          <p className=" tracking-wide">Assign Functionality</p>
        </Typography>
      </p>
      <div className="mx-auto my-4 bg-white min-h-screen px-4">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* /// Select Role /// */}
            <Grid item lg={4} sm={4} sx={{ marginLeft: "1.25rem" }}>
              <DropdownField
                control={control}
                error={errors.employeeType}
                name="selectRole"
                dataArray={roleDropdown}
                placeholder="Select Role"
                inputRef={{
                  ...register("selectRole", {
                    onChange: (e) => {
                      console.log(e);
                      let roleId = e.target.value.value;
                      getFunctionalities(roleId).then((response) => {
                        console.log("Role Info", response.data.result);
                        setTableData(response.data.result);
                        calculateExpandArray(response.data.result);
                      });
                    },
                  }),
                }}
                isSearchable={false}
              />
            </Grid>

            <Box width="100%" />
          </Grid>

          <Grid item lg={12} sm={12}>
            {tableData.length > 0 ? (
              <div className="mt-4 mx-5">
                {tableData.map((row, index) => {
                  return (
                    <div key={index} className="py-2">
                      <Accordion
                        expanded={expandPanal[index]}
                        onChange={() => {
                          if (row.subFunction) {
                            let expandData = [...expandPanal];
                            console.log("expandPanal", expandPanal);
                            expandData[index] = !expandData[index];
                            console.log("expandData", expandData);
                            setExpandPanal(expandData);
                          } 
                        }}
                        TransitionProps={{
                          timeout: 0
                        }}
                        elevation={6}
                      >
                        <AccordionSummary
                          expandIcon={row.subFunction ? <ExpandMoreIcon /> : ""}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                          sx={{
                            "&.Mui-expanded": {
                              marginBottom: "-1rem",
                            },
                            "& .MuiAccordionSummary-content.Mui-expanded": {
                              margin: 0,
                            },
                          }}
                        >
                          <FormControl>
                            <Controller
                              render={({ field }) => (
                                <FormControlLabel
                                  label={
                                    <Typography variant="h6">
                                      <p className=" tracking-wide font-bold">
                                        {row.functionality}
                                      </p>
                                    </Typography>
                                  }
                                  control={
                                    <Checkbox
                                      checked={row.isChecked}
                                      defaultChecked={row.isChecked}
                                      onChange={(e) => {
                                        let value = e.target.checked;
                                        console.log("value", value);
                                        let arr = [index]
                                        dynamicSubFunc(value,arr)
                                        // set Grandparent Values
                                        // setGrandParentValues(value, index);
                                      }}
                                    />
                                  }
                                  {...field}
                                  type="checkbox"
                                  sx={{
                                    "& .MuiSvgIcon-root": {
                                      fontSize: 20,
                                      color: "black",
                                    },
                                    color: "black",
                                  }}
                                  className="w-full items-center pl-5 text-2xl font-bold tracking-wider mr-2"
                                />
                              )}
                              sx={{ fontSize: 20, color: "black" }}
                              name={`module[${index}].${row.functionality}`}
                              control={control}
                              defaultValue={row.isChecked}
                            />
                          </FormControl>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* What I Want */}
                                {
                                    row.subFunction ? (
                                        <ChildrenOfTheForest //has children
                                            indexArr={[index]}
                                            dataArr={row}
                                        />
                                    ):(
                                    <> 
                                    {/* has permission ? then map */}
                                        {row.permissions &&
                                            row.permissions.map(
                                              (
                                                permissionRow,
                                                permissionIndex
                                              ) => {
                                                return (
                                                  <div
                                                    key={permissionIndex}
                                                    className="ml-10 "
                                                  >
                                                    <FormControl>
                                                      <Controller
                                                        render={({ field }) => (
                                                          <FormControlLabel
                                                            label={
                                                              permissionRow.permission
                                                            }
                                                            control={
                                                              <Checkbox
                                                                checked={
                                                                  permissionRow.isChecked
                                                                }
                                                                defaultChecked={
                                                                  permissionRow.isChecked
                                                                }
                                                                onChange={(e) => {
                                                                  let value =
                                                                    e.target
                                                                      .checked;
                                                                  console.log(
                                                                    "value",
                                                                    value
                                                                  );
                                                                  // function yet to write
                                                                //   setPermissionValues(
                                                                //     value,
                                                                //     permissionIndex,
                                                                //     index
                                                                //   );
                                                                }}
                                                              />
                                                            }
                                                            {...field}
                                                            type="checkbox"
                                                            sx={{
                                                              "& .MuiSvgIcon-root":
                                                                { fontSize: 20 },
                                                            }}
                                                            className="w-full items-center pl-20 md:pl-0 text-gray-800 font-bold tracking-wider mr-2"
                                                          />
                                                        )}
                                                        name={`module[${index}].${index.functionality}`}
                                                        control={control}
                                                        defaultValue={
                                                          permissionRow.isChecked
                                                        }
                                                      />
                                                    </FormControl>
                                                  </div>
                                                );
                                              }
                                            )}
                                    </>
                                    )
                                }
                        </AccordionDetails>
                        </Accordion>
                    </div>
                    );
                })}
                {/* </Card> */}
                </div>
            ) : (
            <div className="text-gray-500 font-bold text-center ">
                <h1 className="text-center">Please Select A Role</h1>
            </div>
            )}
        </Grid>

        {tableData.length > 0 ? (
            <div className="flex justify-center mt-8">
                <SubmitButton />
            </div>
        ) : (
            ""
        )}
        </form>
    </div>

    <ConfirmationModal
        confirmationOpen={openChild}
        confirmationHandleClose={handleCloseChild}
        confirmationSubmitFunc={(e) => {
        postDataFinal();
        }}
        confirmationLabel="Confirmation "
        confirmationMsg="Click on Proceed to Employee List ?"
        confirmationButtonMsg="Proceed"
    />
    </div>
    );
}
