// takes props:
// {
//  type: String,
//  confirm: Boolean,
//  welcome: String,
// redirect: String,
// redirectType: String
// }
import { Link } from "react-router-dom"

export default function AccountActionBox(props) {
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


    return (
        <div className="w-full h-svh flex justify-center flex-col items-center gap-5 default-font">
            <h1 className="text-3xl ">{props.welcome}</h1>
            <p className="text-gray-500">Flow, Swing, Jazz, Groove Gather.  </p>
            <div className=" lg:w-1/2 flex w-3/4 flex-col gap-5 p-4 items-center">
                <div className="w-full">
                    <h1 className="text-lg">Username</h1>
                    <input type="text" className="border border-groove-red rounded w-full p-2" placeholder="Your Username" />
                </div>
                <div className="w-full">
                    <h1 className="text-lg">Password</h1>
                    <input type="password" className="border border-groove-red rounded w-full p-2" placeholder="Password" />
                </div>
                <div className={hideConfirmPass}>
                    <h1 className="text-lg">Confirm Password</h1>
                    <input type="password" placeholder="Confirm password" className="border border-groove-red rounded w-full p-2" />
                </div>
                <button className="bg-groove-red text-white p-2 text-xl w-full rounded hover:bg-groove-red-hover active:bg-groove-red-active">{props.type}</button>
                <div className="flex text-sm gap-1 lg:text-md" >
                    <p>{props.redirect}</p><Link to={linkSwitch} className="text-blue-600 cursor-pointer hover:underline">{props.redirectType}</Link>
                </div>
            </div>
        </div>
    )
}