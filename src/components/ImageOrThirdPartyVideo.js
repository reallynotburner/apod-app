import styles from '../../styles/Viewer.module.css';

const ImageOrThirdPartyVideo = ({mediaType, url, title}) => {
  if (mediaType === 'image') {
    return (
      <img
      alt={title}
      src={url}
      className={styles.image}
      />
    );
  }

  if (mediaType === 'video') {
    return (
      <iframe
        title="Video Player"
        className={styles.image}
        src={url} />
    );
  }

  return null;
};

export default ImageOrThirdPartyVideo;