import mongoose from "mongoose";

const unionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            index: true,
        },
        bn_name: {
            type: String,
            index: true,
        },
        url: String,

        _id: {
            type: String,
            required: true,
        },

        upazila_id: {
            type: String,
            required: true,
            index: true,
        },
    },
    {
        versionKey: false,
    }
);

unionSchema.index({ upazila_id: 1, name: 1 });

const Union = mongoose.model("Union", unionSchema);

export default Union;
