"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./harryPotter.module.css";

export default function harryPotterList() {
    const url = "https://hp-api.onrender.com/api/characters"; // Link da API externa

    const [harryPotter, setHarryPotter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHarryPotter = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                setHarryPotter(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Erro ao buscar Harry Potter na API");
                setError(
                    "Não foi possível carregar os filmes de Harry Potter. Tente novamente mais tarde!"
                );
                setLoading(false);
            }
        }
        fetchHarryPotter();
    }, []);

    if (loading) {
        return (
            <div className={styles.loading}>
                Carregando Harry Potter...
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.error}>
                {error}
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Harry Potter do Studio Warner Bros</h1>
            <div className={styles.harryPotterGrid}>
                {harryPotter.map((harryPotter) => (
                    <div key={harryPotter.id} className={styles.harryPotterCard}>
                        <div className={styles.imageContainer}>
                            <img src={harryPotter.image} alt={harryPotter.title} className={styles.image} />
                        </div>
                        <div className={styles.content}>
                            <h2 className={styles.harryPotterTitle}>{harryPotter.title}</h2>
                            <p className={styles.house}>{harryPotter.house}</p>
                            <p className={styles.name}>Nome: {harryPotter.name}</p>
                            <p className={styles.year}>{harryPotter.release_date}</p>
                            <div className={styles.rating}>
                                <span className={styles.dateOfBirth}>{harryPotter.dateOfBirth}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}