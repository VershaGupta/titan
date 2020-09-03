import * as React from "react";
import { useLocation } from "react-router-dom";

export interface FooterProps {
  hidePaths?: string[];
  isCMSView?: boolean;
}

const Footer: React.FC<FooterProps> = React.memo(props => {
  const location = useLocation();
  const { hidePaths, isCMSView } = props;
  if (isCMSView || (hidePaths && hidePaths.includes(location.pathname))) {
    return null;
  }

  return (
    <footer className="footer d-flex align-items-center justify-content-center">
      <p>
        <i className="icon copyright outline" /> 2020 All Rights Reserved
      </p>
    </footer>
  );
});

export default Footer;
