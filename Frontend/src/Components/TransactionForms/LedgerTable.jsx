import React from 'react'
import { Box, Button, Divider, Grid, Modal, Tooltip } from "@mui/material";
import Close from '@mui/icons-material/DisabledByDefaultOutlined';
import { useForm, useFormContext } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useDidMountEffect from '../Common Components/Custom Hooks/useDidMountEffect';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary
  } from "@mui/material";


export default function LedgerTable({ledgerData}) {
    const allHeaders = Object.keys(ledgerData[0]);
    const removeHeaders = (headers, fieldToRemove) => {
        return headers.filter((v) => {
          return !fieldToRemove.includes(v);
        });
      };

    const headers = removeHeaders(allHeaders, []);
    
    const [ledgerDetails,setLedgerDetails] = useState(null)
    const [ledgerIncorret,setLedgerIncorret] = useState(false)
    useDidMountEffect(()=>{
        let arr = [...ledgerData]
        let totalDebit = 0
        let totalCredit = 0
        for(let item of arr){
            totalDebit = totalDebit + Number(item.Debit)
            totalCredit = totalCredit + Number(item.Credit)
        }

        let obj = {
            totalDebit:totalDebit,
            totalCredit:totalCredit
        }
        setLedgerDetails(obj)
    },[ledgerData])

    useDidMountEffect(()=>{
      if(ledgerDetails !== null){
        if(ledgerDetails.totalDebit !== ledgerDetails.totalCredit){
          setLedgerIncorret(true)
        }else{
          setLedgerIncorret(false)
        }
      }
    },[ledgerDetails])

    const [expandPanal1, setExpandPanal1] = useState(true);
    const handleChangePanal1 = () => {
        setExpandPanal1(!expandPanal1);
      };
  return (
    <>
            <div className='mt-6'>
                <Accordion
                      expanded={expandPanal1}
                      onChange={handleChangePanal1}
                      elevation={6}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        sx={{
                          "&.Mui-expanded": {
                            borderBottom: '2px solid Black',
                            marginBottom: "-1rem",
                          },
                          "& .MuiAccordionSummary-content.Mui-expanded": {
                            margin: 0,
                          },
                        }}
                      >
                        <p className="font-bold tracking-wide">Ledger View</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* component */}
                        {
                            ledgerData && ledgerData.length > 0 ? (
                                
                    <div>
                    <TableContainer stickyHeader sx={{ marginTop: "2rem" ,position:"relative",zIndex:0}} className="rounded  border ">
                        <Table
                                        size="small"
                                        stickyHeader
                                        aria-label="sticky table">
                            <TableHead>
                                    <TableRow
                                            sx={{
                                                "& th": {
                                                paddingY: 0.5,
                                                backgroundColor: "#F1F1F1",
                                                },
                                            }}
                                    >

                                {headers && headers.map((header, index) => (
                                  <TableCell
                                    className="whitespace-nowrap"
                                    key={index}
                                  >
                                      <span className="text-gray-600 font-bold">
                                          {header}
                                      </span>
                                  </TableCell>
                                ))}
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                            { 
                                ledgerData && ledgerData.map((row, index) => {
                                  return (
                                    <TableRow key={index}
                                    sx={{
                                      "& td": {
                                        paddingY: 1,
                                      },
                                    }}
                                    >
                                      {headers &&
                                        headers.map((header, index) => (
                                          <>

                                          <TableCell
                                            className="whitespace-nowrap"
                                            key={index}
                                          >
                                            {row[header]}
                                          </TableCell>
                                          
                                          </>
                                        ))}
                                    </TableRow>
                                  );
                                })}
                            </TableBody>

                        </Table>
                    </TableContainer>

                    <div 
                        className={ledgerIncorret ? 'w-full flex justify-end font-bold tracking-wide space-x-6 mt-6 text-red-600' : 'w-full flex justify-end font-bold tracking-wide space-x-6 mt-6'}
                        >
                                <div>Total Debit : {ledgerDetails ? ledgerDetails.totalDebit :''}</div>
                                <div>Total Credit : {ledgerDetails ? ledgerDetails.totalCredit :''}</div>
                    </div>
                    {
                      ledgerIncorret ? (
                        <div className='text-red-600 font-bold tracking-wide'>
                                    The Transaction Data is Incorrect 
                        </div>
                      ):''
                    }
                </div>
                            ):''
                        }
                      </AccordionDetails>
                </Accordion>
            </div>
    </>
  )
}
