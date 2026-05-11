import { useState, useEffect } from "react";
import "./Card.css";

type PokemonType = {
    type: {
        name: string;
    };
};

type Pokemon = {
    name: string;
    level: number;
    id?: number;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    types: PokemonType[];
};

export default function Card() {
    const [pokemon, setData] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const apiUsers = "https://pokeapi.co/api/v2/pokemon/pikachu";
    useEffect(() => {
        async function loadPokemon() {
            try {
                setLoading(true);
                const response = await fetch(apiUsers);
                const data: Pokemon = await response.json();
                setData(data);
                console.log(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Erro inesperado");
                }
            } finally {
                setLoading(false);
            }
        }

        loadPokemon();
    }, []);

    if (loading) return <>Carregando...</>;
    if (error) return <>Erro: {error}</>;
    if (!pokemon) return <>Nenhum dado encontrado.</>;
    return (
        <div className="card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />

            <h2>{pokemon.name}</h2>

            <div className="card-info">
                <div className="info-box">
                    <span>Height</span>
                    <strong>{pokemon.height}</strong>
                </div>

                <div className="info-box">
                    <span>Weight</span>
                    <strong>{pokemon.weight}</strong>
                </div>
            </div>

            <div className="types">
                {pokemon.types.map((item) => (
                    <div className="type" key={item.type.name}>
                        {item.type.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
