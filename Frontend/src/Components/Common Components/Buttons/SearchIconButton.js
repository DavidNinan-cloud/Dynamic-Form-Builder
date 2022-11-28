import React from "react";
import SearchIcon from "@mui/icons-material/Search";


export default function SearchIconButton({onClick}) {
  return (
    <div>
      <button
        type="button"
        className=" h-10 w-14 px-2 rounded-md bg-customBlue text-white "
        variant="outlined"
        size="small"
        // sx={{ borderColor: "grey.500" , backgroundColor: "blue" }}
        onClick={onClick}
      >
        <SearchIcon className="cursor-pointer" />
      </button>
    </div>
  );
}
