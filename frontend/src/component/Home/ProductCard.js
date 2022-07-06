import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const ProductCard = (props) => {
  // console.log('yes im here');

  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    value: props.product.ratings,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

   console.log(props.product);
  return (
    <Link className='productCard' to={`/product/${props.product._id}`}>
      <img
        src={props.product.images.length > 0 ? props.product.images[0].url : ''}
        alt={props.product.name}
      />
      <p>{props.product.name}</p>
      <div>
        <ReactStars {...options} />{' '}
        <span>({props.product.reviews.length} Reviews)</span>
      </div>
      <span>{`₹${props.product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
