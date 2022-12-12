import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function PurchaseEnquiryTable(props) {
  const { tableApiFunc, searchString, quotationdata, setDataResult } = props;

  console.log("Table Props are", props.quotationdata.result);
  
  const deleteRow = (index) => {
    let newTemplateData = [...props.quotationdata];
    newTemplateData.splice(index, 1);
    props.setQuotationData(newTemplateData);
  };
  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%", my: 1 }}>
            <TableContainer
              sx={{
                "&::-webkit-scrollbar": {
                  width: 7,
                  height: 5,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#7393B3",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "lightBlue",
                },
              }}
              className="rounded h-56"
            >
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Actions</span>
                    </TableCell>

                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Item Name</span>
                    </TableCell>

                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">U.O.M.</span>
                    </TableCell>

                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Quantity</span>
                    </TableCell>

                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Rate</span>
                    </TableCell>

                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Amount</span>
                    </TableCell>

                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Concession</span>
                    </TableCell>

                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Excise</span>
                    </TableCell>

                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Tax</span>
                    </TableCell>
                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Net Amount</span>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {props.quotationdata.map((enquiry, index) => {
                    // console.log("enquiry", enquiry);
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <a
                            href="##"
                            className="text-red-500 mr-3"
                            onClick={() => deleteRow(index)}
                          >
                            {<DeleteOutlineOutlinedIcon />}
                          </a>
                        </TableCell>

                        {/*enquiry {itemMaster: {…}, uom: 1, packageSize: '20', Quantity: 5,} */}
                        <TableCell className="whitespace-nowrap">
                          {enquiry.itemMaster.label}
                        </TableCell>

                        <TableCell className="whitespace-nowrap">
                          {enquiry.uom}
                        </TableCell>

                        <TableCell className="whitespace-nowrap">
                          {enquiry.quantity}
                        </TableCell>

                        <TableCell className="whitespace-nowrap">
                          {enquiry.rate}
                        </TableCell>

                    
                        <TableCell className="whitespace-nowrap">
                          {enquiry.amount}
                        </TableCell>

                        <TableCell className="whitespace-nowrap">
                          {enquiry.concession}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {enquiry.excise}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {enquiry.tax}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {enquiry.netAmount}
                        </TableCell>

                       
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    </>
  );
}
