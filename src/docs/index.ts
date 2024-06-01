import os from "os";

import dotenv from "dotenv";

import user from "./user";
import swaggerDoc from "./swagger.json";
import orders from "./orders";
import products from "./products";
const defaults = swaggerDoc.paths;

dotenv.config();

const paths = {
	...defaults,
    ...user,
    ...products,
    ...orders
};

const config = {
	swagger: "2.0",
	info: {
		version: "1.0.0.",
		title: "FARMER_STORE APIs Documentation",
		description: "",
	},
	servers: [
		{
			url: `http://localhost:${process.env.PORT}`,
			name: `${os.hostname()}`,
		},
		{
			url: `https://${process.env.HOST}`,
			name: `${os.hostname()}`,
		},
	],

	basePath: `/api/${process.env.API_VERSION || "v1"}`,
	schemes: ["http", "https"],
	securityDefinitions: {
		JWT: {
			type: "apiKey",
			name: "Authorization",
			in: "header",
		},
	},
	tags: [
		{
			name: "FARMER_STORE APIs Documentation",
		},
	],
	consumes: ["application/json"],
	produces: ["application/json"],
	paths,
};
export default config;