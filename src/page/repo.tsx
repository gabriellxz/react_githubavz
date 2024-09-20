import Container from "../components/Container";
import Top from "../components/Top";
import union from "../assets/Union.svg";
import vector from "../assets/Vector.svg";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userType } from "../type/user";
import axios from "axios";
import arrow from "../assets/Arrow.svg";

const tokenUser = import.meta.env.VITE_TOKEN_USER_GITHUB

export default function Repo() {

    const params = useParams();
    const [repo, setRepo] = useState<userType[]>([]);
    const [stats, setStats] = useState<any>({
        stars: 0,
        forks: 0,
        issues: 0
    })
    const [user, setUser] = useState<userType | null>(null);

    async function getUsers() {
        try {
            const response = await axios.get("https://api.github.com/users", {
                headers: {
                    "Authorization": `Bearer ${tokenUser}`
                }
            })

            const userAvatar = response.data.find((user: userType) => user.id === Number(params.idUser))
            setUser(userAvatar);
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        async function getRepoUser() {
            try {
                const response = await axios.get(`https://api.github.com/users/${params.nomeUser}/repos`, {
                    headers: {
                        "Authorization": `Bearer ${tokenUser}`
                    }
                })

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
        <Container className="w-full flex justify-center px-[50px] pt-[20px]">
            <div className="max-w-[960px] w-full">
                <Top className="flex justify-between w-full">
                    <div className="flex items-center gap-2">
                        <img src={union} alt="union" className='w-[32px]' />
                        <p className='font-semibold text-grayGit-100'>github_explorer</p>
                    </div>
                    <Link to={"/"} className="flex items-center gap-3 cursor-pointer select-none">
                        <img src={vector} alt="vector" />
                        <p className="text-grayGit-300">Voltar</p>
                    </Link>
                </Top>
                <div>
                    <div className="flex items-center gap-5 mt-[70px] w-full">
                        {
                            user && <img src={user.avatar_url} alt="avatar"
                                className="max-w-[100px] w-full rounded-full"
                            />
                        }
                        <div>
                            <p className="text-grayGit-400 text-[36px] font-bold">{params.nomeUser}/repo</p>
                            <p className="text-whiteGit-200">Descrição do repo</p>
                        </div>
                    </div>
                    <div className="flex gap-[50px] mt-[40px] w-full">
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
                    <div className="mt-[50px] w-full">
                        {repo.map((r: any) => (
                            <a
                                target="_blank"
                                href={r.html_url}
                                className="w-full bg-white p-5 rounded-md flex justify-between mb-3"
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
                </div>
            </div>
        </Container>
    );
}