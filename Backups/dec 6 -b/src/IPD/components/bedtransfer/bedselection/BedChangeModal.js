import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import {
  getBedCategory,
  getBedList,
  getBlock,
  getFloor,
  getUnits,
  getWard,
} from "../../../commonservices/bedModalServices";
import { useState } from "react";
import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import ToggleBedView from "./ToggleBedView";
import ShowButton from "../../../../Common Components/Buttons/ShowButton";
import { ResetButton } from "../../../../Common Components/Buttons/CommonButtons";

function BedChangeModal(props) {
  const schema = yup.object().shape({
    bedCategory: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Please Select Bed Category"),
        label: yup.string().required("Please Select Bed Category"),
      }),
    ward: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Please Select Ward"),
        label: yup.string().required("Please Select Ward"),
      }),
    floor: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Please Select Floor"),
        label: yup.string().required("Please Select Floor"),
      }),
    unit: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("Please Select Unit"),
        label: yup.string().required("Please Select Unit"),
      }),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    id: "",
    bedCategory: null,
    ward: null,
    floor: null,
    unit: null,
  };
  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });
  const [selected, setSelected] = React.useState(false);
  const [checkedLabel, setCheckedLabel] = React.useState(false);

  // STATES FOR BED MODAL APIS
  const [units, setUnits] = useState();
  const [unitId, setUnitId] = useState(null);
  const [blocks, setBlocks] = useState();
  const [blockId, setBlockId] = useState(null);
  const [floors, setFloors] = useState();
  const [floorId, setFloorId] = useState(null);
  const [wards, setWards] = useState();
  const [wardId, setWardId] = useState(null);
  const [bedCategoryList, setBedCategoryList] = useState();
  const [bedCategoryListId, setBedCategoryListId] = useState(null);
  const [bedListData, setBedListData] = useState(null);
  const [pageNo, setPageNo] = useState(0);

  const searchData = {
    block: blockId,
    classType: bedCategoryListId,
    floor: floorId,
    unit: unitId,
    ward: wardId,
    room: null,
    page: 0,
    size: 10,
    searchString: "",
  };

  // toggle button
  const handleChanger = (e) => {
    setSelected(e.target.value);
  };
  //radio button
  const handleChangerLabel = (e) => {
    setCheckedLabel(e.target.value);
  };
  //toggle button
  useEffect(() => {
    setSelected("bedAllocation");
  }, []);
  //radio button
  useEffect(() => {
    setCheckedLabel("all");
  }, []);

  //API INTEGRATION FOR BED MODAL//
  // 1. Unit List API
  useEffect(() => {
    getUnits()
      .then((response) => {
        setUnits(response.data.result);
      })
      .catch((response) => {
        console.log("Error Response", response);
      });
  }, []);
  // 2. Block List API
  useEffect(() => {
    if (unitId !== null) {
      getBlock(unitId)
        .then((response) => {
          setBlocks(response.data.result);
        })
        .catch((response) => {
          console.log("Error Response", response);
        });
    }
  }, [unitId]);

  // 3. Floor List API
  useEffect(() => {
    if (unitId !== null && blockId !== null) {
      getFloor(unitId, blockId)
        .then((response) => {
          setFloors(response.data.result);
        })
        .catch((response) => {
          console.log("Error Response", response);
        });
    }
  }, [unitId, blockId]);

  // 4. Ward List API
  useEffect(() => {
    if (unitId !== null && blockId !== null && floorId !== null) {
      getWard(unitId, blockId, floorId)
        .then((response) => {
          setWards(response.data.result);
        })
        .catch((response) => {
          console.log("Error Response", response);
        });
    }
  }, [unitId, blockId, floorId]);

  // 4. Bed Category List API
  useEffect(() => {
    getBedCategory()
      .then((response) => {
        setBedCategoryList(response.data.result);
      })
      .catch((response) => {
        console.log("Error Response", response);
      });
  }, []);

  //5. Bed List API
  useEffect(() => {
    console.log("Search Data", searchData);
    getBedList(searchData)
      .then((response) => {
        if (response.data.statusCode === 200) {
          let bedList = [];
          response.data.result.forEach((jsonString) => {
            let jsonObject = JSON.parse(jsonString);
            bedList.push(jsonObject);
          });
          console.log("Bed List Data", bedList);
          setBedListData(bedList);
        } else {
          setBedListData([]);
        }
      })
      .catch((res) => {
        console.log("Bed List Error", res);
      });
  }, [unitId, blockId, floorId, wardId, pageNo, bedCategoryListId]);

  //6. Infinite Scroll
  const getBeds = (e) => {
    var bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 20;
    if (bottom) {
      let pg = pageNo + 1;
      setPageNo(pg);
      console.log("pageNo", pageNo);
    }
  };

  const handleReset = () => {
    setBlockId(null);
    setBedCategoryListId(null);
    setFloorId(null);
    setUnitId(null);
    setWardId(null);
  };

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");

    let postedObj = {
      unit: {
        unitName: data.unit.label,
        id: data.unit.value,
      },
      ward: {
        wardName: data.ward.label,
        id: data.ward.value,
      },
      floor: {
        floorName: data.floor.label,
        id: data.floor.value,
      },
      bedCategory: {
        bedCategoryName: data.bedCategory.label,
        id: data.bedCategory.value,
      },
      id: data.id,
    };
    //to set the form fields as blank
    reset(defaultValues);
  };
  return (
    <div className="bg-white ">
      <Modal
        open={props.openTransferBed}
        onClose={props.handleCloseTransfer}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflowY: "scroll",
            bgcolor: "background.paper",
            boxShadow: 24,
          }}
          className="h-[95%] 2xl:h-[80%] w-[95%]"
          onScroll={getBeds}
        >
          <div className="sticky top-0 z-50 bg-white  w-full ">
            <div className=" w-full flex justify-end">
              <CancelPresentationIcon
                className="absolute right-5 top-4 text-red-600  rounded cursor-pointer"
                onClick={() => {
                  props.handleCloseTransfer();
                }}
              />
            </div>
            <div className="z-50 bg-white mt-14 w-full h-auto sticky top-0">
              <form onSubmit={handleSubmit(onSubmitDataHandler)}>
                <div className="grid grid-cols-3 xl:grid-cols-8 gap-2 px-6 my-2 border-b-2 pb-4 items-center mx-auto">
                  {/* //Unit// */}
                  <div className=" w-full col-span-2">
                    <DropdownField
                      control={control}
                      name="unit"
                      placeholder="Unit"
                      dataArray={units}
                      inputRef={{
                        ...register("unit", {
                          onChange: (e) => {
                            console.log(e.target.value.id);
                            setUnitId(e.target.value.id);
                          },
                        }),
                      }}
                    />
                  </div>
                  {/* //Block// */}
                  <div className=" w-full">
                    <DropdownField
                      control={control}
                      name="block"
                      placeholder="Block"
                      dataArray={blocks}
                      inputRef={{
                        ...register("block", {
                          onChange: (e) => {
                            console.log(e.target.value.id);
                            setBlockId(e.target.value.id);
                          },
                        }),
                      }}
                    />
                  </div>
                  {/* //Floor// */}
                  <div className=" w-full">
                    <DropdownField
                      control={control}
                      name="floor"
                      placeholder="Floor"
                      dataArray={floors}
                      inputRef={{
                        ...register("floor", {
                          onChange: (e) => {
                            console.log(e.target.value.id);
                            setFloorId(e.target.value.id);
                          },
                        }),
                      }}
                    />
                  </div>
                  {/* //Ward// */}
                  <div className=" w-full">
                    <DropdownField
                      control={control}
                      name="ward"
                      placeholder="Ward"
                      dataArray={wards}
                      inputRef={{
                        ...register("ward", {
                          onChange: (e) => {
                            console.log(e.target.value.id);
                            setWardId(e.target.value.id);
                          },
                        }),
                      }}
                    />
                  </div>
                  {/* //Bed Category// */}
                  <div className=" w-full lg:col-span-2">
                    <DropdownField
                      control={control}
                      name="bedCategory"
                      placeholder="Bed Category"
                      dataArray={bedCategoryList}
                      inputRef={{
                        ...register("bedCategory", {
                          onChange: (e) => {
                            console.log(e.target.value.id);
                            setBedCategoryListId(e.target.value.id);
                          },
                        }),
                      }}
                    />
                  </div>
                  {/* //Reset// */}
                  <ResetButton onClick={handleReset} />
                </div>
              </form>
            </div>
          </div>
          <div className="w-full">
            {bedListData && bedListData.length > 0 ? (
              <ToggleBedView
                bedListData={bedListData}
                handleCloseTransfer={props.handleCloseTransfer}
              />
            ) : (
              <div className="text-gray-500 font-bold text-center ">
                <h1 className="text-base text-center">Bed Is Not Available</h1>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default BedChangeModal;
