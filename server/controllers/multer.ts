const { diskStorage } = require("multer");
const multer = require("multer");

// multer setup 
const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        cb(null, "./dist/uploads/");
    },
    filename: (req: Request, file: any, cb: any) => {
        cb(null, file.originalname); 
    }
})

const fileFilter = (req: any,file: any,cb: any) => {    
    if(file.mimetype === "image/jpg"  || 
        file.mimetype ==="image/jpeg"  || 
        file.mimetype ===  "image/png"){  
        cb(null, true);
    }else{
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);    
    }
};

const upload = multer({storage: storage, fileFilter});

export default upload;
