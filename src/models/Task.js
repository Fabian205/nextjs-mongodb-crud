import { Schema, model, models } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is requires"],
      unique: true,
      trim: true,
      maxlength: [40, "Title must not exceed 40 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [200, "Description must not exceed 200 characters"],
    },
  },
  {
    timestamps: true,
    //versionKey: false,
  }
);

export default models.Task || model("Task", taskSchema);
