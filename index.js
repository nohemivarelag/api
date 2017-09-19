'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/macp');
mongoose.set('debug', true);

const app = express()
const port = process.env.PORT || 3001
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/api/macp', (req, res) => {
	Product.find({}, (err, macp) => {
      if (err) return res. status(500).send({ message:`Error al realizar la peticion ${err}` })
   if (!macp) return res.status(404).send({ message: `No existen los productos` })
   res.status(200).send({macp});
    });
});

app.get('/api/macp/:productId', (req, res) => {
	let productId = req.params.productId
        Product.findById(productId, (err, macp) => {
                if (err) return res.status(500).send({ message: `Error al realizar la peticion ${err}` })
                //busca por id en la bd
                if (!fgemproduct) return res.status(400).send({ message: `El producto no existe` })//si el producto no existe el !niega
                res.send(200, { macp });
        })
});
})

app.post('/api/macp', (req, res) => {
	console.log('POST /api/macp')
	console.log(req.body)

	let macp = new Product()
	macp.name = req.body.name;
	macp.price = req.body.price;
	macp.description = req.body.description;
	macp.images = req.body.images;
	macp.stock = req.body.stock -5;
	macp.discounts = req.body.discounts;
	macp.reviews.stars = req.body.stars;
	macp.reviews.comments = req.body.comments;
	macp.reviews.author = req.body.author;
	console.log(macp);

	macp.save((err, macproductStored) => {
		if (err) res.status(500).send({messages: `Error al salvar en la base de datos`})

	res.status(200).send({macp: macproductStored})
	})
})

app.put('/api/macp/:productId', (req, res) => {
	let productId = req.params.productId
        let update = req.body
    
        Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
                               if (err) res.status(500).send({
                            message: `Error al actualizar el producto
                    en la BD: ${err}`
                    }) //si ocurre un error se manda este mensaje
                    res.status(200).send({ macp: productUpdated })
    
            })
    });


app.delete('/api/macp/:productId', (req, res) => {
	let productId = req.params.productId
        Product.findById(productId, (err, macp) => {
    
                if (err) return res.status(500).send({ message: `Error al borrar el producto ${err}` })
                Product.remove(err => {
                        if (err) return res.status(500).send({ message: `Error al borrar el producto ${err}` })
                                res.status(200).send({ message: `El producto ha sido borrado` })
                })
        })
    });

mongoose.connect('mongodb://localhost:27017/macdb', (err, res) => {
	if (err) {
		return console.log(`Error al conectar la base de datos: ${err}`)
	}
	console.log('Conexion a la base de datos establecida...')
	
app.listen(port, () => {
	console.log(`API REST corriendo en localhost:${port}`)
})

})