import React, { useContext } from 'react'
import Users from '../Users/Users'

  
export default function DashboardPage() {

    return (
        <div>
            {/* DashboardPage */}
            {/* <div>
                Hello David
                
                <div className="border-r-blue-500">
                    <label>
                      <input type="file" 
                        // onChange={fileHandler.bind(this)} 
                        // onChange={readUploadFile}
                        style={{"display": "none"}}
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                      <a className="text-blue-500 mr-1 underline" >
                        Upload Data
                      </a>
                    </label>
                </div>
            </div> */}

            {/* start */}
            <Users />
        </div>
    )
}
