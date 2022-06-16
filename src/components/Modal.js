import ReactDOM from 'react-dom';

const Modal = ({ childen }) => {
  return ReactDOM.createPortal(
    <>
      <div className='modal'>{childen}</div>
      <div className='overlay'></div>
    </>
  );
};

export default Modal;
