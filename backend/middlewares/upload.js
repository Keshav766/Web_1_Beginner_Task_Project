import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only images allowed"), false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});

export const upload = multer({ storage });