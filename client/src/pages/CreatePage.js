import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export function CreatePage() {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST',
                    {from: link}, {Authorization: `Bearer ${auth.token}`})
                history.push(`/detail/${data.link._id}`)
            } catch (e) {

            }
        }
    }
    return(
        <div className="create">
            <div className="">
                <div className="create__input-field">
                    <input
                        className="create__input input"
                        placeholder="Введите ссылку"
                        id="link"
                        type="text"
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                        value={link}/>
                </div>
            </div>
        </div>
    )
}