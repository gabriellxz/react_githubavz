import Container from "../components/Container";
import Top from "../components/Top";
import union from "../assets/Union.svg";
import vector from "../assets/Vector.svg";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userType } from "../type/user";
import axios from "axios";
import arrow from "../assets/Arrow.svg";
import Skeleton from "react-loading-skeleton";

// const tokenUser = import.meta.env.VITE_TOKEN_USER_GITHUB

export default function Repo() {

    const params = useParams();
    const [repo, setRepo] = useState<userType[]>([]);
    const [stats, setStats] = useState<any>({
        stars: 0,
        forks: 0,
        issues: 0
    })
    const [user, setUser] = useState<userType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function getUsers() {

        setLoading(true);

        try {
            const response = await axios.get("https://api.github.com/users", {
                headers: {
                    "Authorization": `Bearer ` + import.meta.env.VITE_TOKEN_USER_GITHUB
                }
            })

            setLoading(false);
            const userAvatar = response.data.find((user: userType) => user.id === Number(params.idUser))
            setUser(userAvatar);
            // console.log(response.data);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        async function getRepoUser() {

            setLoading(true);

            try {
                const response = await axios.get(`https://api.github.com/users/${params.nomeUser}/repos`, {
                    headers: {
                        "Authorization": `Bearer ` + import.meta.env.VITE_TOKEN_USER_GITHUB
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

                setLoading(false);
                setRepo(response.data);
                setStats(totalStats);
            } catch (error) {
                setLoading(false);
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
                            loading ? (
                                <Skeleton circle width={100} height={100} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
                            ) : (
                                user && <img src={user.avatar_url} alt="avatar" className="max-w-[100px] w-full rounded-full" />
                            )
                        }
                        <div>
                            {loading ? (
                                <Skeleton width={300} height={36} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
                            ) : (
                                <p className="text-grayGit-400 text-[36px] font-bold">{params.nomeUser}/repo</p>
                            )}
                            <p className="text-whiteGit-200">Descrição do repo</p>
                        </div>
                    </div>
                    <div className="flex gap-[50px] mt-[40px] w-full">
                        <p className="text-grayGit-400 text-3xl flex flex-col">
                            {loading ? (
                                <Skeleton width={50} height={30} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
                            ) : (
                                <>
                                    <span className="font-bold">{stats.stars}</span>
                                    <span className="text-grayGit-500 text-[20px]">Stars</span>
                                </>
                            )}
                        </p>
                        <p className="text-grayGit-400 text-3xl flex flex-col">
                            {loading ? (
                                <Skeleton width={50} height={30} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
                            ) : (
                                <>
                                    <span className="font-bold">{stats.forks}</span>
                                    <span className="text-grayGit-500 text-[20px]">Forks</span>
                                </>
                            )}
                        </p>
                        <p className="text-grayGit-400 text-3xl flex flex-col">
                            {loading ? (
                                <Skeleton width={50} height={30} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
                            ) : (
                                <>
                                    <span className="font-bold">{stats.issues}</span>
                                    <span className="text-grayGit-500 text-[20px]">Issues abertas</span>
                                </>
                            )}
                        </p>
                    </div>
                    <div className="mt-[50px] w-full">
                        {loading ? (
                            Array(5).fill(0).map((_, index) => (
                                <div key={index} className="w-full bg-white p-5 rounded-md flex justify-between mb-3">
                                    <Skeleton width={200} height={24} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
                                    <Skeleton width={24} height={24} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
                                </div>
                            ))
                        ) : (
                            repo.map((r: any) => (
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
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}