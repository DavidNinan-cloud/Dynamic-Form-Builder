import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function CommonDetailsTable(props) {
  // which we can update by calling on setRows function
  const [rows, setRows] = React.useState([{ id: 1, qty: "" }]);
  const [disable, setDisable] = React.useState(true);
  React.useEffect(() => {
    console.log("The props for CommonDetails Table are ", props);
  }, [props]);

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, ["Id"]);
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    const list = [...headers];
    list[index][qty] = value;
    setRows(list);
  };
  return (
    <>
      <div className="grid w-auto">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Paper sx={{ width: "100%", my: 2, border: "1px solid lightgray" }}>
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
              className="rounded h-56 2xl:h-72"
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
                  {props.data.result.map((row, index, i) => {
                    console.log("row is", JSON.stringify(row));
                    return (
                      <TableRow key={index}>
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell className="whitespace-nowrap" key={i}>
                              <span>{row[header]}</span>
                              {header === "Qty" ? (
                                <input
                                  className="border rounded border-gray-300"
                                  type="number"
                                  size="small"
                                  name="qty"
                                  value={row.Qty}
                                  onChange={(e) => handleInputChange(e, i)}
                                  onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                      event.preventDefault();
                                    }
                                  }}
                                />
                              ) : (
                                ""
                              )}
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
      </div>
    </>
  );
}
