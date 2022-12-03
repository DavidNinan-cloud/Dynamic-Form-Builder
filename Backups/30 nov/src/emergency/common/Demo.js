import CommonSelectableTable from "./CommonSelectableTable";
import React from "react";

const data = {
  message: "country list found ",
  result: [
    {
      "Sr No": 1,
      Id: 30,
      Code: "NEP",
      Country: "Nepal",
    },
    {
      "Sr No": 2,
      Id: 29,
      Code: "GER",
      Country: "Germany",
    },
    {
      "Sr No": 3,
      Id: 28,
      Code: "AUS",
      Country: "Australia",
    },
    {
      "Sr No": 4,
      Id: 16,
      Code: "JPN",
      Country: "Japan",
    },
    {
      "Sr No": 5,
      Id: 1,
      Code: "IN",
      Country: "INDIA",
    },
  ],
  statusCode: 200,

  count: 5,
};

export default function StickyHeadTable() {
  const checkboxVisible = false;

  return (
    <div className="mt-20 px-2">
      <CommonSelectableTable data={data} checkboxVisible={checkboxVisible} />
    </div>
  );
}
