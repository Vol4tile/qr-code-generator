import React from "react";
import { HexColorPicker } from "react-colorful";

function ColorPicker({ color, setColor }) {
  return (
    <div>
      <HexColorPicker color={color} onChange={setColor} />
      <div style={{display:"flex"}}>
        Current color is :
        <input
        className="colorInput"
          type="text"
          onChange={(e) => {
            setColor(e.target.value);
          }}
          value={color}
        />
      </div>
    </div>
  );
}

export default ColorPicker;
