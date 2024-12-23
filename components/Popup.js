import React from 'react';
import styles from "./Popup.module.css";

const Popup = ({message}) => {
    return (
        <div className={styles.popup}>
            {message}
        </div>
    );
};

export default Popup;
