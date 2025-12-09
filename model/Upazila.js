import mongoose from "mongoose";

const upazilaSchema = new mongoose.Schema({
    name: String,
    bn_name: String,
    url: String,
    _id: String,
    district_id: String,
});

const Upazila = mongoose.model("Upazila", upazilaSchema);

export default Upazila;
