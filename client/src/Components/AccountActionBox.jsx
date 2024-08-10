// takes props:
// {
//  type: String,
//  confirm: Boolean,
//  welcome: String,
// redirect: String,
// redirectType: String
// }
import { Link, useNavigate } from "react-router-dom"
import LoginAndSignupHeader from "./LoginAndSignupHeader"
import { useState } from "react"
import { useMutation } from '@apollo/client'
import { LOGIN_USER, ADD_USER } from "../utils/mutations"
import Auth from '../utils/auth'

export default function AccountActionBox(props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [verifyPassword, setVerifyPassword] = useState()
    
    // Mutations for login and signup
    const [loginUser] = useMutation(LOGIN_USER);
    const [addUser] = useMutation(ADD_USER);
    
    console.log(props.confirm)
    let hideConfirmPass
    let linkSwitch
    if (props.confirm === false) {
        hideConfirmPass = "w-full hidden"
        linkSwitch = '/signup'
    } else {
        hideConfirmPass = "w-full flex flex-col"
        linkSwitch = '/'
    }

    function handleEmailChange(evt) {
        setEmail(evt.target.value)
    }
    function handlePasswordChange(evt) {
        setPassword(evt.target.value)
    }

    function handleVerifyPasswordChange(evt) {
        setVerifyPassword(evt.target.value)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (props.type === 'Login') {
            try {
                const { data } = await loginUser({
                    variables: { email, password },
                });

                Auth.login(data.login.token);
                navigate('/homepage')
            } catch (err) {
                console.error(err)
            }
        };

        if (props.type === "Sign Up") {
            if (verifyPassword !== password) {
                return console.log('passwords do not match')
            }
            try {
                const { data } = await addUser({
                    variables: { email, password },
                })

                alert('Account creation successful!')
                Auth.login(data.addUser.token);
                navigate('/login')
            } catch (err) {
                console.error(err)
            }
        }
    }


    return (
        <div className="w-full h-svh overflow-hidden">
            <LoginAndSignupHeader />
            <div className="w-full h-full flex justify-center flex-col items-center gap-5 default-font">
                <h1 className="text-3xl ">{props.welcome}</h1>
                <p className="text-gray-500">Flow, Swing, Jazz, Groove Gather.</p>
                <div className=" lg:w-1/2 flex w-3/4 flex-col gap-5 p-4 items-center">
                    <div className="w-full">
                        <h1 className="text-lg">Email</h1>
                        <input type="text" className="border border-groove-red rounded w-full p-2" placeholder="you@email.com" onChange={handleEmailChange} />
                    </div>
                    <div className="w-full">
                        <h1 className="text-lg">Password</h1>
                        <input type="password" className="border border-groove-red rounded w-full p-2" placeholder="Password" onChange={handlePasswordChange} />
                    </div>
                    <div className={hideConfirmPass}>
                        <h1 className="text-lg">Confirm Password</h1>
                        <input type="password" placeholder="Confirm password" className="border border-groove-red rounded w-full p-2" onChange={handleVerifyPasswordChange} />
                    </div>
                    <button className="bg-groove-red text-white p-2 text-xl w-full rounded hover:bg-groove-red-hover active:bg-groove-red-active" onClick={handleSubmit}>{props.type}</button>
                    <div className="flex text-sm gap-1 lg:text-md" >
                        <p>{props.redirect}</p><Link to={linkSwitch} className="text-blue-600 cursor-pointer hover:underline">{props.redirectType}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}