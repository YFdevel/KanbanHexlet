import React from 'react';
import styles from "./ReviewedItem.module.css";

const ReviewedItem = ({id,title, status}) => {

    const onChangeHandler=(evt)=>{
        evt.target.closest(".task")?.classList.toggle("active");
    };

    return (
        <div className={`task ${styles.item}`} data-id={id} data-title={title} data-status={status}>
           <span className={styles.itemSpan}>{title}</span>
            <label className={styles.itemLabel}>
                <input type="checkbox" name="review" className={styles.itemInput} onChange={onChangeHandler}/>
            </label>
        </div>
    );
};

export default ReviewedItem;
