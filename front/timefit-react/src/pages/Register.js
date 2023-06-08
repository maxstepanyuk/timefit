import React from 'react'

import { useRef, useState, useEffect } from "react";

import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import './Register.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{1,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
    // to set reference
    const userRef = useRef();
    const errRef = useRef();

    // for user field - input, if validates, focused
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    // for email field - input, if validates, focused
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);


    // for password field - input, if validates, focused
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // for confirm password field - input, if validates, focused
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    // error msg
    const [errMsg, setErrMsg] = useState('');

    // success submit
    const [success, setSuccess] = useState(false);

    // when component loads - focus on user input
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // validate user name
    useEffect(() => {
        const result = USER_REGEX.test(user);
        // console.log(result, user);
        setValidName(result);
    }, [user])

    //validate email
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        // console.log(result, email);
        setValidEmail(result);
    }, [email])


    // validate pass regex; if (pwd === matchPwd) 
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        // console.log(result, pwd);
        setValidPwd(result);

        const match = (pwd === matchPwd);
        // console.log(match, matchPwd);
        setValidMatch(match);
    }, [pwd, matchPwd])

    // for displaying error message, if fields change - clear error message 
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd, email])

    // handle Submit form
    const handleSubmit = async (e) => {
        //to use custom handleSubmit
        e.preventDefault();

        // check
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);

        const valid = v1 && v2 && v3;
        // console.log(valid, 'valid');

        if (!valid) {
            setErrMsg("Invalid Entry");
            return;
        }
        setSuccess(valid);

        // todo - axios

        // try {
        //     const response = await axios.post(REGISTER_URL,
        //         JSON.stringify({ user, pwd }),
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //             withCredentials: true
        //         }
        //     );
        //     console.log(response?.data);
        //     console.log(response?.accessToken);
        //     console.log(JSON.stringify(response))
        //     setSuccess(true);
        //     //clear state and controlled inputs
        //     //need value attrib on inputs for this
        //     setUser('');
        //     setPwd('');
        //     setMatchPwd('');
        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err.response?.status === 409) {
        //         setErrMsg('Username Taken');
        //     } else {
        //         setErrMsg('Registration Failed')
        //     }
        //     errRef.current.focus();
        // }
    }

    // if success true - link to login, if false - register :
    return (

        <>{success ? (
            <section>
                <h1>Successful Register</h1>
                {/* todo - put router link here*/}
                <a href="#">Sign In</a>
            </section>
        ) : (
            <section>

                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>

                    <label htmlFor="username">Username
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                    </label>
                    <input
                        required
                        type="text"
                        id="username"
                        ref={userRef}
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        2 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <label htmlFor="email">
                        Email:
                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={!validEmail && email ? "invalid" : "hide"} />
                    </label>
                    <input
                        type="text"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={!validEmail && email ? "true" : "false"}
                        aria-describedby="emailnote"
                        onFocus={() => setMailFocus(true)}
                        onBlur={() => setMailFocus(false)}
                    />
                    <p id="emailnote" className={mailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Please enter a valid email address.
                    </p>


                    <label htmlFor="password">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>

                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>

                    <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                        Sign Up
                    </button>

                </form>

                <p>
                    Already registered?<br />
                    <span className="line">
                        {/* todo - put router link here*/}
                        <a href="#">Sign In</a>
                    </span>
                </p>

            </section>

        )}</>

    )
}

export default Register