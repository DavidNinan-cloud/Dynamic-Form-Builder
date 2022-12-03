import React, { useState } from "react";
import {
  Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Modal,
    TextField,
  } from "@mui/material";
  import Box from "@mui/material/Box";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableContainer from "@mui/material/TableContainer";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import Paper from "@mui/material/Paper";
  import { useForm } from "react-hook-form";
  import { styled } from "@mui/material/styles";
  import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import SchedualingModal from "./SchedualingModal";
import useDidMountEffect from "../../../../../Common Components/Custom Hooks/useDidMountEffect";
import { useEffect } from "react";



  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      background: "#F1F1F1",
      position: "sticky",
      top: "0px",
      left: "0px",
      zIndex: 50,
    },
  }));
  const BookedTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      background: "#5050A3",
      color:'#FFFFFF',
      border : 0
    },
  }));
  const ActiveTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      background: "#FCA540",
      color:'#FFFFFF',
      border : 0
    },
  }));
  
const schedualData = [
  {
    "id": 30,
    "date": "01/02/2022",
    "TableDetails": [
      {
        "label": "Table 1",
        "timeSlots": [
          { 
            "timeHour" : 10,
            "label": "10:00 AM to 11:00 AM",
            "isBooked": false,
            "timeslotId": 1,
            "fromId": null,
            "toId": null,
            "fromTimeHour": null,
            "toTimeHour": null
          },
          {
            "timeHour" : 11,
            "label": "11:00 AM to 12:00 PM",
            "isBooked": true,
            "bookingDetails":"215422, Abhinav Sandip Patil, Abdominal aorta +Renal Arterise, ASD Clouser Surgery, Dr.Suyash Patil",
            "timeslotId": 2,
            "fromId": 2,
            "toId": 4,
            "fromTimeHour": 11,
            "toTimeHour": 13
          },
          {
            "timeHour" : 12,
            "label": "12:00 PM to 1:00 PM",
            "isBooked": true,
            "bookingDetails":"215422, Abhinav Sandip Patil, Abdominal aorta +Renal Arterise, ASD Clouser Surgery, Dr.Suyash Patil",
            "timeslotId": 3,
            "fromId": 2,
            "toId": 4,
            "fromTimeHour": 11,
            "toTimeHour": 13
          },
          {
            "timeHour" : 13,
            "label": "1:00 PM to 2:00 PM",
            "isBooked": true,
            "bookingDetails":"215422, Abhinav Sandip Patil, Abdominal aorta +Renal Arterise, ASD Clouser Surgery, Dr.Suyash Patil",
            "timeslotId": 4,
            "fromId": 2,
            "toId": 4,
            "fromTimeHour": 11,
            "toTimeHour": 13
          }
        ]
      },
      {
          "label": "Table 2",
          "timeSlots": [
            {
              "timeHour" : 10,
              "label": "10:00 AM to 11:00 AM",
              "isBooked": false,
              "timeslotId": 1,
              "fromId": null,
              "toId": null,
            "fromTimeHour": null,
            "toTimeHour": null
            },
            {
              "timeHour" : 11,
              "label": "11:00 AM to 12:00 PM",
              "isBooked": false,
              "timeslotId": 2,
              "fromId": null,
              "toId": null,
            "fromTimeHour": null,
            "toTimeHour": null
            },
            {
              "timeHour" : 12,
              "label": "12:00 PM to 12:00 PM",
              "isBooked": false,
              "timeslotId": 3,
              "fromId": null,
              "toId": null
            },
          {
            "timeHour" : 13,
            "label": "1:00 PM to 2:00 PM",
            "isBooked": false,
            "timeslotId": 4,
            "fromId": null,
            "toId": null,
            "fromTimeHour": null,
            "toTimeHour": null
          }
          ]
        }
    ]
  },
  {
    "id": 30,
    "date": "02/02/2022",
    "TableDetails": [
      {
        "label": "Table 1",
        "timeSlots": [
          { 
            "timeHour" : 10,
            "label": "10:00 AM to 11:00 AM",
            "isBooked": false,
            "timeslotId": 1,
            "fromId": null,
            "toId": null,
            "fromTimeHour": null,
            "toTimeHour": null
          },
          {
            "timeHour" : 11,
            "label": "11:00 AM to 12:00 PM",
            "isBooked": true,
            "bookingDetails":"215422, Abhinav Sandip Patil, Abdominal aorta +Renal Arterise, ASD Clouser Surgery, Dr.Suyash Patil",
            "timeslotId": 2,
            "fromId": 2,
            "toId": 4,
            "fromTimeHour": 11,
            "toTimeHour": 13
          },
          {
            "timeHour" : 12,
            "label": "12:00 PM to 1:00 PM",
            "isBooked": true,
            "bookingDetails":"215422, Abhinav Sandip Patil, Abdominal aorta +Renal Arterise, ASD Clouser Surgery, Dr.Suyash Patil",
            "timeslotId": 3,
            "fromId": 2,
            "toId": 4,
            "fromTimeHour": 11,
            "toTimeHour": 13
          },
          {
            "timeHour" : 13,
            "label": "1:00 PM to 2:00 PM",
            "isBooked": true,
            "bookingDetails":"215422, Abhinav Sandip Patil, Abdominal aorta +Renal Arterise, ASD Clouser Surgery, Dr.Suyash Patil",
            "timeslotId": 4,
            "fromId": 2,
            "toId": 4,
            "fromTimeHour": 11,
            "toTimeHour": 13
          }
        ]
      },
      {
          "label": "Table 2",
          "timeSlots": [
            {
              "timeHour" : 10,
              "label": "10:00 AM to 11:00 AM",
              "isBooked": false,
              "timeslotId": 1,
              "fromId": null,
              "toId": null,
            "fromTimeHour": null,
            "toTimeHour": null
            },
            {
              "timeHour" : 11,
              "label": "11:00 AM to 12:00 PM",
              "isBooked": false,
              "timeslotId": 2,
              "fromId": null,
              "toId": null,
            "fromTimeHour": null,
            "toTimeHour": null
            },
            {
              "timeHour" : 12,
              "label": "12:00 PM to 12:00 PM",
              "isBooked": false,
              "timeslotId": 3,
              "fromId": null,
              "toId": null
            },
          {
            "timeHour" : 13,
            "label": "1:00 PM to 2:00 PM",
            "isBooked": false,
            "timeslotId": 4,
            "fromId": null,
            "toId": null,
            "fromTimeHour": null,
            "toTimeHour": null
          }
          ]
        }
    ]
  },
  {
    "id": 30,
    "date": "03/02/2022",
    "TableDetails": [
      {
        "label": "Table 1",
        "timeSlots": [
          { 
            "timeHour" : 10,
            "label": "10:00 AM to 11:00 AM",
            "isBooked": false,
            "timeslotId": 1,
            "fromId": null,
            "toId": null,
            "fromTimeHour": null,
            "toTimeHour": null
          },
          {
            "timeHour" : 11,
            "label": "11:00 AM to 12:00 PM",
            "isBooked": true,
            "bookingDetails":"215422, Abhinav Sandip Patil, Abdominal aorta +Renal Arterise, ASD Clouser Surgery, Dr.Suyash Patil",
            "timeslotId": 2,
            "fromId": 2,
            "toId": 4,
            "fromTimeHour": 11,
            "toTimeHour": 13
          },
          {
            "timeHour" : 12,
            "label": "12:00 PM to 1:00 PM",
            "isBooked": true,
            "bookingDetails":"215422, Abhinav Sandip Patil, Abdominal aorta +Renal Arterise, ASD Clouser Surgery, Dr.Suyash Patil",
            "timeslotId": 3,
            "fromId": 2,
            "toId": 4,
            "fromTimeHour": 11,
            "toTimeHour": 13
          },
          {
            "timeHour" : 13,
            "label": "1:00 PM to 2:00 PM",
            "isBooked": true,
            "bookingDetails":"215422, Abhinav Sandip Patil, Abdominal aorta +Renal Arterise, ASD Clouser Surgery, Dr.Suyash Patil",
            "timeslotId": 4,
            "fromId": 2,
            "toId": 4,
            "fromTimeHour": 11,
            "toTimeHour": 13
          }
        ]
      },
      {
          "label": "Table 2",
          "timeSlots": [
            {
              "timeHour" : 10,
              "label": "10:00 AM to 11:00 AM",
              "isBooked": false,
              "timeslotId": 1,
              "fromId": null,
              "toId": null,
            "fromTimeHour": null,
            "toTimeHour": null
            },
            {
              "timeHour" : 11,
              "label": "11:00 AM to 12:00 PM",
              "isBooked": false,
              "timeslotId": 2,
              "fromId": null,
              "toId": null,
            "fromTimeHour": null,
            "toTimeHour": null
            },
            {
              "timeHour" : 12,
              "label": "12:00 PM to 12:00 PM",
              "isBooked": false,
              "timeslotId": 3,
              "fromId": null,
              "toId": null
            },
          {
            "timeHour" : 13,
            "label": "1:00 PM to 2:00 PM",
            "isBooked": false,
            "timeslotId": 4,
            "fromId": null,
            "toId": null,
            "fromTimeHour": null,
            "toTimeHour": null
          }
          ]
        }
    ]
  }
]
const timeSlots = [
  {
    "timeslotId": 1,
    "timeDisplay": "10:00 AM",
    "timeHour":10
  },{
    "timeslotId": 2,
    "timeDisplay": "11:00 AM",
    "timeHour":11
  },{
    "timeslotId": 3,
    "timeDisplay": "12:00 PM",
    "timeHour":12
  },{
    "timeslotId": 4,
    "timeDisplay": "01:00 PM",
    "timeHour":13
  }
]


