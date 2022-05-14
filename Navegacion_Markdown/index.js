const cors = require('cors')
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.static('pub'))
app.listen(3000, () => {
    console.log("Escuchando en: http://localhost:3000")
});

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
	const f = Array.isArray(data)
	response.json({
	  text: data.toString().replace(/.txt(,)*/g,'<br>')
	})
      })

})
