import { Box, Modal,Divider } from '@mui/material'
import React, { useState } from 'react'
import CommonBackDrop from '../../../Common Components/CommonBackDrop/CommonBackDrop'
import SelectedBillTable from './SelectedBillTable'
import Close from '@mui/icons-material/DisabledByDefaultOutlined';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';

export default function SelfSettlementModal({
    open,
    handleClose,
    selectedBill}) {

const [openBackdrop,setOpenBackdrop] = useState(false)

let Schema =  yup.object().shape({
  cancelType:  yup.object().nullable().shape({
      value: yup.string().required("Please Mention Your Cancellation Reason"),
      label: yup.string().required("Please Mention Your Cancellation Reason")
  }).required("Please Mention Your Cancellation Reason"),
  
}).required();
const methods = useForm({
  mode: "onChange",
  resolver: yupResolver(Schema),
  defaultValues:{
      other:'',
      cancelType:''
  } 
});
const {register, handleSubmit, reset, trigger,formState:{errors}, control, setValue, watch,getValues  } = methods;

const { isLoading, isError, error, isSuccess, mutate } = useMutation();

const onSubmit = (data) => {

}
// const submitDataApit = () => {
//     setOpenBackdrop(true)
//     mutate(finalData, {onSuccess: (data, variables, context) => {
//         successAlert(data.data.message)
//         // resetForm()
//         fetchNewList()      
//         handleCloseModal()
//         handleClose()
//         setOpenBackdrop(false)
//         // navigate(`/appointment/appointmentlist` )
//       },
//       onError:(data)=>{
//         errorAlert(data.message)    
//         handleCloseModal()
//         setOpenBackdrop(false)    
//     }});
// }
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
            <div className="flex py-4 mt-3 mb-6 justfy-between w-full mx-auto border-b">
                <div className="w-full flex ">
                    <h1 className='text-xl font-semibold mr-2'>Bill - Self Settlement</h1> 
                </div>
                <div className="w-fit h-fit   mb-1" onClick={handleClose}>
                    <Close  fontSize="medium" color='error'/>
                </div>
            </div>
                    <Divider light sx={{marginBottom:'1rem'}}/>

            <div className=''>
              <SelectedBillTable ledgerData={selectedBill}/>
            </div>
            <div>
                    <form onSubmit={handleSubmit(onSubmit)} className='py-1 lg:px-[4%]'></form>

            </div>
            </Box>
        </Modal>

        {/* <ConfirmationModal
                  confirmationOpen={openModal}
                  confirmationHandleClose={handleCloseModal}
                  confirmationSubmitFunc={()=>{
                    handleCloseModal()
                    submitDataApit()
                }}
                confirmationLabel="Confirmation "
                confirmationMsg="Confirm Bill Cancel?"
                confirmationButtonMsg="Cancel Bill"
            /> */}

            
      {/* Backdrop */}
      <CommonBackDrop openBackdrop={openBackdrop} setOpenBackdrop={setOpenBackdrop} />
        </>
  )
}
