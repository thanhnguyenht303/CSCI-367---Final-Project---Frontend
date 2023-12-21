import React from "react";
import {Link, useMatch, useResolvedPath} from "react-router-dom";
const navBar = () => {

    return (
        <div className = "nav">
           <div className = "navTitle">
                <Link to = "/"> HOME </Link>
           </div>
           <ul>
                <CustomLink to = "/order" style = {{fontSize: "1.5rem", marginRight: "1rem"}}> Order</CustomLink>
                <CustomLink to = "/tracking" style = {{fontSize: "1.5rem", marginRight: "1rem"}}> Tracking </CustomLink>
           </ul>
        </div>
    )
}


const CustomLink = ({to, children, ...props}) => {
    
    const resolovePath = useResolvedPath(to);
    const isActive = useMatch({path: resolovePath.pathname, end: true});

    return (
        <li className = { isActive ? "active": ""}>
            <Link to = {to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default navBar;