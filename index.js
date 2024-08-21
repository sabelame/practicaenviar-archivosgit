//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/in
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(fileUpload()); // OBRIGATORIO


app.post("/upload", function (req, res) {
  let sampleFile;
  let rutaOndeGardamosOFile;

  if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("No files were uploaded.");
    return;
  }
  
  console.log("req.files >>>", req.files); 
  /**
   * ------------------ req.files.image_uploads ------------
   * > req.files : DETECTAMOS OS FICHEIROS QUE ENVÍA O CLIENTE
   * > image_uploads : o 'name' do 'input' DO FORMULARIO DO CLIENTE
   * 
   */
for(const ficheiro in req.files.image_uploads){
    /*
    console.log("ficheiro ", ficheiro);
    console.log("__dirname ", __dirname);
    uploadPath = __dirname + "/uploads/" + req.files.image_uploads[ficheiro].name;
    console.log('uploadPath : ',uploadPath)
    console.log("req.files.image_uploads[ficheiro].name ",req.files.image_uploads[ficheiro].name)
    */
  
  // TEN QUE ESTAR CREADA A CARPETA 'uploads'

  // UTILIZAMOS 'mv' é do módulo utilizado 'fileUpload'
  // let ficheiroEnviado =  req.files.image_uploads[ficheiro]
  /***************************************** */
  // <ficheiroEnviado> . mv ( <ruta> , <función> )
  /**************************************** */


  rutaOndeGardamosOFile = __dirname + "/uploads/" + req.files.image_uploads[ficheiro].name;
  let ficheiroEnviado =  req.files.image_uploads[ficheiro]
  
    ficheiroEnviado.mv(rutaOndeGardamosOFile, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });
}
  
res.send({mensaxe:"recibido"})
});

app.listen(3000, function () {
  console.log("Server running");
});
