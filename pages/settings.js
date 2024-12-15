import React, {useState} from 'react';
import Layout from "../components/Layout";
import styles from "./settings.module.css";
import {useDispatch, useSelector} from "react-redux";
import Popup from "../components/Popup";

const Settings = () => {
    const dispatch = useDispatch();
    const storeLength = useSelector(state => state.toolkit.length);
    const [isPopup, setIsPopup] = useState(false);

    const createTask = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const payload = {
            id: String(storeLength+1),
            title: formData.get("task"),
            status: "initial",
            reviewed:false
        };
        dispatch({
            type: "CREATE_TASK",
            payload
        });
        setIsPopup(true);
        setTimeout(()=>{
            setIsPopup(false);
        },2000);
    };
    return (
        <Layout>
            <h1 className={styles.title}>Создать задачу</h1>
            <form action="#" className={styles.form} onSubmit={createTask}>
                <label htmlFor="task" className={styles.label}>Название</label>
                <input type="text" id="task" name="task" className={styles.input} placeholder="Новая задача"
                       required={true}/>
                <button type="submit" className={styles.submit}>Создать</button>
            </form>
            {
                isPopup && <Popup message="Новая задача создана"/>
            }
        </Layout>
    );
};

export default Settings;
