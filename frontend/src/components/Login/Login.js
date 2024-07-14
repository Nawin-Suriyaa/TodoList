import React, { useEffect, useState } from 'react';
import validator from 'validator';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/user';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)  
    const { user, loading, error } = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let par = document.getElementById('error1');
    let par2 = document.getElementById('error2');

    const submit = (e) => {
        e.preventDefault();  
        if (email.trim() === '') return (par.innerHTML = 'Please Enter the Email Address');
        if (!validator.isEmail(email.trim())) return (par.innerHTML = 'Please Enter a valid Email Address');

        if (validator.isEmail(email.trim())) {
            if (password.trim() !== '') {
                dispatch(login({ email: email, password: password }))
            } else {
                par2.innerHTML = 'Please Enter Password';
            }

        }

    };

    useEffect(() => {
        if (error) {
            return
        }
        if (user && user.email) {
            navigate("/tasks")
        }

    }, [user, error,navigate])

    return (
        <div className="login-container">
            {error && <div className="alert alert-danger error" role="alert">
                {error} 
            </div>}
            <h3>Login</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p id="error1" className="error"></p>
                </div>
                <div className="form-group">
                    <label htmlFor="password1">Password</label>
                    <input type={`${showPassword ? "text" : "password"}`} className="form-control" id="password1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p id="error2" className="error"></p>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={() => setShowPassword(!showPassword)} />&nbsp;&nbsp;
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Show Password
                    </label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={submit}>
                    {loading === true ? "Loading..." : "Submit"}
                </button>
            </form>
            <div className='pt-3'>No account ? <span className="highlight" onClick={() => navigate('/register')}>Register</span></div>
        </div>
    );
};

export default Login;
