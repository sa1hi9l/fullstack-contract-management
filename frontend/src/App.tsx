import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import CreateBlueprint from "./pages/CreateBlueprint";
import CreateContract from "./pages/CreateContract";
import DeleteBlueprint from "./pages/DeleteBlueprint";

export default function App() {
  const [page, setPage] = useState<"dashboard" | "blueprint" | "contract" | "deleteBlueprint">(
    "dashboard"
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
      <nav style={{ padding: 10 }}>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("blueprint")}>Create a New Blueprint Template</button>
        <button onClick={() => setPage("contract")}>Create New Contract</button>
        <button onClick={() => setPage("deleteBlueprint")}>Update/Delete a Blueprint</button>
      </nav>

      {page === "dashboard" && <Dashboard />}
      {page === "blueprint" && <CreateBlueprint />}
      {page === "contract" && <CreateContract />}
      {page === "deleteBlueprint" && <DeleteBlueprint />} 
    </div>
  );
}
