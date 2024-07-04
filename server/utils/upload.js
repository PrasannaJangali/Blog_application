import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
const storage=new GridFsStorage({
    url:`mongodb+srv://${username}:${password}@cluster0.yxa40tq.mongodb.net/blog_application_project?retryWrites=true&w=majority&appName=Cluster0`,
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];
        // console.log(file);
        if(match.indexOf(file.mimeType) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({storage});