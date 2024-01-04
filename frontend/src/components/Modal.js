import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css'; // Update with your CSS module file path

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = props => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('modal-root'); // Ensure you have a div with id='modal-root' in your index.html

const Modal = props => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
