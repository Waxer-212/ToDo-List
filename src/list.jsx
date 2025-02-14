import React, { useState, useEffect } from 'react';
import './list.css';
import Task from './task';
import Category from './category';

function List() {

    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);

    const onDelete = (id, type) => {
        if (type === 'task') {
            const newTasks = tasks.filter(task => task.id !== id);
            setTasks(newTasks);
        } else if (type === 'category') {
            const newCategories = categories.filter(category => category.id !== id);
            setCategories(newCategories);
        }
    };

    const getName = () => {
        const name = document.querySelector('.inputName').value;
        return name;
    };

    const handleAddTask = () => {
        const name = getName();
        if (!name) {
            return;
        }
        const newTask = { id: Date.now(), name: name, status: "Incomplete" };
        setTasks([...tasks, newTask]);
        document.querySelector('.inputName').value = "";
        setTimeout(() => {
            document.querySelector('.inputName').focus();
        }, 10);
    };
    const handleAddCategory = () => {
        console.log("Add Category");
        const name = getName();
        if (!name) {
            return;
        }
        const newCategory = { id: Date.now(), name: name };
        setCategories([...categories, newCategory]);
        document.querySelector('.inputName').value = "";
        setTimeout(() => {
            document.querySelector('.inputName').focus();
        }, 10);

    };

    const Input = () => { 
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
            handleAddTask();
            }
            else if (e.key === 'Enter' && e.shiftKey) {
            handleAddCategory();
            }
        }

        return <input type="text" className="inputName" placeholder="Add an item (Task / Category )" onKeyDown={handleKeyDown} />;
    };

    return (
        <>
        <div className="container">

            <div className="name">
                <Input /> 
            </div>


            <div className="middle">
                <div className="tasks">
                    {tasks.map((task) => {
                        return <Task key={task.id} task={task} onDelete={onDelete} />
                    })}
                </div>
                <div className="add-task-category">
                    <div className="add-task">
                        <button onClick={handleAddTask}>Add Task</button>
                    </div>
                    <div className="category">
                        <button onClick={handleAddCategory}>Add Category</button>
                    </div>
                </div>
            </div>

            <div className="categories">
                {categories.map((category) => {
                    return <Category key={category.id} category={category} onDelete={onDelete} tasks={tasks} status={"Not Selected"} />
                })}
            </div>
        </div>
        </>
    )
}

export default List;
