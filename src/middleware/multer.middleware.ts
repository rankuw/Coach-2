import multer, { diskStorage, FileFilterCallback } from "multer";
import {Request} from "express"
const storage = diskStorage({
    destination: "./pictures",
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req: Request, file: any, cb: any) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg"){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}

const upload = multer({storage, limits, fileFilter}).single("profileImage");

export default upload;