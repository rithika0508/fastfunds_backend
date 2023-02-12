const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  signUp,
  updateProfile,
  uploadDocument,
  getLenders
} = require("../controllers/user");
const auth = require("../auth/authentication");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "documents");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, req.user.id + ".jpg");
  },
});

const upload = multer({ storage });

router.post("/user/signup", signUp);
router.patch("/updateprofile", auth, updateProfile);
router.post("/uploaddocument", auth, upload.single("document"), uploadDocument);
router.get("/getlenders/:amt/:interest",auth,getLenders)
module.exports = router;
