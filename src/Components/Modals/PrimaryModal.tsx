import React from "react";
import "./PrimaryModal.scss";
import { Modal, ModalProps } from "antd";

const PrimaryModal = ({ children, ...props }: ModalProps) => {
  return (
    <Modal
      className={`primary-modal ${props.className ? props.className : ""}`}
      okText={props.okText || "Ok"}
      cancelText={props.cancelText || "Cancel"}
      footer={props?.footer}
      width={props?.width || 600}
      maskClosable={false}
      centered
      {...props}
    >
      {children}
    </Modal>
  );
};

export default PrimaryModal;
