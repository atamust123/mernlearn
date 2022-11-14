import ReviewsDAO from "../dao/reviewsDAO.js"

export default class RestaurantsController {
    static async apiPostReview(req, res, next) {
        try {
            console.log("req.body", req.body)
            const restaurantId = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const ReviewResponse = await ReviewsDAO.addReview(
                restaurantId, userInfo, review, date
            )
            res.json({ status: "success" })
        } catch (e) {
            console.error(`Unable to establish a collection handle in reviews DAO: ${e}`)
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const review = req.body.text

            const date = new Date()

            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId, req.body.user_id, review, date
            )

            var { error } = ReviewResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (ReviewResponse.modifiedCount === 0) {
                throw new Error("unable to update review - user may not be the original poster")
            }
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.query.id
            const userId = req.body.user_id
            const ReviewResponse = await ReviewsDAO.deleteReview(reviewId, userId)
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}