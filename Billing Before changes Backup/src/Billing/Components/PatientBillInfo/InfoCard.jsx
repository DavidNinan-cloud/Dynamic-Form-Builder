import {
    Box,
    Button,
    Card,
    CardContent,
    Modal,
    TextField,
    Tooltip,
  } from "@mui/material";
  import React, { useEffect } from "react";
  import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
  import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
  import CommonTable from "./CommonTable";
  
  const InfoCard = (props) => {
    const [totalAmt, setTotalAmt] = React.useState(null);
    const [openView, setOpenView] = React.useState(false);
  
    useEffect(()=>{
      console.log('props',props)
      if(props.tableData.result && props.tableData.result[0].totalAmount){
        setTotalAmt(props.tableData.result[0].totalAmount)
      }
    },[])
    return (
      <>
        <div className=" ">
          <Card
            square={true}
            elevation={1}
            sx={{
              // marginY: "3px",
              // borderRadius: "10px",
              backgroundColor:props.headColor,
              width: "100%",
              // overflow: "scroll",
              pt:0.4
            }}
            className=" mx-auto h-[16rem] max-h-[16rem] 
            "
            // overflow-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-slate-50
            
          >
            {/* <CardContent> */}
              <div className='flex justify-between py-2  -mt-2 w-full'>
                <div className="text-sm font-semibold pl-2 pt-1">{props.title}</div>
                <div className="flex space-x-4 mr-2">
                  
                { totalAmt ? (<div className="text-sm font-semibold pt-1">Total Amount : ₹ {totalAmt}</div>):''}
                    {props.tableData.result && props.tableData.result.length > 0 ? (<button
                      className="text-blue-500 mr-2"
                      onClick={() => {
                        setOpenView(true);
                      }}
                    >
                      <Tooltip
                        title={`View ${props.title}`}
                        placement="left-start"
                        arrow
                      >
                        <VisibilityRoundedIcon />
                      </Tooltip>
                    </button>):''}
                </div>
              </div>
              <hr className="border  border-slate-300" />
              <div className="h-full bg-white">
              {props.tableData.result && props.tableData.result.length > 0 ? (
                <div className=" h-auto max-h-[18rem] w-full overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-slate-50">
                  <CommonTable tableData={props.tableData} trimData={true}/>
                </div>
              ) : (
                <div className="text-sm text-center flex justify-center font-semibold pl-2 pt-1">
                    Data Not Found
                </div>
              )}
              </div>
            {/* </CardContent> */}
          </Card>
        </div>

        {/* //View table Modal// */}
        <Modal
          open={openView}
          onClose={() => {
            setOpenView(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              height: "90%",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <div className="flex justify-end">
              {/* <button
                className="border border-gray-500 rounded-full text-red-500"
                onClick={() => {
                  setOpenView(false);
                }}
              >
                <CloseRoundedIcon />
              </button> */}
              <CancelPresentationIcon
                className="text-red-600  rounded cursor-pointer"
                onClick={() => {
                  setOpenView(false);
                }}
              />
            </div>
            <CommonTable tableData={props.tableData} trimData={false}/>
          </Box>
        </Modal>
      </>
    );
  };
  
  export default InfoCard;
  