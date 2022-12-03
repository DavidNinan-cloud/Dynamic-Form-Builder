import React from 'react'
import { useFormContext } from 'react-hook-form';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from '@mui/material';
import InputField from '../../../../../Common Components/FormFields/InputField';
import { getServiceList } from '../services/PackageCreationServices';
import { useState } from 'react';
import ServiceListModal from './ServiceListModal';

export default function PackageGroupTable({
    calculateTotalGroupwise,
    startIndex,
    IndexOne,
    tariffId,
    rateGroupWise,
    classList,
    selectedGroups,
    selectedUnits,
    packageServiceArray,
    setPackageServiceArray
}) {       
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      background: "#F1F1F1",
      position: "sticky",
      top: "0px",
      left: "0px",
      zIndex: 50,
    },
  }));
const {
    setValue,
    control,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const [serviveListObj, setServiceListObj] = useState([])
  const openModalFunction = (groupId) => {
    let arr = [...packageServiceArray]
    if(arr.length > 0){
      let existsIndex = arr.findIndex(o => o.tariffId == tariffId && o.groupId == groupId);
      if(existsIndex !== -1){
          console.log("exists",arr[existsIndex])
          setServiceListObj(arr[existsIndex])
          handleOpen()
      }else{
        callApiFunc(groupId)
      }
    }else{
      callApiFunc(groupId)
    }



  }

  const callApiFunc = (groupId) => {
    let callObj = {
      tariffId:[tariffId],
      groupId:Number(groupId),
    }

    let unitIds = []
    for(let value of selectedUnits){
        unitIds.push(value.value)
    }
    callObj.unitId = unitIds
    let classIds = []
    for(let value of classList){
        classIds.push(Number(value.classId))
    }
    callObj.classId = classIds

    getServiceList(callObj).then(response=>response.data)
    .then(res=>{
        let data = []
        res.result.forEach((jsonString) => {
            let jsonObject = JSON.parse(jsonString);
            jsonObject.isSelected = false
            data.push(jsonObject);
        });
        console.log("data",data)
        let obj = {
          tariffId : tariffId,
          groupId : groupId,
          serviceList : data
        }
        setServiceListObj(obj)
        handleOpen()
    })
  }


  return (
    <>
    <div>
    <TableContainer stickyHeader sx={{ marginTop: "0rem" , maxHeight:"28rem", position:"relative",zIndex:0}} className="rounded  border overflow-y-scroll ">
          <Table
                          size="small"
                          stickyHeader
                          aria-label="sticky table">
              {/* <TableHead>
              
              
              </TableHead> */}
  
      <TableBody>
            <TableRow
                    sx={{
                        "& td": {
                        paddingY: 0.5,
                        backgroundColor: "#F1F1F1",
                        },
                    }}
              >
                {/* heading of table */}
                <StyledTableCell className="whitespace-nowrap border border-gray-300">
                                <span className="text-gray-600 font-semibold">
                                  Groups
                                </span>
                </StyledTableCell>

                <TableCell sx={{minWidth:'8rem'}} className='min-w-[8rem]'>
                        <span className="text-gray-600 font-semibold">
                                  Action
                        </span>     
                </TableCell>
                  {
                    classList.length > 0 && classList.map((classHeader,index)=>{
                        return(
                            <TableCell key={index} sx={{minWidth:'10rem'}} className='min-w-[10rem]'>
                                <span className="text-gray-600 font-bold whitespace-nowrap tracking-wide">{classHeader.classType}</span>
                            </TableCell>
                        )
                    })
                  }
              </TableRow>
              {
                selectedGroups && selectedGroups.length > 0 && selectedGroups.map((row, index) => {
                  return (    
                      <TableRow  key={index}
                        sx={{
                            "& th": {
                            paddingY: 0.5,
                            },
                        }}
                      >
                        <StyledTableCell className="px-4 py-1 flex whitespace-nowrap w-[0.5rem]" sx={{ textAlign:'center', width:'0.5rem'}}>
                            <div className=' '>
                                {row.label}
                            </div>
                        </StyledTableCell>

                        <TableCell sx={{minWidth:'10rem'}} className='min-w-[10rem]'>
                            <Button variant='contained' onClick={()=>{
                                let groupId = Number(row.value)
                                openModalFunction(groupId)
                                }}>
                                    Edit Services
                            </Button>          
                        </TableCell>
                        {
                    classList.length > 0 && classList.map((classHeader,classindex)=>{
                      startIndex = startIndex + 1
                        return(
                            <TableCell key={classindex} sx={{minWidth:'10rem'}} className='min-w-[10rem]'>
                              
                            {
                            rateGroupWise ? (
                                <>
                                {
                                  setValue(`groupRates[${startIndex}].classType`,{id:Number(classHeader.classId)})
                                }
                                {
                                  setValue(`groupRates[${startIndex}].group`,{id:Number(row.value)})
                                }
                                {
                                  setValue(`groupRates[${startIndex}].tariff`,{id:tariffId})
                                }
                                      <InputField
                                            type="number"
                                            name={`groupRates[${startIndex}].rate`}
                                            inputProps={{ min: 0, pattern: '[0-9]*', step: "any"}}   
                                            defaultValue={'x`'}
                                            error={errors.groupRates?.[startIndex]?.rate}
                                            control={control}
                                            inputRef={{
                                              ...register(`groupRates[${startIndex}].rate`, {
                                                onChange: (e) => {
                                                  let value = e.target.value.value
                                                  calculateTotalGroupwise()
                                                },
                                              }),
                                            }}
                                        />
                                </>
                            ):(
                                <>
                                    <span className="text-gray-600 font-bold whitespace-nowrap tracking-wide">{classHeader.classType}</span>
                                </>
                            )}
                            </TableCell>
                        )
                    })
                  }
                      </TableRow>
                  );
                })}
      </TableBody>
  
          </Table>
    </TableContainer>
    </div>
    <ServiceListModal 
        open={open}
        handleClose={handleClose}
        serviveListObj={serviveListObj}
        classList={classList}
        rateGroupWise={rateGroupWise}
        setServiceListObj={setServiceListObj}
        packageServiceArray={packageServiceArray}
        setPackageServiceArray={setPackageServiceArray}
    />
    </>
  )
}
