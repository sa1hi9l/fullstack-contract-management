import { prisma } from "../prisma";
import { ContractStatus } from "@prisma/client";
import { CONTRACT_TRANSITIONS } from "../constants/contractLifecycle";
import type { BlueprintField } from "@prisma/client";

interface CreateContractInput {
    name: string;
    blueprintId: string;
}

export async function createContract(data: CreateContractInput) {
    if (!data.name || !data.blueprintId) {
        throw new Error("Contract name and blueprintId are required");
    }
    const blueprint = await prisma.blueprint.findUnique({
        where: { id: data.blueprintId },
        include: { fields: true }
    });

    if (!blueprint) {
        throw new Error("Blueprint not found");
    }

  return prisma.contract.create({
    data: {
      name: data.name,
      blueprintId: blueprint.id,
      status: ContractStatus.CREATED,
      fields: {
        create: blueprint.fields.map((field: BlueprintField) => ({
          blueprintFieldId: field.id,
          value: null
        }))
      }
    },
    include: {
      blueprint: true,
      fields: {
        include: {
          blueprintField: true
        }
      }
    }
  });
}

export function getAllContracts() {
  return prisma.contract.findMany({
    include: {
      blueprint: true
    }
  });
}

export function getContractById(id: string) {
  return prisma.contract.findUnique({
    where: { id },
    include: {
      blueprint: true,
      fields: {
        include: {
          blueprintField: true
        }
      }
    }
  });
}

export async function changeContractStatus(
  contractId: string,
  newStatus: ContractStatus
) {
  const contract = await prisma.contract.findUnique({
    where: { id: contractId }
  });

  if (!contract) {
    throw new Error("Contract not found");
  }

  if (contract.status === ContractStatus.LOCKED) {
    throw new Error("Locked contracts cannot be modified");
  }

  if (contract.status === ContractStatus.REVOKED) {
    throw new Error("Revoked contracts cannot be modified");
  }

  const allowed = CONTRACT_TRANSITIONS[contract.status];

  if (!allowed.includes(newStatus)) {
    throw new Error(
      `Invalid status transition from ${contract.status} to ${newStatus}`
    );
  }

  return prisma.contract.update({
    where: { id: contractId },
    data: { status: newStatus }
  });
}