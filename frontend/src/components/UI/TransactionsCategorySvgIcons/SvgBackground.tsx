import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const SvgBackground: React.FC<Props> = ({ className = "", children }) => {
  return (
    <div
      className={className}
      style={{
        border: "1px solid #d6d7f9",
        borderRadius: "15px",
        padding: "6px",
        backgroundColor: "#d6d7f9",
      }}
    >
      {children}
    </div>
  );
};

export default SvgBackground;
