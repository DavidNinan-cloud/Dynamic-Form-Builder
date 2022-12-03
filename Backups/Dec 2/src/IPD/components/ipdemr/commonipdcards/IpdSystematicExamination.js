import { Card, CardContent, TextField } from "@mui/material";
import React from "react";

const IpdSystematicExamination = (props) => {
  const { rs, setRs, cvs, setCvs, cns, setCns, pa, setPa } = props;
  return (
    <div className="ml-3 h-[10rem]">
      <Card
        square={true}
        elevation={1}
        sx={{
          marginY: "3px",
          overflow: "visible",
          paddingY: "0.3rem",
        }}
        className=" mx-auto h-full overflow-y-visible "
      >
        <div className="">
          <CardContent>
            <div className="text-sm font-semibold py-2 bg-[#DCFCE7] -mt-2">
              <h1 className="pl-2">Systematic Examination</h1>
            </div>
            <hr className="border mb-2 border-slate-300" />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <TextField
                  variant="outlined"
                  label="RS"
                  fullWidth
                  size="small"
                  name="rs"
                  onChange={(e) => props.setRs(e.target.value)}
                  value={rs}
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  label="CVS"
                  fullWidth
                  size="small"
                  name="cvs"
                  onChange={(e) => props.setCvs(e.target.value)}
                  value={cvs}
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  label="CNS"
                  fullWidth
                  size="small"
                  name="cns"
                  onChange={(e) => props.setCns(e.target.value)}
                  value={cns}
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  label="PA"
                  fullWidth
                  size="small"
                  name="pa"
                  onChange={(e) => props.setPa(e.target.value)}
                  value={pa}
                />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default IpdSystematicExamination;
