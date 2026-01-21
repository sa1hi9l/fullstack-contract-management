import { prisma } from "../prisma";

interface CreateBlueprintInput {
    name: string;
    fields: {
        type: "TEXT" | "DATE" | "SIGNATURE" | "CHECKBOX";
        label: string;
        positionX: number;
        positionY: number;
    }[];
}

export async function createBlueprint(data: CreateBlueprintInput) {
    if (!data.name || !data.fields?.length) {
        throw new Error("Blueprint name and fields are required");
    }

    return prisma.blueprint.create({
        data: {
            name: data.name,
            fields: {
                create: data.fields
            }
        },
        include: {
            fields: true
        }
    });
}

export function getAllBlueprints() {
    return prisma.blueprint.findMany({
        include: {
            fields: true
        }
    });
}

export function getBlueprintById(id: string) {
    return prisma.blueprint.findUnique({
        where: { id },
        include: {
            fields: true
        }
    });
}

export async function deleteBlueprint(id: string) {
    await prisma.blueprint.delete({
        where: { id }
    });
}
