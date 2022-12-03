import React, { useEffect, useState } from "react";
import { ElementsContext } from "./AssginContextApi";
import { useContext } from "react";
import useDidMountEffect from "../../../../Common Components/Custom Hooks/useDidMountEffect";
import {
    Button,
    Divider,
    Grid,
    Switch,
  } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import dashboard from './icons/Dashboard.png'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import AllChildFunctionalities from "./AllChildFunctionalities";
import AllChildPermissions from "./AllChildPermissions";
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.number.isRequired,
value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
};
}
  
export default function RootFunctionalities({tableData}) {

    const {showSubfunctionalities, setShowSubfunctionalities, checkAllButtonsSelected, setDefaultButton, buttonsArr, setButtonsArr, contextData, setContextData, dynamicSubFunc } = useContext(ElementsContext)

    const [showChildren,setShowChildren] = useState({
        functionId:'',
        currentChild:'',
        childData:[],
        showData:false,
    })

    const [openPermissions,setOpenPermissions] = useState(false)
    const handleOpen = () => {
        setOpenPermissions(true)
    }
    const handleClose = () => {
        setOpenPermissions(false)
    }

    
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useDidMountEffect(()=>{
        setValue(0)
    },[showChildren])


    
    return(
        <Grid container spacing={1}>
                 {contextData && contextData.map((row, index) => {
                  return (
                    <Grid item lg={2.4} md={4} sm={4}>
                            <Card elevation={3}  style={row.functionality ==showChildren.currentChild && showChildren.showData ? 
                                { 
                                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                } : 
                                { background: "#ffffff" }}>
                                <CardContent className="flex space-x-6">
                                  <div className="w-16 h-16">
                                    <img src={dashboard} alt='icon' />
                                  </div>
                                  <div className='text-xl font-bold'>
                                    {row.functionality}
                                  </div>
                                </CardContent>
                                <CardActions className={ row.subFunction || row.permissions ? "flex justify-between":'flex justify-end'}>
                                    {
                                        row.subFunction ? (
                                    <Button
                                        variant={row.functionality ==showChildren.currentChild && showChildren.showData ? "contained" : 'text'}

                                        onClick={()=>{
                                            console.log("click")
                                            if(showChildren.currentChild !==row.functionality)
                                            {   
                                                let Obj = {
                                                    functionId : index,
                                                    currentChild:row.functionality,
                                                    childData:[],
                                                }
                                                if(row.subFunction){
                                                    Obj.childData = row.subFunction
                                                    Obj.showData = true
                                                }else if(row.permissions){
                                                    Obj.childData = row.permissions
                                                    Obj.showData = false
                                                }
                                                setShowChildren(Obj)
                                            }else {
                                                if(showChildren.showData){
                                                        setShowChildren({
                                                            functionId : '',
                                                            currentChild:row.functionality,
                                                            childData:[],
                                                            showData:false
                                                        })
                                                }else{
                                                    let Obj = {
                                                        functionId : index,
                                                        currentChild:row.functionality,
                                                        childData:[],
                                                    }
                                                    if(row.subFunction){
                                                        Obj.childData = row.subFunction
                                                        Obj.showData = true
                                                    }else if(row.permissions){
                                                        Obj.childData = row.permissions
                                                        Obj.showData = false
                                                    }
                                                    setShowChildren(Obj)
                                                }
                                            }
                                        }} 
                                        size="medium"

                                        style={row.functionality ==showChildren.currentChild && showChildren.showData ? 
                                            { 
                                                background: 'linear-gradient(45deg, #2196F3 80%, #21CBF3 90%)',
                                                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                            } : 
                                            { background: "#ffffff",
                                                // borderBottom : '2px solid #21CBF3'
                                             }}
                                    >
                                        {row.functionality == showChildren.currentChild && showChildren.showData ? "Hide Subfunctionalites":"Set Subfunctionalites"}
                                    </Button>
                                        ):  row.permissions ? (
                                            <Button
                                                variant={row.functionality ==showChildren.currentChild && showChildren.showData ? "contained" : 'text'}
        
                                                onClick={()=>{
                                                    console.log("click")
                                                    if(showChildren.currentChild !==row.functionality)
                                                    {   
                                                        let Obj = {
                                                            functionId : index,
                                                            currentChild:row.functionality,
                                                            childData:[],
                                                        }
                                                        if(row.subFunction){
                                                            Obj.childData = row.subFunction
                                                            Obj.showData = true
                                                        }else if(row.permissions){
                                                            Obj.childData = row.permissions
                                                            Obj.showData = false
                                                        }
                                                        setShowChildren(Obj)
                                                    }else {
                                                        if(showChildren.showData){
                                                                setShowChildren({
                                                                    functionId : '',
                                                                    currentChild:row.functionality,
                                                                    childData:[],
                                                                    showData:false
                                                                })
                                                        }else{
                                                            let Obj = {
                                                                functionId : index,
                                                                currentChild:row.functionality,
                                                                childData:[],
                                                            }
                                                            if(row.subFunction){
                                                                Obj.childData = row.subFunction
                                                                Obj.showData = true
                                                            }else if(row.permissions){
                                                                Obj.childData = row.permissions
                                                                Obj.showData = false
                                                            }
                                                            setShowChildren(Obj)
                                                        }
                                                    }
                                                }} 
                                                size="medium"
        
                                                style={row.functionality ==showChildren.currentChild && showChildren.showData ? 
                                                    { 
                                                        background: 'linear-gradient(45deg, #2196F3 80%, #21CBF3 90%)',
                                                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                                    } : 
                                                    { background: "#ffffff" ,
                                                        // borderBottom : '2px solid #21CBF3'
                                                    }}
                                            >
                                                {row.functionality == showChildren.currentChild && showChildren.showData ? "Hide Subfunctionalites":"Set Permissions"}
                                            </Button>
                                            
                                        ):''
                                    }
                                    
                                  <Switch
                                      checked={row.isChecked}
                                      onChange={(e) => {
                                        
                                        let value = e.target.checked;
                                        console.log("value", value);
                                        let arr = [index]
                                        dynamicSubFunc(value,arr)
                                      }}
                                      inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </CardActions>
                          </Card>
                    </Grid>
                    );
                })}

                {
                    showChildren.showData ? (
                        <>
                        <Grid item lg={12} md={12} sm={12} >
                            <Box className="" sx={{ boxShadow: 3}}>
                                <div className="rounded-md py-2" style={{ background: "#ffffff" }}>
                                    
                                    <Grid container alignItems="center">
                                        <Grid item lg={8} md={7.7} sm={6}>
                                                <Tabs
                                                className="text-left  font-semibold "
                                                onChange={handleChange}
                                                value={value}
                                                TabIndicatorProps={{
                                                style: {
                                                    backgroundColor: "#0B83A5",
                                                    color: "#0B83A5",
                                                },
                                                }}
                                                // textColor="#0B83A5"
                                                textColor="#0B83A5"
                                                indicatorColor="#0B83A5"
                                                variant="scrollable"
                                                scrollButtons
                                            >
                                                <Tab
                                                    label="All"
                                                    className="select-all"
                                                    style={{
                                                    fontSize: "14px",
                                                    textTransform: "capitalize",
                                                    }}
                                                    {...a11yProps(0)}
                                                />
                                                {
                                                    showChildren.childData && showChildren.childData.map((innerData,index)=>{
                                                        return(
                                                            <Tab
                                                                label={innerData.functionality}
                                                                className={innerData.functionality}
                                                                style={{
                                                                fontSize: "14px",
                                                                textTransform: "capitalize",
                                                                }}
                                                                {...a11yProps(index+1)}
                                                            />
                                                        )
                                                    })
                                                }
                                            
                                                </Tabs>
                                        </Grid>
                                        
                                        <Grid item lg={1.5} md={1.5} sm={2} className='flex justify-between space-x-2'>
                                                
                                                <Divider
                                                    orientation="vertical"
                                                    style={{ height: 30, alignSelf: "center", paddingX:2 }}
                                                />
                                                <Button 
                                                    size='small'
                                                    variant={showSubfunctionalities ? 'contained':'outlined'}
                                                    color="info"
                                                    onClick={()=>{
                                                        setShowSubfunctionalities(!showSubfunctionalities)
                                                    }}
                                                    >
                                                    { showSubfunctionalities ? 'Hide All':'Show All'}
                                                </Button>
                                                <Divider
                                                    orientation="vertical"
                                                    style={{ height: 30, alignSelf: "center", paddingX:2 }}
                                                />
                                        </Grid>
                                        <Grid item lg={2.5} md={2.8} sm={3} className='flex justify-end lg:space-x-4 lg:px-4'>
                                        {
                                                        buttonsArr && buttonsArr.map((item,index)=>{
                                                            return(
                                                            <Button key={index}
                                                                size='small'
                                                                // variant={item.isSelected ? 'contained':'outlined'}
                                                                sx={item.isSelected ? {borderBottom : '2px solid #21CBF3'}:''}
                                                                color="info"
                                                                onClick={()=>{
                                                                    let arr = [...buttonsArr]
                                                                    if(arr[index].isSelected){
                                                                        arr[index].isSelected = false
                                                                    }else{
                                                                        arr[index].isSelected = true
                                                                    }

                                                                    for (let i = 0 ;i <arr.length; i++){
                                                                        if(i !== index){
                                                                            arr[i].isSelected = false
                                                                        }
                                                                    }
                                                                    let allFalse = checkAllButtonsSelected(arr)
                                                                    // setDefaultButton
                                                                    if(allFalse){
                                                                        setDefaultButton()
                                                                    }else{
                                                                        setButtonsArr(arr)
                                                                    }
                                                                }}
                                                                >
                                                                {item.label}
                                                            </Button>
                                                            )
                                                        })
                                                    }
                                        </Grid>
                                    </Grid>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12}>
                            <div className="">
                            <TabPanel value={value} index={0}>
                                        <AllChildFunctionalities 
                                            tableData={tableData}
                                            indexArr={[showChildren.functionId]}
                                            dataArr={showChildren.childData}
                                        />
                            </TabPanel>
                            {
                                showChildren.childData && showChildren.childData.map((innerData,index)=>{
                                    return(
                                        <TabPanel value={value} index={index+1}>
                                            {
                                                innerData.subFunction ? (
                                                    <AllChildFunctionalities 
                                                        tableData={tableData}
                                                        indexArr={[showChildren.functionId,index]}
                                                        dataArr={innerData.subFunction}
                                                    />
                                                ):''
                                            }
                                            {
                                                innerData.permissions ? (
                                                    <AllChildPermissions 
                                                        // indexArrParent
                                                        
                                                        modalData={false}
                                                        permissionParent = {contextData[showChildren.functionId].subFunction[index].functionality}
                                                        tableData={tableData}
                                                        indexArr={[showChildren.functionId,index]}
                                                        dataArr={innerData.permissions}
                                                    />
                                                ):''
                                            }
                                        </TabPanel>
                                    )
                                })
                            }
                            </div>
                        </Grid>
                        </>
                        
                    ):''
                }
        </Grid>
    )
}