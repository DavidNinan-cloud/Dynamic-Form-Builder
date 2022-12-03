import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "../investigationPrint/style.css";
import hospitallogo from "../assets/hospitallogo.png";

const data = [
  {
    id:1,
    logo: hospitallogo,
    hospitalName: "ABC Hospital",
    address: "1 Main Street Louisville,KY 1111,Pune",
    number: 123456789,
    doctorName: "Dr.Stephen Strange",
    degree: "M.D",
    date: "01/03/2022",
  },
];

const CheckPrint = (props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    handlePrint();
  }, []);

  return (
    <div className="w-full hidden">
      <div ref={componentRef}>
        <div class="page-header text-center w-full">
          <div class="header flex justify-between items-center w-full">
            {data.map((item) => {
              return (
                <div key={item}>
                  <div>
                    <img className="w-32" src={item.logo} />
                  </div>
                  <div>
                    <p>{item.address}</p>
                  </div>
                </div>
              );
            })}
            {/* <div class="flex items-center w-full p-2 space-x-3">
              <div>
                <img className="w-32 " src={hospitallogo} alt="" />
              </div>
            </div>
            <div class="doctor_info w-full grid justify-end">
              <p>Dr.Stephen Strange</p>
              <p>M.D.</p>
              <p>Date - 01/03/2022</p>
            </div> */}
          </div>
        </div>
        <div class="page-footer">I'm The Footer</div>
        <table>
          <thead>
            <tr>
              <td>
                <div class="page-header-space"></div>
              </td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <div className="page"></div>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td>
                <div class="page-footer-space"></div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      )
    </div>
  );
};
export default CheckPrint;
