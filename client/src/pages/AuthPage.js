import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export function AuthPage() {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: '',
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    function changeHandler(event) {
        setForm({...form, [event.target.name]: event.target.value})
    }

    async function registerHandler() {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }

    async function loginHandler() {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }

    return (
        <div className="auth">
            <h1 className="auth__title">Сократи ссылку</h1>
            <div className="carda">
                <div className="carda__content">
                    <span className="carda__title">Авторизация</span>
                    <div className="carda__inputs">
                        <div className="carda__input-field">
                            <input
                                className="carda__input input"
                                placeholder="Введите email"
                                id="email"
                                type="text"
                                name="email"
                                onChange={changeHandler}
                                value={form.email}/>
                        </div>
                        <div className="carda__input-field">
                            <input
                                className="carda__input input"
                                placeholder="Введите пароль"
                                id="password"
                                type="password"
                                name="password"
                                onChange={changeHandler}
                                value={form.password}/>
                        </div>
                    </div>
                </div>
                <div className="carda__action">
                    <button
                        className="carda__btn login-btn"
                        style={{marginRight: 10}}
                        onClick={loginHandler}
                        disabled={loading}>
                        Войти
                    </button>
                    <button
                        className="carda__btn register-btn"
                        onClick={registerHandler}
                        disabled={loading}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </div>
    )
}