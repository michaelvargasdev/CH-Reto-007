const { Router } = require('express')
const router = Router()

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productos')

router.route('/').get(getProducts)
router.route('/:id').get(getProduct)
router.route('/').post(createProduct)
router.route('/:id').put(updateProduct)
router.route('/:id').delete(deleteProduct)

module.exports = router
