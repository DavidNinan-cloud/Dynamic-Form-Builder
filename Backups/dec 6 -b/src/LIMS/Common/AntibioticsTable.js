import React, { useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Tab,
  Tabs,
  Typography,
  Box,
  ListItem,
  ListItemText,
  Card,
  CardHeader,
  List,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const AntibioticsTable = (props) => {
  const [btnToggle, setBtnToggle] = React.useState();
  const {
    rows,
    onSubmit,
    organismId,
    authObj,
    setAuthObj,
    reportEntryDetails,
  } = props;

  let antibioticsArr = [];

  useEffect(() => {
    console.log("organismId", organismId);
    if (rows.length > 0) {
      rows.map((item) => {
        let myObj = {
          antiBioTicName: item.label,
          result: "",
          value: "",
        };
        antibioticsArr.push(myObj);
      });
      console.log("antibioticsArr", antibioticsArr);
    }
  }, [organismId]);

  const defaultValues = {
    antibioticDetails: antibioticsArr,
    organism: "",
  };

  const validationSchema = Yup.object().shape({
    antibioticDetails: Yup.array().of(
      Yup.object().shape({
        value: Yup.string().required("Value is required"),
        result: Yup.string().required("Result is required"),
      })
    ),
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    register,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues,
  });

  const { fields } = useFieldArray({
    control,
    name: "antibioticDetails",
  });

  let watchAntibiotics = watch("antibioticDetails");

  useEffect(() => {
    if (watchAntibiotics) {
      console.log("watchAntibiotics", watchAntibiotics);
    }
  }, [watchAntibiotics]);

  // const onSubmit = (data) => {
  //   console.log("data", data);
  // };

  return (
    <div className="flex flex-col">
      {rows.length > 0 && rows && (
        <fieldset
          disabled={
            reportEntryDetails &&
            reportEntryDetails?.authorizationLevel &&
            reportEntryDetails?.authorizationLevel === authObj.authLevel
              ? false
              : true
          }
        >
          <form>
            <TableContainer component={Paper} elevation={2}>
              <Table
                sx={{ height: "100%" }}
                aria-label="simple table"
                size="small"
              >
                <TableHead sx={{ backgroundColor: "lightgrey" }}>
                  <TableRow>
                    <TableCell>Antibiotics</TableCell>
                    <TableCell>Result</TableCell>
                    <TableCell>Values</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>
                        {" "}
                        <div key={index} className="my-2 w-28">
                          <input
                            type="hidden"
                            className="bg-white"
                            value={row.label}
                            name={`antibioticDetails.${index}.antiBioTicName`}
                            {...register(
                              `antibioticDetails.${index}.antiBioTicName`
                            )}
                          />
                          <input
                            type="hidden"
                            className="bg-white"
                            value={organismId}
                            name={`organism`}
                            {...register(`organism`)}
                          />
                          <span>{row.label}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div key={index} className="my-2 w-28">
                          <input
                            type="text"
                            className="border border-gray-300 rounded-sm w-28 p-1"
                            placeholder="Enter values"
                            name={`antibioticDetails.${index}.value`}
                            {...register(`antibioticDetails.${index}.value`)}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div key={index} className="my-2 w-28">
                          <input
                            type="text"
                            className="border border-gray-300 rounded-sm w-28 p-1"
                            placeholder="Enter values"
                            name={`antibioticDetails.${index}.result`}
                            {...register(`antibioticDetails.${index}.result`)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="h-[38px] px-3  bg-green-700 text-white rounded text-base font-medium"
            >
              Save
            </button> */}
              <div className="flex justify-end mr-1 mb-1">
                <button
                  className="h-10 mt-2 px-3 text-base font-medium  bg-customGreen text-white rounded"
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                >
                  Add
                </button>
                {/* <button type="button" onClick={() => reset({ defaultValues })}>
              Reset
            </button> */}
              </div>
            </TableContainer>

            {/* {submitAntibioticsArr && submitAntibioticsArr.length > 0 && (
            <TableContainer component={Paper} elevation={2}>
              <Table
                sx={{ height: "100%" }}
                aria-label="simple table"
                size="small"
              >
                <TableHead sx={{ backgroundColor: "lightgrey" }}>
                  <TableRow>
                    <TableCell>Antibiotics Name</TableCell>
                    <TableCell>Result</TableCell>
                    <TableCell>Values</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submitAntibioticsArr.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          {row.antiBioTicsList.map((item) => {
                            return (
                              <span className="border border-black rounded-sm p-0.5">
                                {item.antiBioTicName}
                              </span>
                            );
                          })}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          {row.antiBioTicsList.map((item) => {
                            return (
                              <span className="border border-black rounded-sm p-0.5">
                                {item.result}
                              </span>
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          {row.antiBioTicsList.map((item) => {
                            return (
                              <span className="border border-black rounded-sm p-0.5">
                                {item.value}
                              </span>
                            );
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )} */}
          </form>
        </fieldset>
      )}
    </div>
  );
};

export default AntibioticsTable;
