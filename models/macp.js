'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

const ProductSchema = Schema ({
	name: String, 
	price: {
		type: Number, 
		default: 0
	},
	description: String,
	images: String,
	stock: Number,
	discounts: [Number],
	reviews:{
		stars: {type: Number},
		comments: {type: String},
		author: {type: String}
	}
});

module.exports = mongoose.model('product', ProductSchema)