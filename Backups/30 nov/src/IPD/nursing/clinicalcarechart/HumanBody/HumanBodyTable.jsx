import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";

export default function HumanBodyTable(props){
    const [spinner,setSpinner] = React.useState(false)
    const removeHeaders = (headers, fieldToRemove) => {
        return headers.filter((v) => {
          return !fieldToRemove.includes(v);
        });
      };
    //set rows object to table
    const allHeaders = Object.keys(props.data[0]);

    const headers = removeHeaders(allHeaders, ["id","patientId","patientVisitId","Appointment Id","doctorId","Department Id","UHID","patientCategoryId"]);

    return(
        <div className=" mx-auto my-2 h-full">
        <Box sx={{ width: "100%" , height:'100%' }}>
          <Paper sx={{ width: "100%", mb: 2, height:'100%' }}>
            
            <TableContainer  sx={{ marginTop: "0.8rem", height:'100%' }} className="rounded ">
              <Table stickyHeader>
                <TableHead>
                  <TableRow
                  sx={{
                    "& th": {
                      paddingY: 1,
                    },
                  }}
                  style={{ background: "#F1F1F1" }}
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
                  {spinner ? (
                    <div className=" flex mx-auto justify-center">
                      <LoadingSpinner />
                    </div>
                  ) : <>
                  { 
                    props.data && props.data.map((row, index) => {
                      return (
                        <TableRow key={index}
                        sx={{
                          "& td": {
                            paddingY: 1,
                          },
                        }}sss
                        >
                          {headers &&
                            headers.map((header, index) => (
                              <TableCell
                                className="whitespace-nowrap"
                                key={index}
                              >
                                {row[header]}
                              </TableCell>
                            ))}
                        </TableRow>
                      );
                    })}
                  </>}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    )
}