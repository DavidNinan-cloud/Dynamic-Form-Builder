import { Box, Card, CardActions, CardContent, Divider, Grid, Switch } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { ElementsContext } from "./AssginContextApi";
import Emergency from './icons/Emergency.png'

import CloseIcon from '@mui/icons-material/Close';

export default function AllChildPermissions ({permissionParent, indexArr,
    dataArr,modalData,handleClose}){
      const {showSubfunctionalities,setPermissionParents,
        setShowSubfunctionalities, checkAllButtonsSelected, setDefaultButton, buttonsArr, setButtonsArr, contextData, setContextData, dynamicSubFunc } = useContext(ElementsContext)

    return(
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        <Box  sx={{ boxShadow: 3, backgroundColor:'#ffffff', padding:2, borderRadius:2 }}>
            <div className="w-full flex justify-between">
                <div className='text-2xl font-bold my-1'>
                        {permissionParent} Permissions : -
                </div>
                {
                  modalData ?
                (
                  <div className='text-red-600'><CloseIcon onClick={handleClose}/></div>):''}
            </div>
            
            <Divider />
         <Grid container spacing={1} sx={{my:2}}>
                 {dataArr && dataArr.map((row, index) => {
                    console.log("permissions",row)
                  return (
                    <Grid item lg={2} md={4} sm={6}>
                            <Card elevation={3}  style={{ background: "#ffffff",display:'flex',alignItems:'end' }}>
                                <CardContent className="flex space-x-6">
                                  <div className="w-16 h-16">
                                    <img src={Emergency} alt='icon' />
                                  </div>
                                  <div className='text-xl font-bold'>
                                    {row.permission}
                                  </div>
                                </CardContent>
                                <CardActions className="flex justify-end">
                                    
                                  <Switch
                                      checked={row.isChecked}
                                      onChange={(e) => {
                                        
                                        let value = e.target.checked;
                                        console.log("value", value);
                                        let arr = [...indexArr,index]
                                        setPermissionParents(value,arr)
                                      }}
                                      inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </CardActions>
                          </Card>
                    </Grid>
                    );
                })}
          </Grid>
        </Box>
    )
}