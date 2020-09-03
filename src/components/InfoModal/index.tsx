import * as React from "react";
import { Modal, Button, ButtonProps, ModalProps } from "semantic-ui-react";
import "./Infomodal.scss";

export interface InfoModalProps {
  button?: ButtonProps;
  modal?: ModalProps;
  content?: string;
}

const InfoModal: React.FC<InfoModalProps> = ({
  modal,
  content,
  button,
  ...props
}) => {
  return (
    <Modal
      trigger={
        <Button
          color="green"
          size="small"
          content={content}
          className="info-btn"
          {...(button || {})}
        />
      }
      size="small"
      centered
      {...(modal || {})}
    >
      {props.children}
    </Modal>
  );
};

export default InfoModal;
