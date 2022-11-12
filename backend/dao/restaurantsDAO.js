import { ObjectId } from "mongodb"

let restaurants

export default class RestaurantsDAO {
    static async injectDB(conn) { // call as soon as server starts
        if (restaurants) { // if restaurants exist then just return
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e) {
            console.error(`Unable to establish a collection handle in restaurants DAO: ${e}`)
        }
    }
    static async getRestaurants({ filters = null, page = 0, restaurantsPerPage = 20 } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }
        let cursor

        try {
            cursor = await restaurants.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { restaurantsList: [], totalRestaurants: 0 }
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try {
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = page === 0 ? await restaurants.countDocuments(query) : 0
            return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.error(`Unable to convert cursor to array or counting documents ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    }

    static async getRestaurantById(id) {
        try {
            const pipeline = [
                { $match: { _id: new ObjectId(id) } },
                {
                    $lookup: {
                        from: "reviews",
                        let: {
                            id: "$_id"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$restaurant_id", "$$id"]
                                    }
                                }
                            },
                            {
                                $sort: {
                                    date: -1
                                }
                            }
                        ], as: "reviews"
                    }
                }, {
                    $addFields: {
                        reviews: "$reviews"
                    }
                }
            ]
            return await restaurants.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Unable to get cuisines ${e}`)
            throw e
        }
    }

    static async getCuisines() {
        let cuisines = []
        try {
            cuisines = await restaurants.distinct("cuisine")
            return cuisines
        } catch (e) {
            console.error(`Unable to get cuisines ${e}`)
            return cuisines
        }
    }
}