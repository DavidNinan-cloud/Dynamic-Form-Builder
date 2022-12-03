import { Divider, Grid } from "@mui/material";
import React from "react";

export default function PatientInfo({comingData}){
    return(
        <>
         <div className='mx-auto border w-full rounded-xl my-4 bg-gray-100 h-fit'>
                          {
                              comingData? (
                              <Grid container spacing={1} className='py-1 mx-5 mb-2 mt-6  px-5'>
                                  <Grid item  md={1.7} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                                <span className="tracking-wide font-semibold">
                                                    Patient Name
                                                </span>
                                            </Grid>
                                            <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                :
                                            </Grid>
                                            <Grid item  md={2.3} sm={3} className="pt-6 text-left" sx={{text:'left',overflowWrap:'break-word'}}>
                                                <span className=''>{`  ${comingData.PatientName}`} </span> 
                                            </Grid>
                                            {/* UHID */}
                                            <Grid item  md={0.7} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                                <span className="tracking-wide font-semibold">
                                                    UHID   
                                                </span> 
                                            </Grid>
                                            <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                :
                                            </Grid>
                                            <Grid item md={2} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                                <span className=''>{`  ${comingData.UHID}`} </span>
                                            </Grid>
                                            {/* Mobile No */}
                                            <Grid item  md={1.3} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                                <span className="tracking-wide font-semibold">
                                                    Mobile No.   
                                                </span>  
                                            </Grid>
                                            <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                :
                                            </Grid>
                                            <Grid item  md={1.5} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                                <span className=''>{`  ${comingData.MoblieNo}`} </span>
                                            </Grid>
                                            {/* Age */}
                                            <Grid item  md={0.7} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                                <span className="tracking-wide font-semibold">
                                                    Age   
                                                </span> 
                                            </Grid>
                                            <Grid item  md={0.1} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                                :
                                            </Grid>
                                            <Grid item  md={1} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                                 <span className=''>{`  ${comingData.Age}`} </span>
                                            </Grid>
                                  {/* cashBalance */}
                                  {/* <Grid item lg={0.8} md={1.5} sm={2.5} className="pt-6 text-left" sx={{text:'right'}}>
                                      <span className="tracking-wide font-semibold">
                                        Cash Balance   
                                      </span> 
                                  </Grid>
                                  <Grid item lg={0.1} md={0.5} sm={0.5} className="pt-6 text-left" sx={{text:'left'}}>
                                      :
                                  </Grid>
                                  <Grid item lg={1.5} md={2} sm={3} className="pt-6 text-left" sx={{text:'left'}}>
                                       <span className=''>{`  ${comingData.cashBalance}`} </span>
                                  </Grid> */}
                              </Grid>
                              ):(<p className='mx-auto'>"Data Not Found"</p>)
                          }
                  </div>
                          
                          
                <Divider sx={{
                    "&::before, &::after": {
                      borderColor: "secondary.light",
                    },
                  }}/>
        </>
    )
}