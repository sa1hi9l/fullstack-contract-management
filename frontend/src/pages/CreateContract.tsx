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
    const [blueprintFields, setBlueprintFields] = useState<any[]>([]);


    useEffect(() => {
        axios.get("https://fullstack-contract-management.onrender.com/blueprints").then(res => {
            setBlueprints(res.data);
        });
    }, []);

    async function createContract() {
        await axios.post("https://fullstack-contract-management.onrender.com/contracts", {
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
            onChange={async e => {
                const id = e.target.value;
                setBlueprintId(id);
                if (id) {
                    const res = await axios.get(
                        `https://fullstack-contract-management.onrender.com/blueprints/${id}`
                    );
                    setBlueprintFields(res.data.fields);
                } else {
                    setBlueprintFields([]);
                }
            }}
        >
            <option value="">Select Blueprint</option>
            {blueprints.map(b => (
            <option key={b.id} value={b.id}>
                {b.name}
            </option>
            ))}
        </select>
        {blueprintFields.length > 0 && (
            <div style={{ marginTop: 20 }}>
                <h3>Contract Fields</h3>

                {blueprintFields.map(field => (
                <div key={field.id} style={{ marginBottom: 10 }}>
                    <label>{field.label}</label><br />

                    {field.type === "TEXT" && (
                        <input placeholder={field.label} />
                    )}

                    {field.type === "DATE" && (
                        <input type="date" />
                    )}

                    {field.type === "CHECKBOX" && (
                        <input type="checkbox" />
                    )}

                    {field.type === "SIGNATURE" && (
                        <input placeholder="Please Enter Full Name" />
                    )}
                </div>
                ))}
            </div>
            )}

        <br /><br />

        <button onClick={createContract}>Create Contract</button>
        </div>
    );
}
