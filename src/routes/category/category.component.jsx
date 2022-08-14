import "./category.styles.scss";

import React, { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories.context";
import { useState } from "react";
import ProductCard from "../../components/product-card/product-card.component";
const Categories = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  );
};

export default Categories;
