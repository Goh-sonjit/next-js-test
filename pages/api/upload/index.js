const multer = require('multer')
const nc = require('next-connect')
const path = require('path')
const handle = nc({})
const imageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '/public')
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})



const upload = multer({
    storage: imageConfig,
} )
const isImage = upload.single("file")
handle.use(isImage)
handle.post((req,res) =>{
    console.log("req",req.file);
    console.log("res",req.body);
    res.status(200).json({message:"React"})
})
export default handle;