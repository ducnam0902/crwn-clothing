import "./categories-preview.styles.scss";

import React from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component.jsx";
import { selectCategories } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategories);
  return (
    <div className="category-preview-container">
      {categoriesMap.map(({ title, items }) => {
        return <CategoryPreview key={title} products={items} title={title} />;
      })}
    </div>
  );
};

export default CategoriesPreview;
