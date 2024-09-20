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

const tokenUser = import.meta.env.VITE_TOKEN_USER_GITHUB

export default function Home() {
    const [user, setUser] = useState<userType[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<userType[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    async function getUsers() {
        try {
            const response = await axios.get("https://api.github.com/users", {
                headers: {
                    "Authorization": `Bearer` + tokenUser
                }
            })

            setUser(response.data)
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        setFilteredUsers(
            user.filter((user: userType) => user.login.toLowerCase().includes(searchTerm.toLowerCase())
            ))
    }, [searchTerm, user]);

    return (
        <Container className='px-[50px] pt-[20px]'>
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
                    />
                    <div className='mt-[100px]'>
                        {filteredUsers.map((card: userType) => (
                            <Card link={`/repo/${card.login}/${card.id}`} key={card.id} className="max-w-[714px] w-full bg-white p-5 rounded-md flex justify-between mb-3">
                                <div className="flex items-center gap-5">
                                    <img src={card.avatar_url} alt="avatar" className="max-w-[83px] w-full rounded-full" />
                                    <div>
                                        <p className="text-grayGit-400 text-[24px] font-semibold">{card.login}/repo</p>
                                        <p className="text-whiteGit-200">Descrição do repo</p>
                                    </div>
                                </div>
                                <img src={arrow} alt="arrow" />
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    )
}