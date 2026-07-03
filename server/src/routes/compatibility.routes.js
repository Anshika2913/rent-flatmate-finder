import express from "express";
import { generate } from "../controllers/compatibility.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/:listingId",
  authenticate,
  authorize("TENANT"),
  generate
);

export default router;