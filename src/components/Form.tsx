interface propsForm {
    changeValue: (e:any) => void;
    inputValue: string;
    handleSearch: (e:React.FormEvent) => void;
}

export default function Form({changeValue, inputValue, handleSearch}:propsForm) {
    return(
        <form className="flex max-w-[714px] w-full mt-[50px]" onSubmit={handleSearch}>
            <input type="text" placeholder="Digite aqui" className="w-full placeholder:text-grayGit-300 px-[16px] py-[19px] outline-none" onChange={changeValue} value={inputValue}/>
            <button className="px-16 py-[19px] bg-greenGit-100 text-white font-semibold">Pesquisar</button>
        </form>
    );
}