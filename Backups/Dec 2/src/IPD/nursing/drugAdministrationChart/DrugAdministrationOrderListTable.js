import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OrderListModal from "../drugAdministrationChart/OrderListModal";

const DrugScheduleListData = {
  message: "Drug Schedule list found",
  result: [
    {
      Id: 3,
      Date: "01/02/2022,11:30Am",
      Schedule: [
        { id: 1, SchedOne: "04:00 AM" },
        { id: 2, SchedTwo: "08:00 AM" },
        { id: 3, SchedThree: "11:00 AM" },
        { id: 4, SchedFour: "03:00 PM" },
        { id: 5, SchedFive: "06:00 PM" },
        { id: 6, SchedSix: "08:00 PM" },
        { id: 7, SchedSeven: "10:00 PM" },
        { id: 8, SchedEight: "12:00 PM" },
      ],
    },
    {
      Id: 2,
      Date: "01/02/2022,11:30Am",
      Schedule: [
        { id: 1, SchedOne: "04:00 AM" },
        { id: 2, SchedTwo: "08:00 AM" },
        { id: 3, SchedThree: "11:00 AM" },
        { id: 4, SchedFour: "03:00 PM" },
        { id: 5, SchedFive: "06:00 PM" },
        { id: 6, SchedSix: "08:00 PM" },
        { id: 7, SchedSeven: "10:00 PM" },
        { id: 8, SchedEight: "12:00 PM" },
      ],
    },
    {
      Id: 1,
      Date: "01/02/2022,11:30Am",
      Schedule: [
        { id: 1, SchedOne: "04:00 AM" },
        { id: 2, SchedTwo: "08:00 AM" },
        { id: 3, SchedThree: "11:00 AM" },
        { id: 4, SchedFour: "03:00 PM" },
        { id: 5, SchedFive: "06:00 PM" },
        { id: 6, SchedSix: "08:00 PM" },
        { id: 7, SchedSeven: "10:00 PM" },
        { id: 8, SchedEight: "12:00 PM" },
      ],
    },
    {
      Id: 6,
      Date: "01/02/2022,11:30Am",
      Schedule: [
        { id: 1, SchedOne: "04:00 AM" },
        { id: 2, SchedTwo: "08:00 AM" },
        { id: 3, SchedThree: "11:00 AM" },
        { id: 4, SchedFour: "03:00 PM" },
        { id: 5, SchedFive: "06:00 PM" },
        { id: 6, SchedSix: "08:00 PM" },
        { id: 7, SchedSeven: "10:00 PM" },
        { id: 8, SchedEight: "12:00 PM" },
      ],
    },
    {
      Id: 12,
      Date: "01/02/2022,11:30Am",
      Schedule: [
        { id: 1, SchedOne: "04:00 AM" },
        { id: 2, SchedTwo: "08:00 AM" },
        { id: 3, SchedThree: "11:00 AM" },
        { id: 4, SchedFour: "03:00 PM" },
        { id: 5, SchedFive: "06:00 PM" },
        { id: 6, SchedSix: "08:00 PM" },
        { id: 7, SchedSeven: "10:00 PM" },
        { id: 8, SchedEight: "12:00 PM" },
      ],
    },
    {
      Id: 31,
      Date: "01/02/2022,11:30Am",
      Schedule: [
        { id: 1, SchedOne: "04:00 AM" },
        { id: 2, SchedTwo: "08:00 AM" },
        { id: 3, SchedThree: "11:00 AM" },
        { id: 4, SchedFour: "03:00 PM" },
        { id: 5, SchedFive: "06:00 PM" },
        { id: 6, SchedSix: "08:00 PM" },
        { id: 7, SchedSeven: "10:00 PM" },
        { id: 8, SchedEight: "12:00 PM" },
      ],
    },
    {
      Id: 98,
      Date: "01/02/2022,11:30Am",
      Schedule: [
        { id: 1, SchedOne: "04:00 AM" },
        { id: 2, SchedTwo: "08:00 AM" },
        { id: 3, SchedThree: "11:00 AM" },
        { id: 4, SchedFour: "03:00 PM" },
        { id: 5, SchedFive: "06:00 PM" },
        { id: 6, SchedSix: "08:00 PM" },
        { id: 7, SchedSeven: "10:00 PM" },
        { id: 8, SchedEight: "12:00 PM" },
      ],
    },
    {
      Id: 101,
      Date: "01/02/2022,11:30Am",
      Schedule: [
        { id: 1, SchedOne: "04:00 AM" },
        { id: 2, SchedTwo: "08:00 AM" },
        { id: 3, SchedThree: "11:00 AM" },
        { id: 4, SchedFour: "03:00 PM" },
        { id: 5, SchedFive: "06:00 PM" },
        { id: 6, SchedSix: "08:00 PM" },
        { id: 7, SchedSeven: "10:00 PM" },
        { id: 8, SchedEight: "12:00 PM" },
      ],
    },
    {
      Id: 92,
      Date: "01/02/2022,11:30Am",
      Schedule: [
        { id: 1, SchedOne: "04:00 AM" },
        { id: 2, SchedTwo: "08:00 AM" },
        { id: 3, SchedThree: "11:00 AM" },
        { id: 4, SchedFour: "03:00 PM" },
        { id: 5, SchedFive: "06:00 PM" },
        { id: 6, SchedSix: "08:00 PM" },
        { id: 7, SchedSeven: "10:00 PM" },
        { id: 8, SchedEight: "12:00 PM" },
      ],
    },
  ],
  statusCode: 200,
  actions: ["Edit", "Delete"],
  count: 3,
};

export default function CommonSelectRowTable(props) {
  //state varibale for the table
  console.log("myData", props.data);

  const [rowIndex, setRowIndex] = React.useState("");
  const [DrugScheduleData, setDrugScheduleData] = React.useState(
    DrugScheduleListData
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (index, row) => {
    console.log("Selected row object is " + JSON.stringify(row));
    setRowIndex(index);
  };

  const handleCheckClick = (event, index, row) => {
    console.log("Checkbox value is " + event.target.checked);

    console.log("Selected row object is " + JSON.stringify(row));

    if (event.target.checked === true) {
      setRowIndex(index);
    } else if (event.target.checked === false) {
      setRowIndex("");
    }
  };

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["Id"]);

  //table start
  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%" }}>
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
              className="rounded h-32 2xl:h-auto"
            >
              <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {headers.map((header, index) => (
                      <TableCell
                        className="whitespace-nowrap"
                        key={index}
                        style={{ background: "#F1F1F1" }}
                      >
                        <span className="text-gray-600 font-bold">
                          {header}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.result.map((row, index) => {
                    return (
                      <TableRow
                        key={index.id}
                        tabIndex={-1}
                        onClick={() => {
                          handleClick(index, row);
                          handleOpen();
                        }}
                        style={{
                          backgroundColor: rowIndex === index ? "#FFC44B" : "",
                        }}
                      >
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              className="whitespace-nowrap"
                              key={row.id}
                            >
                              {row[header]}
                            </TableCell>
                          ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        <OrderListModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          data={DrugScheduleData}
          setDrugScheduleData={setDrugScheduleData}
        />
      </div>
    </>
  );
}
