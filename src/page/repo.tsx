import Container from "../components/Container";
import Top from "../components/Top";
import union from "../assets/Union.svg";
import vector from "../assets/Vector.svg";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userType } from "../type/user";
import axios from "axios";
import foto from "../assets/Foto.png";
import arrow from "../assets/Arrow.svg";

export default function Repo() {

    const params = useParams();
    const [repo, setRepo] = useState<userType[]>([]);
    const [stats, setStats] = useState<any>({
        stars: 0,
        forks: 0,
        issues: 0
    })

    useEffect(() => {
        async function getRepoUser() {
            try {
                const response = await axios.get(`https://api.github.com/users/${params.nomeUser}/repos`)

                // console.log("user:", response.data);
                
                const totalStats = response.data.reduce(
                    (acc: any, repo: any) => {
                        return {
                            stars: acc.stars + repo.stargazers_count,
                            forks: acc.forks + repo.forks_count,
                            issues: acc.issues + repo.open_issues_count,
                        };
                    },
                    { stars: 0, forks: 0, issues: 0 }
                );
                
                setRepo(response.data);
                setStats(totalStats);
            } catch (error) {
                console.log(error);
            }
        }

        getRepoUser();
    }, [params.nomeUser, params.idUser]);

    return (
        <Container className="px-[50px] pt-[20px]">
            <Top className="flex justify-between">
                <div className="flex items-center gap-2">
                    <img src={union} alt="union" className='w-[32px]' />
                    <p className='font-semibold text-grayGit-100'>github_explorer</p>
                </div>
                <Link to={"/"} className="flex items-center gap-3 cursor-pointer select-none">
                    <img src={vector} alt="vector" />
                    <p className="text-grayGit-300">Voltar</p>
                </Link>
            </Top>
            <div className="flex items-center gap-5 mt-[70px]">
                <img src={foto} alt="perfil" />
                <div>
                    <p className="text-grayGit-400 text-[36px] font-bold">{params.nomeUser}/repo</p>
                    <p className="text-whiteGit-200">Descrição do repo</p>
                </div>
            </div>
            <div className="flex gap-[50px] mt-[40px]">
                <p className="text-grayGit-400 text-3xl flex flex-col">
                    <span className="font-bold">{stats.stars}</span>
                    <span className="text-grayGit-500 text-[20px]">Stars</span>
                </p>
                <p className="text-grayGit-400 text-3xl flex flex-col">
                    <span className="font-bold">{stats.forks}</span>
                    <span className="text-grayGit-500 text-[20px]">Stars</span>
                </p>
                <p className="text-grayGit-400 text-3xl flex flex-col">
                    <span className="font-bold">{stats.issues}</span>
                    <span className="text-grayGit-500 text-[20px]">Issues abertas</span>
                </p>
            </div>
            <div className="mt-[50px]">
                {repo.map((r: any) => (
                    <a
                        target="_blank"
                        href={r.html_url}
                        className="max-w-[714px] w-full bg-white p-5 rounded-md flex justify-between mb-3"
                        key={r.id}
                    >
                        <div>
                            <p className="text-grayGit-400 text-[24px] font-semibold">{r.name}/repo</p>
                            <p className="text-whiteGit-200">Descrição do repo</p>
                        </div>
                        <img src={arrow} alt="arrow" />
                    </a>
                ))}
            </div>
        </Container>
    );
}