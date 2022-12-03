import React from "react";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import { todoListData } from "../../utils/constants/dashboardContants/dashboardLists/todoListData";
import { Card, CardContent } from "@mui/material";

const TodoList = () => {
  return (
    <div>
      <Card
        elevation={5}
        sx={{ borderRadius: "10px", marginX: "auto", width: "100%" }}
      >
        <CardContent>
          <h1 className="px-3 pb-4 font-bold text-gray-800 text-base font-Poppins">
            Todo List
          </h1>
          {todoListData.map((row, index) => (
            <table
              key={index}
              className="w-full border-collapse border border-slate-300"
            >
              <tbody>
                <tr>
                  <td className="text-gray-400 w-8 py-2">
                    <DragIndicatorOutlinedIcon />
                  </td>
                  <td className="text-left py-2">
                    <input
                      type="checkbox"
                      name="todo"
                      id={row.checkboxLabel}
                      value={row.checkboxLabel}
                    />
                    <label
                      htmlFor={row.checkboxLabel}
                      className="select-none px-2 text-xs font-Poppins"
                    >
                      {row.checkboxLabel}
                    </label>
                  </td>
                  <td className="text-right py-2 pr-2">
                    {row.priority === "high" ? (
                      <p className="text-red-600 text-xs">
                        <ArrowUpwardOutlinedIcon /> High
                      </p>
                    ) : row.priority === "low" ? (
                      <p className="text-green-500 text-xs">
                        <ArrowDownwardOutlinedIcon />
                        Low
                      </p>
                    ) : (
                      <p className="text-gray-400 text-xs">
                        <HorizontalRuleOutlinedIcon />
                        Normal
                      </p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoList;
