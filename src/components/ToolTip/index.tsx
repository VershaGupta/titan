import * as React from "react";
import { PopupProps, Popup, Icon, SemanticICONS } from "semantic-ui-react";
import "./tooltip.scss";
export interface TooltipProps extends PopupProps {
  label?: string;
  icon?: SemanticICONS;
}
const Tooltip: React.FC<TooltipProps> = React.memo(
  ({ label, icon, ...props }) => {
    return (
      <span className="custom-label d-flex align-items-center">
        <span className="mb-0">{label}</span>
        <Popup
          basic={props.basic === undefined ? true : props.basic}
          trigger={
            <Icon className="ml-1" name={icon || "info circle"} size="small" />
          }
          content={props.content}
          position={props.position || "top left"}
        />
      </span>
    );
  }
);

export default Tooltip;
