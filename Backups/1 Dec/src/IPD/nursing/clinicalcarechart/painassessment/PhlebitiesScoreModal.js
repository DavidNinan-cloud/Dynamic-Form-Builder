import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Style } from "../../../../IPD/components/bedallowcation/Style";
import CommonTable from "../../common/CommonTable";
import CheckBoxField from "../../../../Common Components/FormFields/CheckBoxField";
//imports from react hook form
import { useForm } from "react-hook-form";
//imports from the yup library
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveButton from "../../../../Common Components/Buttons/SaveButton";
import ResetButton from "../../../../Common Components/Buttons/ResetButton";
import CancelPresentationIconButton from "../../../../Common Components/Buttons/CancelPresentationIconButton";

const data = {
  message: "Phlebitis list found ",
  result: [
    {
      Id: 30,
      DateAndTime: "01/02/2022,11:30AM",
      "Added/UpdatedBy": "lorem ipsum",
      "Added/UpdatedData": "lorem ipsum",
    },
    {
      Id: 29,
      DateAndTime: "01/02/2022,11:30AM",
      "Added/UpdatedBy": "lorem ipsum",
      "Added/UpdatedData": "lorem ipsum",
    },
    {
      Id: 28,
      DateAndTime: "01/02/2022,11:30AM",
      "Added/UpdatedBy": "lorem ipsum",
      "Added/UpdatedData": "lorem ipsum",
    },
    {
      Id: 16,
      DateAndTime: "01/02/2022,11:30AM",
      "Added/UpdatedBy": "lorem ipsum",
      "Added/UpdatedData": "lorem ipsum",
    },
    {
      Id: 1,
      DateAndTime: "01/02/2022,11:30AM",
      "Added/UpdatedBy": "lorem ipsum",
      "Added/UpdatedData": "lorem ipsum",
    },
  ],
  statusCode: 200,

  count: 5,
};

