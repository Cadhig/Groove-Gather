import { Link } from 'react-router-dom'
import ProfilePicture from '../assets/profile.jpg'
export default function Header() {

    return (
        <div className='flex justify-end items-center p-2 md:p-4 text-groove-red  w-full'>
            <div className="text-center w-full absolute">
                <p className="logo-font text-2xl md:text-4xl text-center">Groove Gather</p>
            </div>
            <div className='flex items-center justify-center gap-1 md:gap-4 cursor-pointer'>
                <Link to={'/profile'} className='border-groove-red border flex items-center justify-center rounded-full size-12 md:size-16'>
                    <img src={ProfilePicture} alt="profile" className=' w-10 md:w-14 rounded-full relative' />
                </Link>
                <p className='text-xl'>Logout</p>
            </div>
        </div>
    )
}