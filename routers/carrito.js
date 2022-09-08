const { Router } = require('express')
const router = Router()

const {
    createShoppingCart,
    deleteShoppingCart,
    getProductsById,
    addProduct,
    deleteProductById
} = require('../controllers/carritos')

router.route('/').post(createShoppingCart)
router.route('/:id').delete(deleteShoppingCart)
router.route('/:id/productos').get(getProductsById)
router.route('/:id/productos').post(addProduct)
router.route('/:id/productos/:id_prod').delete(deleteProductById)

module.exports = router
