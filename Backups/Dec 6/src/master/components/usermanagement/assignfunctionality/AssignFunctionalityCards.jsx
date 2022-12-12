import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Switch,
} from "@mui/material";

import InputField from "../../../../Common Components/FormFields/InputField";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";

import { Checkbox, FormControlLabel, FormControl } from "@mui/material";
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
import { styled } from '@mui/material/styles';
import {Box} from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dashboard from './icons/Dashboard.png'
import { ElementsContext, ElementsContextProvider } from "./AssginContextApi";
import { useContext } from "react";
import useDidMountEffect from "../../../../Common Components/Custom Hooks/useDidMountEffect";
import RootFunctionalities from "./RootFunctionalites";
import CommonBackDrop from "../../../../Common Components/CommonBackDrop/CommonBackDrop";


export default function AssignFunctionalityCards() {
  
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
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
    setOpenBackdrop(true)
    console.log("finalData", finalData);
    mutate(finalData, {
      onSuccess: (data, variables, context) => {
        setOpenBackdrop(false)
        successAlert(data.data.body.message);
        console.log("data", data);
        console.log("variables", variables);
        console.log("context", context);
        handleReset();
        navigate(`/masters/usermanagement/employee`);
      },
      onError: (data, variables, context) => {
        setOpenBackdrop(false)
        errorAlert(data.message);
      },
      onSettled: () => {},
    });
  };
  const handleReset = () => {
    setTableData([]);
  };
const SetContextToRoot = () =>{

  const { contextData, setContextData } = useContext(ElementsContext)

  useEffect(()=>{
    console.log("contextData",contextData)
    setContextData(tableData)
  },[tableData])
  return(
    <>
        <RootFunctionalities tableData={tableData}/>
    </>
  )
}

  return (
    <div className="py-1 min-h-screen mt-14 px-4">
      <p className="text-center text-2xl ">
        <Typography variant="h4" sx={{ marginY: "2rem" }}>
          <p className=" tracking-wide">Assign Functionality</p>
        </Typography>
      </p>
      <div className="mx-auto my-4 min-h-screen">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={3} className='px-4 my-4'>
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
                        
                        setOpenBackdrop(true)
                        getFunctionalities(roleId).then((response) => {
                          setOpenBackdrop(false)
                          let result = response.data.result
                          console.log("Role Info", result);
                          setTableData(response.data.result);
                        })
                        .catch((response => {
                          setOpenBackdrop(false)
                        }));
                      },
                    }),
                  }}
                  isSearchable={false}
                />
              </Grid>

              <Box width="100%" />
          </Grid>

        <Grid container spacing={1} className=''>
          <Grid item lg={12} sm={12}>
            {tableData.length > 0 ? (
              <ElementsContextProvider>
                  <SetContextToRoot />
              </ElementsContextProvider>
            ) : (
            <div className="text-gray-500 font-bold text-center ">
                <h1 className="text-center">Please Select A Role</h1>
            </div>
            )
            }
          </Grid>
        </Grid> 
        {
          tableData.length > 0 ? (
            <div className="flex justify-center mt-8">
            <Button
                type="submit"
                variant="outlined"
                color="success"
                sx={{ marginRight: "1rem", border: "2px solid" }}
            >
                Submit
            </Button>
            </div>
        ) : ''}
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
    <CommonBackDrop openBackdrop={openBackdrop} setOpenBackdrop={setOpenBackdrop}/>
    </div>
    );
}
