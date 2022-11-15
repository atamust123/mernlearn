import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsController from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

router
    .route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)

export default router;