import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import RestaurantDataService from "../services/restaurants";
const restaurantDataService = new RestaurantDataService()
const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
}
export const Restaurant = (props) => {
    const { id: restaurant_id } = useParams();

    const [restaurant, setRestaurant] = useState(initialRestaurantState)
    const getRestaurant = id => {
        restaurantDataService.get(id).then(res => { setRestaurant(res.data); }).catch(err => console.log(err))
    }
    useEffect(() => { getRestaurant(restaurant_id) }, [restaurant_id])
    const deleteReview = (reviewId, index) => {
        restaurantDataService.deleteReview(reviewId, props.user.id).then(res => {
            setRestaurant(prev => {
                prev.reviews.splice(index, 1);
                return ({ ...prev })
            })
        }).catch(err => console.log(err))
    }
    return (
        <div>
            {restaurant ? (
                <div>
                    <h5>{restaurant.name}</h5>
                    <p>
                        <strong>Cuisine: </strong>{restaurant.cuisine}<br />
                        <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
                    </p>
                    <Link to={"/restaurants/" + restaurant_id + "/review"} className="btn btn-primary">
                        Add Review
                    </Link>
                    <h4> Reviews </h4>
                    <div className="row">
                        {restaurant.reviews.length > 0 ? (
                            restaurant.reviews.map((review, index) => {
                                return (
                                    <div className="col-lg-4 pb-1" key={index}>
                                        <div className="card">
                                            <div className="card-body">
                                                <p className="card-text">
                                                    {review.text}<br />
                                                    <strong>User: </strong>{review.name}<br />
                                                    <strong>Date: </strong>{review.date}
                                                </p>
                                                {props.user?.id === review.user_id &&
                                                    <div className="row">
                                                        <button onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</button>
                                                        <Link
                                                            className="btn btn-primary col-lg-5 mx-1 mb-1"
                                                            state={{ currentReview: review }}
                                                            to={{
                                                                pathname: "/restaurants/" + restaurant_id + "/review",
                                                            }}>Edit</Link>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-sm-4">
                                <p>No reviews yet.</p>
                            </div>
                        )}

                    </div>

                </div>
            ) : (
                <div>
                    <br />
                    <p>No restaurant selected.</p>
                </div>
            )}
        </div>
    );
}