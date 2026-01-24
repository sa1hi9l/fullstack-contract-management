import { useEffect, useState } from "react";
import axios from "axios";

interface Blueprint {
  id: string;
  name: string;
}

export default function DeleteBlueprint() {
    const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
    const [selectedId, setSelectedId] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchBlueprints();
    }, []);

    async function fetchBlueprints() {
        const res = await axios.get("https://fullstack-contract-management.onrender.com/blueprints");
        setBlueprints(res.data);
    }

    async function deleteBlueprint() {
        if(!selectedId) {
            alert("Please select a blueprint");
            return;
        }
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blueprint?"
        );
        if(!confirmDelete) return;

        try{
            setLoading(true);
            await axios.delete(
                `https://fullstack-contract-management.onrender.com/blueprints/${selectedId}`
            );
            alert("Blueprint Deleted");
            setSelectedId("");
            fetchBlueprints();
        }catch (err) {
            alert("Failed to delete blueprint: " + err);
        }finally { 
            setLoading(false); 
        }
    }
    return (
        <div style={{ padding: 20 }}>
            <h2>Delete Blueprint</h2>
            <p>Note: only Bluprints that are not in use can be deleted!</p>
            <br/>
            <select
                value={selectedId}
                onChange={e => setSelectedId(e.target.value)}
            >
                <option value="">Select Blueprint</option>
                {blueprints.map(bp => (
                <option key={bp.id} value={bp.id}>
                    {bp.name}
                </option>
                ))}
            </select>

            <br /><br />

            <button
                onClick={deleteBlueprint}
                disabled={loading}
                style={{
                background: "#dc3545",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: 4,
                cursor: "pointer"
                }}
            >
                {loading ? "Deleting..." : "Delete Blueprint"}
            </button>
        </div>
    );
}