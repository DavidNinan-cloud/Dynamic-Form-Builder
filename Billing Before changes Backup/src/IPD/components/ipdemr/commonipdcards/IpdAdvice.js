import { Button, Card, CardContent, TextField } from "@mui/material";
import React from "react";

const IpdAdvice = (props) => {
  const { advice, setAdvice } = props;

  return (
    <div className="ml-1 h-[16rem]">
      <Card
        square={true}
        elevation={1}
        sx={{
          marginY: "6px",
          overflow: "visible",
          paddingY: "0.3rem",
        }}
        className=" mx-auto h-full overflow-y-visible "
      >
        <div className="">
          <CardContent>
            <div className="text-sm font-semibold py-2 bg-green-50 -mt-2">
              <h1 className="pl-2">Advice</h1>
            </div>
            <hr className="border mb-2 border-slate-300" />
            <div>
              <div>
                {/* <form onSubmit={handleHistory}> */}
                <TextField
                  variant="outlined"
                  label="Add Advice"
                  fullWidth
                  size="small"
                  multiline
                  rows={7}
                  name="advice"
                  onChange={(e) => props.setAdvice(e.target.value)}
                  value={advice}
                />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default IpdAdvice;
