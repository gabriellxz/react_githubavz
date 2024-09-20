interface propsTop {
    children: React.ReactNode;
    className: string;
}

export default function Top({children, className }: propsTop) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}