import React, { FC, useState } from "react";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, setScreen } from "./store/ApiSlice/commonState";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const state = useSelector((state) => state);
  console.log("============ Redux ============", state);
  const commonState = useSelector((state) => state.commonState);
  const [inputs, setInputs] = useState({ name: "", lastName: "" });
  const dispatch = useDispatch();
  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Toaster />
      <div className="App">
        <div className="logo-box">
          <a href="https://github.com/umangbhalodiya" target="_blank">
            <img
              style={{ borderRadius: "100px" }}
              src="https://avatars.githubusercontent.com/u/76506184?v=4"
              alt="Electron + Vite logo"
            />
          </a>
        </div>
        <h2>Hi, I'm Umang Full stack Developer / Designer / Cloud Engineer</h2>
        <h3>This app is built using Electron + React + Redux + Vite.</h3>
        {commonState?.screen === 1 ? (
          <div className="card">
            <div className="box-input">
              <label>Name </label>
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={(e) => {
                  handleInputs(e);
                }}
              />
            </div>
            <div className="box-input">
              <label>Last Name </label>
              <input
                type="lastName"
                name="lastName"
                value={inputs.lastName}
                onChange={(e) => {
                  handleInputs(e);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="text">
              Welcome{" "}
              <span>
                {commonState.formData.name} {commonState.formData.lastName}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            if (commonState?.screen === 1) {
              if (!inputs.name && !inputs.lastName) {
                toast.error("Please enter Name and Last Name");
              } else if (!inputs.name) {
                toast.error("Please enter Name");
              } else if (!inputs.lastName) {
                toast.error("Please enter Last Name");
              } else {
                toast.success("Welcome");
                dispatch(setFormData(inputs));
                dispatch(setScreen(2));
              }
            } else {
              dispatch(setFormData({}));
              dispatch(setScreen(1));
            }
          }}
        >
          {commonState?.screen === 1 ? "Click" : "Back"}
        </button>
      </div>
    </>
  );
}

export default App;
