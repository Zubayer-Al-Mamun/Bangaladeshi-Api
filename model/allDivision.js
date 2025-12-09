import mongoose from "mongoose";

const DivisionSchema = new mongoose.Schema(
    {
        name: String,
        bn_name: String,
        url: String,
        _id : String
    },
);

const Division = mongoose.model("Division", DivisionSchema);

export default Division;
