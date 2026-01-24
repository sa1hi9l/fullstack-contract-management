import { useState } from "react";
import axios from "axios";

type FieldType = "TEXT" | "DATE" | "SIGNATURE" | "CHECKBOX";

interface Field {
  type: FieldType;
  label: string;
  positionX: number;
  positionY: number;
}

export default function CreateBlueprint() {
  const [name, setName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);

  function addField() {
    setFields([
      ...fields,
      { type: "TEXT", label: "", positionX: 0, positionY: 0 }
    ]);
  }

  function updateField<K extends keyof Field>(index: number, key: K, value: Field[K]) {
    const updated = [...fields];
    updated[index] ={
        ...updated[index],
        [key]: value
    };
    setFields(updated);
  }

  async function saveBlueprint() {
    await axios.post("https://fullstack-contract-management.onrender.com/blueprints", {
      name,
      fields
    });
    alert("Blueprint created");
    setName("");
    setFields([]);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Create a Blueprint Template</h2>

      <input
        placeholder="Blueprint name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <br /><br />

      <button onClick={addField}>Add Field</button>

      {fields.map((field, i) => (
        <div key={i} style={{ marginTop: 10 }}>
          <select
            value={field.type}
            onChange={e =>
              updateField(i, "type", e.target.value as FieldType)
            }
          >
            <option>TEXT</option>
            <option>DATE</option>
            <option>SIGNATURE</option>
            <option>CHECKBOX</option>
          </select>

          <input
            placeholder="Label"
            value={field.label}
            onChange={e => updateField(i, "label", e.target.value)}
          />
        </div>
      ))}

      <br />
      <button onClick={saveBlueprint}>Save Blueprint</button>
    </div>
  );
}
