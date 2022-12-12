import DropdownField from "../../../../Common Components/FormFields/DropdownField";
import InputField from "../../../../Common Components/FormFields/InputField";
import JoditEditor from "jodit-react";
import { useForm, Controller } from "react-hook-form";
import { TextField, FormControl, FormHelperText } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SelectButton from "../../../../Common Components/Buttons/SelectButton";
import CloseButton from "../../../../Common Components/Buttons/CloseButton";
import {
  getTemplateDropdown,
  getTemplatesById,
  getFilmSizeDropdown,
  getRadiologistDropdown,
  getGenderDropdown,
  getResultTypeDropdown,
  getTemplateDropdownByIds,
} from "../../services/ReportDetailsServices";
import AuthorizationTable from "../../../Pathology/components/reportDetails/AuthorizationTable";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const IsTemplate = (props) => {
  const {
    reportEntryDetails,
    scheduleData,
    patientDetails,
    setOpenPost,
    setFinalData,
    onSubmit,
    writerContent,
    setWriterContent,
    contentError,
    authArr,
    setAuthArr,
    initiateAuth,
    setInitiateAuth,

    authObj,
  } = props;
  const [templateData, setTemplateData] = useState([]);
  const [filmSizeOptions, setFilmSizeOptions] = useState([]);
  const [radiologistOptions, setRadiologistOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [reportTypeOptions, setReportTypeOptions] = useState([]);
  const [referTypeOptions, setReferTypeOptions] = useState([]);

  const [templateContent, setTemplateContent] = useState([]);
  const editor = useRef(null);

  const [content, setContent] = useState("");
  // const [contentError, setContentError] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    //resolver: yupResolver(schema),
    defaultValues: {
      filmSize: "",
      selectTemplate: "",
      noOfFilms: "",
      radiologist: "",
      gender: "",
      reportType: "",
      brief: "",
      informTime: null,
      noOfContrast: "",
      referredType: "",
    },
  });

  useEffect(() => {
    // getTemplateDropdownList();
    getFilmSizeDropdownList();
    getRadiologistDropdownList();
    getGenderDropdownList();
    getResultTypeDropdownList();
  }, []);

  let watchGender = watch("gender");
  let watchRadiologist = watch("radiologist");
  let watchReportType = watch("reportType");
  let watchTemplate = watch("selectTemplate");

  useEffect(() => {
    if (watchGender || watchRadiologist || watchReportType) {
      console.log("watchGender", watchGender);
      console.log("watchRadiologist", watchRadiologist);
      console.log("watchReportType", watchReportType);
      getTemplateDropdownByIdsList(
        watchRadiologist?.id || null,
        watchGender?.id || null,
        watchReportType?.id || null
      );
    }

    if (watchTemplate) {
      console.log("watchTemplate", watchTemplate);
    }
  }, [watchGender, watchRadiologist, watchReportType, watchTemplate]);

  const config = {
    readonly: false,
    height: 100,
    statusbar: false,
    allowResizeY: false,
    allowResizeZ: false,
    buttons: [
      "bold",
      "underline",
      "strikethrough",
      "italic",
      "indent",
      "outdent",
      "fontsize",
      "paragraph",
      "brush",
      "|",
      "align",
      "ul",
      "ol",
      "table",
      "hr",
      "symbol",
      "eraser",
      "copyformat",
      "superscript",
      "subscript",
      "undo",
      "redo",
      "find",
      "preview",
      "print",
    ],
  };

  // const getTemplateDropdownList = () => {
  //   getTemplateDropdown()
  //     .then((response) => {
  //       console.log("template dropdown" + response);
  //       console.log(JSON.stringify(response));
  //       console.log(response.data.result);
  //       setTemplateData(response.data.result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getTemplateDropdownByIdsList = (
    radiologistId,
    genderId,
    reportTypeId
  ) => {
    getTemplateDropdownByIds(radiologistId, genderId, reportTypeId)
      .then((response) => {
        console.log("template dropdown" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setTemplateData(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFilmSizeDropdownList = () => {
    getFilmSizeDropdown()
      .then((response) => {
        console.log("film size dropdown" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setFilmSizeOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRadiologistDropdownList = () => {
    getRadiologistDropdown()
      .then((response) => {
        console.log("radiologist dropdown" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setRadiologistOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGenderDropdownList = () => {
    getGenderDropdown()
      .then((response) => {
        console.log("gender size dropdown" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setGenderOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getResultTypeDropdownList = () => {
    getResultTypeDropdown()
      .then((response) => {
        console.log("fil size dropdown" + response);
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        setReportTypeOptions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTemplateContentById = (id) => {
    getTemplatesById(id)
      .then((response) => {
        console.log("template content" + response);
        console.log(JSON.stringify(response));
        console.log("TemplateData", response.data.result.TemplateData);
        setTemplateContent(response.data.result.TemplateData);
        let currentContent = response.data.result.TemplateData;

        //replace single quote with double quotes
        currentContent = currentContent.replaceAll("'", '"');

        setContent(currentContent);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (reportEntryDetails) {
      console.log("reportEntryDetails", reportEntryDetails);
      let arr = [];
      reportEntryDetails?.parameterslist &&
        reportEntryDetails.parameterslist.map((item) => {
          let myObj = {
            reportValues: item.reportValue,
          };
          arr.push(myObj);
        });
      console.log("arr", arr);

      reset({
        suggestionNote: reportEntryDetails?.suggestion,
        footNote: reportEntryDetails?.footnote,
      });
      setContent(reportEntryDetails?.templatedata?.templateData);
    }
  }, [reportEntryDetails]);

  return (
    <div className="bg-white space-y-2 flex flex-col">
      <fieldset
      // disabled={
      //   reportEntryDetails &&
      //   reportEntryDetails?.authorizationLevel &&
      //   reportEntryDetails?.authorizationLevel === authObj.authLevel
      //     ? false
      //     : true
      // }
      >
        <form className="grid grid-cols-5 gap-2">
          <div className="col-span-1">
            <DropdownField
              control={control}
              error={errors.filmSize}
              name="filmSize"
              label="Film Size"
              dataArray={filmSizeOptions}
              isSearchable={false}
              placeholder="Film Size"
              isClearable={false}
            />
          </div>
          <div className="col-span-1">
            <InputField
              name="noOfFilms"
              variant="outlined"
              label="No. of Films"
              error={errors.noOfFilms}
              control={control}
            />
          </div>{" "}
          <div className="col-span-1 col-start-1">
            <DropdownField
              control={control}
              error={errors.radiologist}
              name="radiologist"
              label="Radiologist"
              dataArray={radiologistOptions}
              isSearchable={false}
              placeholder="Radiologist"
              isClearable={false}
            />
          </div>
          <div className="col-span-1">
            <DropdownField
              control={control}
              error={errors.gender}
              name="gender"
              label="Gender"
              dataArray={genderOptions}
              isSearchable={false}
              placeholder="Gender"
              isClearable={false}
            />
          </div>
          <div className="col-span-1">
            <DropdownField
              control={control}
              error={errors.reportType}
              name="reportType"
              label="Report Type"
              dataArray={reportTypeOptions}
              isSearchable={false}
              placeholder="Report Type"
              isClearable={false}
            />
          </div>
          <div className="col-span-1">
            <DropdownField
              control={control}
              error={errors.selectTemplate}
              name="selectTemplate"
              label="Select Template"
              dataArray={templateData}
              isSearchable={false}
              placeholder="Select Template"
              isClearable={false}
            />
          </div>
          <div>
            <SelectButton
              onClick={() => {
                if (watchTemplate) {
                  getTemplateContentById(watchTemplate.id);
                }
              }}
            />
          </div>
          <div className="col-span-5">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onChange={(newContent) => {
                setWriterContent(newContent);
                // writerContent = newContent;
                // console.log("writerContent", writerContent);
              }}
            />
            <p style={{ color: "red" }}>{contentError}</p>
          </div>
          <div className="grid grid-cols-5 grid-rows-2 gap-y-0.5 gap-x-1 col-span-5">
            <div className="col-span-3 row-span-2">
              <TextField
                fullWidth
                size="small"
                multiline
                rows={3}
                name="brief"
                {...register("brief")}
                label="Brief Emergency Critical Finding"
                placeholder="Brief Emergency Critical Finding"
              />
            </div>
            <div className="col-span-1 row-span-1">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FormControl error={Boolean(errors.informTime)}>
                  <Controller
                    control={control}
                    name={`informTime`}
                    rules={{ required: true }}
                    defaultValue={null}
                    render={({ field: { ref, ...field } }) => (
                      <TimePicker
                        {...field}
                        label="Inform Time"
                        inputProps={{ readOnly: true }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            fullWidth
                            placeholder="Inform Time"
                            // error={Boolean(
                            //   errors?.consultationTime?.[index]?.startTime
                            // )}
                          />
                        )}
                      />
                    )}
                  />
                  {/* <FormHelperText>
                  {errors?.consultationTime?.[index]?.startTime?.message}
                </FormHelperText> */}
                </FormControl>
              </LocalizationProvider>
            </div>
            <div className="col-span-1 row-span-1">
              <InputField
                name="noOfContrast Used"
                variant="outlined"
                label="No Of Contrast Used"
                error={errors.noOfContrast}
                control={control}
              />
            </div>
            <div className="col-span-2 row-span-2">
              <DropdownField
                control={control}
                error={errors.referredType}
                name="referredType"
                label="Referred By"
                dataArray={referTypeOptions}
                isSearchable={false}
                placeholder="Referred By"
                isClearable={false}
              />
            </div>
          </div>
          {/* <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="h-[38px] px-3  bg-green-700 text-white rounded text-base font-medium"
          >
            Save
          </button>
        </div> */}{" "}
          <div className="col-span-5">
            <AuthorizationTable
              reportEntryDetails={reportEntryDetails}
              authArr={authArr}
              setAuthArr={setAuthArr}
              initiateAuth={initiateAuth}
              setInitiateAuth={setInitiateAuth}
            />
          </div>
          <div className="flex justify-end space-x-2 col-span-5">
            <CloseButton />
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="h-[38px] px-3  bg-green-700 text-white rounded text-base font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default IsTemplate;
