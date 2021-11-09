import React, {useContext} from "react"
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

import logo from "../logo.png"

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <header className="header">
            <div className="header__container">
                <span className="header__logo">Сокращение ссылок</span>
                <ul id="nav-mobile" className="header__menu">
                    <li className="header__menu-li"><NavLink className="header__menu-link" to="/create">Создать</NavLink></li>
                    <li className="header__menu-li"><NavLink className="header__menu-link" to="/links">Ваши ссылки</NavLink></li>
                    <li className="header__menu-li"><a className="header__menu-link" href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </header>
    )
}