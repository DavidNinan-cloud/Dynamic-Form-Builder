import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../master/components/common/formfields/ConfirmationModal";
import { Checkbox } from "@mui/material";

const BedListView = (props) => {
  console.log("Props", props);
  const [openModal, setOpenModal] = React.useState(false);
  const [bedData, setBedData] = React.useState([]);
  const [bedDetails, setBedDetails] = React.useState();
  const [checked, setChecked] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (props.bedListData !== null) {
      setBedData(props.bedListData);
    }
  }, [props]);

  const handelOpenModal = (bedDetails) => {
    console.log(
      "Confirmation modal for post request has been opened",
      bedDetails
    );
    setOpenModal(true);
    setBedDetails(bedDetails);
  };
  //state variable to close the confirmation modal for bed  request
  const handleCloseModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
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

    value.allocatedflag === false ? handelOpenModal(value) : null;
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
                  {/* {item.allocatedflag ? (
                    <button
                      className="opacity-5  h-10 px-3 text-base font-medium  bg-customGreen text-white rounded "
                      disabled={true}
                    >
                      Add Bed
                    </button>
                  ) : (
                    <button
                      className="h-10 px-3 text-base font-medium  bg-customGreen text-white rounded "
                      disabled={false}
                      onClick={() => {
                        handleClick(item);
                      }}
                    >
                      Add Bed
                    </button>
                  )} */}
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

      <ConfirmationModal
        confirmationOpen={openModal}
        confirmationHandleClose={handleCloseModal}
        confirmationSubmitFunc={() => addRecord(bedDetails)}
        confirmationLabel="Confirmation"
        confirmationMsg="Click to add this bed ?"
        confirmationButtonMsg="Add"
      />
    </div>
  );
};

export default BedListView;
