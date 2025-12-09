import mongoose from "mongoose";

const district = new mongoose.Schema({
    _id : String,
    division_id: String,
    name : String,
    bn_name : String,
    lat: String,
    lon : String,
    url : String
})

const District = mongoose.model("District", district)
export default District;
