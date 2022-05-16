const cors = require('cors')
const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(cors())
app.use(express.static('pub'))
app.listen(3000, () => {
    console.log("Escuchando en: http://localhost:3000")
});

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

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
app.post('/Buscar', (req, res) => {
  let dataString =req.body.titulo;
  console.log(dataString)
  fs.readFile(path.resolve(__dirname, 'priv/' + dataString + ".md"), 'utf8',
        (err, data) => {
            if (err) {
                console.error(err)
                response.status(500).json({
                    error: 'message'
                })
                return
            }
            res.json({
                text: data.replace(/\n/g, '<br>')
            })
        })
})	
