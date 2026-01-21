import { Router } from "express";
import {
    createBlueprint,
    getAllBlueprints,
    getBlueprintById,
    deleteBlueprint
} from "../controllers/blueprint.controller";

const router = Router();

router.post("/", createBlueprint);
router.get("/", getAllBlueprints);
router.get("/:id", getBlueprintById);
router.delete("/:id", deleteBlueprint);

export default router;
