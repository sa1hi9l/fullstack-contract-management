import { api } from "./api";

export type ContractStatus =
  | "CREATED"
  | "APPROVED"
  | "SENT"
  | "SIGNED"
  | "LOCKED"
  | "REVOKED";

export interface Contract {
  id: string;
  name: string;
  status: ContractStatus;
  createdAt: string;
  blueprint: {
    name: string;
  };
}

export async function fetchContracts(): Promise<Contract[]> {
  const res = await api.get("/contracts");
  return res.data;
}

export async function changeContractStatus(
  contractId: string,
  status: ContractStatus
) {
  return api.patch(`/contracts/${contractId}/status`, { status });
}
