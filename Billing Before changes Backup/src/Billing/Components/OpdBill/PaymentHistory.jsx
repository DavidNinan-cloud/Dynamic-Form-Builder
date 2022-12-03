import React ,{useEffect, useState} from 'react'
import {Divider, Modal, Typography, Box, Button, Grid, FormControl, FormHelperText, TextField, IconButton } from '@mui/material'
import {fetchAllPayments ,getPayments } from '../../services/PaymentHistory/paymentHistoryServices'
import BillListingTable from './BillListingTable';
import LoadingSpinner from '../../../Common Components/loadingspinner/loadingSpinner';
// import { baseUrl } from "../http-common-billing";
import CloseIcon from '@mui/icons-material/Close';
import PaymentHistoryTable from './PaymentHistoryTable';
import { baseUrl } from '../../http-common-reports';
export default function PaymentHistory({visitId,
    paymentBillId, openPaymentHistory, handleClosePaymentHistory,}){
    const [count, setCount] = React.useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10); 
    const [spinner, showSpinner] = React.useState(false);
    const [dataResult, setDataResult] = React.useState([]);
    const [data, setData] = React.useState([]);


    const printView = (id,row) => {
        console.log("paymentId",row)
        let paymentId = row['paymentId']
        getPayments(paymentBillId, visitId,paymentId)
        .then((response) => {
            if (response.status === 200) {
              
                let w = window.innerWidth;
                let h = window.innerHeight;
                // window.open(`${baseUrl}/generatePdf/getBillPrint?billId=${billId}&visitId=${visitId}`,'popUpWindow'); 
                window.open(`${baseUrl}/generatePdf/billReceipt?billId=${paymentBillId}&paymentId=${paymentId}&visitId=${visitId}`,'myWindow', `height=${h},width=${w},scrollbars=1,menubar=no'`); 
                
              }
        })
        .catch((response) => {
            console.log(response);
        });
      }
    useEffect(()=>{
        if(openPaymentHistory){
            callTableDataApi()
        }
    },[openPaymentHistory])
      const callTableDataApi = () =>{
        showSpinner(true);
        fetchAllPayments(paymentBillId)
            .then((response) => response.data)
            .then((res) => {
                console.log("Billing list", res);
                showSpinner(false);
                setData(res);
                setDataResult(res.result)
                setCount(res.result.length);
                console.log("list length", res.result.length);
            })
            .catch((res) => {
                console.log("catch",res)
                showSpinner(false);
            });
        }
return(<>
    
    <Modal
            open={openPaymentHistory}
            onClose={handleClosePaymentHistory}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={{position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '60%',
                maxWidth: '70%',
                height: 'auto',
                minHeight: '30%',
                bgcolor: 'background.paper',
                overflow:'hidden',
                borderRadius: "0.7rem",
                boxShadow: 24,
                p: 4,}}
        className="">
    <div className="flex justify-between">
        <div></div>
        <div className="flex  items-baseline space-x-3">
                <h1 className='text-xl font-semibold mr-2' >Payment History </h1> 
            </div>
        <div className='text-red-600'><CloseIcon onClick={handleClosePaymentHistory}/></div>
    </div>
    <div className="flex py-2 mt-1 mb-3 space-x-10 w-full mx-auto border-b">
        {/* <div className="w-full flex justify-center space-x-6">
            <div className="flex  items-baseline space-x-3">
                <h1 className='text-xl font-semibold mr-2' >Payment History </h1> 
            </div>
            
        </div> */}
    </div>
    {spinner ? (
          <div className="grid justify-center">
            <LoadingSpinner />
          </div>
        ) : (<>
        {data ? data.result ? data.result.length > 0 ? (
        <PaymentHistoryTable 
            tableApiFunc = {fetchAllPayments}
            dataResult={dataResult}
            setDataResult={setDataResult}
            printView={printView}
            data={data}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            count={count}
        />
        
        ):
        (
                    <div className="text-gray-500 font-bold text-center ">
                        <h1 className="text-center">No Records Found</h1>
                    </div>
        ): (
          <div className="text-gray-500 font-bold text-center ">
              <h1 className="text-center">No Records Found</h1>
          </div>
): (
  <div className="text-gray-500 font-bold text-center ">
      <h1 className="text-center">No Records Found</h1>
  </div>
) }
        </>)}
        </Box>
    </Modal>

</>)
}