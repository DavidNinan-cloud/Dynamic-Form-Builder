import * as React from 'react';
import { Grid } from '@mui/material';
import { useFormContext } from "react-hook-form";

// Import FormFields
import DropdownField from '../../../../../Common Components/FormFields/DropdownField';
import {
        getDepartmentDropDown,getUnitsDropDown
        } from '../../services/EmployeeMaster/EmployeeMasterServices'
import SearchDropdown from '../../../../../Common Components/FormFields/searchDropdown';

const AssignDepartment = (props) => {
    const {checkValue} = props
        const {control, formState: { errors },getValues,setValue,register } = useFormContext();

  const[units,setUnits]=React.useState()
  const[departments,setDepartments]=React.useState()

  React.useEffect(()=>{
        getUnitsDropDown()
        .then(response=>response.data)
        .then(res=>{
                setUnits(res.result)
        })
  },[])
const handleChange = (e) => {
        console.log(e.length);
        let unitSelected = getValues('units')
        console.log("getValues unitSelected:",unitSelected)
        let unitString = ''
        for(let i = 0;i<unitSelected.length;i++){
                if(i!==0){
                unitString += `,${unitSelected[i].value}`
        } else{
                unitString += `${unitSelected[i].value}`
        }
        } 
        console.log("unitString:",unitString)
                if (e.length > 0) {
                        getDepartmentDropDown(unitString,checkValue,e)
                        .then(response=>response.data)
                        .then(res=>{
                        setDepartments(res.result)
                        })
                }
}
return (
<div>
<Grid container spacing={1}>
        
{/* units Link */}
        <Grid item lg={4} sm={4}>
                <DropdownField 
                        control={control} error={errors.units}
                        name="units" placeholder="Unit *" dataArray={units}
                        isMulti={true}
                        isSearchable={true}
                        inputRef={{
                                ...register("units", {
                                  onChange: (e) => {
                                        setValue('departments','');
                                  },
                                }),
                              }}
                />
        </Grid>
        {/* departments Link */}
        <Grid item lg={4} sm={4}>
                <SearchDropdown
                        control={control}
                        error={errors.departments}
                        searchIcon={true}
                        name="departments"
                        placeholder="Department *"
                        dataArray={departments}
                        isSearchable={true}
                        isClearable={false}
                        isMulti={true}
                        handleInputChange={handleChange}
                />
        </Grid>
        
        {/* Sub Department Link */}
        {/* <Grid item lg={2.4} sm={2.4}>
        <DropdownField 
                        control={control} error={errors.subDepartment}
                        name="subDepartment" label="Sub Department" dataArray={departments}
                        placeholder="Sub Department" isMulti={true}
                        isSearchable={true}
                />
        </Grid> */}

        {/* Cash Counter Link */}
        {/* <Grid item lg={2.4} sm={2.4}>
                <DropdownField 
                        control={control} error={errors.cashCounter}
                        name="cashCounter" label="Cash Counter" dataArray={departments}
                        placeholder="Cash Counter" isMulti={true}
                        isSearchable={true}
                />
        </Grid> */}

        {/* Store Link */}
        {/* <Grid item lg={2.4} sm={2.4}>
                <DropdownField 
                        control={control} error={errors.store}
                        name="store" label="Store" dataArray={departments}
                        placeholder="Store" isMulti={true}
                        isSearchable={true}
                />
        </Grid> */}

</Grid>
</div>
)
}

export default AssignDepartment