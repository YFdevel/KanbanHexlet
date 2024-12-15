import React, {useState} from 'react';
import styles from "./index.module.css";
import Task from "../components/Task";
import Layout from "../components/Layout";
import {useDispatch, useSelector} from "react-redux";

const Index = () => {
    const dispatch = useDispatch();
    const tasksStart = useSelector(state => state.toolkit.tasksStart);
    const tasksInProgress = useSelector(state => state.toolkit.tasksInProgress);
    const tasksDone = useSelector(state => state.toolkit.tasksDone);
    const [current,setCurrent]=useState(null);

    const onDragStartHandler = (element) => {
        setCurrent(element);
    };
    const onDragEndHandler = (element) => {
        setCurrent(element);
    };

    const onDragOverHandler=(event) =>{
        event.preventDefault();
    };

    const onDragEnterHandler=(event)=> {
        event.target.classList.add('hovered');
    };

    const onDragLeaveHandler=(event) =>{
        event.target.classList.remove('hovered');
    };

    const onDragDropHandler=(event,item)=>{
        event.target.classList.remove('hovered');
        dispatch({
            type: "CHANGE_STATUS",
            payload:{
                id:item.dataset.id,
                title:item.dataset.title,
                status:item.dataset.status,
                target:event.target.dataset.label,
                reviewed:event.target.dataset.reviewed,
            }
        });
    };

    return (
        <Layout>
            <div className={styles.desk}>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Распределение задач</h1>
                    <div className={styles.row}>
                        <div className={`${styles["col-header"]} ${styles["start"]}`}>К выполнению</div>
                        <div className={`${styles["col-header"]} ${styles["progress"]}`}>В работе</div>
                        <div className={`${styles["col-header"]} ${styles["done"]}`}>Завершено</div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.placeholder} data-label="start">
                            {
                                tasksStart.map((task) => (
                                    <Task title={task.title} status={task.status} id={task.id} reviewed={task.reviewed} key={task.id}
                                          onDragStartHandler={onDragStartHandler} onDragEndHandler={onDragEndHandler}/>
                                ))
                            }
                        </div>
                        <div className={styles.placeholder} onDragOver={onDragOverHandler} onDragEnter={onDragEnterHandler} onDragLeave={onDragLeaveHandler} onDrop={(event)=>{
                            onDragDropHandler(event,current);
                        }}  data-label="in-progress">
                            {
                                tasksInProgress.map((task) => (
                                    <Task title={task.title} status={task.status} key={task.id} reviewed={task.reviewed}id={task.id}
                                          onDragStartHandler={onDragStartHandler} onDragEndHandler={onDragEndHandler}/>
                                ))
                            }
                        </div>
                        <div className={styles.placeholder} onDragOver={onDragOverHandler} onDragEnter={onDragEnterHandler} onDragLeave={onDragLeaveHandler} onDrop={(event)=>{
                            onDragDropHandler(event,current);
                        }} data-label="done">
                            {
                                tasksDone.map((task) => (
                                    <Task title={task.title} status={task.status} key={task.id} reviewed={task.reviewed} id={task.id}
                                          onDragStartHandler={onDragStartHandler} onDragEndHandler={onDragEndHandler}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Index;

// export const getStaticProps = (context) => {
//      const tasks=initialTasks;
//     return {
//         props: { tasks }
//     }
// };
