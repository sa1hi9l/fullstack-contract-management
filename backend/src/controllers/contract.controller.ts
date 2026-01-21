import { Request, Response } from "express";
import * as contractService from "../services/contract.service";

export async function createContract(req: Request, res: Response) {
  try {
    const contract = await contractService.createContract(req.body);
    res.status(201).json(contract);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAllContracts(_: Request, res: Response) {
  const contracts = await contractService.getAllContracts();
  res.json(contracts);
}

export async function getContractById(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Contract ID is required" });
  }

  const contract = await contractService.getContractById(id);

  if (!contract) {
    return res.status(404).json({ error: "Contract not found" });
  }

  res.json(contract);
}

export async function changeContractStatus(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: "Contract ID and status are required" });
  }

  try {
    const updated = await contractService.changeContractStatus(id, status);
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
