import React, { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Divider, Modal, Typography, Box, Button, Grid, FormControl, FormHelperText, TextField, IconButton, Tooltip } from '@mui/material'
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { blueGrey } from '@mui/material/colors';
import { fontSize } from '@mui/system';
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import SearchBar from '../../../Common Components/FormFields/SearchBar';
import InputField from '../../../Common Components/FormFields/InputField';
import DropdownField from '../../../Common Components/FormFields/DropdownField';
import ConfirmationModal from '../../../Common Components/ConfirmationModal';
import { successAlert, errorAlert } from '../../../Common Components/Toasts/CustomToasts'

import { fetchAllBills, getBill } from './../../services/BillingListServices'
import { putServices, getPreviousBill, getDoctorServicesDropDown, getServicesInfo, saveServicePage, generateBillingPage, getPatientBill } from '../../services/BillingServices'
import { getPaymentTypes, savePayment } from "../../services/PaymentPageServices"

import BillListingTable from './BillListingTable';
import LoadingSpinner from '../../../Common Components/loadingspinner/loadingSpinner';
import { baseUrl } from "../../http-common-reports";
import OpdPaymentModal from './OpdPaymentModal';
import { styled } from '@mui/material'
import CheckBoxField from '../../../Common Components/FormFields/CheckBoxField';
import OPDBillPayment from './OPDBillPayment';
import CommonBackDrop from '../../../Common Components/CommonBackDrop/CommonBackDrop'
import PaymentHistory from './PaymentHistory';
// fontColor
const CustomTextField = styled(TextField)({
    '& .MuiInputBase-root.Mui-disabled': {
        color: '#1a0000', font: 'bold'
    },
});
let submitMsg;
let servicesObj = [];

let totalDiscountApplicable = 0;
let totalDiscountAmt = 0;
let totalTableAmt = 0;

let finalSubmit = {}
let billingData = {}


