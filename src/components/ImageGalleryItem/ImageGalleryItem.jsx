import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ link, tag, largeImg }) => {
  const [modalImage, setModalImage] = useState(null);
  const [modalAlt, setModalAlt] = useState(null);

  // state = {
  //   modalImage: null,
  // };

  const openModal = event => {
    setModalImage(largeImg);
    setModalAlt(event.currentTarget.alt);
    // this.setState({
    //   modalImage: this.props.largeImg,
    //   modalAlt: event.currentTarget.alt,
    // });
  };

  const closeModal = () => {
    setModalImage(null);
    // this.setState({ modalImage: null });
  };

  const closeModalClick = event => {
    if (event.target === event.currentTarget) {
      // this.closeModal();
      closeModal();
    }
  };

  return (
    <>
      <li className={css.imageGalleryItem}>
        <img
          onClick={openModal}
          src={link}
          alt={tag}
          width="400"
          className={css.imageGalleryItem_image}
        />
      </li>
      {modalImage && (
        <Modal
          url={modalImage}
          alt={modalAlt}
          modalClose={closeModalClick}
          closeEsc={closeModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  link: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};
