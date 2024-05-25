interface Restaurant extends RestaurantBase{
    id:string,
    created?:Date,
    updated?:Date,
}

interface RestaurantBase{
    name:string,
    images:string[],
    description:string,
    location:string,
    keywords?:RestaurantKeywords,
    restaurantOwner:string,
}

interface Restaurant_RestaurantOwner{
    extends:{
        restaurantOwner:User
    }
}

interface RestaurantKeywords{
    tags?:string[]
    //tambahin nanti mungkin buat sentiment AI
}