import { Typography } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const Breadcrumbs = () => {
  //   let navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="mt-16 -mb-16 pl-2 py-1 flex">
      {pathnames.length > 0 ? (
        ""
      ) : (
        <div className="px-4 py-auto rounded-full border border-gray-300 text-black  font-medium text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
          <Typography> Dashboard </Typography>
        </div>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <div
            key={index}
            className="px-4 py-auto rounded-full border border-gray-300 text-black font-medium text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
          >
            {/* <Typography key={name}> */}
            {name
              .toString()
              .toUpperCase()
              .replaceAll("-", " ")}
            {/* </Typography> */}
          </div>
        ) : (
          <>
            {/* <Link to={routeTo}> */}
            <div className="px-4 py-auto rounded-full border border-gray-300 text-black font-medium text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
              {name
                .toString()
                .toUpperCase()
                .replaceAll("-", " ")}
            </div>
            {/* </Link> */}
            <span className="text-black font-semibold">
              <ArrowForwardIosOutlinedIcon
                fontSize="small"
                className="text-gray-500"
              />
            </span>
          </>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