function PhlebitiesModal(props) {
  //destructuring the methods and giving them the same name , as they have in the useForm() hook
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const schema = yup.object().shape({
    service: yup
      .object()
      //   .required("Required")
      .nullable()
      .shape({
        label: yup.string().required("Please Select Service"),
        value: yup.string().required("Please Select Service"),
      }),
  });

  //the object to reset the form to blank values
  const defaultValues = {
    ivSiteHealthy: false,
    painNearIv: false,
    rednessNearIv: false,
    painAtIvSite: false,
    redness: false,
    swelling: false,
    painatAlongCannula: false,
    rednessAroundSite: false,
    swellingFour: false,
    painatAlongCannulaFive: false,
    rednessAroundSiteFive: false,
    swellingFive: false,
    phalableVenousCordFive: false,
    painatAlongCannulaSix: false,
    rednessAroundSiteSix: false,
    swellingSix: false,
    phalableVenousCordSix: false,
    pyrexia: false,
  };

  const onSubmitDataHandler = (data) => {
    console.log("onSubmitDataHandler function has been invoked");
    console.log(data);
    // setOpenPost(true);
    // setFinalData(postedObj);
    //to set the form fields as blank
  };

  let ivSiteHealthy = watch("ivSiteHealthy");

  let painNearIv = watch("painNearIv");
  let rednessNearIv = watch("rednessNearIv");

  let painAtIvSite = watch("painAtIvSite");
  let redness = watch("redness");
  let swelling = watch("swelling");

  let painatAlongCannula = watch("painatAlongCannula");
  let rednessAroundSite = watch("rednessAroundSite");
  let swellingFour = watch("swellingFour");

  let painatAlongCannulaFive = watch("painatAlongCannulaFive");
  let rednessAroundSiteFive = watch("rednessAroundSiteFive");
  let swellingFive = watch("swellingFive");
  let phalableVenousCordFive = watch("phalableVenousCordFive");

  let painatAlongCannulaSix = watch("painatAlongCannulaSix");
  let rednessAroundSiteSix = watch("rednessAroundSiteSix");
  let swellingSix = watch("swellingSix");
  let phalableVenousCordSix = watch("phalableVenousCordSix");
  let pyrexia = watch("pyrexia");

  let fieldSetOneFlag =
    painNearIv ||
    rednessNearIv ||
    painAtIvSite ||
    redness ||
    swelling ||
    painatAlongCannula ||
    rednessAroundSite ||
    swellingFour ||
    painatAlongCannulaFive ||
    rednessAroundSite ||
    swellingFour ||
    painatAlongCannulaFive ||
    rednessAroundSiteFive ||
    swellingFive ||
    phalableVenousCordFive ||
    painatAlongCannulaSix ||
    rednessAroundSiteSix ||
    swellingSix ||
    phalableVenousCordSix ||
    pyrexia;

  let fieldSetTwoFlag =
    ivSiteHealthy ||
    painAtIvSite ||
    redness ||
    swelling ||
    painatAlongCannula ||
    rednessAroundSite ||
    swellingFour ||
    painatAlongCannulaFive ||
    rednessAroundSite ||
    swellingFour ||
    painatAlongCannulaFive ||
    rednessAroundSiteFive ||
    swellingFive ||
    phalableVenousCordFive ||
    painatAlongCannulaSix ||
    rednessAroundSiteSix ||
    swellingSix ||
    phalableVenousCordSix ||
    pyrexia;

  let fieldSetThreeFlag =
    ivSiteHealthy ||
    painNearIv ||
    rednessNearIv ||
    painatAlongCannula ||
    rednessAroundSite ||
    swellingFour ||
    painatAlongCannulaFive ||
    rednessAroundSite ||
    swellingFour ||
    painatAlongCannulaFive ||
    rednessAroundSiteFive ||
    swellingFive ||
    phalableVenousCordFive ||
    painatAlongCannulaSix ||
    rednessAroundSiteSix ||
    swellingSix ||
    phalableVenousCordSix ||
    pyrexia;

  let fieldSetFourFlag =
    ivSiteHealthy ||
    painNearIv ||
    rednessNearIv ||
    painAtIvSite ||
    redness ||
    swelling ||
    painatAlongCannulaFive ||
    painatAlongCannulaFive ||
    rednessAroundSiteFive ||
    swellingFive ||
    phalableVenousCordFive ||
    painatAlongCannulaSix ||
    rednessAroundSiteSix ||
    swellingSix ||
    phalableVenousCordSix ||
    pyrexia;

  let fieldSetFiveFlag =
    ivSiteHealthy ||
    painNearIv ||
    rednessNearIv ||
    painAtIvSite ||
    redness ||
    swelling ||
    painatAlongCannula ||
    rednessAroundSite ||
    swellingFour ||
    rednessAroundSite ||
    swellingFour ||
    painatAlongCannulaSix ||
    rednessAroundSiteSix ||
    swellingSix ||
    phalableVenousCordSix ||
    pyrexia;

  let fieldSetSixFlag =
    ivSiteHealthy ||
    painNearIv ||
    rednessNearIv ||
    painAtIvSite ||
    redness ||
    swelling ||
    painatAlongCannula ||
    rednessAroundSite ||
    swellingFour ||
    painatAlongCannulaFive ||
    rednessAroundSite ||
    swellingFour ||
    painatAlongCannulaFive ||
    rednessAroundSiteFive ||
    swellingFive ||
    phalableVenousCordFive;

  return (
    <div className=" backdrop-blur-0">
      <Modal
        open={props.open}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Style} className="w-[90%] h-[88%] xl:h-[80%] mt-2 xl:max-h-[90%]">
          <div className="sticky top-0 bg-white z-50">
            <div className="px-4 pt-2">
              <div className="flex justify-between items-center w-full mt-2 ">
                <div className="w-full">
                  <h1 className="font-semibold text-xl">Phlebities Score</h1>
                </div>
                <CancelPresentationIconButton
                  onClick={() => {
                    props.handleClose();
                  }}
                />
              </div>
              <div className="grid border bg-gray-100 border-gray-300 px-3 rounded mt-1">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 py-2">
                  {/* UHID Gender */}
                  <div className="grid gap-2 border-r-2 border-slate-500 my-1">
                    <div className="flex gap-2 text-sm">
                      <h1 className="text-black items-center font-semibold flex space-x-14 lg:space-x-16">
                        <span>UHID</span>
                        <span className="">:</span>
                      </h1>
                      <h1 className="text-black font-normal">124584 </h1>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <h1 className="text-black font-semibold flex space-x-9 lg:space-x-10">
                        <span>Gender</span>
                        <span className="">:</span>
                      </h1>
                      <h1 className="text-black font-normal">Male </h1>
                    </div>
                    <div className="lg:hidden">
                      <div className="flex gap-2 text-sm">
                        <h1 className="text-black items-center font-semibold flex space-x-16 lg:space-x-14">
                          <span>Age</span>
                          <span className="">:</span>
                        </h1>
                        <h1 className="text-black font-normal">
                          23Year 02Months
                        </h1>
                      </div>
                    </div>
                  </div>
                  {/* BEDNo PatientName */}
                  <div className="grid gap-2  lg:border-r-2 pl-4 border-slate-500 my-1">
                    <div className="flex gap-2 text-sm">
                      <h1 className="text-black items-center font-semibold flex space-x-16 lg:space-x-16">
                        <span>BedNo</span>
                        <span className="">:</span>
                      </h1>
                      <h1 className="text-black font-normal">9857 </h1>
                    </div>
                    <div className="lg:hidden">
                      <div className="flex gap-2 text-sm">
                        <h1 className="text-black font-semibold flex items-center space-x-3 lg:space-x-1">
                          <span>PatientName </span>
                          <span className=""> :</span>
                        </h1>
                        <h1 className="text-black font-normal">Ram Sham Rao</h1>
                      </div>
                    </div>

                    {/* Show lg device */}
                    <div className="hidden lg:block">
                      <div className="flex gap-2 text-sm">
                        <h1 className="text-black font-semibold flex items-center lg:space-x-3">
                          <span>PatientName </span>
                          <span className=""> :</span>
                        </h1>
                        <h1 className="text-black font-normal">Ram Sham Rao</h1>
                      </div>
                    </div>
                    <div className="lg:hidden">
                      <div className="flex gap-2 text-sm">
                        <h1 className="flex items-center text-black font-semibold space-x-11 lg:space-x-11">
                          <span>VIP Score</span>
                          <span className="">:</span>
                        </h1>
                        {ivSiteHealthy ? (
                          <label
                            className="font-semibold text-white md:w-7 pt-1 lg:pt-2 md:h-7 lg:w-10 lg:h-10 rounded-full border-2 border-yellow-500 flex justify-center items-center  bg-yellow-500"
                            name="vipScoreSix"
                          >
                            0
                          </label>
                        ) : (
                          ""
                        )}

                        {painNearIv || rednessNearIv ? (
                          <label
                            className="font-semibold text-white md:w-7 pt-1 lg:pt-2 md:h-7 lg:w-10 lg:h-10 rounded-full border-2 border-red-500 flex justify-center  items-center bg-red-500"
                            name="vipScoreSix"
                          >
                            1
                          </label>
                        ) : (
                          ""
                        )}

                        {painAtIvSite || redness || swelling ? (
                          <label
                            className="font-semibold text-white md:w-7 pt-1 lg:pt-2 md:h-7 lg:w-10 lg:h-10 rounded-full border-2 border-red-500 flex justify-center  items-center bg-red-500"
                            name="vipScoreSix"
                          >
                            2
                          </label>
                        ) : (
                          ""
                        )}

                        {painatAlongCannula ||
                        rednessAroundSite ||
                        swellingFour ? (
                          <label
                            className="font-semibold text-white md:w-7 md:h-7 pt-1 lg:pt-2 lg:w-10 lg:h-10 rounded-full border-2 border-red-500 flex justify-center items-center  bg-red-500"
                            name="vipScoreSix"
                          >
                            3
                          </label>
                        ) : (
                          ""
                        )}

                        {painatAlongCannulaFive ||
                        rednessAroundSiteFive ||
                        swellingFive ||
                        phalableVenousCordFive ? (
                          <label
                            className="font-semibold text-white md:w-7 md:h-7 pt-1 lg:pt-2 lg:w-10 lg:h-10 rounded-full border-2 border-red-500 flex justify-center items-center  bg-red-500"
                            name="vipScoreSix"
                          >
                            4
                          </label>
                        ) : (
                          ""
                        )}

                        {painatAlongCannulaSix ||
                        rednessAroundSiteSix ||
                        swellingSix ||
                        phalableVenousCordSix ||
                        pyrexia ? (
                          <label
                            className="font-semibold text-white md:w-7 pt-1 lg:pt-2 md:h-7 lg:w-10 lg:h-10 rounded-full border-2 border-red-500 flex justify-center  items-center bg-red-500"
                            name="vipScoreSix"
                          >
                            5
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Age VIP Score  Show lg Device*/}
                  <div className="grid gap-2 pl-3">
                    <div className="hidden lg:block">
                      <div className="flex gap-2 ">
                        <h1 className="text-black items-center font-semibold flex space-x-8 lg:space-x-12">
                          <span>Age</span>
                          <span className="">:</span>
                        </h1>
                        <h1 className="text-black font-normal">
                          23Year 02Months
                        </h1>
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <div className="flex gap-2 items-center">
                        <h1 className="flex items-center text-black font-semibold space-x-9 lg:space-x-2">
                          <span>VIP Score</span>
                          <span className="">:</span>
                        </h1>
                        {ivSiteHealthy ? (
                          <label
                            className="font-semibold text-white md:w-7 md:h-7 lg:w-10 lg:h-10 rounded-full border-2 border-yellow-500 flex justify-center items-center  bg-yellow-500"
                            name="vipScoreSix"
                          >
                            0
                          </label>
                        ) : (
                          ""
                        )}

                        {painNearIv || rednessNearIv ? (
                          <label
                            className="font-semibold text-white md:w-7 md:h-7 lg:w-10 lg:h-10 rounded-full border-2 border-red-500 flex justify-center  items-center bg-red-500"
                            name="vipScoreSix"
                          >
                            1
                          </label>
                        ) : (
                          ""
                        )}

                        {painAtIvSite || redness || swelling ? (
                          <label
                            className="font-semibold text-white md:w-7 md:h-7 lg:w-10 lg:h-10 rounded-full border-2 border-red-500 flex justify-center  items-center bg-red-500"
                            name="vipScoreSix"
                          >
                            2
                          </label>
                        ) : (
                          ""
                        )}

                        {painatAlongCannula ||
                        rednessAroundSite ||
                        swellingFour ? (
                          <label
                            className="font-semibold text-white md:w-7 md:h-7 lg:w-10 lg:h-10 rounded-full border-2 border-red-500 flex justify-center items-center  bg-red-500"
                            name="vipScoreSix"
                          >
                            3
                          </label>
                        ) : (
                          ""
                        )}

                        {painatAlongCannulaFive ||
                        rednessAroundSiteFive ||
                        swellingFive ||
                        phalableVenousCordFive ? (
                          <label
                            className="font-semibold text-white md:w-7 md:h-7 lg:w-10 lg:h-10 rounded-full border-2 border-red-500 flex justify-center items-center  bg-red-500"
                            name="vipScoreSix"
                          >
                            4
                          </label>
                        ) : (
                          ""
                        )}

                        {painatAlongCannulaSix ||
                        rednessAroundSiteSix ||
                        swellingSix ||
                        phalableVenousCordSix ||
                        pyrexia ? (
                          <label
                            className="font-semibold text-white md:w-7 md:h-7 lg:w-10 lg:h-10 rounded-full border-2 border-red-500 flex justify-center  items-center bg-red-500"
                            name="vipScoreSix"
                          >
                            5
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <fieldset className="flex justify-between col-span-3 w-auto  rounded">
                      {ivSiteHealthy ||
                      painNearIv ||
                      rednessNearIv ||
                      painAtIvSite ||
                      redness ||
                      swelling ||
                      painatAlongCannula ||
                      rednessAroundSite ||
                      swellingFour ||
                      painatAlongCannulaFive ||
                      rednessAroundSiteFive ||
                      swellingFive ||
                      phalableVenousCordFive ||
                      painatAlongCannulaSix ||
                      rednessAroundSiteSix ||
                      swellingSix ||
                      phalableVenousCordSix ||
                      pyrexia ? (
                        <ul>
                          {ivSiteHealthy && (
                            <li className="text-yellow-500 text-sm font-semibold  border border-yellow-500 rounded p-2 ">
                              No Sign Of Phlebits
                            </li>
                          )}

                          {painNearIv || rednessNearIv ? (
                            <li className="text-red-600 text-sm font-semibold  border border-red-600 rounded p-2">
                              Possibly first phlebits OBSERVE CANNULA
                            </li>
                          ) : (
                            ""
                          )}

                          {painAtIvSite || redness || swelling ? (
                            <li className="text-red-600 text-sm font-semibold  border border-red-600 rounded p-2">
                              Early stage of phlebitis RESITE CANNULA
                            </li>
                          ) : (
                            ""
                          )}

                          {painatAlongCannula ||
                          rednessAroundSite ||
                          swellingFour ? (
                            <li className="text-red-600 text-sm font-semibold  border border-red-600 rounded p-2">
                              Medium stage of phlebitis RESITE CANNULA CONSIDER
                              TREATMENT
                            </li>
                          ) : (
                            ""
                          )}

                          {painatAlongCannulaFive ||
                          rednessAroundSiteFive ||
                          swellingFive ||
                          phalableVenousCordFive ? (
                            <li className="text-red-600 text-sm font-semibold  border border-red-600 rounded p-2">
                              Advance stage of phlebits or the start of
                              thrombophlebitis RESITE CANNULA CONSIDER TREATMENT
                            </li>
                          ) : (
                            ""
                          )}

                          {painatAlongCannulaSix ||
                          rednessAroundSiteSix ||
                          swellingSix ||
                          phalableVenousCordSix ||
                          pyrexia ? (
                            <li className="text-red-600 text-sm  font-semibold  border border-red-600 rounded p-2">
                              Advance stage of thrombophlebitis INITIATE
                              TREATMENT RESITE CANNULA
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      ) : (
                        ""
                      )}
                    </fieldset>
                  </div>
                </div>

                {/* <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  
                </div> */}
              </div>
            </div>
          </div>
          <form
            className="w-full px-4 "
            onSubmit={handleSubmit(onSubmitDataHandler)}
          >
            {/* <div> */}
            <h6 className="text-base font-bold mt-2">VIP</h6>
            {/* 1 */}
            <fieldset
              className="flex justify-between border  border-gray-300 col-span-3 w-full text-left mt-1 px-4 rounded"
              disabled={fieldSetOneFlag}
            >
              <legend className="font-semibold text-sm text-gray-700 ml-2 lg:ml-1">
                IV site appears healthy
              </legend>
              <CheckBoxField
                control={control}
                name="ivSiteHealthy"
                label="IV site appears healthy"
                value="IV site appears healthy"
                style={fieldSetOneFlag ? { color: "lightGray" } : null}
              />
            </fieldset>
            {/* 2 */}
            <fieldset
              className="flex justify-between border border-gray-300 col-span-3 w-full text-left mt-3 px-4 rounded"
              disabled={fieldSetTwoFlag}
            >
              <legend className="font-semibold text-sm text-gray-700 ml-2 lg:ml-1">
                One of the following signs are evident and extensive
              </legend>
              <div className="flex gap-2">
                <CheckBoxField
                  control={control}
                  name="painNearIv"
                  label="Slight pain near IV site OR"
                  value="Slight pain near IV site OR"
                  style={fieldSetTwoFlag ? { color: "lightGray" } : null}
                />

                <CheckBoxField
                  control={control}
                  name="rednessNearIv"
                  label="Slight redness near IV site"
                  value="Slight redness near IV site"
                  style={fieldSetTwoFlag ? { color: "lightGray" } : null}
                />
              </div>
            </fieldset>
            {/* 3 */}
            <fieldset
              className="flex justify-between border border-gray-300 col-span-3 w-full text-left mt-3 px-4 rounded"
              disabled={fieldSetThreeFlag}
              // style={fieldSetThreeFlag?{backgroundColor:"grey"}:null}
            >
              <legend className="font-semibold text-sm text-gray-700 ml-2 lg:ml-1">
                Two of the following signs are evident and extensive
              </legend>
              <div className="flex gap-2">
                <CheckBoxField
                  control={control}
                  name="painAtIvSite"
                  label="Pain at IV site"
                  value="Pain at IV site"
                  style={fieldSetThreeFlag ? { color: "lightGray" } : null}
                />

                <CheckBoxField
                  control={control}
                  name="redness"
                  label="Redness"
                  value="Redness"
                  style={fieldSetThreeFlag ? { color: "lightGray" } : null}
                />

                <CheckBoxField
                  control={control}
                  name="swelling"
                  label="Swelling"
                  value="Swelling"
                  style={fieldSetThreeFlag ? { color: "lightGray" } : null}
                />
              </div>
            </fieldset>
            {/* 4 */}
            <fieldset
              className="flex justify-between border border-gray-300 col-span-3 w-full text-left mt-3 px-4 rounded  "
              disabled={fieldSetFourFlag}
              //  style={fieldSetFourFlag?{backgroundColor:"grey"}:null}
            >
              <legend className="font-semibold text-sm text-gray-700 ml-2 lg:ml-1">
                All of the following signs are evident
              </legend>
              <div className="flex gap-2">
                <CheckBoxField
                  control={control}
                  name="painatAlongCannula"
                  label="Pain along path of cannula"
                  value="Pain along path of cannula"
                  style={fieldSetFourFlag ? { color: "lightGray" } : null}
                />

                <CheckBoxField
                  control={control}
                  name="rednessAroundSite"
                  label="Redness around site"
                  value="Redness around site"
                  style={fieldSetFourFlag ? { color: "lightGray" } : null}
                />

                <CheckBoxField
                  control={control}
                  name="swellingFour"
                  label="Swelling"
                  value="Swelling"
                  style={fieldSetFourFlag ? { color: "lightGray" } : null}
                />
              </div>
            </fieldset>
            {/* 5 */}
            <fieldset
              className="flex justify-between border border-gray-300 col-span-3 w-full text-left mt-3 px-4 rounded"
              disabled={fieldSetFiveFlag}
              //  style={fieldSetFiveFlag?{backgroundColor:"grey"}:null}
            >
              <legend className="font-semibold text-sm text-gray-700 ml-2 lg:ml-1">
                All of the following signs are evident and extensive
              </legend>
              <div className="flex gap-2">
                <CheckBoxField
                  control={control}
                  name="painatAlongCannulaFive"
                  label="Pain along path of cannula"
                  value="Pain along path of cannula"
                  style={fieldSetFiveFlag ? { color: "lightGray" } : null}
                />

                <CheckBoxField
                  control={control}
                  name="rednessAroundSiteFive"
                  label="Redness around site"
                  value="Redness around site"
                  style={fieldSetFiveFlag ? { color: "lightGray" } : null}
                />

                <CheckBoxField
                  control={control}
                  name="swellingFive"
                  label="Swelling"
                  value="Swelling"
                  style={fieldSetFiveFlag ? { color: "lightGray" } : null}
                />

                <CheckBoxField
                  control={control}
                  name="phalableVenousCordFive"
                  label="Phalable venous cord"
                  value="Phalable venous cord"
                  style={fieldSetFiveFlag ? { color: "lightGray" } : null}
                />
              </div>
            </fieldset>
            {/* 6 */}
            <fieldset
              className="flex justify-between border border-gray-300 col-span-3 w-full text-left mt-3 px-4 rounded"
              disabled={fieldSetSixFlag}
              //  style={fieldSetSixFlag?{backgroundColor:"grey"}:null}
            >
              <legend className="font-semibold text-sm text-gray-700 ml-2 lg:ml-1">
                All of the following signs are evident and extensive
              </legend>
              <div className="flex gap-2">
                <CheckBoxField
                  control={control}
                  name="painatAlongCannulaSix"
                  label="Pain along path of cannula"
                  value="Pain along path of cannula"
                  style={fieldSetSixFlag ? { color: "lightGray" } : null}
                />

                <CheckBoxField
                  control={control}
                  name="rednessAroundSiteSix"
                  label="Redness around site"
                  value="Redness around site"
                  style={fieldSetSixFlag ? { color: "lightGray" } : null}
                />

                <CheckBoxField
                  control={control}
                  name="swellingSix"
                  label="Swelling"
                  value="Swelling"
                  style={fieldSetSixFlag ? { color: "lightGray" } : null}
                />

                <CheckBoxField
                  control={control}
                  name="phalableVenousCordSix"
                  label="Phalable Venous Cord"
                  value="Phalable Venous Cord"
                  style={fieldSetSixFlag ? { color: "lightGray" } : null}
                />

                <CheckBoxField
                  control={control}
                  name="pyrexia"
                  label="Pyrexia"
                  value="Pyrexia"
                  style={fieldSetSixFlag ? { color: "lightGray" } : null}
                />
              </div>
            </fieldset>
            <div className="flex justify-end my-1">
              <div className="mt-2 flex justify-end space-x-2">
                <ResetButton
                  onClick={() => {
                    reset(defaultValues);
                  }}
                />
                <SaveButton />
              </div>
            </div>
            {/* </div> */}
            <div className="flex space-x-2 items-center">
              <div className="w-full ">
                <CommonTable data={data} />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default PhlebitiesModal;
