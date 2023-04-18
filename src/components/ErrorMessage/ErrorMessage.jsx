import React, { useEffect, useRef } from 'react';
import hanSolo from '../../assets/video.mp4';
import styles from './ErrorMessage.module.css';

const ErrorMessage = () => {
  const videoRef = useRef(null);

  //так мы замедляем воспроизведение видео
  useEffect(() => {
    videoRef.current.playbackRate = 1;
  }, []);

  return (
    <>
      <p className={styles.text}>
        The dark side of the force has won.
        <br /> We cannot display data.
        <br /> Come back when we fix everything
      </p>
      <video ref={videoRef} className={styles.video} loop autoPlay muted>
        <source src={hanSolo} />
      </video>
    </>
  );
};

export default ErrorMessage;
