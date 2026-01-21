import { useEffect, useState } from "react";
import {
  fetchContracts,
  changeContractStatus,
} from "../services/contractService";
import type { Contract } from "../services/contractService";

type Filter = "ALL" | "ACTIVE" | "PENDING" | "SIGNED";

export default function Dashboard() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [filter, setFilter] = useState<Filter>("ALL");

  useEffect(() => {
    loadContracts();
  }, []);

  async function loadContracts() {
    const data = await fetchContracts();
    setContracts(data);
  }

  function applyFilter(contract: Contract) {
    if (filter === "ALL") return true;
    if (filter === "PENDING") return contract.status === "CREATED";
    if (filter === "ACTIVE")
      return contract.status === "APPROVED" || contract.status === "SENT";
    if (filter === "SIGNED")
      return contract.status === "SIGNED" || contract.status === "LOCKED";
    return true;
  }

  async function handleStatusChange(
    id: string,
    status: Contract["status"]
  ) {
    await changeContractStatus(id, status);
    await loadContracts();
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Contract Dashboard</h2>

      {/* Filters */}
      <div style={{ marginBottom: 16 }}>
        {["ALL", "PENDING", "ACTIVE", "SIGNED"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as Filter)}
            style={{ marginRight: 8 }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <table width="100%" border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Contract Name</th>
            <th>Blueprint</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {contracts.filter(applyFilter).map(contract => (
            <tr key={contract.id}>
              <td>{contract.name}</td>
              <td>{contract.blueprint.name}</td>
              <td>{contract.status}</td>
              <td>
                {new Date(contract.createdAt).toLocaleDateString()}
              </td>
              <td>
                {contract.status === "CREATED" && (
                  <button
                    onClick={() =>
                      handleStatusChange(contract.id, "APPROVED")
                    }
                  >
                    Approve
                  </button>
                )}

                {contract.status === "APPROVED" && (
                  <button
                    onClick={() =>
                      handleStatusChange(contract.id, "SENT")
                    }
                  >
                    Send
                  </button>
                )}

                {contract.status === "SENT" && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusChange(contract.id, "SIGNED")
                      }
                    >
                      Sign
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(contract.id, "REVOKED")
                      }
                    >
                      Revoke
                    </button>
                  </>
                )}

                {contract.status === "SIGNED" && (
                  <button
                    onClick={() =>
                      handleStatusChange(contract.id, "LOCKED")
                    }
                  >
                    Lock
                  </button>
                )}

                {(contract.status === "LOCKED" ||
                  contract.status === "REVOKED") && (
                  <span>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
