import React, { useRef, useEffect, useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Divider, Modal, Typography, Box, Button, Grid, FormControl, FormHelperText, TextField, IconButton, Tooltip } from '@mui/material'
import { Controller, useForm, useFieldArray, FormProvider, useFormContext } from "react-hook-form";
import { blueGrey } from '@mui/material/colors';
import { fontSize } from '@mui/system';
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InputField from '../../../Common Components/FormFields/InputField';
import DropdownField from '../../../Common Components/FormFields/DropdownField';



let a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
let b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : 'only';
    return str;
}
let totalTableAmt = 0;
export default function ServicesTable(props) {
    const {
        setServiceDiscountAp,
        setTableData,
        showDiscount,
        setShowDiscount,
        setShowBreakdown,
        showBreakdown,
        TableData,
        showGst,
        isCompany,
        totalDiscountApplicable } = props


    
    const [strTotal, setStrTotal] = useState("")
    const { clearErrors, setError, register, handleSubmit, reset, trigger, formState: { errors, isValid }, control, getValues, setValue, watch }= useFormContext();





    // Functionality -- Delete
    const deleteRow = (row, index) => {
        let newTemplateData = [...TableData];
        if (row.previousId) {
            let deletedRow = newTemplateData[index]
            let deleteRowArr = [...deletedTableData]
            deleteRowArr.push(deletedRow)
            setDeletedTableData(deleteRowArr)
        }
        remove(index)
        setValuesAfterDelete(index, newTemplateData)
        newTemplateData.splice(index, 1);
        setTableData(newTemplateData)
        if (newTemplateData.length === 0) {
            setValue('discountPercent', 0)
            setValue('discount', 0)
            setValue("Total", 0)
            setShowDiscount(false)
            setShowBreakdown(false)
            setError('notRegisteredInput', { type: 'custom', message: 'Atleast One Service Is Needed' });
        }
    }
    const setValuesAfterDelete = (index, newTemplateData) => {
        console.log(Services, "Services")
        if (index !== Services.length - 1) {
            for (let i = index; i < newTemplateData.length - 1; i++) {
                setValue(`Services[${i}].quantity`, newTemplateData[i + 1].quantity)
                setValue(`Services[${i}].serviceRate`, newTemplateData[i + 1].serviceRate)
                setValue(`Services[${i}].discountAmount`, newTemplateData[i + 1].discountAmount)
                if(isCompany){
                    setValue(`Services[${i}].companyBalance`, newTemplateData[i + 1].companyBalance)
                }
            }
        }
    }

    // Functionality -- Changes in table

    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < TableData.length; i++) {
            if (
                !TableData[i].isBilled && TableData[i].discountApplicable
            ) {
                sum += Number(TableData[i].serviceRate) * Number(TableData[i].quantity);
            }
        }
        if (sum == 0) {
            setServiceDiscountAp(false)
        } else {
            totalDiscountApplicable = sum
            setServiceDiscountAp(true)
        }
        // serviceDiscountAp
    }, [TableData])

    React.useEffect(() => {
        console.log("TableData", TableData)

        // calculate table Total
        const finalTableTotal = calculateTableTotal()

        // set ServicePageTotal
        setValue("ServicePageTotal", finalTableTotal)

        // calculate discount Total
        const finaldiscountTotal = calculateTableDiscount()
        // show discount and total
        console.log("finaldiscountTotal", finaldiscountTotal)
        console.log("finalTableTotal", finalTableTotal)

        if (finaldiscountTotal > 0) {
            setShowDiscount(true)
            let sum = finalTableTotal - finaldiscountTotal
            setValue("subTotal", finalTableTotal)
            setValue("discountTotal", finaldiscountTotal)

            // changes
            fnsettingUpTotal(sum)
            setValue("netTotal", sum)
        } else {
            setValue("netTotal", finalTableTotal)
            setShowDiscount(false)
            fnsettingUpTotal(finalTableTotal)
        }

    }, [TableData]);

    const fnsettingUpTotal = (sum) =>{
        // setShowCompany
        let newSum = sum
        //changes 3 
        if(showGst){
            // after gst sum
            newSum = fnCalculateGstTotal(newSum)
        }

        if(isCompany){
            let selfTotalAmt = fncalculateCompanyTotal(newSum)
            newSum = selfTotalAmt
        }
        setShowBreakdown(true)
        setValue("Total", newSum)
        setStrTotal(inWords(newSum))        
    }

    const fnCalculateGstTotal = (sum) => {
        let arr = [...TableData]
        let totalGst = 0
        for (let item of arr){
            if(item.gstApplicable){
                let gstAmount = (item.gstRate / 100) * item.serviceWDiscountTotal
                totalGst = totalGst +  Number(gstAmount)
            }
        }
        setValue('gstTotal',totalGst)
        let totalfinalAmount = sum + totalGst
        return totalfinalAmount

    }
    const fncalculateCompanyTotal = (sum) => {
        let arr = [...TableData]
        let totalCompanyBalance = 0
        for (let item of arr){
            totalCompanyBalance = totalCompanyBalance +  Number(item.companyBalance)
        }

        let totalSelfBalance = sum - totalCompanyBalance
        setValue("companyTotal", totalCompanyBalance)
        setValue("selfTotal", totalSelfBalance)
        // incorrectInputsCompany
        // incorrectInputsCompany
        if (totalSelfBalance < 0) {
            setValue('incorrectInputsCompany', true)
            trigger('incorrectInputsCompanyMessage')
        } else {

            setValue('incorrectInputsCompany', false)
            clearErrors('incorrectInputsCompanyMessage');
        }
        return totalSelfBalance;
    }
    const calculateTableTotal = () => {
        let sum = 0;
        for (let i = 0; i < TableData.length; i++) {
            if (
                !TableData[i].isBilled
            ) {
                sum += Number(TableData[i].serviceRate) * Number(TableData[i].quantity);

            }

        }
        totalTableAmt = sum
        return totalTableAmt;
    }

    // discount calculation
    const calculateTableDiscount = () => {

        let TableTotalDiscount = 0;
        if (TableData.length > 0) {
            for (let i = 0; i < TableData.length; i++) {

                if (
                    !TableData[i].isBilled && TableData[i].discountApplicable) {
                    TableTotalDiscount = TableTotalDiscount + Number(TableData[i].discountAmount)
                }

            }

            if (TableTotalDiscount > totalDiscountApplicable) {

                setValue('incorrectInputs', true)
                trigger('incorrectInputsMessage')
                // setError('notRegisteredInput', { type: 'custom', message: 'Discount Rate Not Applicable' });
            } else {

                setValue('incorrectInputs', false)
                clearErrors('incorrectInputsMessage');
            }
            return TableTotalDiscount

        } else {
            return TableTotalDiscount
        }
    }

  return (
    <>
    <Grid item lg={12} sm={12}>
        <div className="border">
            <TableContainer
                sx={{ maxHeight: 300 }}
            >
                <Table stickyHeader sx={{ borderRadius: "10px" }} >
                    <TableHead>
                        <TableRow
                            sx={{
                                "& th": {
                                    paddingY: 0.5,
                                    backgroundColor: "#F1F1F1",
                                },
                            }}
                        >
                            {/* heading of table */}
                            <TableCell className="" sx={{ width: '4rem' }}>
                                <span className=" font-bold whitespace-nowrap  mx-auto text-sm tracking-wide">Action</span>
                            </TableCell>
                            <TableCell className="" sx={{ width: '6rem' }} >
                                <span className=" text-sm tracking-wide font-bold whitespace-nowrap ">Service Code</span>
                            </TableCell>
                            <TableCell className="" sx={{ width: '6rem' }}>
                                <span className=" text-sm tracking-wide font-bold whitespace-nowrap ">Service Name</span>
                            </TableCell>
                            <TableCell className="" sx={{ width: '8rem' }}>
                                <span className=" font-bold whitespace-nowrap  mx-auto text-sm tracking-wide">Qty  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                            </TableCell>
                            <TableCell className="" sx={{ width: '8rem' }}>
                                <span className=" font-bold whitespace-nowrap  mx-auto text-sm tracking-wide">Rate &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                            </TableCell>
                            <TableCell className="" sx={{ width: '6rem' }}>
                                <span className=" font-bold whitespace-nowrap  mx-auto text-sm tracking-wide">Disc (%)&nbsp; &nbsp;</span>
                            </TableCell>
                            <TableCell className="" sx={{ width: '6rem' }}>
                                <span className=" font-bold whitespace-nowrap  mx-auto text-sm tracking-wide">Disc (₹)&nbsp; &nbsp; &nbsp; &nbsp;</span>
                            </TableCell>
                            <TableCell className="" sx={{ width: '4rem' }}>
                                <span className=" font-bold whitespace-nowrap  mx-auto text-sm tracking-wide">Service Total (₹)</span>
                            </TableCell>
                            {
                                showGst ? (<>
                                    {/* gst */}
                                    <TableCell className="justify-center flex" sx={{ width: '8rem' }}>
                                        <span className=" text-sm tracking-wide font-bold whitespace-nowrap text-center w-fit">Gst Amount</span>
                                    </TableCell>
                                    {/* net total */}
                                    <TableCell className="justify-center flex" sx={{ width: '8rem' }}>
                                        <span className=" text-sm tracking-wide font-bold whitespace-nowrap text-center w-fit">Net Total</span>
                                    </TableCell>
                                </>):''
                            }
                            {
                                isCompany ? (<>
                                    {/* company balance */}
                                    <TableCell className="justify-center flex" sx={{ width: '8rem' }}>
                                        <span className=" text-sm tracking-wide font-bold whitespace-nowrap text-center w-fit">Company Balance</span>
                                    </TableCell>
                                    {/* self balance */}
                                    <TableCell className="justify-center flex" sx={{ width: '8rem' }}>
                                        <span className=" text-sm tracking-wide font-bold whitespace-nowrap text-center w-fit">Self Balance</span>
                                    </TableCell>
                                
                                </>):''
                            }
                            <TableCell className="justify-center flex" sx={{ width: '8rem' }}>
                                <span className=" text-sm tracking-wide font-bold whitespace-nowrap text-center w-fit">Doctor</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody sx={{ overflow: 'visible' }}>
                        {TableData ?
                            (<>
                                {
                                    TableData.map((row, index) => {
                                        let newServiceTotal;
                                        if(row.gstApplicable){
                                            newServiceTotal = row.serviceWDiscountTotal * (1 + (row.gstRate / 100))
                                            setValue(`Services[${index}].finalTotal`,row.newServiceTotal)
                                        }else{
                                            newServiceTotal = row.serviceWDiscountTotal
                                            setValue(`Services[${index}].finalTotal`,row.serviceWDiscountTotal)
                                        }
                                        return (
                                            <TableRow key={index} sx={{
                                                "& td": {
                                                    paddingY: 0.5, overflow: 'visible'
                                                }, overflow: 'visible'
                                            }}
                                            >
                                            {/* Action button */}
                                            <TableCell className="px-4 py-1 flex whitespace-nowrap " sx={{ textAlign: 'center', width: "4rem" }}>
                                                {row.isBilled ? "" : (<div className=' '>
                                                    <Tooltip title="Delete Service">
                                                        <a
                                                            href="##"
                                                            className="text-red-500 mr-3"
                                                            onClick={() => { deleteRow(row, index) }}
                                                        >
                                                            {<DeleteOutlineOutlinedIcon sx={errors.Services?.[index] ? { marginBottom: '1rem' } : {}}
                                                            />}
                                                        </a>
                                                    </Tooltip>
                                                </div>)}
                                            </TableCell>
                                                {/* Service Code */}
                                                <TableCell className="flex" sx={errors.Services?.[index] ? { paddingBottom: '2rem', width: '2rem' } : { width: '2rem' }}>
                                                    {row.serviceCode}

                                                </TableCell>
                                                {/* Service Name */}
                                                <TableCell className="whitespace-nowrap" sx={errors.Services?.[index] ? { paddingBottom: '2rem' } : {}}>
                                                    {row.isBilled ? (<>{row.serviceName}
                                                        <Typography variant="h6" sx={{ color: 'skyblue', fontSize: '1rem' }}>
                                                            - is Billed
                                                        </Typography> </>) : row.serviceName}

                                                </TableCell>
                                                {/* quantity Field */}
                                                <TableCell className="whitespace-nowrap" sx={{ width: '6rem' }}>

                                                    <InputField
                                                        sx={errors.Services?.[index] && !errors.Services?.[index]?.quantity ? { marginBottom: '1rem' } : {}}
                                                        type="number"
                                                        variant={row.isBilled ? "standard" : "outlined"}
                                                        name={`Services[${index}].quantity`}
                                                        label=""
                                                        disabled={row.isBilled ? true : false}
                                                        inputProps=
                                                        {row.isBilled ? ({
                                                            readOnly: true,
                                                        }) : ({
                                                            readOnly: false,
                                                        })
                                                        }
                                                        inputRef={{
                                                            ...register(`Services[${index}].quantity`, {
                                                                // required: "This is required.",
                                                                minLength: 1, min: 1,
                                                                onChange: (e) => {
                                                                    if (e.target.value !== "" && e.target.value !== "e" && e.target.value !== "E" && e.target.value !== "+" && e.target.value !== "-" && e.target.value < 0) {
                                                                        let newData = [...TableData];
                                                                        newData[index].quantity = e.target.value;
                                                                        newData[index].serviceTotal = Number(e.target.value * newData[index].serviceRate);
                                                                        if (row.discountApplicable) {
                                                                            let disAmtNow = roundToTwo((Number(e.target.value * newData[index].serviceRate) * newData[index].discountPercent) / 100)
                                                                            newData[index].discountAmount = disAmtNow
                                                                            setValue(`Services[${index}].discountAmount`, disAmtNow)
                                                                            // set overall discountAmount
                                                                            newData[index].serviceWDiscountTotal = Number(e.target.value * newData[index].serviceRate - disAmtNow);
                                                                        }else{
                                                                            newData[index].serviceWDiscountTotal = Number(e.target.value * newData[index].serviceRate)
                                                                        }
                                                                        setTableData(newData)
                                                                    }
                                                                },
                                                            })
                                                        }}
                                                        defaultValue={row.quantity}
                                                        error={errors.Services?.[index]?.quantity}
                                                        control={control}
                                                    />
                                                </TableCell>
                                                {/* Rate InputField */}
                                                <TableCell className="whitespace-nowrap" sx={{ width: '8rem' }}>
                                                    <InputField
                                                        // disabled={row.rateEditAllowed ? true : false}
                                                        sx={errors.Services?.[index] && !errors.Services?.[index]?.serviceRate ? { marginBottom: '1rem' } : {}}
                                                        defaultValue={row.serviceRate}
                                                        type="number"
                                                        name={`Services[${index}].serviceRate`}
                                                        label=""
                                                        variant={row.isBilled ? "standard" : "outlined"}
                                                        error={errors.Services?.[index]?.serviceRate}
                                                        control={control}
                                                        disabled={row.isBilled && !row.rateEditAllowed ? true : false}
                                                        inputProps={row.isBilled ? {
                                                            readOnly: true,
                                                        } : { min: 1, pattern: '[0-9]*', step: "any" }}
                                                        inputRef={{
                                                            ...register(`Services[${index}].serviceRate`, {
                                                                minLength: 1, min: 1,
                                                                onChange: (e) => {
                                                                    if (e.target.value !== "" && e.target.value !== "e" && e.target.value !== "E" && e.target.value !== "+" && e.target.value !== "-" && e.target.value < 0) {
                                                                        let newData = [...TableData];
                                                                        newData[index].serviceRate = e.target.value;
                                                                        newData[index].serviceTotal = Number(e.target.value * newData[index].quantity);
                                                                        if (row.discountApplicable) {
                                                                            let disAmtNow = roundToTwo((Number(newData[index].quantity * e.target.value) * newData[index].discountPercent) / 100)
                                                                            newData[index].discountAmount = disAmtNow
                                                                            setValue(`Services[${index}].discountAmount`, disAmtNow)
                                                                            // set overall discountAmount

                                                                            newData[index].serviceWDiscountTotal = Number(e.target.value * newData[index].quantity - disAmtNow);
                                                                        }else{
                                                                            newData[index].serviceWDiscountTotal = Number(e.target.value * newData[index].quantity)
                                                                        }
                                                                        setTableData(newData)
                                                                    }
                                                                },
                                                            })
                                                        }}
                                                    />
                                                </TableCell>
                                                {/* Discount Percent */}
                                                <TableCell className="whitespace-nowrap  text-center" sx={{ width: '6rem' }}>
                                                    {
                                                        row.discountApplicable ? (
                                                            <InputField
                                                                sx={errors.Services?.[index] && !errors.Services?.[index]?.discountPercent ? { marginBottom: '1rem' } : {}}
                                                                inputProps={row.isBilled ? {
                                                                    readOnly: true,
                                                                } : { min: 1, pattern: '[0-9]*', step: "any" }}
                                                                type="number"
                                                                name={`Services[${index}].discountPercent`}
                                                                label=""

                                                                disabled={row.isBilled ? true : false}
                                                                inputRef={{
                                                                    ...register(`Services[${index}].discountPercent`, {
                                                                        max: row.serviceRate * row.quantity,
                                                                        min: 0,
                                                                        minLength: 1,
                                                                        onChange: (e) => {
                                                                            if (e.target.value !== "" && e.target.value !== "e" && e.target.value !== "E" && e.target.value !== "+" && e.target.value !== "-" && e.target.value >= 0) {
                                                                                let newData = [...TableData];
                                                                                newData[index].discountPercent = e.target.value;
                                                                                // individual amount 
                                                                                let newAmt = roundToTwo((Number(e.target.value) * Number(newData[index].quantity * newData[index].serviceRate)) / 100)
                                                                                newData[index].discountAmount = newAmt
                                                                                setValue(`Services[${index}].discountAmount`, newAmt)
                                                                                // seviceWdisTotal
                                                                                newData[index].serviceWDiscountTotal = roundToTwo(Number(newData[index].serviceRate * newData[index].quantity - newAmt))
                                                                                setTableData(newData)
                                                                            } else {
                                                                                let newData = [...TableData];
                                                                                newData[index].discountPercent = 0;
                                                                                setTableData(newData)
                                                                            }

                                                                        },
                                                                    })
                                                                }}
                                                                defaultValue={row.discountPercent}
                                                                error={errors.Services?.[index]?.discountPercent}
                                                                control={control}
                                                            />)
                                                            : <div className='w-full text-center'>N.A</div>}
                                                </TableCell>
                                                {/* Discount Amount */}
                                                <TableCell className="whitespace-nowrap  text-center" sx={{ width: '6rem' }}>
                                                    {
                                                        row.discountApplicable ? (
                                                            <InputField
                                                                sx={errors.Services?.[index] && !errors.Services?.[index]?.discountAmount ? { marginBottom: '1rem' } : {}}
                                                                inputProps={row.isBilled ? {
                                                                    readOnly: true,
                                                                } : { min: 1, pattern: '[0-9]*', step: "any" }}
                                                                type="number"
                                                                name={`Services[${index}].discountAmount`}
                                                                label=""

                                                                disabled={row.isBilled ? true : false}
                                                                inputRef={{
                                                                    ...register(`Services[${index}].discountAmount`, {
                                                                        max: row.serviceRate * row.quantity,
                                                                        min: 0,
                                                                        minLength: 1,
                                                                        onChange: (e) => {
                                                                            if (e.target.value !== "" && e.target.value !== "e" && e.target.value !== "E" && e.target.value !== "+" && e.target.value !== "-" && e.target.value >= 0) {
                                                                                let newData = [...TableData];
                                                                                newData[index].discountAmount = e.target.value;
                                                                                newData[index].serviceWDiscountTotal = Number(newData[index].serviceRate * newData[index].quantity - e.target.value);

                                                                                //set individual percent
                                                                                let newPercent = roundToTwo((e.target.value / Number(newData[index].serviceRate * newData[index].quantity)) * 100)
                                                                                newData[index].discountPercent = newPercent
                                                                                setValue(`Services[${index}].discountPercent`, newPercent)
                                                                                setTableData(newData)
                                                                            } else {
                                                                                let newData = [...TableData];
                                                                                newData[index].discountAmount = 0;
                                                                                setTableData(newData)
                                                                            }

                                                                        },
                                                                    })
                                                                }}
                                                                defaultValue={row.discountAmount}
                                                                error={errors.Services?.[index]?.discountAmount}
                                                                control={control}
                                                            />)
                                                            : <div className='w-full text-center'>N.A</div>}
                                                </TableCell>
                                                {/* total */}
                                                <TableCell className="" sx={errors.Services?.[index] ? { paddingBottom: '2rem', width: "4rem" } : { width: "4rem" }}>
                                                    
                                                        <span className=" font-medium whitespace-nowrap  mx-auto text-base tracking-wide">{row.serviceWDiscountTotal ? (<>{row.serviceWDiscountTotal}</>) : "0"}</span>
                                                   
                                                </TableCell>
                                                {/* changes - 2 */}
                                                {
                                                    showGst ? (<>
                                                        {/* gst */}
                                                        <TableCell className="justify-center flex" sx={{ width: '8rem' }}>
                                                            <div className='w-full text-base'>{row.gstApplicable ? (row.serviceWDiscountTotal * row.gstRate / 100):'N.A'}</div>
                                                        </TableCell>
                                                        {/* newServiceTotal */}
                                                        <TableCell className="justify-center flex" sx={{ width: '8rem' }}>
                                                            <div className='w-full text-base'>{newServiceTotal}</div>
                                                        </TableCell>
                                                    </>):''
                                                }
                                                {
                                                    isCompany ? (<>
                                                        {/* company balance */}
                                                        <TableCell className="justify-center flex" sx={{ width: '8rem' }}>
                                                        <InputField
                                                                sx={errors.Services?.[index] && !errors.Services?.[index]?.companyBalance ? { marginBottom: '1rem' } : {}}
                                                                inputProps={row.isBilled ? {
                                                                    readOnly: true,
                                                                } : { min: 1, pattern: '[0-9]*', step: "any" }}
                                                                type="number"
                                                                name={`Services[${index}].companyBalance`}
                                                                label=""

                                                                disabled={row.isBilled ? true : false}
                                                                inputRef={{
                                                                    ...register(`Services[${index}].companyBalance`, {
                                                                        max: row.serviceRate * row.quantity,
                                                                        min: 0,
                                                                        minLength: 1,
                                                                        onChange: (e) => {
                                                                            if (e.target.value !== "" && e.target.value !== "e" && e.target.value !== "E" && e.target.value !== "+" && e.target.value !== "-" && e.target.value >= 0) {
                                                                                let newData = [...TableData];
                                                                                newData[index].companyBalance = e.target.value;
                                                                                // newchanges
                                                                                setTableData(newData)
                                                                            } else {
                                                                                let newData = [...TableData];
                                                                                newData[index].companyBalance = 0;
                                                                                setTableData(newData)
                                                                            }

                                                                        },
                                                                    })
                                                                }}
                                                                defaultValue={row.companyBalance}
                                                                error={errors.Services?.[index]?.companyBalance}
                                                                control={control}
                                                            />
                                                        </TableCell>
                                                        {/* self balance */}
                                                        <TableCell className="justify-center flex" sx={{ width: '8rem' }}>
                                                            <div className='w-full text-base'>{Number(newServiceTotal) - Number(row.companyBalance)}</div>
                                                        </TableCell>
                                                    
                                                    </>):''
                                                }
                                                {/* Doctor */}
                                                <TableCell className="whitespace-nowrap z-50" sx={errors.Services?.[index] ? { paddingBottom: '2rem', overflow: 'visible', width: "8rem" } : { overflow: 'visible', width: "8rem" }}>
                                                    {
                                                        row.doctorShareApplicable ? (<>
                                                            {row.isBilled ? (<>{row.doctor.label ? (`${row.doctor.label}`) : ""}</>) : (
                                                                <>
                                                                    <DropdownField
                                                                        control={control}
                                                                        error={errors.Services?.[index]?.doctor}
                                                                        name={`Services[${index}].doctor`}
                                                                        label="Doctors"
                                                                        dataArray={doctors}
                                                                        placeholder="Doctors"
                                                                        defaultValue={row.doctor}

                                                                        placeholdernotVisible={true}
                                                                        inputRef={{
                                                                            ...register(`Services[${index}].doctor`, {
                                                                                // required: "This is required.",
                                                                                onChange: (e) => {
                                                                                    let newData = [...TableData];
                                                                                    newData[index].doctor = { id: Number(e.target.value) };
                                                                                    setTableData(newData)
                                                                                },
                                                                            })
                                                                        }}
                                                                        isSearchable={false}
                                                                    />
                                                                </>
                                                            )
                                                            }

                                                        </>) : (<div className='w-full text-base'>N.A</div>)
                                                    }

                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                        {
                                            strTotal !== 'only' ? (  <>  
                
                {showBreakdown ? (
                <TableRow
                    sx={{
                        "& td": {
                            paddingY: 0.5, borderTop: 1
                        },
                    }}
                    >
                    {/* 1 */} <TableCell></TableCell>
                    {/* 2 */} <TableCell></TableCell>
                    {/* 3 */} <TableCell></TableCell>
                    {/* 4 */} <TableCell>
                                {showBreakdown ? (<span className="tracking-wide capitalize text-right font-bold mt-4">
                                            Total :
                                        </span>):''
                                }
                            </TableCell>
                    {/* 5 */} 
                                <TableCell>
                                {showDiscount ? (
                                    <fieldset disabled={true}>
                                        <InputField
                                            variant="outlined"
                                            disabled={true}
                                            type="number"
                                            name="subTotal"
                                            label=""
                                            error={errors.subTotal}
                                            control={control}
                                        />
                                    </fieldset>):''}
                                </TableCell>
                                
                    {/* 6 */} <TableCell></TableCell>
                    {/* 7 */} <TableCell>
                                {showDiscount ? (
                        <fieldset disabled={true}>
                        <InputField
                            variant="outlined"
                            disabled={true}
                            type="number"
                            name="discountTotal"
                            label=""
                            error={errors.discountTotal}
                            control={control}
                        />
                    </fieldset>
                    ):''
                                }
                            </TableCell>
                {/* 8 */}     <TableCell>
                                <fieldset disabled={true}>
                                <InputField
                                    variant="outlined"
                                    // disabled={true}
                                    inputProps={{ readOnly: true }}
                                    name="netTotal"
                                    label=""
                                    error={errors.netTotal}
                                    control={control}
                                />
                            </fieldset> 
                        </TableCell>
                        {/* changes */}
        {/* 9 */}       {showGst ? (
                            <>
                            <TableCell>
                                {/* gstTotal */}
                                <fieldset disabled={true}>
                                        <InputField
                                            variant="outlined"
                                            // disabled={true}
                                            inputProps={{ readOnly: true }}
                                            name="gstTotal"
                                            label=""
                                            error={errors.gstTotal}
                                            control={control}
                                        />
                                </fieldset> 
                            </TableCell>
                            {/* net total */}
                            <TableCell></TableCell>
                            </>
                        ):''}
                        {
                            isCompany ? (
                                <>
                                {/* company total */}
                                <TableCell>
                                        <fieldset disabled={true}>
                                        <InputField
                                            variant="outlined"
                                            // disabled={true}
                                            inputProps={{ readOnly: true }}
                                            name="companyTotal"
                                            label=""
                                            error={errors.companyTotal}
                                            control={control}
                                        />
                                    </fieldset> 
                                </TableCell>
                                {/* self total */}
                                <TableCell>
                                        <fieldset disabled={true}>
                                        <InputField
                                            variant="outlined"
                                            // disabled={true}
                                            inputProps={{ readOnly: true }}
                                            name="selfTotal"
                                            label=""
                                            error={errors.selfTotal}
                                            control={control}
                                        />
                                    </fieldset> 
                                </TableCell>
                                </>
                            ):''
                        }

                            <TableCell></TableCell>
                </TableRow>
                    ):''}   

                <TableRow sx={!showBreakdown ? {
                            "& td": {
                                paddingY: 0.5, borderTop: 1
                            },
                            paddingY: 0.5, borderTop: 1
                        } : {
                            "& td": {
                                paddingY: 0.5,}
                        }}>
                            <TableCell colSpan={6} align="justify" rowSpan={3} sx={{ fontSize: 20, color: 'rgb(11 131 165 )' }} className='capitalize text-customBlue'>
                                {
                                    strTotal !== 'only' ? (<>{strTotal === "" ? "" : "Rupees"}  {strTotal}</>) : ''
                                }
                            </TableCell>
                        {
                            strTotal !== 'only' ? (
                                <>
                                    <TableCell align="right" >
                                        <span className="tracking-wide capitalize text-right font-bold mt-4">
                                            Total :
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <fieldset disabled={true}>
                                            <InputField
                                                variant="outlined"
                                                // disabled={true}
                                                inputProps={{ readOnly: true }}
                                                name="Total"
                                                label=""
                                                error={errors.Total}
                                                control={control}
                                            />
                                        </fieldset>
                                    </TableCell>
                                    <TableCell></TableCell>
                                </>
                            ) : ''
                        }

                </TableRow>
                    </>
                ):''}
                
                            </>) : ''
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
                        {/* incorrectInputsCompanyMessage */}
        {errors.incorrectInputsMessage && <p className='text-xl font-medium tracking-wide text-red-600 px-6'>{errors.incorrectInputsMessage.message}</p>}
        {errors.incorrectInputsCompanyMessage && <p className='text-xl font-medium tracking-wide text-red-600 px-6'>{errors.incorrectInputsCompanyMessage.message}</p>}

        {errors.notRegisteredInput && <p className='text-xl font-medium tracking-wide text-red-600 px-6'>{errors.notRegisteredInput.message}</p>}
        {!errors.notRegisteredInput ? errors.Services && <p className='text-xl font-medium tracking-wide text-red-600 px-6'>Please Enter Correct Entries</p> : ""}
    </Grid>
    </>
  )
}
