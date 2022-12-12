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
  const { tableApiFunc, searchString, itemData, setDataResult } = props;

  console.log("Table Props are", props.itemData.result);
  // console.log("Table itemData are", props.itemData);

  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();

  //actions
  const [deleteAction, setDeleteAction] = React.useState(true);
  const [confirmAction, setconfirmAction] = React.useState(false);
  const [rescheduleAction, setrescheduleAction] = React.useState(false);
  const [cancelAction, setcancelAction] = React.useState(false);

  // const callAgainTableApi = (recordsNeeded) => {
  //   console.log("defaultParams", defaultParams);
  //   tableApiFunc(defaultParams)
  //     .then((response) => response.data)
  //     .then((res) => {
  //       let incomingData = res.result;
  //       let onlyNeededData = incomingData.slice(-Math.abs(recordsNeeded));

  //       // append needed data
  //       let existData = [...itemData];
  //       for (let value of onlyNeededData) {
  //         existData.push(value);
  //       }
  //       setDataResult(existData);
  //     });
  // };

  // React.useEffect(() => {
  //   props.itemData.actions.forEach((action) => {
  //     if (action === "Delete") {
  //       setDeleteAction(true);
  //     }
  //     if (action === "Confirm") {
  //       setconfirmAction(true);
  //     }
  //     if (action === "Reschedule") {
  //       setrescheduleAction(true);
  //     }
  //     if (action === "Cancel") {
  //       setcancelAction(true);
  //     }
  //   });
  // }, []);

  // const removeHeaders = (headers, fieldToRemove) => {
  //   return headers.filter((v) => {
  //     return !fieldToRemove.includes(v);
  //   });
  // };

  //set rows object to table
  // const allHeaders = Object.keys(props.data.result[0]);

  // const headers = removeHeaders(allHeaders, ["Id"]);

  // console.log("Headers", allHeaders);

  const deleteRow = (index) => {
    let newTemplateData = [...props.itemData];
    newTemplateData.splice(index, 1);
    props.setItemData(newTemplateData);
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
                  height: 10,
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

                    {/* {headers.map((header, index) => (
                      <TableCell
                        className="whitespace-nowrap"
                        key={index}
                        style={{ background: "#F1F1F1" }}
                      >
                        <span className="text-gray-600 font-bold">
                          {header}
                        </span>
                      </TableCell>
                    ))} */}

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
                      <span className="text-gray-600 font-bold">Pack Size</span>
                    </TableCell>

                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">Remark</span>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {props.itemData.map((enquiry, index) => {
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

                        {/*enquiry {itemMaster: {…}, uom: 1, packageSize: '20', Quantity: 5, Remark: 'No Any reamark here'} */}
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
                          {enquiry.packSize}
                        </TableCell>

                        <TableCell className="whitespace-nowrap">
                          {enquiry.remark}
                        </TableCell>

                        {/* {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              className="whitespace-nowrap"
                              key={i}
                              onClick={() => {
                                props.displayView(row, index);
                              }}
                            >
                              {row[header]}
                            </TableCell>
                          ))} */}
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
