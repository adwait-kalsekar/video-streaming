import { Router } from "express";

import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const uploadFields = upload.fields([
  {
    name: "avatar",
    maxCount: 1,
  },
  {
    name: "coverImage",
    maxCount: 1,
  },
]);

const router = Router();

router.route("/register").post(uploadFields, registerUser);

export default router;
