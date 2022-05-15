const cors = require('cors')
const fs = require('fs')
const path = require('path')
const express = require('express')
const bp = require('body-parser')
const app = express()

app.use(cors())
app.use(express.static('cliente'))
app.listen(3000, () => {
    console.log("Escuchando en: http://localhost:3000")
});

app.use(express.static('pub'))
app.use(bp.json())
app.use(bp.urlencoded({
    extended: true
}))

app.get('/lista', (request, response) => {
    fs.readdir(path.resolve(__dirname,'./priv'),'utf8', 
      (err,data) => {
	if (err){ 
	  console.error(err);
	  response.status(500).json({
	    error:'menssaje'
	  })
	  return
	}
	response.json({
	  text: data.toString().replace(/.md(,)*/g,'<br>')
	})
      })

})
app.get('/BuscarTitulos', (req, res) => {
	let name = req.query.titulo
	console.log(name)
	fs.readFile(path.resolve(__dirname, 'priv/'+ name + '.md'), 'utf8',
        (err, data) => {
            if (err) {
                console.error(err)
                res.status(500).json({
                    error: 'message'
                })
                return
            }
            res.json({
                text: data.replace(/\n/g, '<br>')
            })
        })
})


