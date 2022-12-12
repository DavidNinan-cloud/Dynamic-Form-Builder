import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import LoadingSpinner from "../../../../Common Components/loadingspinner/loadingSpinner";
import ConfirmationModal from "../../../../Common Components/ConfirmationModal";
import {
  errorAlert,
  successAlert,
  updateAlert,
} from "../../../../Common Components/Toasts/CustomToasts";
import AddButton from "../../../../Common Components/Buttons/AddButton";
import ViewAllButton from "../../../../Common Components/Buttons/ViewAllButton";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import InputField from "../../../../Common Components/FormFields/InputField";
import CommonTable from "../../common/CommonTable";
import { useState } from "react";
import { useContext } from "react";
import { VisitContext } from "../ClinicalCareChart";
import {
  getAllInput,
  getAllOutput,
  // getAllInputOutput,
  saveInputOutput,
} from "../../services/nursingServices/inputOutputService/InputOutputService";
import Output from "./Output";

const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: selectedColor,
  },
}));

const theme = createTheme({
  palette: {
    text: {
      primary: "#00ff00",
    },
  },
});

function InputOutput() {
  const [selected, setSelected] = React.useState(false); //button toggle
  const [count, setCount] = React.useState();
  const [spinner, showSpinner] = useState(false);
  const [openPost, setOpenPost] = React.useState(false);
  //state variable for showing or not showing "No Recrods Found" message
  const [recordWarning, showRecordWarning] = useState(false); // record error and sucess warnings
  const [inputDataResult, setInputDataResult] = useState([]); // populate table data
  const [inputData, setInputData] = React.useState({ result: [], actions: [] }); // for showing actions

  const [handleConfirmationModal, setHandleConfirmationModal] = React.useState(
    false
  ); // update/save ConfirmationMoaal
  const [inputFinalData, setInputFinalData] = React.useState(); //input Save final data

  // Context
  const patientVisitId = useContext(VisitContext);
  console.log("Visit Id in Com: " + patientVisitId);

  // toggle button
  const handleChanger = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    setSelected("input"); // toggle button
    inputPopulateTable(patientVisitId);
  }, [inputFinalData, patientVisitId]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  //the object to reset the form to blank values
  const defaultValues = {
    visitId: null,
    type: null,
    ivQuantity: null,
    iv: null,
    perJtQuantity: null,
    perJt: null,
    infusionsQuantity: null,
    infusions: null,
    inputOtherQuantity: null,
    inputOther: null,
    perOralQuantity: null,
    perOral: null,
    perRtQuantity: null,
    perRt: null,
    bolusesQuantity: null,
    boluses: null,
    inputPdHdQuantity: null,
    inputPdHd: null,
  };
  //populate the CommonTable using the function inputPopulateTable
  const inputPopulateTable = (obj) => {
    console.log("populateTable has been called");
    showSpinner(true);
    console.log("obj is", obj);
    showRecordWarning(false);
    getAllInput(obj)
      .then((response) => {
        console.log(
          "The search result is nitin" + JSON.stringify(response.data.result)
        );
        setCount(response.data.count);
        return response.data;
      })
      .then((res) => {
        console.log("The input for setData function is " + JSON.stringify(res));
        setInputData(res);
        setInputDataResult(res.result);
        showSpinner(false);
      })
      .catch(() => {
        showSpinner(false);
        showRecordWarning(true);
      });
  };

  //axios request for data post. That is post request
  function postInputData(obj) {
    console.log("The record having id " + obj + " is going to be deleted");
    saveInputOutput(obj)
      .then((response) => {
        console.log("POSTED OBJ of Pain Score assessment  IS " + response);
        if (response.data.statusCode === 200) {
          successAlert(response.data.message);
          inputPopulateTable(patientVisitId);
        }
      })
      .catch((error) => {
        console.log("circuler msg", error.message);
        errorAlert(error.message);
        console.log("error msg" + error.message);
      });
  }

  const onSubmitDataHandler = (data) => {
    console.log(data);
    if (patientVisitId !== null) {
      let postedObj = {
        type: "input",
        ivQuantity: data.ivQuantity,
        iv: data.iv,
        perJtQuantity: data.perJtQuantity,
        infusionsQuantity: data.infusionsQuantity,
        infusions: data.infusions,
        inputOtherQuantity: data.inputOtherQuantity,
        inputOther: data.inputOther,
        perOralQuantity: data.perOralQuantity,
        perOral: data.perOral,
        perRtQuantity: data.perRtQuantity,
        perRt: data.perRt,
        bolusesQuantity: data.bolusesQuantity,
        boluses: data.boluses,
        inputPdHdQuantity: data.inputPdHdQuantity,
        inputPdHd: data.inputPdHd,
        visitId: patientVisitId,
      };
      console.log("postObj" + postedObj);
      setOpenPost(true);
      setInputFinalData(postedObj); //final data
      reset(defaultValues);
      console.log("postedobj is" + postedObj);
    }
  };
  function addRecord() {
    console.log("A new record has been added");
    console.log("The value of openPost flag is ", openPost);
    setOpenPost(false);
    postInputData(inputFinalData); // post final data for inputData
  }
  return (
    <Box sx={{ width: "100%" }}>
      <div className="grid justify-center">
        <ThemeProvider theme={theme}>
          <ToggleButtonGroup
            value={selected}
            exclusive
            onChange={handleChanger}
          >
            <ToggleButton
              sx={{ height: "30px" }}
              selectedColor="#0B83A5"
              checked={selected === "input"}
              value="input"
            >
              Input
            </ToggleButton>
            <ToggleButton
              sx={{ height: "30px" }}
              selectedColor="#0B83A5"
              checked={selected === "output"}
              value="output"
            >
              Output
            </ToggleButton>
          </ToggleButtonGroup>
        </ThemeProvider>
      </div>

      <div className="w-full">
        <div>
          <div hidden={selected !== "input" ? true : false}>
            <div className="w-full">
              <div className="grid grid-cols-3 gap-2 w-full">
                <div className="col-span-3 w-full ">
                  {spinner ? (
                    <div className="grid justify-center">
                      <LoadingSpinner />
                    </div>
                  ) : null}
                  {inputData.hasOwnProperty("result") &&
                  inputData.result.length > 0 &&
                  inputData.statusCode === 200 &&
                  spinner === false ? (
                    <CommonTable
                      data={inputData}
                      count={count}
                      // editRow={editRow}
                      // setPatientInfo={setPatientInfo}
                      dataResult={inputDataResult}
                      setDataResult={setInputDataResult}
                    />
                  ) : null}
                  {recordWarning === true && spinner === false ? (
                    <div className="flex justify-center">
                      <h3 className="flex justify-center mt-20 font-bold text-gray-600">
                        No Records Found...
                      </h3>
                    </div>
                  ) : null}
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmitDataHandler)}>
                <div className="flex my-1">
                  <div className="grid grid-cols-4 gap-2 m-2 border-r-2 pr-4">
                    <InputField
                      name="ivQuantity"
                      type="number"
                      variant="outlined"
                      label="Qty"
                      control={control}
                    />
                    <div className="col-span-3">
                      <InputField
                        name="iv"
                        variant="outlined"
                        label="IV"
                        control={control}
                      />
                    </div>

                    <InputField
                      name="perJtQuantity"
                      type="number"
                      variant="outlined"
                      label="Qty"
                      control={control}
                    />
                    <div className="col-span-3">
                      <InputField
                        name="perJt"
                        variant="outlined"
                        label="Pre JT"
                        control={control}
                      />
                    </div>

                    <InputField
                      name="infusionsQuantity"
                      type="number"
                      variant="outlined"
                      label="Qty"
                      control={control}
                    />
                    <div className="col-span-3">
                      <InputField
                        name="infusions"
                        variant="outlined"
                        label="Infusions"
                        control={control}
                      />
                    </div>

                    <InputField
                      name="inputOtherQuantity"
                      type="number"
                      variant="outlined"
                      label="Qty"
                      control={control}
                    />
                    <div className="col-span-3">
                      <InputField
                        name="inputOther"
                        variant="outlined"
                        label="Other"
                        control={control}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 m-2">
                    <InputField
                      name="perOralQuantity"
                      type="number"
                      variant="outlined"
                      label="Qty"
                      control={control}
                    />
                    <div className="col-span-3">
                      <InputField
                        name="perOral"
                        variant="outlined"
                        label="Pre Oral"
                        control={control}
                      />
                    </div>

                    <InputField
                      name="perRtQuantity"
                      type="number"
                      variant="outlined"
                      label="Qty"
                      control={control}
                    />
                    <div className="col-span-3">
                      <InputField
                        name="perRt"
                        variant="outlined"
                        label="Pre RT"
                        control={control}
                      />
                    </div>

                    <InputField
                      name="bolusesQuantity"
                      type="number"
                      variant="outlined"
                      label="Qty"
                      control={control}
                    />
                    <div className="col-span-3">
                      <InputField
                        name="boluses"
                        variant="outlined"
                        label="Boluses"
                        control={control}
                      />
                    </div>

                    <InputField
                      name="inputPdHdQuantity"
                      type="number"
                      variant="outlined"
                      label="Qty"
                      control={control}
                    />
                    <div className="col-span-3">
                      <InputField
                        name="inputPdHd"
                        variant="outlined"
                        label="PD/HD"
                        control={control}
                      />
                    </div>
                  </div>
                </div>
                <div className=" flex gap-2 justify-end pb-2">
                  <ViewAllButton />
                  <AddButton />
                </div>
              </form>
            </div>
          </div>

          <div hidden={selected !== "output" ? true : false}>
            {/* outpu component */}
            <Output />
          </div>
        </div>
        <ConfirmationModal
          confirmationOpen={openPost}
          confirmationHandleClose={setOpenPost}
          confirmationSubmitFunc={addRecord}
          confirmationLabel="Confirmation"
          confirmationMsg="Are you sure want to add this record ?"
          confirmationButtonMsg="Add"
        />
      </div>
    </Box>
  );
}

export default InputOutput;
