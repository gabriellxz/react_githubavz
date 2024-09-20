import axios from "axios";
import { useEffect, useState } from "react";
import { userType } from "../type/user";
import Top from "../components/Top";
import Title from "../components/Title";
import Form from "../components/Form";
import Card from "../components/Card";
import Container from "../components/Container";
import union from "../assets/Union.svg";
import arrow from "../assets/Arrow.svg";
import { toast, Toaster } from "sonner";

// const tokenUser = import.meta.env.VITE_TOKEN_USER_GITHUB

export default function Home() {
    // const [user, setUser] = useState<userType | null>(null);
    const [usersDefaults, setUserDefaults] = useState<userType[]>([]);
    // const [filteredUsers, setFilteredUsers] = useState<userType[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        async function getUsersDefaults() {
            try {
                const response = await axios.get("https://api.github.com/users", {
                    headers: {
                        "Authorization": `Bearer ` + import.meta.env.VITE_TOKEN_USER_GITHUB
                    }
                })

                // console.log(response)
                setUserDefaults(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getUsersDefaults();
    }, []);

    async function getUser(nameUser: string) {
        try {
            const response = await axios.get(`https://api.github.com/search/users?q=${nameUser}`, {
                headers: {
                    "Authorization": `Bearer ` + import.meta.env.VITE_TOKEN_USER_GITHUB
                }
            })

            setUserDefaults(response.data.items);
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();

        if (!searchTerm) {
            toast.error("Preencha o campo!")
        } else {
            getUser(searchTerm);
        }

    }


    return (
        <Container className='px-[50px] pt-[20px] w-full'>
            <div>
                <Top className="flex items-center gap-2">
                    <img src={union} alt="union" className='w-[32px]' />
                    <p className='font-semibold text-grayGit-100'>github_explorer</p>
                </Top>
                <div>
                    <Title />
                    <Form
                        changeValue={(e: any) => setSearchTerm(e.target.value)}
                        inputValue={searchTerm}
                        handleSearch={handleSearch}
                    />
                    <div className='mt-[100px]'>
                        {
                            usersDefaults.length > 0 && usersDefaults.map((user: userType) => (
                                <Card link={`/repo/${user.login}/${user.id}`} key={user.id} className="max-w-[714px] w-full bg-white p-5 rounded-md flex justify-between mb-3">
                                    <div className="flex items-center gap-5">
                                        <img src={user.avatar_url} alt="avatar" className="max-w-[83px] w-full rounded-full" />
                                        <div>
                                            <p className="text-grayGit-400 text-[24px] font-semibold">{user.login}/repo</p>
                                            <p className="text-whiteGit-200">Descrição do repo</p>
                                        </div>
                                    </div>
                                    <img src={arrow} alt="arrow" />
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Toaster richColors />
        </Container>
    )
}