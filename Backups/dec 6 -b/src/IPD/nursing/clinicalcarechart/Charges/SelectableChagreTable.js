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

export default function SelectableChagreTable(props) {
  const { data, setData } = props;
  const [rowIndex, setRowIndex] = React.useState("");

  const handleClick = (index, row) => {
    console.log("Selected row object is " + JSON.stringify(row));
    setRowIndex(index);
  };

  // const handleCheckClick = (event, index, row) => {
  //   console.log("Checkbox value is " + event.target.checked);

  //   // console.log("Selected row object is " + JSON.stringify(row));

  //   if (event.target.checked === true) {
  //     setRowIndex(index);
  //   } else if (event.target.checked === false) {
  //     setRowIndex("");
  //   }
  // };

  const deleteRow = (index) => {
    let newTemplateData = [...props.data];
    newTemplateData.splice(index, 1);
    props.setData(newTemplateData);
  };

  //table start
  return (
    <>
      <div className="grid w-auto ">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%" }}>
            <TableContainer
              sx={{
                "&::-webkit-scrollbar": {
                  width: 7,
                  height: 20,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#7393B3",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "lightBlue",
                },
              }}
              className="rounded h-36"
            >
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {/* {props.serviceheaders.map((header, index) => (
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
                    <TableCell style={{ background: "#F1F1F1" }}>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Actions
                      </span>
                    </TableCell>

                    <TableCell
                      className="whitespace-nowrap"
                      style={{ background: "#F1F1F1" }}
                    >
                      <span className="text-gray-600 font-bold">
                        Service Name
                      </span>
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
                      <span className="text-gray-600 font-bold">
                        Doctor Name{" "}
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.map((charge, index) => {
                    console.log("Charges data is", data);
                    console.log("Charges doctor data is", data.doctor);

                    // doctor: {_id: 31}
                    // quantity:1
                    // serviceName:{id: 42, quantity: 1, value: 42, label: 'MINOR DRESSING CHARGES'}

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

                        <TableCell className="whitespace-nowrap">
                          {charge.serviceName.label}                        
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {charge.quantity}                        
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {charge.doctor.label}                        
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
