/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react"

const USER_REG = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/


// Abd72786!

const Signup = () => {

  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validUser, setValidUser] = useState(false)
  const [userFoucs, setUserFoucs] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFoucs, setPwdFoucs] = useState(false)
  // const [pwdShow, setPwdShow] = useState(false)

  const [pwdMatch, setPwdMatch] = useState('')
  const [validPwdMatch, setValidPwdMatch] = useState(false)
  const [pwdMatchFoucs, setPwdMatchFoucs] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [succes, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => setValidUser(USER_REG.test(user)), [user]);

  useEffect(() => {
    const result = PWD_REG.test(pwd)
    setValidPwd(result)
    const match = pwdMatch === pwd;
    setValidPwdMatch(match)
  }, [pwd, pwdMatch])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, pwdMatch])

  const handelSubmit = (e) => {
    e.preventDefault()
    
  }

  return (
    <section className="Login">
      <h1>Regester</h1>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'hideit'} 
      aria-live="assertive">{errMsg}</p>
      <form className="loginForm" onSubmit={handelSubmit}>
        <label htmlFor="username">
          Username:
          <span className={validUser ? 'valid' : 'hide'}>valid</span>
          <span className={user && !validUser ? 'invalid' : 'hide'}>invalid</span>
        </label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          ref={userRef}
          aria-invalid={validUser ? 'false' : 'true'}
          aria-describedby="usernote"
          onFocus={() => setUserFoucs(true)}
          onBlur={()=> setUserFoucs(false)}
        />
        <p id="usernote" className={ user && userFoucs
          && !validUser ? 'instraction' : "hideit" }>
           4 to 24 characters.<br />Must start with a letter. <br />
           Letters, numbers, underscore, hyphens allowed.
        </p>
        <label htmlFor="password">
          Password:
          <span className={validPwd ? 'valid' : 'hide'}>valid</span>
          <span className={pwd && !validPwd ? 'invalid' : 'hide'}>invalid</span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          aria-invalid={validPwd ? 'false' : 'true'}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFoucs(true)}
          onBlur={()=> setPwdFoucs(false)}
        />
        <p id="pwdnote" className={ pwdFoucs
          && !validPwd ? 'instraction' : "hideit" }>
           8 to 24 characters.<br />Must include uppercase and lowercase letters, a number and special charecter.
        </p>
        <label htmlFor="confirm-password">
          Confirm Password:
          <span className={pwd && validPwdMatch ? 'valid' : 'hide'}>valid</span>
          <span className={pwdMatch && !validPwdMatch ? 'invalid' : 'hide'}>invalid</span>
        </label>
        <input
          type="password"
          id="confirm-password"
          onChange={(e) => setPwdMatch(e.target.value)}
          required
          aria-invalid={validPwdMatch ? 'false' : 'true'}
          aria-describedby="cpwdnote"
          onFocus={() => setPwdMatchFoucs(true)}
          onBlur={()=> setPwdMatchFoucs(false)}
        />
        <p id="cpwdnote" className={ pwdMatchFoucs
          && !validPwdMatch ? 'instraction' : "hideit" }>
          Must match the first password.
        </p>
        <button disabled={!validUser || !validPwd || !validPwdMatch ? true : false }>Sign Up</button>
      </form>
    </section>
  )
}
  
  export default Signup
  