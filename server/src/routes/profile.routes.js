import express from "express";
import {
  create,
  getMyProfile,
  update,
} from "../controllers/profile.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("TENANT"),
  create
);

router.get(
  "/",
  authenticate,
  authorize("TENANT"),
  getMyProfile
);

router.put(
  "/",
  authenticate,
  authorize("TENANT"),
  update
);

export default router;