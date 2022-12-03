import React from 'react'
import { Box, Button, Divider, Grid, Modal } from "@mui/material";
import Close from '@mui/icons-material/DisabledByDefaultOutlined';
import { useForm, useFormContext } from "react-hook-form";
// import useDidMountEffect from "../Common Components/Custom Hooks/useDidMountEffect";
import { useState } from "react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from '../../../../../Common Components/FormFields/InputField';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ControlledCheckBoxField from '../../../../../Common Components/FormFields/ControlledCheckBoxField';

export default function ServiceListModal({
    setPackageServiceArray,
    packageServiceArray,
    setServiceListObj,
    rateGroupWise,
    serviveListObj,
    classList,
    open,
    handleClose
}) {
    const {
        control,
        watch,
        register,
        setValue,
        formState: { errors },
      } = useFormContext();

    
    const [serviceList,setServiceList] = useState([])
    useEffect(()=>{
        if(open){
            console.log("open",serviveListObj.serviceList)

            let obj = serviveListObj
            setServiceList(obj.serviceList)
            setValue('packageServicesRequestDtoList',[])
        }else{
            console.log("close")
            setServiceListObj(null)
            setServiceList([])
        }
    },[open])

    const saveServiceList = () => {
        let tariffId = serviveListObj.tariffId
        let groupId = serviveListObj.groupId
        let data = [...serviceList]

        checkIfExsits(tariffId,groupId,data)
    }

    const checkIfExsits = (tariffId,groupId,data) => {
        let arr = [...packageServiceArray]
        if(arr.length > 0){
            let existsIndex = arr.findIndex(o => o.tariffId == serviveListObj.tariffId && o.groupId == serviveListObj.groupId);
            if(existsIndex !== -1){
                console.log("exists",arr[existsIndex])
                let updatedServiceList = [...serviceList]
                arr[existsIndex].serviceList = updatedServiceList
                setPackageServiceArray(arr)
                setServiceListObj(arr[existsIndex])
                handleClose()
            }else{
              SaveServiceToObj(tariffId,groupId,data)
            }
          }else{
              SaveServiceToObj(tariffId,groupId,data)
          }
    }
    const SaveServiceToObj = (tariffId,groupId,data) => {
        let arr = [...packageServiceArray]
        let obj = {
            tariffId : tariffId,
            groupId : groupId,
            serviceList : data
          }
        arr.push(obj)
        setPackageServiceArray(arr)
        handleClose()
      }
  return (
    <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={{position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: '80%',
                    maxWidth: '96%',
                    height: 'auto',
                    minHeight: '30%',
                    bgcolor: 'background.paper',
                    overflow:'visible',
                    borderRadius: "0.7rem",
                    boxShadow: 24,
                    paddingX: 4,
                    paddingBottom: 4,
                    paddingBottom: 4,
                }}
                    className="">
                <div className=''>
                    <div className="flex py-4 mt-3 mb-6 justfy-between w-full mx-auto border-b">
                        <div className="w-full flex ">
                            <h1 className='text-xl font-semibold mr-2'>Set Services</h1> 
                        </div>
                        <div className="w-fit h-fit   mb-1" onClick={handleClose}>
                            <Close  fontSize="medium" color='error'/>
                        </div>
                    </div>
                    <Divider light sx={{marginBottom:'1rem'}}/>
                    <TableContainer stickyHeader sx={{ marginTop: "0rem" , maxHeight:"28rem", position:"relative",zIndex:0}} className="rounded  border overflow-y-scroll ">
                        <Table
                                        size="small"
                                        stickyHeader
                                        aria-label="sticky table">
                    <TableBody>
                            <TableRow
                                    sx={{
                                        "& td": {
                                        paddingY: 0.5,
                                        backgroundColor: "#F1F1F1",
                                        },
                                    }}
                            >

                                <TableCell sx={{minWidth:'8rem'}} className='min-w-[8rem]'>
                                        <span className="text-gray-600 font-semibold">
                                                Action
                                        </span>     
                                </TableCell>
                                <TableCell sx={{minWidth:'8rem'}} className='min-w-[8rem]'>
                                        <span className="text-gray-600 font-semibold">
                                                Service Code
                                        </span>     
                                </TableCell>
                                <TableCell sx={{minWidth:'8rem'}} className='min-w-[8rem]'>
                                        <span className="text-gray-600 font-semibold">
                                                Service Name
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
                                serviceList && serviceList.length > 0 && serviceList.map((row, index) => {
                                return (    
                                    <TableRow  key={index}
                                        sx={{
                                            "& th": {
                                            paddingY: 0.5,
                                            },
                                        }}
                                    >
                                        <TableCell className="px-4 py-1 flex whitespace-nowrap " sx={{ textAlign:'center' }}>
                                                    <div className='pl-5 '>
                                                    <ControlledCheckBoxField
                                                        name={`servicesSelected[${index}.isSelected]`}
                                                        onChange={(value) => {
                                                                let arr = [...serviceList]
                                                                arr[index].isSelected = value
                                                                setServiceList(arr)
                                                            }}
                                                        value={row.isSelected}
                                                        defaultValue={row.isSelected}
                                                        control={control}
                                                    />
                                                    </div>
                                        </TableCell>
                                        <TableCell sx={{minWidth:'10rem'}} className='min-w-[10rem]'>
                                                <span className="text-gray-600 font-bold whitespace-nowrap tracking-wide">{row.serviceCode}</span>
                                                            
                                        </TableCell>
                                        <TableCell sx={{minWidth:'10rem'}} className='min-w-[10rem]'>
                                                <span className="text-gray-600 font-bold whitespace-nowrap tracking-wide">{row.serviceName}</span>                   
                                        </TableCell>
                                        {
                                            classList.length > 0 && classList.map((classHeader,classindex)=>{
                                                return(
                                                    <React.Fragment key={classindex}>
                                                    {
                                                        row.classRates && row.classRates.length > 0 && row.classRates.map((classRate,classRateIndex)=>{
                                                            return(
                                                            
                                                                <React.Fragment key={classRateIndex} >
                                                                {
                                                                    classHeader.classId == classRate.classId ? (
                                                                        <TableCell sx={{minWidth:'10rem'}} className='min-w-[10rem]'>
                                                                        
                                                                        {
                                                                        !rateGroupWise ? (
                                                                            <>
                                                                                {
                                                                                    row.isSelected ? (
                                                                                            <InputField
                                                                                                type="number"
                                                                                                name={`packageServicesRequestDtoList[${index}].rate`}
                                                                                                inputProps={{ min: 0, pattern: '[0-9]*', step: "any"}}   
                                                                                                defaultValue={classRate.rate}
                                                                                                error={errors.group?.[index]?.rate}
                                                                                                control={control}
                                                                                            />
                                                                                    ):(
                                                                                        <>
                                                                                            <span className="text-gray-600 font-bold whitespace-nowrap tracking-wide">{classRate.rate}</span>
                                                                                        </>
                                                                                    )
                                                                                }
                                                                                
                                                                            </>
                                                                        ):(
                                                                            <>
                                                                                <span className="text-gray-600 font-bold whitespace-nowrap tracking-wide">{classRate.rate}</span>
                                                                            </>
                                                                        )}
                                                                        </TableCell>
                                                                    ):''
                                                                }
                                                                </React.Fragment>
                                                            )
                                                        }) 
                                                    }
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                        
                                    </TableRow>
                                );
                                })}
                    </TableBody>
                
                        </Table>
                    </TableContainer>

                    <div className='flex justify-end w-full my-4 space-x-4'>
                            <Button
                                variant="outlined"
                                color="info"
                                sx={{ width:'19%',  mt:2 }}
                                fullWidth
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                sx={{ width:'19%',  mt:2 }}
                                fullWidth
                                onClick={()=>{saveServiceList()}}
                            >
                                Save
                            </Button>
                    </div> 
                </div>
            </Box>
            </Modal>
    </>
  )
}
