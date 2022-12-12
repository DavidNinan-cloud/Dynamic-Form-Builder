import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const useKeyPress = (targetKey) => {
  console.log("targetKey is ");
  console.log(targetKey);
  const [keyPressed, setKeyPressed] = React.useState(false);

  console.log("targetKey is ");
  console.log(targetKey);

  React.useEffect(() => {
    const downHandler = ({ key }) => {
      console.log("key in the downHandler function is ");
      console.log(key);
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);
  return keyPressed;
};

export default function IndentItemsTable(props) {
  const [selected, setSelected] = React.useState([]);
  const [selectedObj, setSelectedObj] = React.useState({});
  const [rowIndex, setRowIndex] = React.useState("");
  console.log(props);
  const { dataResult, arrowKeyName, setArrowKeyName } = props;

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, [
    "Id",
    "IsTemplate",
    "IsCultureTest",
    "LabWorkOrderTestId",
  ]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClickRow = (index, row) => {
    console.log("Selected row object is " + JSON.stringify(row));
    setRowIndex(index);
  };

  const handleClick = (row, id, index) => {
    console.log("index", index);
    setArrowKeyName("Right Arrow Key");
    setSelectedObj(row);
    console.log("row", row);
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    newSelected = newSelected.concat(id);

    console.log("newSelected", newSelected);
    console.log("selectedIndex", selectedIndex);

    console.log("selected", selected);

    if (selectedIndex === 0) {
      newSelected = [];
      setSelected(null);
    }
    setSelected(newSelected);
  };

  //key press up down
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const arrowRightPressed = useKeyPress("ArrowRight");
  const arrowLeftPressed = useKeyPress("ArrowLeft");
  const enterPressed = useKeyPress("Enter");

  console.log("value of arrowUpPressed is " + arrowUpPressed);
  console.log("value of arrowDownPressed is " + arrowDownPressed);
  console.log("value of arrowRightPressed is " + arrowRightPressed);
  console.log("value of arrowLeftPressed is " + arrowLeftPressed);

  React.useEffect(() => {
    if (arrowLeftPressed === true) {
      setArrowKeyName("Left Arrow Key");
      setRowIndex(-1);
      setSelectedObj(null);
    }
  }, [arrowLeftPressed]);

  React.useEffect(() => {
    if (enterPressed === true) {
      console.log("record in the IndentItemsTable is ");
      console.log(selectedObj);

      if (selectedObj !== null) {
        props.setSelectedRow(selectedObj);
      }
      setArrowKeyName("Enter Key Pressed");
    }
  }, [enterPressed, selectedObj]);

  React.useEffect(() => {
    if (arrowUpPressed) {
      console.log("arrowUpPressed");
      console.log("selectedObj in DemoListTable is ");
      console.log("selected obj", selectedObj);
      console.log("rowIndex is ", rowIndex);
      let rIndex = rowIndex;

      //decrement index by 1
      if (arrowKeyName === "Right Arrow Key" || arrowKeyName === "") {
        if (rowIndex !== 0) {
          rIndex = rIndex - 1;
          setSelectedObj(dataResult[rIndex]);
          console.log("dataResult is ", dataResult);
          setRowIndex(rIndex);
        }
      }
    }
  }, [arrowUpPressed]);

  React.useEffect(() => {
    if (arrowDownPressed) {
      console.log("arrowDownPressed");
      console.log("selectedObj in DemoListTable is ");
      console.log("selected obj", selectedObj);
      console.log("rowIndex is ", rowIndex);
      let rIndex = rowIndex;

      //increment index by 1 when the value of rowIndex is not equal to the value of last index of dataResult array
      if (arrowKeyName === "Right Arrow Key" || arrowKeyName === "") {
        if (rowIndex !== dataResult.length - 1) {
          rIndex = rIndex + 1;
          setSelectedObj(dataResult[rIndex]);
          console.log("dataResult is ", dataResult);
          setRowIndex(rIndex);
        }
      }
    }
  }, [arrowDownPressed]);

  React.useEffect(() => {
    if (arrowKeyName === "Left Arrow Key") {
      setRowIndex(-1);
      setSelectedObj(null);
    }
    if (arrowKeyName === "Right Arrow Key" && selectedObj === null) {
      setRowIndex(0);
      setSelectedObj(dataResult[0]);
    }
  }, [arrowKeyName]);

  //table start
  return (
    <div className="w-auto grid">
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          {/* pagination */}

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
            className="rounded h-60 2xl:h-80 "
          >
            <Table size="small" component={Paper}>
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      paddingY: 0.5,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  {headers.map((header, index) => (
                    <TableCell className="whitespace-nowrap" key={index}>
                      <span className="text-gray-600 font-bold">{header}</span>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {dataResult.map((row, index) => {
                  {
                    const isItemSelected = isSelected(row.Id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => {
                          handleClick(event, row, row.Id);
                          handleClickRow(index, row);
                        }}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            setSelectedObj(row);
                          }
                        }}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.Id}
                        selected={isItemSelected}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
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
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
