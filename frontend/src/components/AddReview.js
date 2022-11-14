import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import RestaurantDataService from "../services/restaurants"

const restaurantDataService = new RestaurantDataService()
export const AddReview = (props) => {

    const { location: { state: { currentReview = undefined } = {} } = {}, user: { name: userName = "", id: userId = "" } } = props || {}
    const { id: restaurantId } = useParams() || {}
    let initialReviewState = ""
    let editing = false
    if (currentReview) {
        editing = true
        initialReviewState = currentReview.text
    }
    const [review, setReview] = useState(initialReviewState);
    const [submitted, setSubmitted] = useState(false)
    const handleInputChange = e => setReview(e.target.value)
    const saveReview = () => {
        const data = {
            text: review,
            name: userName,
            user_id: userId,
            restaurant_id: restaurantId
        }
        if (editing) {
            data.review_id = currentReview._id
            restaurantDataService.updateReview(data).then(res => { setSubmitted(true); }).catch(err => console.log(err))
        } else {
            restaurantDataService.createReview(data).then(res => { setSubmitted(true); }).catch(err => console.log(err))
        }
    }


    return (
        <div>
            {props.user
                ? <div className="submit-form">
                    {submitted
                        ? <div>
                            <h4>You submitted successfully!</h4>
                            <Link to={"/restaurants/" + restaurantId} className="btn btn-success">
                                Back to Restaurant
                            </Link>
                        </div>
                        : <div>
                            <div className="form-group">
                                <label htmlFor="description">{editing ? "Edit" : "Create"} Review</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="text"
                                    required
                                    value={review}
                                    onChange={handleInputChange}
                                    name="text"
                                />
                            </div>
                            <button onClick={saveReview} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    }
                </div>
                : <div>
                    Please log in.
                </div>
            }

        </div>
    );
}