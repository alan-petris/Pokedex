import { useState, useEffect } from "react";

type IPokemon = {
    name: string;
    level: number;
    id?: number;
};

export default function Card() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                setLoading(true);
                const response = await fetch(
                    "https://pokeapi.co/api/v2/pokemon/1",
                );
                const data = await response.json();
                setData(data);
                console.log(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemon();
    }, []);

    if (loading) return <>Carregando...</>;
    if (error) return <>Erro: {error}</>;
    if (!data) return <>Nenhum dado encontrado.</>;
    return (
        <div className="container bg-amber-300 w-60 rounded-2xl">
            <img src={data.sprites.front_default} alt="" />
            <h3>{data.name}</h3>
            <p>height {data.height}</p>
            <p>id: {data.id}</p>
            <p>type: {data.types.map((tipo) => tipo.type.name + "/")} </p>
            <p>Achei o : {data ? data.name : "Loading..."}</p>
            <button>Cliquei</button>
        </div>
    );
}
