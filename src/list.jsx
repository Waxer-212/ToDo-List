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
            categories.forEach(category => {
                category.tasks = category.tasks.filter(task => task.id !== id);
            });
            setTasks(newTasks);
            setCategories([...categories]);

        } else if (type === 'category') {
            const newCategories = categories.filter(category => category.id !== id);
            newCategories.forEach(category => {
                category.tasks = [];
            });
            setCategories(newCategories);
        }

        saveData();
    };

    const markAsNotSelected = (id) => {
        const newCategories = categories.map(category => {
            if (category.id != id) {
                category.status = "Not Selected";
                
            }
            else
            {
                category.status = "Selected";
            }
            return category;
        });
        setCategories(newCategories);
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

        if (!validateInput(name)) {
            alert("There is a word in the input that is longer than 25 characters. Please shorten the word and try again.");
            document.querySelector('.inputName').value = "";
            setTimeout(() => {
                document.querySelector('.inputName').focus();
            }, 10);
            return;
        }
        categories.filter(category => category.status === "Selected").map(category => {
            const newTask = { id: Date.now(), name: name, status: "Incomplete" };
            category.tasks.push(newTask);
        });
        setCategories([...categories]);
        document.querySelector('.inputName').value = "";
        setTimeout(() => {
            document.querySelector('.inputName').focus();
        }, 10);

        saveData();
    };
    const handleAddCategory = () => {
        console.log("Add Category");
        const name = getName();
        if (!name) {
            return;
        }
        const newCategory = { id: Date.now(), name: name, status:"Selected", tasks: [] };
        categories.forEach(category => {
            category.status = "Not Selected";
        });
        setCategories([...categories, newCategory]);
        document.querySelector('.inputName').value = "";
        setTimeout(() => {
            document.querySelector('.inputName').focus();
        }, 10);
        saveData();

    };


    const validateInput = (input) => {
        const words = input.split(' ');
        for (let word of words) {
            if (word.length > 20) {
                return false;
            }
        }
        return true;
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

    const saveData = () => {
        localStorage.setItem('categories', JSON.stringify(categories));
    };

    useEffect(() => {
        const data = localStorage.getItem('categories');
        if (data) {
            setCategories(JSON.parse(data));
        }
    }, []);
    

    return (
        <>
        <div className="container">

            <div className="name">
                <Input /> 
            </div>


            <div className="middle">
                <div className="add-task-category">
                    <div className="add-task">
                        <button onClick={handleAddTask}>Add Task</button>
                    </div>
                    <div className="add-category">
                        <button onClick={handleAddCategory}>Add Category</button>
                    </div>
                </div>
                <div className="tasks">
                    {categories.filter(category => category.status === "Selected").map(category => {
                        return category.tasks.map(task => {
                            return <Task key={task.id} task={task} onDelete={onDelete} />
                        })
                    })}
                </div>
            </div>

            <div className="categories">
                {categories.map((category) => {
                    return <Category key={category.id} category={category} onDelete={onDelete} markAsNotSelected={markAsNotSelected} />
                })}
            </div>
        </div>
        </>
    )
}

export default List;
