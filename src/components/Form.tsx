interface propsForm {
    changeValue: (e:any) => void;
    inputValue: string;
}

export default function Form({changeValue, inputValue}:propsForm) {
    return(
        <form className="flex max-w-[714px] w-full mt-[50px]">
            <input type="text" placeholder="Digite aqui" className="w-full placeholder:text-grayGit-300 px-[16px] py-[19px] outline-none" onChange={changeValue} value={inputValue}/>
            <button className="px-16 py-[19px] bg-greenGit-100 text-white font-semibold">Pesquisar</button>
        </form>
    );
}