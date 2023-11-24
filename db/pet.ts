import mongoose from "npm:mongoose@8.0.1";
import { Pet } from "../types.ts";

const Schema = mongoose.Schema;

const petSchema = new Schema(
    {
        id: {type: String},
        name:{type: String, required: true},
        breed: {type: String, required: true}
    },
    {timestamps: true}
);

export type petModelType = mongoose.Document & Omit<Pet, "id">;
export const petDB = mongoose.model<petModelType>("Pet", petSchema);