import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// import ReactStars from 'react-rating-stars-component';
import { Rating } from '@material-ui/lab';

const ProductCard = (props) => {
  // console.log('yes im here');

  const options = {
    edit: false,
    value: props.product.ratings,
    size: 'large',
    precision: 0.5,
    isHalf: true,
  };

  // console.log(props.product);
  return (
    <Link className='productCard' to={`/product/${props.product._id}`}>
      <img
        src={props.product.images.length > 0 ? props.product.images[0].url : ''}
        alt={props.product.name}
      />
      <p>{props.product.name}</p>
      <div>
        <Rating {...options} />{' '}
        <span>({props.product.reviews.length} Reviews)</span>
      </div>
      <span>{`₹${props.product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
