import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { Tooltip } from "@mui/material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop"; 
function createData(
  srNo,
  date,
  serviceCode,
  discription,
  qty,
  rate,
  totalAmount,
  discount,
  discountAmount,
  netAmount,
  paidAmount,
  paidAmountDate,
  balanceAmount,
  netPaybale
) {
  return {
    srNo,
    date,
    serviceCode,
    discription,
    qty,
    rate,
    totalAmount,
    discount,
    discountAmount,
    netAmount,
    paidAmount,
    paidAmountDate,
    balanceAmount,
    netPaybale,
  };
}

const rows = [
  createData(1, 12345, "2022-08-27", "lorem", 79560, 24, 4322, 10, 4100, 20),
  createData(2, 12345, "2022-02-22", "lorem", 33450, 24, 4322, 10, 4100, 20),
  createData(3, 12345, "2022-08-2", "lorem", 500000, 24, 4322, 10, 4100, 20),
  createData(4, 12345, "2022-10-7", "lorem", 15350, 24, 4322, 10, 4100, 20),
  createData(5, 12345, "2022-12-17", "lorem", 22000, 24, 4322, 10, 4100, 20),
  createData(6, 12345, "2022-08-27", "lorem", 1000000, 24, 4322, 10, 4100, 20),
  createData(7, 12345, "2022-02-22", "lorem", 96000, 24, 4322, 10, 4100, 20),
  createData(8, 12345, "2022-08-2", "lorem", 1000, 24, 4322, 10, 4100, 20),
  createData(9, 12345, "2022-10-7", "lorem", 45000, 24, 4322, 10, 4100, 20),
  createData(10, 12345, "2022-12-17", "lorem", 25000, 2400, 4322, 10, 4100, 20),
  // createData(
  //   9,
  //   12345,
  //   "2022-10-7",
  //   "lorem",
  //   45000,
  //   24,
  //   4322,
  //   10,
  //   4100,
  //   20
  // ),
  // createData(
  //   9,
  //   12345,
  //   "2022-10-7",
  //   "lorem",
  //   45000,
  //   24,
  //   4322,
  //   10,
  //   4100,
  //   20
  // ),
  // createData(
  //   9,
  //   12345,
  //   "2022-10-7",
  //   "lorem",
  //   45000,
  //   24,
  //   4322,
  //   10,
  //   4100,
  //   20
  // ),
  // createData(
  //   9,
  //   12345,
  //   "2022-10-7",
  //   "lorem",
  //   45000,
  //   24,
  //   4322,
  //   10,
  //   4100,
  //   20
  // ),
  // createData(
  //   9,
  //   12345,
  //   "2022-10-7",
  //   "lorem",
  //   45000,
  //   24,
  //   4322,
  //   10,
  //   4100,
  //   20
  // ),
  // createData(
  //   9,
  //   12345,
  //   "2022-10-7",
  //   "lorem",
  //   45000,
  //   24,
  //   4322,
  //   10,
  //   4100,
  //   20
  // ),
  // createData(
  //   9,
  //   12345,
  //   "2022-10-7",
  //   "lorem",
  //   45000,
  //   24,
  //   4322,
  //   10,
  //   4100,
  //   20
  // ),
  // createData(
  //   9,
  //   12345,
  //   "2022-10-7",
  //   "lorem",
  //   45000,
  //   24,
  //   4322,
  //   10,
  //   4100,
  //   20
  // ),
  // createData(
  //   9,
  //   12345,
  //   "2022-10-7",
  //   "lorem",
  //   45000,
  //   24,
  //   4322,
  //   10,
  //   4100,
  //   20
  // ),
  // createData(
  //   9,
  //   12345,
  //   "2022-10-7",
  //   "lorem",
  //   45000,
  //   24,
  //   4322,
  //   10,
  //   4100,
  //   20
  // ),
  // createData(
  //   9,
  //   12345,
  //   "2022-10-7",
  //   "lorem",
  //   45000,
  //   24,
  //   4322,
  //   10,
  //   4100,
  //   20
  // ),
  // createData(
  //   9,
  //   12345,
  //   "2022-10-7",
  //   "lorem",
  //   45000,
  //   24,
  //   4322,
  //   10,
  //   4100,
  //   20
  // ),
  // createData(
  //   9,
  //   12345,
  //   "2022-10-7",
  //   "lorem",
  //   45000,
  //   24,
  //   4322,
  //   10,
  //   4100,
  //   20
  // ),
  createData(9, 12345, "2022-10-7", "lorem", 45000, 24, 4322, 10, 4100, 20),
];

