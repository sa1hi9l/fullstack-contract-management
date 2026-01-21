import { Router } from "express";
import {
    createContract,
    getAllContracts,
    getContractById,
    changeContractStatus
} from "../controllers/contract.controller";

const router = Router();

router.post("/", createContract);
router.get("/", getAllContracts);
router.get("/:id", getContractById);
router.patch("/:id/status", changeContractStatus);

export default router;