export default function OTSchedualing({}){

    const [tableData,setTableData] = useState([])
    useEffect(()=>{
      setTableData(schedualData)
    },[schedualData])
    const [open,setOpen]=useState(false)
    const handleOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}
    const removeHeaders = (headers, fieldToRemove) => {
        return headers.filter((v) => {
          return !fieldToRemove.includes(v);
        });
      };
    
      //set rows object to table
      // const allHeaders = Object.keys(
      //   DrugAdministratorDetailsData.result[0].PatientDrugDetails[0]
      // );
    
      // const headers = removeHeaders(allHeaders, ["Id"]);

    
      const setHeader = (arr) => {
        let headerArr = []
        for(let obj of arr){
            headerArr.push(obj.timeDisplay)
        }
        return headerArr
      }
      const timeSlotHeader = setHeader(timeSlots)

      const [allTimeArr,setAllTimeArr] = useState([])
      const [indexArr,setIndexArr] = useState([])
      const [availableTime,setAvailableTime] = useState([])
      useDidMountEffect(()=>{
      },[availableTime])


      const [selectedSlots,setSelectedSlots] = useState(null)
      const onSubmit = (data) => {
        let finalObj = {
          innerIndex:indexArr[0],
          innerTablesIndex:indexArr[1],
          innerTimeSlotIndex:indexArr[2],
          fromTime:data.fromTime,
          toTime:data.toTime,
        }
        setSelectedSlots(finalObj)
        console.log("finalObj",finalObj)

        handleClose()
      }
    return(
        <>
        {/* table */}
        {
          tableData.length > 0 ? (
            
        <div className="mt-2 bg-white ">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%", my: 2, display: "flex" }}>
            <TableContainer
              sx={{
                "&::-webkit-scrollbar": {
                  width: 7,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#7393B3",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "lightBlue",
                },
              }}
              className="rounded  border-gray-300 py-2"
            >
              <Table
                size="small"
                stickyHeader
                aria-label="sticky table"
              >
                <TableBody>
                  <TableRow>
                    <StyledTableCell className="whitespace-nowrap border border-gray-300"  sx={{width:'4rem'}}>
                      <span className="text-gray-600 font-semibold">
                        Date
                      </span>
                    </StyledTableCell>
                    {tableData.map(
                      (row, index) => {
                        return (
                          <TableCell
                            key={index}
                            className="whitespace-nowrap border border-gray-300 "
                            sx={{ background: "#F1F1F1"}}
                            colSpan={row.TableDetails.length}
                            align="justify"
                          >
                            <div className="flex justify-center text-gray-700 font-semibold">
                              {row.date}
                            </div>
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                  <TableRow>
                    <StyledTableCell className="whitespace-nowrap border border-gray-300">
                      <span className="text-gray-600 font-semibold">
                        Sch. Time
                      </span>
                    </StyledTableCell>
                    {tableData.map(
                      (row, index) => {
                        return (
                          <>
                          {row.TableDetails.map(
                          (innerRow, innerIndex) => {
                              // console.log("innerRow",innerRow)
                          return (
                          <TableCell
                            key={innerIndex}
                            className="whitespace-nowrap border border-gray-300 "
                            sx={{ background: "#F1F1F1",width:"2rem" }}
                            align="justify"
                          >
                            <div className="flex justify-center text-gray-700 font-semibold">
                              {innerRow.label}
                            </div>
                          </TableCell>
                        );
                      }
                    )}
                          </>
                          
                        );
                      }
                    )}
                  </TableRow>
                  {timeSlots &&
                    timeSlots.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="whitespace-nowrap border border-gray-300">
                          <span className="text-gray-600 font-semibold">
                            {row.timeDisplay}
                          </span>
                        </TableCell>
                        {tableData.map(
                              (innerRow, innerIndex) => {
                              return (
                                  <>
                                  {innerRow.TableDetails.map((innerTablesRow, innerTablesIndex) => {
                                      // console.log("innerTablesRow",innerTablesRow)
                                  return (
                                  <>
                                  {innerTablesRow.timeSlots.map((innerTimeSlotRow, innerTimeSlotIndex) => {
                                      console.log("innerTimeSlotRow",innerTimeSlotRow)
                                  return (
                                      <>
                          
                                      <>
                                      {
                                          innerTimeSlotRow.timeslotId == row.timeslotId ? (
                                              <>
                                              {       
                                            indexArr.length > 0 && selectedSlots !== null && innerIndex == selectedSlots.innerIndex && innerTablesIndex == selectedSlots.innerTablesIndex && innerTimeSlotRow.timeHour >= selectedSlots.fromTime.timeHour && innerTimeSlotRow.timeHour <= selectedSlots.toTime.timeHour  ?
                                            (<>
                                            <ActiveTableCell
                                                    key={innerTimeSlotIndex}
                                                    className=""
                                                    // align="justify"
                                                    //&& innerTimeSlotRow.timeHour <= selectedSlots.toTime.timeHour
                                                    // rowSpan={selectedSlots.toTime.timeHour - selectedSlots.fromTime.timeHour + 1}
                                                    
                                                >
                                                    {/* BookedTableCell */}
                                                    <div className=" text-white w-fit whitespace-wrap text-sm">
                                                        {/* Available */}
                                                    </div>
                                              </ActiveTableCell>
                                            
                                            </>):(<>
                                            
                                              { innerTimeSlotRow.isBooked ? 
                                                      (   
                                                        <>
                                                         { 
                                                          innerTimeSlotRow.fromId == innerTimeSlotRow.timeslotId ?
                                                          (<BookedTableCell
                                                              key={innerTimeSlotIndex}
                                                              className=""
                                                              // align="justify"
                                                              rowSpan={innerTimeSlotRow.toTimeHour - innerTimeSlotRow.fromTimeHour + 1}
                                                              
                                                          >
                                                          
                                                              {/* BookedTableCell */}
                                                              <div className=" text-white w-64  whitespace-wrap text-sm">
                                                                  {innerTimeSlotRow.timeslotId == innerTimeSlotRow.fromId ? innerTimeSlotRow.bookingDetails:''}
                                                              </div>
                                                          </BookedTableCell>):""
                                                        }
                                                          </>
                                                      ):(
                                                        <>
                                                          <TableCell
                                                              key={innerTimeSlotIndex}
                                                              className="whitespace-nowrap  border border-gray-300 "
                                                              align="justify"
                                                              onClick={()=>{
                                                                  let availableIds = []
                                                                  for (let ids of innerTablesRow.timeSlots){
                                                                    if(!ids.isBooked){
                                                                      // let obj = {
                                                                      //   value : ids.timeslotId,
                                                                      //   label : ids.label
                                                                      // }
                                                                      availableIds.push(ids)
                                                                    }
                                                                  }
                                                                  console.log("availableIds",availableIds)
                                                                  setAvailableTime(availableIds)
                                                                  setIndexArr([innerIndex,innerTablesIndex,innerTimeSlotIndex])
                                                                  setAllTimeArr(innerTablesRow.timeSlots)
                                                                  handleOpen()
                                                              }}
                                                          >
                                                              {/* BookedTableCell */}
                                                              <div className="flex justify-center text-gray-700 font-semibold">
                                                                  {/* {`${innerTimeSlotRow.isBooked}`} */}
                                                              </div>
                                                          </TableCell>
                                                        </>
                                                      )
                                              }
                                            </>)
                                        }
                                              
                                              
                                              </>
                                          ):""
                                      }

                                      </>

                                      
                                      </>
                                  )}
                                  )}
                                  </>
                                  );
                                  }
                                  )}
                                  </>
                                  
                              );
                              }
                          )}
                      </TableRow>
                    ))}

                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        <div className="w-full flex justify-end">
                    <Button
                      color="error"
                      variant="outlined"
                      size="small"
                      onClick={()=>{
                          setIndexArr([])
                          setSelectedSlots(null)
                      }}
                    >
                      Reset
                    </Button>

        </div>
        </div>
          ):''
        }

        <SchedualingModal
            indexArr={indexArr}
            allTimeArr={allTimeArr}
            availableTime={availableTime}
            open={open}
            handleClose={handleClose}
            onSubmit={onSubmit}
         />
        </>
    )
}