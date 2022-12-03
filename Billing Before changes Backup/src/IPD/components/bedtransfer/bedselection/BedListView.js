import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { Checkbox, Modal } from "@mui/material";

import { Box } from "@mui/system";
import PatientInfoModal from "./PatientInfoModal";

const BedListView = (props) => {
  console.log("Props", props);
  const [openTransferModal, setOpenTransferModal] = React.useState(false);
  const [bedData, setBedData] = React.useState([]);
  const [bedDetails, setBedDetails] = React.useState();
  const [checked, setChecked] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (props.bedListData !== null) {
      setBedData(props.bedListData);
    }
  }, [props]);

  //state variable to open the confirmation modal for bed add request
  const handelTransferOpenModal = (bedDetails) => {
    console.log(
      "Confirmation modal for post request has been opened",
      bedDetails
    );
    setOpenTransferModal(true);
    setBedDetails(bedDetails);
  };

  //state variable to close the confirmation modal for bed  request
  const handleTransferCloseModal = () => {
    // if (openModal) {
    setOpenTransferModal(false);
    // }
  };

  function addRecord(bedDetails) {
    console.log("A new bed  has been added", bedDetails);
    //handleSubmit of React hook forms can be invoked remotely as well
    const params = {
      room: bedDetails.room,
      bedNo: bedDetails.bedcode,
      bedId: bedDetails.bedid,
      ward: bedDetails.ward,
      floors: bedDetails.floors,
      block: bedDetails.block,
      bedcategory: bedDetails.bedcategory,
    };
    navigate("/ipd/admission", { state: params });
    setOpenModal(false);
    props.handleClose();
  }

  const isSelected = (name) => checked.indexOf(name) !== -1;

  const handleToggle = (value, id) => () => {
    console.log("Current", value, id);
    const selectedIndex = checked.indexOf(id);
    // const currentIndex = checked.indexOf(value);
    let newChecked = [];

    newChecked = newChecked.concat(id);

    if (selectedIndex === 0) {
      newSelected = [];
      setChecked(null);
    }
    setChecked(newChecked);

    value.allocatedflag === false ? handelTransferOpenModal(value) : null;
  };

  return (
    <div>
      <Table stickyHeader sx={{ overflow: "scroll" }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Actions
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Status
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Bed Code
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Bed Category
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Room
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Floor
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Block
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600 font-bold whitespace-nowrap">
                Ward
              </span>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {bedData.map((item, index) => {
            const isItemSelected = isSelected(item.bedid);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                key={index}
                role="checkbox"
                button
                onClick={handleToggle(item, item.bedid)}
                aria-checked={isItemSelected}
                tabIndex={-1}
                selected={isItemSelected}
              >
                <TableCell disablePadding sx={{ width: "0px" }}>
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                    size="small"
                  />
                </TableCell>

                {item.allocatedflag ? (
                  <TableCell>
                    <p className="text-red-500 font-bold rounded">
                      Unavailable
                    </p>
                  </TableCell>
                ) : (
                  <TableCell>
                    <p className="text-green-500 font-bold rounded">
                      Available
                    </p>
                  </TableCell>
                )}

                <TableCell>{item.bedcode}</TableCell>
                <TableCell>{item.bedcategory.label}</TableCell>
                <TableCell>{item.room.label}</TableCell>
                <TableCell>{item.floors.label}</TableCell>
                <TableCell>{item.block.label}</TableCell>
                <TableCell>{item.ward.label}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Modal
        open={openTransferModal}
        onClose={handleTransferCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "white",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <PatientInfoModal
            handleTransferCloseModal={handleTransferCloseModal}
            handleCloseTransfer={props.handleCloseTransfer}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default BedListView;
