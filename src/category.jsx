import React from "react";

function category(props)
{
    const {category, onDelete, markAsNotSelected} = props;

    function handleDeleteCategory()
    {
        console.log("Delete Category");
        onDelete(category.id, 'category');
    };
    

  return (
    <div className="category">
      <div  className={`category-name ${category.status === 'Selected' ? 'selected' : ''}`}  onClick={() => markAsNotSelected(category.id)}>{category.name}
        
      </div>
      <div className="category-buttons">
        <img className="deleteImg" onClick={handleDeleteCategory} src="src/assets/delete.svg" alt="Delete" />
      </div>
    </div>
  );
}

export default category;