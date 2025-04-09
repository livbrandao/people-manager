import React from "react";

const ToggleSwitch = ({
  label = "",
  value = false,
  onToggle = () => {},
  trueLabel = "Sim",
  falseLabel = "Não",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && <span className="text-sm text-dark">{label}</span>}
      <div
        className="w-[70px] h-5 flex items-center rounded-full p-1 cursor-pointer bg-mediumLightGray"
        onClick={() => onToggle(!value)}
      >
        <div
          className={`w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 bg-greyBlue ${
            value ? "translate-x-12" : "translate-x-1 "
          }`}
        ></div>
        <span
          className={`text-xs font-light tracking-wide text-dark  transition-colors duration-300 relative ${
            value ? "right-1" : "left-3"
          }`}
        >
          {value ? trueLabel : falseLabel}
        </span>
      </div>
    </div>
  );
};

export default ToggleSwitch;
