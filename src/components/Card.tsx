import { useState, useEffect } from "react";

type IUser = {
    name: string;
    level: number;
    id?: number;
};

export default function Card() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUsers = "https://pokeapi.co/api/v2/pokemon/1";
    useEffect(() => {
        async function fetchUsers() {
            try {
                setLoading(true);
                const response = await fetch(apiUsers);
                const data = await response.json();
                setData(data);
                console.log(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (loading) return <>Carregando...</>;
    if (error) return <>Erro: {error}</>;
    if (!data) return <>Nenhum dado encontrado.</>;
    return (
        <div className="bg-emerald-200 w-60 rounded-2xl shadow-2xl flex flex-col">
            <img src={data.sprites.front_default} alt="" />
            <h2>{data.name}</h2>
            <p>height {data.height}</p>
            <p>id: {data.id}</p>
            <p>type: {data.types.map((tipo) => tipo.type.name + "/")} </p>
            {data ? data.name : "Loading..."}
        </div>
    );
}
