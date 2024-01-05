import React from "react";
import { useSelector } from "react-redux";
import { RingLoader } from "react-spinners";

export default function Spinner() {
  let { isLoading } = useSelector((state) => state.spinnerReducer);
  return isLoading ? (
    <div className="h-screen w-screen bg-slate-400 fixed z-[60] flex justify-center items-center">
      <RingLoader size={120} color="#fc721f" />
    </div>
  ) : (
    <></>
  );
}
