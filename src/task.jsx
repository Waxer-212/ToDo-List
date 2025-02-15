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
        getStatusIcon();
        
    };

    function handleIncompleteTask() {
        console.log("Incomplete Task");
        task.status = "Incomplete";
        getStatusIcon();
    };

    function getStatusIcon() {
        if (task.status === "Complete") {
            return <img src="/src/assets/completed.svg" alt="Completed Icon" onClick={handleTaskStatus} />;
        } else {
            return <img src="/src/assets/incomplete.svg" alt="Incomplete Icon" onClick={handleTaskStatus} />;
        }
    }

    return (
        <div className="task">
            <div className="task-name">
                {task.name}
            </div>
            <div className="task-buttons">
                <img className='deleteImg' onClick={handleDeleteTask} src="src/assets/delete.svg" alt="Delete" />
                <input type="checkbox"/>
            </div>
        </div>
    );
}

export default Task;