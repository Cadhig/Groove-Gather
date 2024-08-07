import backdrop from '../assets/backdrop.jpg'
import profile from '../assets/profile.jpg'
export default function Account() {

    return (
        <div>
            <img src={backdrop} alt="cover" className='relative mx-auto' />
            <div className='rounded-full size-28 flex items-center justify-center absolute left-6 top-48 border-2 border-groove-red '>
                <img src={profile} alt="profile" className='rounded-full size-24' />
            </div>
        </div>
    )
}