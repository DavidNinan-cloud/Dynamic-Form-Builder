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

export default function CommonSelectableTable(props) {
  //state varibale for the table
  // console.log("myData", props.data);
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

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const [headers, setHeaders] = React.useState([]);
  React.useEffect(() => {
    if (props.data.length > 0) {
      const allHeaders = Object.keys(props.data[0]);

      const headersArr = removeHeaders(allHeaders, ["id"]);
      setHeaders(headersArr);
    }
  }, [props.data]);


  const deleteRow = (index) => {
    let newTemplateData = [...props.data];
    newTemplateData.splice(index, 1);
    props.setData(newTemplateData)
}

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
                    {props.serviceheaders.map((header, index) => (
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
                    <TableCell  style={{ background: "#F1F1F1" }}>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Actions
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.length > 0 ? (
                    <>
                      {props.data.map((row, index) => {
                        return (
                          <TableRow
                            key={index.id}
                            tabIndex={-1}
                            onClick={() => handleClick(index, row)}
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
                            <TableCell>
                              <a
                                href="##"
                                className="text-red-500 mr-3"
                                onClick={() => deleteRow(index)}
                              >
                                {<DeleteOutlineOutlinedIcon />}
                              </a>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </>
                  ) : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    </>
  );
}
