import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ modalClose, alt, url, closeEsc }) => {
  // state = {};

  useEffect(() => {
    const handlePressEsc = event => {
     
      if (event.code === 'Escape') {
        closeEsc();
      }
    };
    window.addEventListener('keydown', handlePressEsc);

    return () => window.removeEventListener('keydown', handlePressEsc);
  }, [closeEsc]);
  // componentDidMount() {
  //   window.addEventListener('keydown', handlePressEsc);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', handlePressEsc);
  // }

  // const handlePressEsc = event => {
  //   console.log(event.code);
  //   if (event.code === 'Escape') {
  //     closeEsc();
  //   }
  // };

  return createPortal(
    <div className={css.overlay} onClick={modalClose}>
      <div className={css.modal}>
        <img src={url} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  modalClose: PropTypes.func.isRequired,
  closeEsc: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
