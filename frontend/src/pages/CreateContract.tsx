import { useEffect, useState } from "react";
import axios from "axios";

interface Blueprint {
  id: string;
  name: string;
}

export default function CreateContract() {
  const [name, setName] = useState("");
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [blueprintId, setBlueprintId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/blueprints").then(res => {
      setBlueprints(res.data);
    });
  }, []);

  async function createContract() {
    await axios.post("http://localhost:4000/contracts", {
      name,
      blueprintId
    });
    alert("Contract created");
    setName("");
    setBlueprintId("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Contract</h2>

      <input
        placeholder="Contract name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <br /><br />

      <select
        value={blueprintId}
        onChange={e => setBlueprintId(e.target.value)}
      >
        <option value="">Select Blueprint</option>
        {blueprints.map(b => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <br /><br />

      <button onClick={createContract}>Create Contract</button>
    </div>
  );
}
