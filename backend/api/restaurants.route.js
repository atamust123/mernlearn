import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
const router = express.Router()

router.route("/").get(RestaurantsCtrl.apiGetRestaurants)

// router
//     .route("/review")
//     .post(ReviewCtrl.apiPostReview)
//     .put(ReviewCtrl.apiUpdateReview)
//     .delete(ReviewCtrl.apiDeleteReview)

export default router;