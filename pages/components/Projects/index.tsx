import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { api } from "../../../lib/api";
import { GitPullRequest, Star } from "phosphor-react";

export default function Projects() {
  interface RepositoryProps {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
  }

  const [repositories, setRepositories] = useState<RepositoryProps[]>([]);

  async function fetchMainRepositories() {
    const response = await api.get("repos", {
      params: {
        per_page: 6,
        sort: "updated",
        direction: "desc",
        q: "language:typescript",
      },
    });
    setRepositories(response.data);
  }
  useEffect(() => {
    fetchMainRepositories();
  }, []);

  return (
    <div className={styles.container}>
      {repositories.map((repository) => (
        <div key={repository.id} className={styles.card}>
          <a className={styles.cardLink} href={`https://github.com/Jairotsb/${repository.name}`} target="_blank">
            <h3 className={styles.name}>{repository.name}</h3>
            <p className={styles.description}>{repository.description}</p>
            <div className={styles.infoCard}>
              <div className={styles.githubInfo}>
                <Star  className={styles.iconData}/> {repository.stargazers_count}
                <GitPullRequest className={styles.iconData} /> {repository.forks_count}
              </div>
              <p className={styles.language}>#{repository.language}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
