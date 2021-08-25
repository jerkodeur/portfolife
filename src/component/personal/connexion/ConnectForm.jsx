import React from 'react';
import { useState } from 'react';

import Axios from 'axios';

const ConnectForm = ({switchConnexion}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleForm = (e) => {
        e.preventDefault(e);
        Axios.post('/admins', {email, password})
            .then(result => switchConnexion(true))
            .catch(error => console.log(error))
    }

    return (
        <div className="connect-container">
            <p>Interface de connexion:</p>
            <form>
                <label htmlFor="email">E-mail</label>
                <input type="text" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleForm}>Connexion</button>
            </form>
        </div>
    )
}

export default ConnectForm