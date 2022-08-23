import "./categories-preview.styles.scss";

import React from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component.jsx";
import {
  selectCategories,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";
const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-preview-container">
          {categoriesMap.map(({ title, items }) => {
            return (
              <CategoryPreview key={title} products={items} title={title} />
            );
          })}
        </div>
      )}
    </>
  );
};

export default CategoriesPreview;
