import React, { useEffect, useState } from "react";
import { ElementsContext } from "./AssginContextApi";
import { useContext } from "react";
import useDidMountEffect from "../../../../Common Components/Custom Hooks/useDidMountEffect";
import {
    Button,
    Divider,
    Grid,
    Modal,
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
import Nurse from './icons/Nurse.png'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
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
  
export default function AllChildFunctionalities({indexArr,
    dataArr,tableData}) {

    const {dynamicSubFunc, currentButton,showSubfunctionalities } = useContext(ElementsContext)

    const [showChildren,setShowChildren] = useState({
        currentChild:'',
        childData:[],
        showData:false,
    })

    const [showPermissions,setShowPermissions] = useState(false)
    const handleOpen = () => {
        setShowPermissions(true)
    }
    const handleClose = () => {
        setShowPermissions(false)
    }

    
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [expandPanal, setExpandPanal] = useState([]);
    const calculateExpandArray = (tableArray) => {
      let expandData = [...expandPanal];
      for (let i = 0; i < tableArray.length; i++) {
        if(showSubfunctionalities){
            expandData[i] = true;
        }else{
            expandData[i] = false;
        }
      }
      setExpandPanal(expandData);
    };

    useEffect(()=>{
        if(dataArr.length > 0){
                calculateExpandArray(dataArr)
        }
    },[tableData,showSubfunctionalities])

    useDidMountEffect(()=>{

    },[showChildren])

    const MyGrid = ({row,index}) => {
        return(

            <Grid item 
            lg={ indexArr.length < 2 ? (row.subFunction && expandPanal[index] ? 12 : 3):(row.subFunction && expandPanal[index] ? 12 : 2)} 
            md={ indexArr.length < 2 ? (row.subFunction && expandPanal[index] ? 12 : 4):(row.subFunction && expandPanal[index] ? 12 : 4)} 
            sm={ indexArr.length < 2 ? (row.subFunction && expandPanal[index] ? 12 : 6):(row.subFunction && expandPanal[index] ? 12 : 6)}
                                    
            >
                <Card elevation={3} sx={{height:'100%'}} 
                style={row.subFunction &&  expandPanal[index] && indexArr.length < 2 ? 
            { 
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            } : 
            { background: "#ffffff" }}>
                    <div className={row.subFunction && expandPanal[index] ?" flex justify-between flex-wrap w-full" : ''}>
                    <CardContent className="flex space-x-6">
                    { indexArr.length < 2 ? (
                    <div className="w-16 h-16">
                        <img src={Nurse} alt='icon' />
                    </div>
                    ):''}
                    <div className='text-xl font-bold'>
                        {row.functionality}
                    </div>
                    </CardContent>
                    <CardActions className={ row.subFunction || row.permissions ? "flex justify-between space-x-6":'flex justify-end'}>
                        { row.subFunction ?
                        (<Button
                            variant={expandPanal[index] ? "contained":'text'}
                            onClick={()=>{
                                
                                let showModal = false
                                if(showChildren.currentChild !==row.functionality)
                                {   
                                    let Obj = {
                                        currentChild:row.functionality,
                                        childData:[],
                                        functionId:[...indexArr,index]
                                    }
                                    if(row.subFunction){
                                        Obj.childData = row.subFunction
                                        Obj.showData = true
                                    }else if(row.permissions){
                                        Obj.childData = row.permissions
                                        Obj.showData = false
                                        showModal = true
                                    }
                                    setShowChildren(Obj)
                                }else {
                                    if(showChildren.showData){
                                            setShowChildren({
                                                currentChild:row.functionality,
                                                childData:[],
                                                showData:false
                                            })
                                    }else{
                                        let Obj = {
                                            currentChild:row.functionality,
                                            childData:[],
                                        }
                                        if(row.subFunction){
                                            Obj.childData = row.subFunction
                                            Obj.showData = true
                                        }else if(row.permissions){
                                            Obj.childData = row.permissions
                                            Obj.showData = false
                                            showModal = true
                                        }
                                        setShowChildren(Obj)
                                    }
                                }
                                if (row.subFunction) {
                                    let expandData = [...expandPanal];
                                    console.log("expandPanal", expandPanal);
                                    expandData[index] = !expandData[index];
                                    console.log("expandData", expandData);
                                    setExpandPanal(expandData);
                                }

                                if(showModal){
                                    handleOpen()
                                }
                            }} 
                            size="small"
                        >
                           { expandPanal[index] ? "Hide Subfunctionalities" : "Set Subfunctionalities" }
                        </Button>) :''}

                        {row.permissions ? (<Button
                            onClick={()=>{
                                console.log("click")
                                
                                let showModal = false
                               
                                let Obj = {
                                    currentChild:row.functionality,
                                    childData:[],
                                }
                                if(row.permissions){
                                    Obj.childData = row.permissions
                                    Obj.showData = false
                                    showModal = true
                                }
                                setShowChildren(Obj)
                                if(showModal){
                                    handleOpen()
                                }
                            }} 
                            size="small"
                        >
                            Set Permissions
                        </Button>):''}
                    <Switch
                        checked={row.isChecked}
                        onChange={(e) => {
                                let value = e.target.checked;
                                let arr = [...indexArr,index]
                                dynamicSubFunc(value,arr)
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </CardActions>
                    </div>
                    {
                        row.subFunction && expandPanal[index] ? (
                            
                            <Box className="" sx={{margin:2 }}>
                                <Divider />
                                <Collapse in={expandPanal[index]} timeout="auto" unmountOnExit sx={{p:2}}>
                                    <AllChildFunctionalities 
                                        indexArr={[...indexArr,index]}
                                        dataArr={row.subFunction}
                                    />
                                </Collapse>
                            </Box>
                        ):''
                    }
                    
                </Card>
            </Grid>
        )
    }
    return(
        <>
        
        <Grid container spacing={1}>
                 {dataArr && dataArr.map((row, index) => {
                  return (
                    <>
                        
                        {
                            currentButton == "All" ? (
                                <MyGrid row={row} index={index} />
                            ):''
                        }
                        {
                            currentButton == "Active" && row.isChecked ? (
                                <MyGrid row={row} index={index} />
                            ):''
                        }
                        {
                            currentButton == "Inactive" && !row.isChecked ? (
                                <MyGrid row={row} index={index} />
                            ):''
                        }
                        
                    </>
                    
                    );
                })}
        
        </Grid>
        <Modal
            open={showPermissions}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={{position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '94%',
                maxWidth: '96%',
                height: 'auto',
                minHeight: '20%',
                bgcolor: 'background.paper',
                overflow:'hidden',
                borderRadius: "0.7rem",
                boxShadow: 24,
                }}
                className="">
                <AllChildPermissions 
                        permissionParent = {showChildren.currentChild}
                        indexArr={[showChildren.functionId]}
                        dataArr={showChildren.childData}
                        modalData={true}
                        handleClose={handleClose}
                />
                
            </Box>
        </Modal>
        </>
    )
}