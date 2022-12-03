import React from "react";
const CheckboxComponent = ({ list }) => {

    function onAddingItem(e,item,index) {
        console.log(item); 
    }
  return (
    <div className="flex gap-4">
      {list?.map((item, index,classes) => (
        <div className="">
          <input
            style={{ fontStyle: "normal" }}
            type="checkbox"
            name="roomFacility"
            label={item.focus}
            id="roomFacility"
            value="roomFacility"
            checked={item.isAdded}
            onChange={(e) => onAddingItem(e, item, index)}
          />
          <label className={classes.label1}>
            {item.focus}
          </label>
        </div>
      ))}
    </div>
  );
};
export default CheckboxComponent;
