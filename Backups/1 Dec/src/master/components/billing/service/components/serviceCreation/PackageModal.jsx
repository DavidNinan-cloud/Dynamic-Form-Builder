import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";import { Box, Button, Divider, Grid, Modal } from "@mui/material";
import InputField from "../../../../../../Common Components/FormFields/InputField";
import { Close } from "@mui/icons-material";
import SearchBar from "../../../../../../Common Components/FormFields/SearchBar";
import useDidMountEffect from "../../../../../../Common Components/Custom Hooks/useDidMountEffect";

export default function PackageModal({
    open,    
    handleClose}){
    const [ inputSearchArr, setInputSearchArr] = useState([])
    const [ searchString, setSearchString] = useState(null)
    
    useDidMountEffect(()=>{
        if(searchString !== null){
            addtotableFunc()
        }
    },[searchString])
    
    const addtotableFunc = () => {
        
    }
    return(
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
                            <h1 className='text-xl font-semibold mr-2'>Package Services</h1> 
                        </div>
                        <div className="w-fit h-fit   mb-1" onClick={handleClose}>
                            <Close  fontSize="medium" color='error'/>
                        </div>
                    </div>
                    <Divider light sx={{marginBottom:'1rem'}}/>

                    <div  className='py-1 lg:px-[4%]'>
                        <Grid container spacing={1} className="w-full mx-auto space-y-3">
                            <Grid item lg={4} md={4} sx={{marginY:'0.6rem'}}>
                                <SearchBar
                                    name="inputSearch"
                                    placeholder="Search by Patient Name/ UHID/ Mobile No."
                                    dataArray={inputSearchArr}
                                    isSearchable={true}
                                    handleInputChange={(e)=>{
                                    console.log("searchinput",e)
                                    if(e == null)
                                    {

                                    }else{
                                        if (e.length > 0) {
                                            autoSearchPatientBillCancellations(e).then((response) => {
                                            console.log("response result",response.data.result);
                                            setInputSearchArr(response.data.result);
                                            });
                                            }
                                        }
                                    }}
                                    //after search user get specific value
                                    onChange={(e)=>{
                                        console.log("searchinput selected",e)
                                        if(e == null){
                                            setSearchString(null)
                                        }
                                        else{
                                            setSearchString(e)
                                        }
                                        }}
                                    />
                            </Grid>
                            <Grid item lg={4} md={4} sx={{marginY:'0.6rem'}}>
                                {/* <InputField
                                                name="other"
                                                label="Other Reason"
                                                error={errors.other}
                                                control={control}
                                    /> */}
                            </Grid> 
                        </Grid>
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
                            >
                                Save Services
                            </Button>
                    </div> 
                    </div>
                </div>
            </Box>
        </Modal>

        </>
    )
}