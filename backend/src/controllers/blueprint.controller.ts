import { Request, Response } from "express";
import * as blueprintService from "../services/blueprint.service";

export async function createBlueprint(req: Request, res: Response) {
    try {
        const blueprint = await blueprintService.createBlueprint(req.body);
        res.status(201).json(blueprint);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getAllBlueprints(_: Request, res: Response) {
    const blueprints = await blueprintService.getAllBlueprints();
    res.json(blueprints);
}

export async function getBlueprintById(req: Request, res: Response) {
    
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
        return res.status(404).json({ error: "Blueprint not found" });
    }
    const blueprint = await blueprintService.getBlueprintById(id);

    if(!blueprint) {
        return res.status(404).json({error: "Blueprint not found"});
    }
    res.json(blueprint);
}

export async function deleteBlueprint(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
        return res.status(404).json({ error: "Blueprint ID is required" });
    }  
    try {
        await blueprintService.deleteBlueprint(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
