import { Button, Card, CardContent, TextField } from "@mui/material";
import React from "react";

const IpdSpecialInstruction = (props) => {
  const { specialInstruction, setSpecialInstruction } = props;

  return (
    <div className="ml-2 h-[16rem]">
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
            <div className="text-sm font-semibold py-2 bg-[#C6CCFF] -mt-2">
              <h1 className="pl-2">Special Instruction</h1>
            </div>
            <hr className="border mb-2 border-slate-300" />
            <div>
              <div>
                {/* <form onSubmit={handleHistory}> */}
                <TextField
                  variant="outlined"
                  label="Add Special Instruction"
                  fullWidth
                  size="small"
                  multiline
                  rows={7}
                  name="specialInstruction"
                  onChange={(e) => props.setSpecialInstruction(e.target.value)}
                  value={specialInstruction}
                />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default IpdSpecialInstruction;
