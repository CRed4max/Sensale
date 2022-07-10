import React, { Fragment } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import { Slider, Typography } from '@material-ui/core';
import ProductCard from '../Home/ProductCard';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';

const categories = [
  'Laptop',
  'Footwear',
  'Bottom',
  'Tops',
  'Attire',
  'Camera',
  'SmartPhones',
];
const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 60000]);
  const [category, setCategory] = useState('');
  const {
    products,
    loading,
    error,
    resultPerPage,
    productsCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const [ratings, setRatings] = useState(0);

  const { keyword } = useParams();

  const alert = useAlert();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);
  const count = filteredProductsCount;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title='Products -- Sensale' />
          <h2 className='productsHeading'>Products</h2>
          <div className='products'>
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </div>
          <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={25000}
            />
            <Typography>Catagories</Typography>
            <ul className='categoryBox'>
              {categories.map((category) => {
                return (
                  <li
                    className='category-link'
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                );
              })}
            </ul>

            <fieldset>
              <Typography component='legend'>Rating Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                arial-labelledby='continous-slider'
                min={0}
                max={5}
                valueLabelDisplay='auto'
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className='paginationBox'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={filteredProductsCount}
                onChange={setCurrentPageNo}
                nextPageText='Next'
                prevPageText='Prev'
                firstPageText='1st'
                lastPageText='Last'
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
