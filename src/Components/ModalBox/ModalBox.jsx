import React from "react";
import { Modal } from "react-bootstrap";
import "./ModalBox.scss";
export default function ModalBox(props) {
  return (
    <div>
      <Modal keyboard={false} backdrop="static" show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="inputComponent">
            <input
              onChange={(e) => props.setOtp(e.target.value)}
              placeholder="Enter 6 digit OTP"
              type="text"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="buttonComponent">
            <button style={{ width: "90px" }} onClick={props.handleClose}>
              {" "}
              Close
            </button>
          </div>
          <div className="buttonComponent">
            <button
              onClick={() => {
                props.OTPSubmit();
              }}
              style={{ width: "90px" }}
            >
              Check OTP
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
