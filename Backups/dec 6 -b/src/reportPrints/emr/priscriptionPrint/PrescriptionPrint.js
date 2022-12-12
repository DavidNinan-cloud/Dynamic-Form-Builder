import React from "react";
import CheckPrint from "./CheckPrint";

const InvestigationPrint = () => {
  const [print, setPrint] = React.useState(false);

  const handlePrinting = () => {
    setPrint(true);
  };

  return (
    <div className="pt-20">
      <button
        className="bg-red-600 text-white rounded-md px-5 py-1"
        onClick={handlePrinting}
      >
        Print
      </button>
      {print ? <CheckPrint /> : ""}
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
              <div className="page">
                <div class="header"></div>
              </div>
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
  );
};

export default InvestigationPrint;
