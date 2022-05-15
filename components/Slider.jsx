import React from "react";
import { Range, getTrackBackground } from "react-range";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from "recoil";

const Slider = ({ Min, Max, Step, valueState }) => {
  const [values, setValues] = useRecoilState(valueState);
  return (
    <div
      className="w-full"
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
      }}
    >
      <Range
        values={values}
        step={Step}
        min={Min}
        max={Max}
        onChange={(values) => setValues(values)}
        renderMark={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "16px",
              width: "2px",
              backgroundColor:
                index * Step + Min < values[0] ? "#548BF4" : "#ccc"
            }}
          />
        )}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%"
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "3px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#548BF4", "#ccc"],
                  min: Min,
                  max: Max
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "52px",
              width: "22px",
              borderRadius: "4px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA"
            }}
          >
            <div
              style={{
                height: "16px",
                width: "3px",
                backgroundColor: isDragged ? "#548BF4" : "#CCC"
              }}
            />
          </div>
        )}
      />
      <output className="text-xl font-bold" style={{ marginTop: "10px" }}>
        {values[0]}
      </output>
    </div>
  );
};

export default Slider;
