import { useQuery } from '@apollo/client'
import { GET_ME } from '../utils/queries'
import backdrop from '../assets/backdrop.jpg'
import profile from '../assets/profile.jpg'

export default function Account() {
    const {loading, error, data } = useQuery(GET_ME);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error('Error fetching profile:', error);
        return <p>Error loading profile.</p>;
    }

    const username = data?.me?.username || 'User'; 


    return (
        <div className='flex items-center w-full justify-center default-font'>
            <div className='flex flex-col gap-1 lg:w-1/2'>
                <CoverAndProfilePicture />
                <div className='ml-6 flex gap-2 items-center'>
                    <p className='font-bold text-xl'>{username}</p>
                    <p className='text-black/50 text-sm'>pro/nouns</p>
                </div>
                <div className='mx-6'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </p>
                </div>
            </div>
        </div>

    )
}

function CoverAndProfilePicture() {

    return (
        <div className='h-80 defaultFont'>
            <img src={backdrop} alt="cover" className='relative h-64 w-full object-fill mx-auto' />
            <div className='rounded-full size-28 flex items-center justify-center absolute left-6 lg:left-[26%] top-48 border-2 border-groove-red '>
                <img src={profile} alt="profile" className='rounded-full size-24' />
            </div>
            <button className='mr-6 mt-6 w-1/4 text-white rounded-full p-2 bg-groove-red float-right'>Follow</button>
        </div>
    )
}