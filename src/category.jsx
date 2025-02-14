import React from "react";

function category(props)
{
    const {category, onDelete} = props;

    function handleDeleteCategory()
    {
        console.log("Delete Category");
        onDelete(category.id, 'category');
    };


  return (
    <div className="category">
      <div className="category-name">{category.name}</div>
      <div className="category-buttons">
        <button onClick={handleDeleteCategory}>Delete</button>
      </div>
    </div>
  );
}

export default category;