import { registerAs } from "@nestjs/config";
import Joi from "joi";

export const cloudinary = registerAs("cloudinary", () => ({
	cloudName: process.env.CLOUDINARY_CLOUD_NAME,
	apiKey: process.env.CLOUDINARY_API_KEY,
	apiSecret: process.env.CLOUDINARY_API_SECRET,
}));

export const cloudinaryConfigValidationSchema = {
	CLOUDINARY_CLOUD_NAME: Joi.string().required(),
	CLOUDINARY_API_KEY: Joi.string().required(),
	CLOUDINARY_API_SECRET: Joi.string().required(),
};
