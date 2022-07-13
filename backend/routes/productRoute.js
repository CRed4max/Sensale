const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getAllProductReviews,
  deleteReview,
  getAdminProducts,
} = require('../controller/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// router.route('/products').get(isAuthenticatedUser, getAllProducts);
router.route('/products').get(getAllProducts); //temp change please update after
router
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/products/:id').get(getSingleProduct);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"),getAdminProducts);

router.route('/review').put(isAuthenticatedUser, createProductReview);
router
  .route('/reviews')
  .get(getAllProductReviews)
  .delete(isAuthenticatedUser, deleteReview);
module.exports = router;
