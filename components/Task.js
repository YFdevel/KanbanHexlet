import React from 'react';
import styles from "./Task.module.css";

const Task = ({id,title, status, reviewed, onDragStartHandler, onDragEndHandler}) => {
    return (
        <div className={reviewed?`reviewed ${styles.item}`:`${styles.item}`} draggable={true} onDragStart={(event) => {
            event.target.classList.add(`${styles.hold}`);
            setTimeout(() => event.target.classList.add(`${styles.hide}`), 0);
            onDragStartHandler(event.target);
        }} onDragEnd={(event) => {
            event.target.classList.remove(`${styles.hold}`);
            event.target.classList.remove(`${styles.hide}`);
            onDragEndHandler(event.target);
        }} data-id={id} data-title={title} data-status={status} data-reviewed={reviewed}>{title}</div>
    );
};

export default Task;