export default function DenseTable() {

  return (
    <div className=" w-auto overflow-x-scroll">
      <Box sx={{ width: 1800 }}>
        <Paper sx={{ width: "100%", border: "0.1px solid gainsboro" }}>
          <TableContainer className="rounded " sx={{ maxHeight: 300 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead
                sx={{
                  width: "120%",
                  "& th": {
                    paddingY: 1,
                  },
                }}
              >
                <TableRow
                  sx={{
                    width: "100%",
                    "& tr": {
                      paddingY: 1,
                    },
                  }}
                >
                  <TableCell
                    className="whitespace-nowrap"
                    // style={{ background: "#F1F1F1" }}
                    style={{ fontWeight: "600", paddingY: 1 }}
                  >
                    <span>Actions</span>
                  </TableCell>

                  <TableCell
                    style={{ fontWeight: "600", paddingY: 1 }}
                    align="left"
                  >
                    Bill No
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "600", paddingY: 1 }}
                    align="left"
                  >
                    Bill Date
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "600", paddingY: 1 }}
                    align="left"
                  >
                    Patient Name
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "600", paddingY: 1 }}
                    align="left"
                  >
                    Total Bill Amount
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "600", paddingY: 1 }}
                    align="left"
                  >
                    Commission Bill Amount
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "600", paddingY: 1 }}
                    align="left"
                  >
                    Commission Balance Amount
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "600", paddingY: 1 }}
                    align="left"
                  >
                    Credit Note
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "600", paddingY: 1 }}
                    align="left"
                  >
                    Non Billable Amount
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "600", paddingY: 1 }}
                    align="left"
                  >
                    Net Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.srNo}
                    sx={{
                      "&:last-child td, &:last-child th ,&:last-child tr": {
                        border: 0,
                        paddingY: 1,
                      },
                    }}
                  >
                    <TableCell className="px-4 py-1 flex whitespace-nowrap ">
                      <div className="flex">
                        <Tooltip title="Print Consent">
                          <a
                            href="##"
                            value="click"
                            className="text-[#e28a42] mr-1"
                          >
                            <LocalPrintshopIcon
                            // onClick={(e) => {
                            //   props.setOpen(true);
                            //   props.editRow(row);
                            // }}
                            />
                          </a>
                        </Tooltip>
                      </div>
                    </TableCell>

                    <TableCell
                      sx={{ paddingY: 1 }}
                      align="left"
                      className="whitespace-nowrap capitalize"
                    >
                      {row.date}
                    </TableCell>
                    <TableCell
                      sx={{ paddingY: 1 }}
                      align="left"
                      className="whitespace-nowrap capitalize"
                    >
                      {row.serviceCode}
                    </TableCell>
                    <TableCell
                      sx={{ paddingY: 1 }}
                      align="left"
                      className="whitespace-nowrap capitalize"
                    >
                      {row.discription}
                    </TableCell>
                    <TableCell
                      sx={{ paddingY: 1 }}
                      align="left"
                      className="whitespace-nowrap capitalize"
                    >
                      {row.qty}
                    </TableCell>
                    <TableCell
                      sx={{ paddingY: 1 }}
                      align="left"
                      className="whitespace-nowrap capitalize"
                    >
                      {row.rate}
                    </TableCell>
                    <TableCell
                      sx={{ paddingY: 1 }}
                      align="left"
                      className="whitespace-nowrap capitalize"
                    >
                      {row.totalAmount}
                    </TableCell>
                    <TableCell
                      sx={{ paddingY: 1 }}
                      align="left"
                      className="whitespace-nowrap capitalize"
                    >
                      {row.discount}
                    </TableCell>
                    <TableCell
                      sx={{ paddingY: 1 }}
                      align="left"
                      className="whitespace-nowrap capitalize"
                    >
                      {row.discountAmount}
                    </TableCell>
                    <TableCell
                      sx={{ paddingY: 1 }}
                      align="left"
                      className="whitespace-nowrap capitalize"
                    >
                      {row.netAmount}
                    </TableCell>
                    <TableCell
                      sx={{ paddingY: 1 }}
                      align="left"
                      className="whitespace-nowrap capitalize"
                    >
                      {row.paidAmount}
                    </TableCell>
                    <TableCell
                      sx={{ paddingY: 1 }}
                      align="left"
                      className="whitespace-nowrap capitalize"
                    >
                      {row.paidAmountDate}
                    </TableCell>
                    <TableCell
                      sx={{ paddingY: 1 }}
                      align="left"
                      className="whitespace-nowrap capitalize"
                    >
                      {row.balanceAmount}
                    </TableCell>
                    <TableCell
                      sx={{ paddingY: 1 }}
                      align="left"
                      className="whitespace-nowrap capitalize"
                    >
                      {row.netPaybale}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
