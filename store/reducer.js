import {createReducer} from "@reduxjs/toolkit";

const Status = {
    INITIAL: "initial",
    PROGRESS: "in-progress",
    DONE: "completed"
};
const initialTasks = [
    {id: "1", title: "Task 1", status: Status.INITIAL, reviewed:false },
    {id: "2", title: "Task 2", status: Status.INITIAL, reviewed:false},
    {id: "3", title: "Task 3", status: Status.INITIAL, reviewed:false},
];

const initialState = {
    initialTasks,
    length:initialTasks.length,
    tasksStart: initialTasks,
    tasksInProgress: [],
    tasksDone: [],
};

const filterArrayByExceptId = (arr, id) => {
    return [...arr.filter(task => (task.id !== id))];
};

const addToArray = (arr, id, title, status,reviewed) => {
    arr.push({
        id,
        title,
        status,
        reviewed
    });
};
const changeStore = (state,action) => {
    switch(true){
        case action.payload.target === "in-progress" && action.payload.status==="initial":
            state.tasksStart = filterArrayByExceptId(state.tasksStart, action.payload.id);
            addToArray(state.tasksInProgress, action.payload.id, action.payload.title, Status.PROGRESS, action.payload.reviewed);
            break;
        case action.payload.target === "done" && action.payload.status==="initial":
            state.tasksStart = filterArrayByExceptId(state.tasksStart, action.payload.id);
            addToArray(state.tasksDone, action.payload.id, action.payload.title, Status.DONE, action.payload.reviewed);
            break;
        case action.payload.target === "done" && action.payload.status==="in-progress":
            state.tasksInProgress = filterArrayByExceptId(state.tasksInProgress, action.payload.id);
            addToArray(state.tasksDone, action.payload.id, action.payload.title, Status.DONE);
            break;
    }
};

export default createReducer(initialState, builder => {
    builder
        .addCase('CREATE_TASK', (state, action) => {
            state.tasksStart.push(action.payload);
            state.length=Number(state.length)+1;
        })
        .addCase('CHANGE_STATUS', (state, action) => {
            changeStore(state,action);

        })
        .addCase('SET_REVIEWED', (state, action) => {
            state.tasksInProgress=state.tasksInProgress.map(i=>{
                if(action.payload.reviewed.includes(i.id)){
                    i.reviewed=true;
                }
                return i;
            });
        })
})
