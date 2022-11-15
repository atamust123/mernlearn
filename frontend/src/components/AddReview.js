import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import RestaurantDataService from "../services/restaurants"

const restaurantDataService = new RestaurantDataService()
export const AddReview = (props) => {

    const { user } = props || {}
    const { id: restaurantId } = useParams() || {}
    let initialReviewState = ""
    let editing = false
    if (window.history?.state?.usr?.currentReview) {
        editing = true
        initialReviewState = window.history?.state?.usr?.currentReview.text
    }
    const [review, setReview] = useState(initialReviewState);
    const [submitted, setSubmitted] = useState(false)
    const handleInputChange = e => setReview(e.target.value)
    const saveReview = () => {
        const data = {
            text: review,
            name: user?.name ?? "",
            user_id: user?.id ?? "",
            restaurant_id: restaurantId ?? ""
        }
        if (editing) {
            data.review_id = window.history?.state?.usr?.currentReview._id
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