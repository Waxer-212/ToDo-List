import React from 'react';

function Task(props) {

    const { task, onDelete } = props;

    function handleDeleteTask() {
        console.log("Delete Task");
        onDelete(task.id,"task");
    };

    function handleEditTask() {
        console.log("Edit Task");
    };

    function handleTaskStatus() {
        if (task.status === "Incomplete") {
            handleCompleteTask();
        } else {
            handleIncompleteTask();
        }
    };

    function handleCompleteTask() {
        console.log("Complete Task");
        task.status = "Complete";
    };

    function handleIncompleteTask() {
        console.log("Incomplete Task");
        task.status = "Incomplete";
    };

    return (
        <div className="task">
            <div className="task-name">
                {task.name}
            </div>
            <div className="task-buttons">
                <button onClick={handleDeleteTask}>Delete</button>
                <button onClick={handleTaskStatus}>Status</button>
            </div>
        </div>
    );
}

export default Task;