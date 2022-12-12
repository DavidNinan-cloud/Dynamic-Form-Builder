import React from 'react'
import { Divider, Modal, Typography, Box, Button, Grid, FormControl, FormHelperText, TextField, IconButton, Tooltip } from '@mui/material'


export default function PatientDetailsBox({comingData,drawerOpen}) {
  return (
    <div>
      <fieldset className='mx-auto border w-full  my-2 bg-gray-100'>
                                {/* <legend className='ml-6 my-2 rounded-xl rounded-xl'>
                            <p className="text-xl font-semibold tracking-wide mx-4">Patient Details 
                            </p>
                        </legend> */}
                                {
                                    comingData ? (
                                        <Grid container alignItems="flex-start" className='mx-2 px-2 pt-2'>
                                            {/*  justifyContent="space-between" */}
                                            {/* Patient Name */}
                                            {comingData.PatientName ? (
                                                <>
                                                    <Grid item xl={1.3} lg={drawerOpen ? 1.55 : 1.4} md={1.6} sm={2.8} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className="tracking-wide font-semibold text-base whitespace-nowrap">
                                                            Patient Name
                                                        </span>
                                                    </Grid>
                                                    <Grid item xl={0.1} lg={0.1} md={0.2} sm={0.2} className=" text-left mr-2" sx={{ text: 'left' }}>
                                                        :&nbsp; &nbsp;
                                                    </Grid>
                                                    <Grid item xl={1.6} lg={drawerOpen ? 1.85 : 1.8} md={2} sm={3} className=" text-left" sx={{ text: 'left', overflowWrap: 'break-word' }}>
                                                        <span className=''>{`  ${comingData.PatientName}`} </span>
                                                    </Grid>
                                                </>) : ''}
                                            {/* UHID */}
                                            {comingData.UHID ? (
                                                <>
                                                    <Grid item xl={1.3} lg={drawerOpen ? 1.55 : 0.8} md={1.6} sm={2.8} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className="tracking-wide font-semibold text-base whitespace-nowrap">
                                                            UHID
                                                        </span>
                                                    </Grid>
                                                    <Grid item xl={0.1} lg={0.1} md={0.2} sm={0.2} className=" text-left" sx={{ text: 'left' }}>
                                                        :&nbsp; &nbsp;
                                                    </Grid>
                                                    <Grid item xl={1.6} lg={drawerOpen ? 1.85 : 1.6} md={2} sm={3} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className='ml-2'>{`  ${comingData.UHID}`} </span>
                                                    </Grid>
                                                </>) : ''}
                                            {/* Mobile No */}

                                            {comingData.MoblieNo ? (
                                                <>
                                                    <Grid item xl={1.3} lg={drawerOpen ? 1.55 : 1.3} md={1.6} sm={2.8} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className="tracking-wide font-semibold text-base whitespace-nowrap">
                                                            Mobile No.
                                                        </span>
                                                    </Grid>
                                                    <Grid item xl={0.1} lg={0.1} md={0.2} sm={0.2} className=" text-left" sx={{ text: 'left' }}>
                                                        :&nbsp; &nbsp;
                                                    </Grid>
                                                    <Grid item xl={1.6} lg={drawerOpen ? 1.85 : 1.6} md={2} sm={3} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className='ml-2'>{`  ${comingData.MoblieNo}`} </span>
                                                    </Grid>
                                                </>) : ''}

                                            {/* {console.log('comingData.Age',comingData.Age)} */}
                                            {/* Age */}
                                            {comingData.Age !== null ? (
                                                <>
                                                    <Grid item xl={1.3} lg={drawerOpen ? 1.55 : 1.2} md={1.6} sm={2.8} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className="tracking-wide font-semibold text-base whitespace-nowrap">
                                                            Age
                                                        </span>
                                                    </Grid>
                                                    <Grid item xl={0.1} lg={0.1} md={0.2} sm={0.2} className=" text-left" sx={{ text: 'left' }}>
                                                        :&nbsp; &nbsp;
                                                    </Grid>
                                                    <Grid item xl={1.6} lg={drawerOpen ? 1.85 : 1.6} md={2} sm={3} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className='ml-2'>{`  ${comingData.Age}`} </span>
                                                    </Grid>
                                                </>) : ''}
                                            {/* Department */}
                                            {comingData.Department ? (
                                                <>
                                                    <Grid item xl={1.3} lg={drawerOpen ? 1.55 : 1.4} md={1.6} sm={2.8} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className="tracking-wide font-semibold text-base whitespace-nowrap">
                                                            Department
                                                        </span>
                                                    </Grid>
                                                    <Grid item xl={0.1} lg={0.1} md={0.2} sm={0.2} className=" text-left" sx={{ text: 'left' }}>
                                                        :&nbsp; &nbsp;
                                                    </Grid>
                                                    <Grid item xl={1.6} lg={drawerOpen ? 1.85 : 1.8} md={2} sm={3} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className=''>{`${comingData.Department}  `}</span>
                                                    </Grid>
                                                </>) : ''
                                            }
                                            {/* Doctor */}
                                            {comingData.Doctor ? (
                                                <>
                                                    <Grid item xl={1.3} lg={drawerOpen ? 1.55 : 0.8} md={1.6} sm={2.8} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className="tracking-wide font-semibold text-base whitespace-nowrap">
                                                            Doctor
                                                        </span>
                                                    </Grid>
                                                    <Grid item xl={0.1} lg={0.1} md={0.2} sm={0.2} className=" text-left" sx={{ text: 'left' }}>
                                                        :&nbsp; &nbsp;
                                                    </Grid>
                                                    <Grid item xl={1.6} lg={drawerOpen ? 1.85 : 1.6} md={2} sm={3} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className='ml-2'>{`  ${comingData.Doctor}`} </span>
                                                    </Grid>
                                                </>) : ''}
                                            {/* Category */}
                                            {comingData.Category ? (
                                                <>
                                                    <Grid item xl={1.3} lg={drawerOpen ? 1.55 : 1.3} md={1.6} sm={2.8} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className="tracking-wide font-semibold text-base whitespace-nowrap">
                                                            Category
                                                        </span>
                                                    </Grid>
                                                    <Grid item xl={0.1} lg={0.1} md={0.2} sm={0.2} className=" text-left" sx={{ text: 'left' }}>
                                                        :&nbsp; &nbsp;
                                                    </Grid>
                                                    <Grid item xl={1.6} lg={drawerOpen ? 1.85 : 1.6} md={2} sm={3} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className='ml-2'>{`  ${comingData.Category}`} </span>
                                                    </Grid>
                                                </>) : ''
                                            }
                                            {/* Company */}
                                            {comingData.Company ? (
                                                <>
                                                    <Grid item xl={1.3} lg={drawerOpen ? 1.55 : 1.2} md={1.6} sm={2.8} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className="tracking-wide font-semibold text-base whitespace-nowrap">
                                                            Company
                                                        </span>
                                                    </Grid>
                                                    <Grid item xl={0.1} lg={0.1} md={0.2} sm={0.2} className=" text-left" sx={{ text: 'left' }}>
                                                        :&nbsp; &nbsp;
                                                    </Grid>
                                                    <Grid item xl={1.6} lg={drawerOpen ? 1.85 : 1.6} md={2} sm={3} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className='ml-2'>{`  ${comingData.Company}`}</span>
                                                    </Grid>
                                                </>) : ""}
                                            {/* visitDate */}
                                            {comingData.visitDate ? (
                                                <>

                                                    <Grid item xl={1.3} lg={drawerOpen ? 1.55 : 1.2} md={1.6} sm={2.8} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className="tracking-wide font-semibold text-base whitespace-nowrap">
                                                            Visit Date
                                                        </span>
                                                    </Grid>
                                                    <Grid item xl={0.1} lg={0.1} md={0.2} sm={0.2} className=" text-left" sx={{ text: 'left' }}>
                                                        :&nbsp; &nbsp;
                                                    </Grid>
                                                    <Grid item xl={1.6} lg={drawerOpen ? 1.85 : 1.6} md={2} sm={3} className=" text-left" sx={{ text: 'left' }}>
                                                        <span className='ml-2'>{`  ${comingData.visitDate}`}</span>
                                                    </Grid>
                                                </>) : ""}
                                        </Grid>
                                    ) : (<p className='mx-auto'>"Data Not Found"</p>)
                                }
                            </fieldset>
    </div>
  )
}
