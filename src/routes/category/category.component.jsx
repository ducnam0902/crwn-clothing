import "./category.styles.scss";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { useState } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { selectCategories } from "../../store/categories/category.selector";

const Categories = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategories);
  const [products, setProducts] = useState([]);
  console.log(categoriesMap);
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
