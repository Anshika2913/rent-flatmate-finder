import express from "express";
import { create,  getAll, getById, update, markFilled} from "../controllers/listing.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/",authenticate,authorize("OWNER"),create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", authenticate, authorize("OWNER"), update);
router.patch("/:id/fill", authenticate, authorize("OWNER"), markFilled);

export default router;