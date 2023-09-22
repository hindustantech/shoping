import React from "react";
// 
const FromCategory = ({handleSubmit,value,setValue}) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="m-2">
        <div className="md-3">
          <input
            type="text"
            className="from-control w-40"
            placeholder="Enter New category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="mt-2">
        <button type="Submit" className=" m-2 btn btn-primary"> Submit</button>
        </div>
      </form>
    </>
  );
};

export default FromCategory;
