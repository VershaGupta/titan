import * as React from "react";

export interface CodeProps {
  style?: React.CSSProperties;
  className?: string;
}

const Code: React.SFC<CodeProps> = React.memo(
  ({ style, className, ...props }) => {
    const codeStyle: React.CSSProperties = {
      backgroundColor: "#dddddd",
      fontSize: "0.95em",
      padding: "2px 4px",
      borderRadius: "4px",
      ...(style || {}),
    };

    return (
      <span className={className || ""} style={codeStyle}>
        {props.children}
      </span>
    );
  }
);

export default Code;
