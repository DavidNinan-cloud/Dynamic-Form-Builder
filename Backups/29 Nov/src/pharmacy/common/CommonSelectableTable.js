import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CommonIndentItemsTable from "./CommonIndentItemsTable";

export default function CommonSelectableTable(props) {
  //state varibale for the table
  console.log("myData", props.data);
  const [rowIndex, setRowIndex] = React.useState("");

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

  const keyPress = () => {
    return (
      <div>
        {props.data.result.map((row) => {
          console.log(row);
        })}
      </div>
    );
  };
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
                  height: 20,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#7393B3",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "lightBlue",
                },
              }}
              className="rounded h-44 2xl:h-60"
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
                        hover
                        key={index.id}
                        tabIndex={-1}
                        onClick={() => {
                          handleClick(index, row);
                        }}
                        onKeyPress={keyPress}
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
        <div>{/* <CommonIndentItemsTable  keyPress={keyPress}/> */}</div>
      </div>
    </>
  );
}
