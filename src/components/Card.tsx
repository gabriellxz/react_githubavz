import { Link } from "react-router-dom";

interface propsCard {
    children: React.ReactNode;
    className: string;
    link?: string;
}

export default function Card({ children, className, link }: propsCard) {
    return (
        <Link to={link? link : ""} className={className}>
            {children}
        </Link>
    );
}