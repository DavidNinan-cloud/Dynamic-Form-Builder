import React, {useEffect,useRef} from 'react';
import { useReactToPrint } from "react-to-print";
import './style.css'

const CheckPrint = (props) => {  

  
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

     useEffect(()=>{
         handlePrint()
      },[])
    
  return (<div style={{display:"none"}}>
    
      <div ref={componentRef}>
        <div class="page-header" style={{"text-align":"center"}}>
            I'm The Header
        <br/>
      </div>
   
    <div class="page-footer">
      I'm The Footer
    </div>
   
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
    </div>)
    
   
    </div>     
  )
}
export default CheckPrint