let amountDetails
let paymentTypeDetails
let paymentRef
export default function OPDBIll({ drawerOpen }) {

    const incomingpaymentTypes = [
        { id: 3, value: 3, label: 'Cash' },
        { id: 1, value: 1, label: "Debit Advance" },
        { id: 2, value: 2, label: "Credit Card" },
    ];
    const DiscountTypes = [
        {
            id: 0,
            label: "Amount",
            value: "Amount"
        },
        {
            id: 1,
            label: "Percentage",
            value: "Percentage"
        },
    ]
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
    const incomingTableData = [{
        amount: "",
        paymentMethod: '',//SAVE DEFAULT PAYMENT TYPE 
    }]

    const [showPaymentArr, setShowPaymentArr] = useState(true)
    const [openBilling, setOpenBilling] = useState(false)
    const [editService, setEditService] = useState(false)
    const [TableData, setTableData] = useState([])
    const [deletedTableData, setDeletedTableData] = useState([])
    const [amtInPercent, setAmtInPercent] = useState(false)
    const [strTotal, setStrTotal] = useState("")
    const [showDiscount, setShowDiscount] = useState(false)
    const [doctors, setDoctors] = useState()
    const [visitId, setVisitId] = useState()
    const [unitId, setUnitId] = useState()
    const [inputSearchArr, setInputSearchArr] = useState()
    const [comingData, setComingData] = useState()
    const [spinner, showSpinner] = React.useState(false);
    const [dataResult, setDataResult] = useState([])
    const [data, setData] = useState({ result: [], actions: [] });
    const [serviceDiscountAp, setServiceDiscountAp] = useState(true)
    const [showSearch, setShowSearch] = useState(true);
    const [showPage, setShowPage] = useState(false);
    const [paitents, setPaitents] = useState();
    const [finalData, setFinalData] = React.useState([]);
    const [paymentFinalData, setPaymentFinalData] = React.useState([]);
    const [paymentfinalDataSubmit, setPaymentfinalDataSubmit] = React.useState('');
    const [paymentTypes, setPaymentTypes] = useState(incomingpaymentTypes)
    const [filterdPaymentTypes, setFilterdPaymentTypes] = useState(incomingpaymentTypes)
    const [paymentTableData, setPaymentTableData] = useState(incomingTableData)
    const [count, setCount] = React.useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [showPanCard, setShowPanCard] = useState(false)
    const [advanceAvailable, setAdvanceAvailable] = useState(0);


    const [showLoader, setShowLoader] = useState(false);
    // const [firstClick, setFirstClick] = useState(true);
    let initialSchema = {

        Services: yup
            .array()
            .of(
                yup.object().shape({
                    quantity: yup
                        .number("required").typeError('required').label('Quantity')
                        .required("required")
                        .min(1, "required"),

                    serviceRate: yup
                        .string("string").matches(/^[0-9]+$/, "required")
                        .required("required")
                        .min(1, "required"),

                }),

            )
            .min(1, "Please Add amount Details"),
        // notRegisteredInput
        incorrectInputsMessage: yup.string().when("incorrectInputs", (incorrectInputs) => {
            if (incorrectInputs) {
                return yup.number().typeError('Incorrect Inputs').min(1, "Incorrect Inputs")
            }
        }),
    };
    const AppointValidation = yup.object().shape(
        initialSchema,
    ).required();
    const schema = AppointValidation
    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            Total: "",
            discount: 0,
            discountPercent: 0,
            DiscountType: {
                id: 0,
                label: "Amount",
                value: "Amount",
            },
            incorrectInputs: false,
            incorrectInputsMessage: 0
        }
    });
    const { clearErrors, setError, register, handleSubmit, reset, trigger, formState: { errors, isValid }, control, getValues, setValue, watch } = methods;


    const payableTotal = watch('Total')
    const navigate = useNavigate();
    const location = useLocation();

    // save Service Page
    const { isLoading: saveServicesIsLoading, isError: saveServicesIsError, isSuccess: saveServicesIsSuccess, mutate: saveServicesMutate } =
        useMutation(saveServicePage);
    // Generate and go to payment
    const { isLoading: generateIsLoading, isError: generateIsError, isSuccess: generateIsSuccess, mutate: generateMutate } =
        useMutation(generateBillingPage);


    const { fields, append, remove } = useFieldArray({
        control,
        name: "Services",
    });
    let Services = watch("Services");

    const printView = (id, row) => {
        let billId = row['billId']
        console.log("billId", billId)
        getBill(billId, visitId)
            .then((response) => {
                if (response.status === 200) {

                    let w = window.innerWidth;
                    let h = window.innerHeight;
                    // window.open(`${baseUrl}/generatePdf/getBillPrint?billId=${billId}&visitId=${visitId}`,'popUpWindow'); 
                    window.open(`${baseUrl}/generatePdf/getBillPrint?billId=${billId}&visitId=${visitId}`, 'myWindow', `height=${h},width=${w},scrollbars=1,menubar=no'`);

                }
            })
            .catch((response) => {
                console.log(response);
            });
    }

    const callTableDataApi = (defaultParams) => {
        console.log("defaultParams", defaultParams);

        showSpinner(true);
        setShowLoader(true)
        fetchAllBills(defaultParams)
            .then((response) => response.data)
            .then((res) => {
                console.log("Billing list", res);
                showSpinner(false);
                if (res.result[0]) {
                    setAdvanceAvailable(res.result[0].cashBalance)
                }
                setData(res);
                setDataResult(res.result)
                setCount(res.result.length);
                console.log("list length", res.result.length);
                setShowLoader(false)
            })
            .catch((res) => {
                console.log("catch", res)
                showSpinner(false);
                setShowLoader(false)
            });
    }

    useEffect(() => {

        if (location.state !== null) {
            setShowPage(true)
            setShowSearch(false)
            setVisitId(location.state.visitId)
            setUnitId(location.state.unitId)
            if (location.state.cashBalance) {
                setAdvanceAvailable(location.state.cashBalance)
            }
            // for BIlling


            // 
            setComingData(location.state)
            console.log("ComingFrom Page", location.state.comingFrom)
            console.log("ComingFrom Page data", location.state)


            if (location.state.comingFrom !== 'quick registration') {
                callTableDataApi(location.state.visitId)
                // call if previous bill exist
                showSpinner(true);
                getPreviousBill(location.state.visitId)
                    .then((response) => {
                        setShowLoader(false)
                        let records = response.data.result

                        console.log("records", records);
                        if (records.length > 0) {
                            setEditService(true)
                            let recordTable = [...TableData]
                            let i = 0
                            for (let value of records) {
                                let rowObj = value

                                setValue(`Services[${i}].quantity`, rowObj.quantity)
                                setValue(`Services[${i}].serviceRate`, rowObj.serviceRate)
                                setValue(`Services[${i}].discountAmount`, rowObj.discountAmount)
                                setValue(`Services[${i}].discountPercent`, rowObj.discountPercent)
                                rowObj.previousId = rowObj.id
                                rowObj.serviceTotal = rowObj.serviceRate * rowObj.quantity
                                rowObj.serviceWDiscountTotal = rowObj.serviceRate * rowObj.quantity - rowObj.discountAmount
                                rowObj.value = rowObj.serviceId
                                recordTable.push(rowObj)
                                i++
                            }
                            console.log("previous data added", recordTable)
                            setTableData(recordTable);
                        }
                    }).catch((res) => {
                        setShowLoader(false)
                        console.log("catch", res)
                    })
            } else {
                console.log("coming from quick registration")
            }
        } else {
            console.log("Is Billing Details", location.state)
        }
    }, []);

    useEffect(() => {
        console.log('coming data', comingData)
    }, [comingData])

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
            console.log("sum is 0")
            setServiceDiscountAp(false)
        } else {
            console.log("sum is :", sum)
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
            setValue("Total", sum)
            setStrTotal(inWords(sum))
        } else {
            setShowDiscount(false)

            setValue("Total", finalTableTotal)
            setStrTotal(inWords(finalTableTotal))
        }

    }, [TableData]);


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

                // if("referrenceNo" in tableData[i+1]){
                //   console.log("refNo +1",tableData[i+1].referrenceNo)
                //   if(tableData[i+1].referrenceNo!== ""){
                //     setValue(`paymentDetails[${i}].referrenceNo`,tableData[i+1].referrenceNo)
                //   }else{
                //     setValue(`paymentDetails[${i}].referrenceNo`,"")
                //   }
                // }else{
                //   RemoveRefferenceNo(i, paymentDetails[i + 1].type)
                // }
            }
        }
    }

    const SearchResult = (event) => {

        let APiResult = event
        let serviceId = parseInt(APiResult.value)
        let Matching = checkExistAlready(serviceId)
        if (Matching) {
            alert("Service Already Exists");
        } else {
            AddRow(APiResult)
        }
    }
    const checkExistAlready = (ValueCheck) => {
        let match = false;
        for (let i = 0; i <= TableData.length - 1; i++) {
            // if(!TableData[i].isBilled ){
            if (!TableData[i].isBilled && ValueCheck === TableData[i].value) {
                match = true
                console.log("TableData Value Match", TableData[i].value)
                break;
            }
            // }

        }
        setTimeout(() => {
            setShowHideSubmit(true)
        }, 100)
        return match;
        // console.log("TableData Length",TableData.length)
    }

    const AddRow = (Row) => {
        let rowObj = Row
        let i = TableData.length
        if (rowObj.serviceRate == 0) {
            setValue(`Services[${i}].serviceRate`, ' ', { shouldValidate: true })
        } else {
            setValue(`Services[${i}].serviceRate`, rowObj.serviceRate)
        }
        setValue(`Services[${i}].quantity`, rowObj.quantity)
        setValue(`Services[${i}].discountAmount`, rowObj.discountAmount)
        setValue(`Services[${i}].discountPercent`, rowObj.discountPercent)
        rowObj.serviceTotal = Row.serviceRate * Row.quantity
        rowObj.serviceWDiscountTotal = Row.serviceRate * Row.quantity - Row.discountAmount
        // 
        // serviceCode
        // rateEditAllowed
        console.log("rowObj", rowObj)
        let arr = [...TableData, rowObj]
        setTableData([
            ...TableData,
            rowObj
        ])
        let validateError = false
        if (arr.length > 0) {
            validateError = true
        }
        console.log("clear errors", !!errors.notRegisteredInput)
        console.log("clear errors services", !!errors.Services)
        if (!!errors.notRegisteredInput) {
            // incorrectInputsMessage
            setValue('incorrectInputs', false)
            clearErrors('notRegisteredInput');
            clearErrors('Services');
        }
    }

    // proceed Service Page
    const [openServicePageProceed, setOpenServicePageProceed] = React.useState(false);
    const handelOpenServicePageProceed = () => setOpenServicePageProceed(true);
    const handleCloseServicePageProceed = () => {
        if (openServicePageProceed) {
            setOpenServicePageProceed(false)
        }
    };
    // genrate & pay later
    const [openPayNow, setOpenPayNow] = React.useState(false);
    const handelOpenPayNow = () => setOpenPayNow(true);
    const handleClosePayNow = () => {
        if (openPayNow) {
            setOpenPayNow(false)
        }
    };
    // pay later
    const [openPayLater, setOpenPayLater] = React.useState(false);
    const handelOpenPayLater = () => setOpenPayLater(true);
    const handleClosePayLater = () => {
        if (openPayLater) {
            setOpenPayLater(false)
        }
    };

    const onSubmit = (data) => {
        finalSubmit = {}
        servicesObj = []
        console.log("submitMsg", submitMsg)
        // comingData.visitId 
        console.log('TableData', TableData)
        console.log('deletedTableData', deletedTableData)
        console.log("data", data)


        for (let i = 0; i < TableData.length; i++) {
            let obj = {}
            if (TableData[i].previousId) {
                obj.id = Number(TableData[i].previousId)
            }
            // obj.opdIpdNumber = comingData.uhid
            if (TableData[i].discountApplicable) {
                obj.discountAmount = Number(TableData[i].discountAmount)
                obj.discountPercent = Number(TableData[i].discountPercent)
            }

            // if(TableData[i].isBilled !==undefined && TableData[i].isBilled !==null)
            // {
            obj.isBilled = false
            // }

            obj.quantity = Number(TableData[i].quantity),
                obj.rate = Number(TableData[i].serviceRate),

                // obj.total = Number(TableData[i].serviceRate)*Number(TableData[i].quantity)
                obj.services = { id: Number(TableData[i].value) }

            if (TableData[i].doctorShareApplicable) {
                if (TableData[i].doctor) {
                    if (TableData[i].doctor.value) {
                        obj.employee = { id: Number(TableData[i].doctor.value) }
                    }
                }
            }
            obj.doctorShareApplicable = TableData[i].doctorShareApplicable
            obj.cancelled = false
            obj.netAmount = TableData[i].serviceWDiscountTotal
            obj.totalAmount = TableData[i].serviceTotal
            servicesObj = [...servicesObj, obj]
        }
        // for deleted records
        if (deletedTableData.length > 0) {
            for (let i = 0; i < deletedTableData.length; i++) {
                let obj = {}
                if (deletedTableData[i].previousId) {
                    obj.id = Number(deletedTableData[i].previousId)
                }
                if (deletedTableData[i].discountApplicable) {
                    obj.discountAmount = Number(deletedTableData[i].discountAmount)
                    obj.discountPercent = Number(deletedTableData[i].discountPercent)
                }

                obj.isBilled = false
                obj.quantity = Number(deletedTableData[i].quantity),
                    obj.rate = Number(deletedTableData[i].serviceRate),
                    obj.services = { id: Number(deletedTableData[i].value) }

                if (deletedTableData[i].doctorShareApplicable) {
                    if (deletedTableData[i].doctor) {
                        if (deletedTableData[i].doctor.value) {
                            obj.employee = { id: Number(deletedTableData[i].doctor.value) }
                        }
                    }
                }
                obj.doctorShareApplicable = deletedTableData[i].doctorShareApplicable
                obj.cancelled = true
                obj.netAmount = deletedTableData[i].serviceWDiscountTotal
                obj.totalAmount = deletedTableData[i].serviceTotal
                servicesObj = [...servicesObj, obj]
            }
        }

        finalSubmit.discountInAmount = Number(data.discount)
        finalSubmit.discountInPercent = Number(data.discountPercent)
        finalSubmit.patientVisit = { id: Number(comingData.visitId) }
        finalSubmit.unit = { id: Number(unitId) }

        if (showDiscount) {
            finalSubmit.totalDiscountAmount = data.discountTotal
        } else {
            finalSubmit.totalDiscount = Number(0)
        }
        finalSubmit.totalAmount = data.Total
        finalSubmit.services = servicesObj

        if (submitMsg == "Generate") {
            finalSubmit.paymentInfoList = []
        }
        console.log("submit is called", finalSubmit)

        setFinalData(finalSubmit)
        // reset()
        // 
        // if(submitMsg=="AddServices"){
        //     handelOpenServicePageProceed(true)
        // }
        // else if(submitMsg=="Generate"){
        handelOpenPayLater()
        // }else if(submitMsg=="AddPayment"){

        // }
    }

    const [defaultPaymentType, setDefaultPaymentType] = useState({})
    // payment
    useEffect(() => {
        getPaymentTypes()
            .then(response => response.data)
            .then(res => {
                console.log("PaymentTypes", res.result)
                let gotPaymentTypes = [...res.result]
                let obj = gotPaymentTypes.find(o => o.default === true);
                setDefaultPaymentType(obj);
                setPaymentTypes(res.result)
            })
    }, [])

    const [paymentErrorsState, setPaymentErrorsState] = useState(null)
    const onSubmitPayment = (data) => {
        console.log("isValid", isValid)
        console.log("paymentErrorsState", paymentErrorsState)
        if (isValid) {
            console.log("payment data", data)

            // service page
            finalSubmit = {}
            servicesObj = []

            for (let i = 0; i < TableData.length; i++) {
                let obj = {}
                if (TableData[i].previousId) {
                    obj.id = Number(TableData[i].previousId)
                }
                // obj.opdIpdNumber = comingData.uhid
                if (TableData[i].discountApplicable) {
                    obj.discountAmount = Number(TableData[i].discountAmount)
                    obj.discountPercent = Number(TableData[i].discountPercent)
                }

                // if(TableData[i].isBilled !==undefined && TableData[i].isBilled !==null)
                // {
                obj.isBilled = false
                // }

                obj.quantity = Number(TableData[i].quantity),
                    obj.rate = Number(TableData[i].serviceRate),

                    // obj.total = Number(TableData[i].serviceRate)*Number(TableData[i].quantity)
                    obj.services = { id: Number(TableData[i].value) }

                if (TableData[i].doctorShareApplicable) {
                    if (TableData[i].doctor) {
                        if (TableData[i].doctor.value) {
                            obj.employee = { id: Number(TableData[i].doctor.value) }
                        }
                    }
                }
                obj.doctorShareApplicable = TableData[i].doctorShareApplicable
                obj.cancelled = false
                obj.netAmount = TableData[i].serviceWDiscountTotal
                obj.totalAmount = TableData[i].serviceTotal
                servicesObj = [...servicesObj, obj]
            }
            if (deletedTableData.length > 0) {
                for (let i = 0; i < deletedTableData.length; i++) {
                    let obj = {}
                    if (deletedTableData[i].previousId) {
                        obj.id = Number(deletedTableData[i].previousId)
                    }
                    if (deletedTableData[i].discountApplicable) {
                        obj.discountAmount = Number(deletedTableData[i].discountAmount)
                        obj.discountPercent = Number(deletedTableData[i].discountPercent)
                    }

                    obj.isBilled = false
                    obj.quantity = Number(deletedTableData[i].quantity),
                        obj.rate = Number(deletedTableData[i].serviceRate),
                        obj.services = { id: Number(deletedTableData[i].value) }

                    if (deletedTableData[i].doctorShareApplicable) {
                        if (deletedTableData[i].doctor) {
                            if (deletedTableData[i].doctor.value) {
                                obj.employee = { id: Number(deletedTableData[i].doctor.value) }
                            }
                        }
                    }
                    obj.doctorShareApplicable = deletedTableData[i].doctorShareApplicable
                    obj.cancelled = true
                    obj.netAmount = deletedTableData[i].serviceWDiscountTotal
                    obj.totalAmount = deletedTableData[i].serviceTotal
                    servicesObj = [...servicesObj, obj]
                }
            }

            let servData = getValues(["discount", "discountPercent", "discountTotal", "Total"]);
            console.log("servData", servData)



            finalSubmit.patientVisit = { id: Number(comingData.visitId) }
            finalSubmit.unit = { id: Number(unitId) }
            if (showDiscount) {
                finalSubmit.discountInAmount = Number(servData.discount)
                finalSubmit.discountInPercent = Number(servData.discountPercent)
                finalSubmit.totalDiscountAmount = servData.discountTotal
            } else {
                finalSubmit.discountInAmount = Number(0)
                finalSubmit.discountInPercent = Number(0)
                finalSubmit.totalDiscount = Number(0)
            }
            finalSubmit.totalAmount = servData.Total
            finalSubmit.services = servicesObj

            // 
            console.log("Payment", data.paymentDetails)
            console.log("table Data", paymentTableData)
            let DataTable = data.paymentDetails
            let TotalAmt = 0;

            // consume advance
            if (showPaymentArr) {
                let payments = []
                for (let i = 0; i < DataTable.length; i++) {
                    let obj = {};
                    console.log("DataTable[i].type", DataTable[i].type)
                    if (DataTable[i].type.label !== "Cash") {
                        obj.referenceNumber = DataTable[i].referrenceNo;
                    }
                    obj.paymentType = { id: parseInt(DataTable[i].type.value) };
                    obj.amount = Number(DataTable[i].amount);
                    TotalAmt = TotalAmt + Number(DataTable[i].amount)
                    payments = [...payments, obj]
                }
                finalSubmit.paymentInfoList = payments
                if (showPanCard) {
                    finalSubmit.panNumber = data.panNumber
                } else {
                    finalSubmit.panNumber = null
                }

                if (data.consumeAdvance) {
                    finalSubmit.consumeAdvance = data.consumeAdvance;
                    finalSubmit.consumeAmount = data.amountToConsume;
                }
            } else {
                finalSubmit.consumeAdvance = data.consumeAdvance;
                finalSubmit.consumeAmount = data.amountToConsume;
            }
            console.log("paymentInfoList", finalSubmit.paymentInfoList)
            console.log("Final Data payment", finalSubmit)
            setFinalData(finalSubmit)
            handelOpenPayNow()
        } else {
            console.log("Service Page Error", errors)
        }
    };
    // only Payment
    // pay later
    const [openPayment, setOpenPayment] = React.useState(false);
    const handelOpenPayment = () => setOpenPayment(true);
    const handleClosePayment = () => {
        if (openPayment) {
            setOpenPayment(false)
        }
    };
    const [openPaymentHistory, setOpenPaymentHistory] = React.useState(false);
    const handelOpenPaymentHistory = () => setOpenPaymentHistory(true);
    const handleClosePaymentHistory = () => {
        if (openPaymentHistory) {
            setOpenPaymentHistory(false)
        }
    };
    const [paymentBillId, setPaymentBillId] = useState()
    const [payableTotalModal, setPayableTotalModal] = useState()

    const paymentBill = (index, row) => {
        let billId = row['billId']
        let payableAmount = row['Outstanding Amount']
        console.log("cashBalance", row['cashBalance'])
        setAdvanceAvailable(row['cashBalance'])
        setPaymentBillId(billId)
        setPayableTotalModal(payableAmount)
        handelOpenPayment()
    }

    const showPaymentHistory = (index, row) => {
        let billId = row['billId']
        let payableAmount = row['Outstanding Amount']
        console.log("cashBalance", row['cashBalance'])
        setAdvanceAvailable(row['cashBalance'])
        setPaymentBillId(billId)
        setPayableTotalModal(payableAmount)
        handelOpenPaymentHistory()
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
                // setError('notRegisteredInput', { type: 'custom', message: 'Discount Rate Not Applicable' });
            } else {

                setValue('incorrectInputs', false)
                clearErrors('notRegisteredInput');
            }
            return TableTotalDiscount

        } else {
            return TableTotalDiscount
        }
    }

    function round(num) {
        let m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    }
    function roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }
    const amtSetInPercent = (calculatePercent) => {
        let discountPercent
        // discount in Amount
        if (calculatePercent) {
            let amountDiscount = getValues('discount')
            console.log("getValue Amount")
            console.log("total Discount Applicable", totalDiscountApplicable)
            discountPercent = roundToTwo((amountDiscount / totalDiscountApplicable) * 100)

            // set dicountPercent field
            setValue("discountPercent", discountPercent)
        } else { // discount in Percent
            let amountPercent = getValues('discountPercent')
            console.log("getValue Percent", amountPercent)
            console.log("total Discount Applicable", amountPercent)
            discountPercent = amountPercent

            // set dicount field
            let discountToAmt = (amountPercent * totalDiscountApplicable) / 100
            setValue("discount", discountToAmt)
        }
        if (discountPercent !== undefined && discountPercent !== "" && discountPercent !== "e" && discountPercent !== "E" && discountPercent !== "+" && discountPercent !== "-" && discountPercent >= 0) {
            let objTable = [...TableData]
            for (let i = 0; i < TableData.length; i++) {
                if (!TableData[i].isBilled && objTable[i].discountApplicable) {
                    // currentChanges
                    // discount in Amount for Table
                    let curDiscountAmt = roundToTwo((Number(discountPercent) * Number(objTable[i].quantity * objTable[i].serviceRate)) / 100)
                    objTable[i].discountAmount = curDiscountAmt
                    setValue(`Services[${i}].discountAmount`, curDiscountAmt)

                    // discount in Percent for Table
                    objTable[i].discountPercent = discountPercent
                    setValue(`Services[${i}].discountPercent`, discountPercent)

                    //Calculate DiscountTotal
                    objTable[i].serviceWDiscountTotal = roundToTwo(Number(objTable[i].serviceRate * objTable[i].quantity) - curDiscountAmt)
                }
            }
            console.log("objTable", objTable)
            setTableData(objTable)
        }
    }

    useEffect(() => {
        console.log('table errors', errors)
    }, [errors])

    const resetBeforeSearch = () => {
        setShowPage(false)
        setUnitId(null)
        setVisitId(null)
        setComingData(null)
        setEditService(false)
        setTableData([]);
        setAdvanceAvailable(0)
        setData([]);
        setDataResult([])
        setCount(null);
    }

    const setPatientBillDetails = (patientDetails) => {
        setShowPage(true)

        callTableDataApi(patientDetails.visitId)

        setUnitId(patientDetails.unitId)
        setVisitId(patientDetails.visitId)
        if (patientDetails.cashBalance) {
            setAdvanceAvailable(patientDetails.cashBalance)
        }
        // visitDate
        let comingObj = {
            'unitId': patientDetails.unitId,
            'PatientName': patientDetails.patientName,
            'UHID': patientDetails.uhid,
            'MoblieNo': patientDetails.mobileNumber,
            'Age': patientDetails.age,
            'visitDate': patientDetails.visitDate,
            'Department': null,
            'Doctor': null,
            'Category': null,
            'Company': null,
            'visitId': patientDetails.visitId //patientVisit
        }
        setComingData(comingObj)

        // call if previous bill exist
        showSpinner(true);
        getPreviousBill(patientDetails.visitId)
            .then((response) => {
                setShowLoader(false)
                let records = response.data.result

                console.log("records", records);
                if (records.length > 0) {
                    setEditService(true)
                    let recordTable = [...TableData]
                    let i = 0
                    for (let value of records) {
                        let rowObj = value

                        setValue(`Services[${i}].quantity`, rowObj.quantity)
                        setValue(`Services[${i}].serviceRate`, rowObj.serviceRate)
                        setValue(`Services[${i}].discountAmount`, rowObj.discountAmount)
                        setValue(`Services[${i}].discountPercent`, rowObj.discountPercent)
                        rowObj.previousId = rowObj.id
                        rowObj.serviceTotal = rowObj.serviceRate * rowObj.quantity
                        rowObj.serviceWDiscountTotal = rowObj.serviceRate * rowObj.quantity - rowObj.discountAmount
                        rowObj.value = rowObj.serviceId
                        recordTable.push(rowObj)
                        i++
                    }
                    console.log("previous data added", recordTable)
                    setTableData(recordTable);
                }
            }).catch((res) => {
                setShowLoader(false)
                console.log("catch", res)
            })
    }

    const [showPayNow, setShowPayNow] = useState(false)
    // const [showPayNow , setShowPayNow] = useState(false)

    const UseFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

        return [htmlElRef, setFocus]
    }

    const [showHideSubmit, setShowHideSubmit] = useState(true)
    const [input1Ref, setInput1Focus] = UseFocus()


    return (
        <div className='bg-slate-200 flex justify-center w-full'>
            {/* <Box sx={drawerOpen ? { height:"fit-content", width:{sm:'46rem', md:'36rem', lg:'66rem'}}:{ height:"fit-content", width:{sm:'46rem', md:'36rem', lg:'76rem'}}}> */}
            <Box sx={{ height: "fit-content", width: '96%', maxWidth: { sm: '46rem', md: '36rem', tab: '86rem', lg: '86rem' } }}>
                <div className="flex justify-center space-x-6 w-full mt-16">
                    {/* <Typography variant="h4" sx={{marginY:"1", marginRight:'2rem'}}> */}
                    {/* <span className="text-2xl font-semibold tracking-wide">
                            OPD Billing
                        </span> */}
                    <p className="text-center text-2xl my-2 text-gray-700  font-Poppins">
                        OPD Billing
                    </p>
                    {/* </Typography> */}
                </div>
                <div className="bg-white  min-h-screen h-fit px-8 py-2 mx-auto  ">

                    {
                        showSearch ? (
                            <Grid container spacing={2} >
                                <Grid item lg={4} sm={6} className="z-50">
                                    <SearchBar
                                        clearSearchBar={true}
                                        searchIcon={true}
                                        placeholder="Search Patient By Mobile No."
                                        dataArray={paitents}
                                        isSearchable={true}
                                        handleInputChange={(e) => {
                                            console.log(e)
                                            if (e.length > 0) {
                                                getPatientBill(e).then((response) => {
                                                    console.log(response);
                                                    setPaitents(response.data.result);
                                                });
                                            }
                                            if(e.length == 1){
                                                resetBeforeSearch()
                                            }
                                        }}
                                        onChange={(e) => {
                                            if (e !== null) {
                                                let patient = e;
                                                console.log("selected paitent", patient)

                                                resetBeforeSearch()
                                                setTimeout(()=>{
                                                    setPatientBillDetails(patient)
                                                },500)
                                            }else{
                                                resetBeforeSearch()
                                            }
                                        }}
                                    />

                                </Grid>
                            </Grid>
                        ) : ''
                    }

                    {showPage ? (
                        <>
                            {/* Paitent Inf0 */}
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
                                                        <span className='ml-2'>{`${comingData.Department}  `}</span>
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
                            {/* Billing Details */}
                            <div className='mx-auto w-full '>
                                <form id='serviceForm' onSubmit={handleSubmit(onSubmit)} className="mt-4" >
                                    <Grid container spacing={1} >
                                        <Grid item lg={2.2} sm={4} sx={{ marginY: '0.25rem' }} className="pt-4 mt-2 ml-5 flex flex-nowrap justify-between">
                                            <span className="font-semibold tracking-wide">
                                                Service Details &nbsp; :
                                            </span>
                                            <span className=" font-semibold tracking-wide">

                                            </span>
                                        </Grid>
                                        <Grid item lg={4} sm={6} className='z-40'>
                                            <SearchBar
                                                clearSearchBar={true}
                                                searchIcon={true}
                                                control={control}
                                                error={errors.inputSearch}
                                                type="button"
                                                name="inputSearch"
                                                placeholder="Search Services"
                                                dataArray={inputSearchArr}
                                                // className="w-96"
                                                isSearchable={true}
                                                //change option as per user input
                                                handleInputChange={(e) => {
                                                    if (e.length > 0) {
                                                        console.log(e)
                                                        getServicesInfo(e).then((response) => {
                                                            console.log(response);
                                                            setInputSearchArr(response.data.result);
                                                        });
                                                    }
                                                }}

                                                onChange={(e) => {
                                                    if (e !== null) {
                                                        console.log("selectedValue", e)
                                                        setShowHideSubmit(false)
                                                        SearchResult(e)
                                                        setInput1Focus()
                                                    }
                                                }}
                                            />

                                            {/* <button ref={input1Ref} onClick={()=>{console.log("hii")}}>s</button> */}
                                            {/* <Button
                                                // form="serviceForm"
                                                // type="submit"
                                                variant="contained"
                                                color="success"
                                                onClick={(e)=>{
                                                    
                                                    // e.preventDefault();
                                                    // submitMsg="Generate"
                                                }}              
                                        >
                                           s
                                        </Button> */}
                                        </Grid>
                                        <Box width="100%" />
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
                                                                    <span className=" font-bold whitespace-nowrap  mx-auto text-sm tracking-wide">Qty  &nbsp; &nbsp; &nbsp;</span>
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
                                                                            // console.log("my row",errors.Services?.[index]?.serviceRate)
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
                                                                                                        if (e.target.value !== "" && e.target.value !== "e" && e.target.value !== "E" && e.target.value !== "+" && e.target.value !== "-" && e.target.value > 0) {
                                                                                                            let newData = [...TableData];
                                                                                                            newData[index].quantity = e.target.value;
                                                                                                            newData[index].serviceTotal = Number(e.target.value * newData[index].serviceRate);
                                                                                                            if (row.discountApplicable) {
                                                                                                                let disAmtNow = roundToTwo((Number(e.target.value * newData[index].serviceRate) * newData[index].discountPercent) / 100)
                                                                                                                newData[index].discountAmount = disAmtNow
                                                                                                                setValue(`Services[${index}].discountAmount`, disAmtNow)
                                                                                                                // set overall discountAmount

                                                                                                                newData[index].serviceWDiscountTotal = Number(e.target.value * newData[index].serviceRate - disAmtNow);
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
                                                                                                        if (e.target.value !== "" && e.target.value !== "e" && e.target.value !== "E" && e.target.value !== "+" && e.target.value !== "-" && e.target.value > 0) {
                                                                                                            let newData = [...TableData];
                                                                                                            newData[index].serviceRate = e.target.value;
                                                                                                            newData[index].serviceTotal = Number(e.target.value * newData[index].quantity);
                                                                                                            if (row.discountApplicable) {
                                                                                                                let disAmtNow = roundToTwo((Number(newData[index].quantity * e.target.value) * newData[index].discountPercent) / 100)
                                                                                                                newData[index].discountAmount = disAmtNow
                                                                                                                setValue(`Services[${index}].discountAmount`, disAmtNow)
                                                                                                                // set overall discountAmount

                                                                                                                newData[index].serviceWDiscountTotal = Number(e.target.value * newData[index].quantity - disAmtNow);
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
                                                                                        {row.discountApplicable ? (
                                                                                            <span className=" font-medium whitespace-nowrap  mx-auto text-base tracking-wide">{row.serviceWDiscountTotal ? (<>{row.serviceWDiscountTotal}</>) : "0"}</span>
                                                                                        ) : (<span className=" font-medium whitespace-nowrap  mx-auto text-base tracking-wide">{row.serviceTotal ? (<>{row.serviceTotal}</>) : "0"} </span>
                                                                                        )}
                                                                                    </TableCell>
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
                                                    
                                                    {showDiscount ? (
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
                                                                    {showDiscount ? (<span className="tracking-wide capitalize text-right font-bold mt-4">
                                                                                Totals :
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
                                                    </TableRow>
                                                     ):''}   
                                                    <TableRow sx={!showDiscount ? {
                                                                "& td": {
                                                                    paddingY: 0.5, borderTop: 1
                                                                },
                                                                paddingY: 0.5, borderTop: 1
                                                            } : {
                                                                "& td": {
                                                                    paddingY: 0.5, borderTop: 1
                                                                },
                                                                paddingY: 0.5,
                                                            }}>
                                                            {
                                                                !showDiscount ? (<>
                                                                    <TableCell colSpan={6} align="justify" rowSpan={3} sx={{ fontSize: 20, color: 'rgb(11 131 165 )' }} className='capitalize text-customBlue'>
                                                                        {
                                                                            strTotal !== 'only' ? (<>{strTotal === "" ? "" : "Rupees"}  {strTotal}</>) : ''
                                                                        }
                                                                    </TableCell>
                                                                </>) : ''
                                                            }
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
                                                                    </>
                                                                ) : ''
                                                            }

                                                            <TableCell colSpan={2}>
                                                            </TableCell>
                                                    </TableRow>
                                                        </>
                                                    ):''}
                                                    
                                                                </>) : ''
                                                            }

                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                {
                                                    strTotal !== 'only' ? (
                                                        <>
                                                            <TableContainer
                                                                sx={{ maxHeight: 400 }}
                                                            >
                                                                <Table stickyHeader>
                                                                    <TableHead>
                                                                        <TableRow sx={{
                                                                            "& th": {
                                                                                paddingY: 0.1, borderBottom: 1
                                                                            },
                                                                        }}>
                                                                            <TableCell className="w-24" sx={{ width: '10rem' }} >
                                                                            </TableCell>
                                                                            <TableCell className="" sx={{ width: '20rem' }}>
                                                                            </TableCell>
                                                                            <TableCell className="w-32" >
                                                                            </TableCell>
                                                                            <TableCell className="w-48" >
                                                                            </TableCell>
                                                                            <TableCell className="w-48" >
                                                                            </TableCell>
                                                                            <TableCell className="w-48" >
                                                                            </TableCell>
                                                                            <TableCell className="" >
                                                                            </TableCell>
                                                                            <TableCell className="w-60 justify-center flex">
                                                                            </TableCell>
                                                                            <TableCell className="w-24 " >
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {
                                                                            showDiscount ? (<>
                                                                                <TableRow sx={{
                                                                                    "& td": {
                                                                                        paddingY: 0.5,
                                                                                    },
                                                                                }}>
                                                                                    <TableCell colSpan={5} align="justify" rowSpan={3} sx={{ fontSize: 20, color: 'rgb(11 131 165 )' }} className='capitalize text-customBlue'> {strTotal == "" ? "" : "Rupees"}  {strTotal}</TableCell>
                                                                                    <TableCell align="right" >
                                                                                        <span className="tracking-wide capitalize text-right  mt-4">
                                                                                            Sub Total :
                                                                                        </span>
                                                                                    </TableCell>
                                                                                    <TableCell align="left">
                                                                                        <fieldset disabled={true}>
                                                                                            <InputField
                                                                                                sx={{ width: '10rem', marginLeft: '0.5rem' }}
                                                                                                variant="outlined"
                                                                                                disabled={true}
                                                                                                type="number"
                                                                                                name="subTotal"
                                                                                                label=""
                                                                                                error={errors.subTotal}
                                                                                                control={control}
                                                                                            />
                                                                                        </fieldset>
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                                <TableRow sx={{
                                                                                    "& td": {
                                                                                        paddingY: 0.5,
                                                                                    },
                                                                                }}>
                                                                                    <TableCell align="right" >
                                                                                        <span className="tracking-wide capitalize text-right  mt-4">
                                                                                            Discount Total :
                                                                                        </span>
                                                                                    </TableCell>
                                                                                    <TableCell align="left">
                                                                                        <fieldset disabled={true}>
                                                                                            <InputField
                                                                                                sx={{ width: '10rem', marginLeft: '0.5rem' }}
                                                                                                variant="outlined"
                                                                                                disabled={true}
                                                                                                type="number"
                                                                                                name="discountTotal"
                                                                                                label=""
                                                                                                error={errors.discountTotal}
                                                                                                control={control}
                                                                                            />
                                                                                        </fieldset>
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            </>) : ""
                                                                        }
                                                                        <TableRow sx={{
                                                                            "& td": {
                                                                                paddingY: 0.5,
                                                                            },
                                                                        }}>
                                                                            {
                                                                                !showDiscount ? (<>
                                                                                    <TableCell colSpan={5} align="justify" rowSpan={3} sx={{ fontSize: 20, color: 'rgb(11 131 165 )' }} className='capitalize text-customBlue'>
                                                                                        {
                                                                                            strTotal !== 'only' ? (<>{strTotal === "" ? "" : "Rupees"}  {strTotal}</>) : ''
                                                                                        }
                                                                                    </TableCell>
                                                                                </>) : ''
                                                                            }
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
                                                                                                    sx={{ width: '10rem', marginLeft: '0.5rem', }}
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
                                                                                    </>
                                                                                ) : ''
                                                                            }

                                                                            <TableCell colSpan={2}>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </>) : ''
                                                }
                                            </div>

                                            {errors.incorrectInputsMessage && <p className='text-xl font-medium tracking-wide text-red-600 px-6'>{errors.incorrectInputsMessage.message}</p>}

                                            {errors.notRegisteredInput && <p className='text-xl font-medium tracking-wide text-red-600 px-6'>{errors.notRegisteredInput.message}</p>}
                                            {!errors.notRegisteredInput ? errors.Services && <p className='text-xl font-medium tracking-wide text-red-600 px-6'>Please Enter Correct Entries</p> : ""}
                                        </Grid>

                                        <Box width="100%" />

                                        {serviceDiscountAp ?
                                            (
                                                <fieldset className='ml-3 border w-full rounded-xl my-2 flex space-x-6 py-2 '>
                                                    <legend className='ml-6  rounded-xl mb-2 p-1'>
                                                        <p className="font-semibold tracking-wide mx-2">Discount Details
                                                        </p>
                                                    </legend>
                                                    <Grid container spacing={1} >
                                                        <Grid item lg={2.5} sm={4.5} >
                                                            <InputField
                                                                type="number"
                                                                name="discountPercent"
                                                                label="Discount In Percent"
                                                                error={errors.discountPercent}
                                                                control={control}

                                                                inputProps={{ min: 0, pattern: '[0-9]*', step: "any" }}
                                                                inputRef={{
                                                                    ...register("discountPercent", {
                                                                        required: "This is required.",
                                                                        minLength: 1, min: 0,
                                                                        onChange: (e) => {
                                                                            console.log("discountinpercent", e.target.value)
                                                                            setAmtInPercent(true) // stateChange
                                                                            amtSetInPercent(false) //functionCall
                                                                        },
                                                                    })
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item lg={0.5} sm={0.5} className="tracking-wide font-medium mt-3 -translate-x-2 translate-y-1">
                                                            <span className="text-xl">
                                                                %
                                                            </span>
                                                        </Grid>
                                                        <Grid item lg={2.5} sm={4.5} >
                                                            <InputField
                                                                type="number"
                                                                name="discount"
                                                                label="Discount In Amount"
                                                                error={errors.discount}
                                                                control={control}

                                                                inputProps={{ min: 0, pattern: '[0-9]*', step: "any" }}
                                                                inputRef={{
                                                                    ...register("discount", {
                                                                        required: "This is required.",
                                                                        minLength: 1, min: 0,
                                                                        onChange: (e) => {
                                                                            setAmtInPercent(false) // stateChange
                                                                            amtSetInPercent(true) //functionCall
                                                                        },
                                                                    })
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item lg={0.5} sm={0.5} className="tracking-wide font-medium mt-3 -translate-x-2 translate-y-1">
                                                            <span className="text-xl">
                                                                INR
                                                            </span>
                                                        </Grid>
                                                        {/* {
                                    showDiscount ? (
                                        <Grid item lg={6} sm={10} >
                                        <InputField
                                            name="discountReason"
                                            label="Discount Reason"
                                            error={errors.discountReason}
                                            control={control}
                                            inputRef={{...register("discountReason", {
                                            required: "This is required.",
                                            })}}
                                            />
                                    </Grid>
                                    ):""
                                    } */}
                                                        <Box width="100%" />
                                                    </Grid>
                                                </fieldset>) : ""
                                        }
                                    </Grid>
                                </form>
                            </div>



                            <OPDBillPayment
                                TableData={TableData}
                                defaultPaymentType={defaultPaymentType}
                                incomingTableData={incomingTableData}
                                showPayNow={showPayNow}
                                setShowPayNow={setShowPayNow}
                                paymentTypes={paymentTypes}
                                payableTotal={payableTotal}
                                paymentTableData={paymentTableData}
                                setPaymentTableData={setPaymentTableData}
                                setPaymentErrorsState={setPaymentErrorsState}
                                onSubmitPayment={onSubmitPayment}
                                advanceAvailable={advanceAvailable}
                                setFilterdPaymentTypes={setFilterdPaymentTypes}
                                filterdPaymentTypes={filterdPaymentTypes}
                                showPanCard={showPanCard}
                                setShowPanCard={setShowPanCard}
                                showPaymentArr={showPaymentArr}
                                setShowPaymentArr={setShowPaymentArr}
                            />

                            {
                                TableData.length == 0 ? '' : (
                                    <>
                                        <div className='flex justify-end w-full  mt-6 space-x-6'>

                                            {
                                                !showPayNow ? (
                                                    <>
                                                        {/* <Button
                                            form="serviceForm"
                                            type="submit"
                                            variant="outlined"
                                            color="info"
                                            onClick={()=>{submitMsg="AddServices";}}              
                                        >
                                            Pay Later
                                        </Button> */}


                                                        {showHideSubmit ? (
                                                            <>
                                                                <Button
                                                                    form="serviceForm"
                                                                    type="submit"
                                                                    variant="contained"
                                                                    color="success"
                                                                >
                                                                    Generate Bill
                                                                </Button>
                                                            </>
                                                        ) : ''}
                                                    </>
                                                ) : (
                                                    <>
                                                        {showHideSubmit ? (
                                                            <Button
                                                                form="paymentForm"
                                                                type="submit"
                                                                variant="contained"
                                                                color="success"
                                                                onClick={() => {
                                                                    submitMsg = "AddPayment";
                                                                    trigger()
                                                                }}
                                                            >
                                                                Pay Now
                                                            </Button>
                                                        ) : ""}
                                                    </>
                                                )
                                            }
                                        </div>
                                    </>
                                )
                            }

                            <Divider light sx={{ mt: 1 }} />
                            {/* Billing History */}
                            {data ? data.result ? data.result.length > 0 ?
                                (
                                    <div className='mx-auto px-2 w-full rounded-xl my-4 overflow-hidden  '>
                                        <legend className='ml-4  rounded-xl'>
                                            <p className="text-xl font-semibold tracking-wide mx-4">Billing History
                                            </p>
                                        </legend>

                                        <div className='lg:w-full sm:w-48'>
                                            {spinner ? (
                                                <div className="grid justify-center">
                                                    <LoadingSpinner />
                                                </div>
                                            ) : (<>
                                                {data ? data.result ? data.result.length > 0 ? (
                                                    <BillListingTable
                                                        drawerOpen={drawerOpen}
                                                        printView={printView}
                                                        visitId={visitId}
                                                        tableApiFunc={fetchAllBills}
                                                        dataResult={dataResult}
                                                        setDataResult={setDataResult}

                                                        data={data}
                                                        page={page}
                                                        setPage={setPage}
                                                        rowsPerPage={rowsPerPage}
                                                        setRowsPerPage={setRowsPerPage}
                                                        count={count}
                                                        paymentBill={paymentBill}
                                                        showPaymentHistory={showPaymentHistory}
                                                    />

                                                ) :
                                                    (
                                                        <div className="text-gray-500 font-bold text-center py-4">
                                                            <h1 className="text-center">No Records Found</h1>
                                                        </div>
                                                    ) : (
                                                    <div className="text-gray-500 font-bold text-center py-4">
                                                        <h1 className="text-center">No Records Found</h1>
                                                    </div>
                                                ) : (
                                                    <div className="text-gray-500 font-bold text-center py-4">
                                                        <h1 className="text-center">No Records Found</h1>
                                                    </div>
                                                )}
                                            </>)}

                                        </div>
                                    </div>
                                ) : '' : '' : ''
                            }
                        </>
                    ) : ''
                    }
                </div>
            </Box>
            {/* Save Service */}
            <ConfirmationModal
                confirmationOpen={openServicePageProceed}
                confirmationHandleClose={handleCloseServicePageProceed}

                confirmationLabel="Confirmation "
                confirmationMsg="Save Service details And Go To Appointment List?"
                confirmationButtonMsg="Save Services"
                confirmationSubmitFunc={(e) => {
                    handleCloseServicePageProceed()
                    submitMsg = "submitServices"


                    setShowLoader(true)
                    if (editService) {
                        putServices(finalData)
                            .then((response) => {
                                console.log(response);
                                if (response.data.statusCode === 200) {
                                    successAlert(response.data.message)
                                    setShowLoader(false)
                                    navigate(`/appointment/appointmentlist`,)
                                }
                            })
                            .catch((error) => {
                                errorAlert(error);
                                setShowLoader(false)
                            });
                    } else {
                        saveServicesMutate(finalData, {
                            onSuccess: (data, variables, context) => {
                                successAlert(data.data.message)
                                setShowLoader(false)
                                navigate(`/appointment/appointmentlist`,)
                            },
                            onError: (data) => {
                                setShowLoader(false)
                                errorAlert(data.message)
                            }
                        })
                    }
                }}
            />
            {/* generate and pay later */}
            {/* Paylater */}
            <ConfirmationModal
                confirmationOpen={openPayLater}
                confirmationHandleClose={handleClosePayLater}
                confirmationSubmitFunc={() => {
                    handleClosePayLater()
                    submitMsg = "payBill"


                    setShowLoader(true)
                    generateMutate(finalData, {
                        onSuccess: (data, variables, context) => {

                            setShowLoader(false)
                            console.log("data Successfully Added by David")
                            console.log("data", data)
                            billingData.billId = data.data.result
                            console.log("variables", variables)
                            console.log("context", context)
                            successAlert(data.data.message)
                            navigate(`/appointment/appointmentlist`)
                        },
                        onError: (data) => {
                            setShowLoader(false)
                            errorAlert(data.message)
                        }
                    });
                }}
                confirmationLabel="Confirmation "
                confirmationMsg="Generate Bill and Go To Appointment List ?"
                confirmationButtonMsg="Generate Bill"
            />
            {/* Paynow */}
            <ConfirmationModal
                confirmationOpen={openPayNow}
                confirmationHandleClose={handleClosePayNow}
                confirmationSubmitFunc={() => {
                    handleClosePayNow()
                    submitMsg = "payBill"
                    console.log("final Payment", finalData)
                    setShowLoader(true)
                    generateMutate(finalData, {
                        onSuccess: (data, variables, context) => {
                            console.log("data Successfully Added by David")
                            console.log("data", data)
                            billingData.billId = data.data.result
                            console.log("variables", variables)
                            console.log("context", context)
                            successAlert(data.data.message)
                            setShowLoader(false)
                            navigate(`/appointment/appointmentlist`)
                        },
                        onError: (data) => {
                            errorAlert(data.message)
                            setShowLoader(false)
                        }
                    });
                }}
                confirmationLabel="Confirmation "
                confirmationMsg="Generate Bill With Payment And Go To Appointment List ?"
                confirmationButtonMsg="Submit"
            />
            <PaymentHistory
                visitId={visitId}
                openPaymentHistory={openPaymentHistory}
                handleClosePaymentHistory={handleClosePaymentHistory}
                paymentBillId={paymentBillId}
            />
            <OpdPaymentModal

                defaultPaymentType={defaultPaymentType}
                visitId={visitId}
                callTableDataApi={callTableDataApi}
                comingData={comingData}
                openPayment={openPayment}
                handleClosePayment={handleClosePayment}
                paymentBillId={paymentBillId}
                paymentTypes={paymentTypes}
                payableTotalModal={payableTotalModal}
                advanceAvailable={advanceAvailable}
            />

            <CommonBackDrop
                openBackdrop={showLoader}
                setOpenBackdrop={setShowLoader}
            />
        </div>
    )
}
