interface propsContainer {
    children: React.ReactNode;
    className: string;
}

export default function Container({children, className}:propsContainer) {
    return(
        <div className={className}>{children}</div>
    );
}