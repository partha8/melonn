import React from "react";
import ReactLoading from "react-loading";

export const Loading = () => {
  return (
    <>
      <ReactLoading
        type="spinningBubbles"
        height={"10%"}
        width={"10%"}
        color="#000"
      />
      <h1>Loading...</h1>
    </>
  );
};
