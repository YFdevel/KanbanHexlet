import React, {useState} from 'react';
import Layout from "../components/Layout";
import styles from "./review.module.css";
import {useDispatch, useSelector} from "react-redux";
import Popup from "../components/Popup";
import Task from "../components/Task";
import ReviewedItem from "../components/ReviewedItem";

const Review = () => {
    const dispatch = useDispatch();
    const tasksInProgress = useSelector(state => state.toolkit.tasksInProgress);
    const [isPopup, setIsPopup] = useState(false);

    const checkReviewed = (event) => {
        event.preventDefault();
        const checkedElements = [];
        event.target.querySelectorAll("input[type=checkbox]").forEach((i) => {
            if (i.checked) {
                checkedElements.push(i.closest(".task")?.dataset.id);
            }
        });
        dispatch({
            type: "SET_REVIEWED",
            payload: {
                reviewed: checkedElements
            }
        });
        if (checkedElements.length > 0) {
            setIsPopup(true);
            setTimeout(() => {
                setIsPopup(false);
            }, 2000);
        }


    };
    return (
        <Layout>
            <h1 className={styles.title}>Отметить ревью</h1>
            <form action="#" className={styles.form} onSubmit={checkReviewed}>
                {
                    tasksInProgress.map((task) => (
                        <ReviewedItem title={task.title} status={task.status} id={task.id} key={task.id}/>
                    ))
                }
                <button type="submit" className={styles.submit}>Отметить ревью</button>
            </form>
            {
                isPopup && <Popup message="Отметки о ревью выполнены"/>
            }
        </Layout>
    );
};

export default Review;

