import { useQuery } from '@apollo/client';
import { GET_TEACHER_BY_NAME } from '../utils/queries';
import backdrop from '../assets/backdrop.jpg';
import profile from '../assets/profile.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react'; // Import useState from React

export default function Account() {
    const { loading, error, data } = useQuery(GET_TEACHER_BY_NAME, {
        variables: { name: 'Cassie' },
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error('Error fetching profile:', error);
        return <p>Error loading profile.</p>;
    }

    const teacher = data?.teacherByName || []; 

    return (
        <div className='flex items-center w-full justify-center default-font'>
            <div className='flex flex-col gap-1 lg:w-1/2'>
                <CoverAndProfilePicture />
                <div className='ml-6 flex gap-2 items-center'>
                    <p className='font-bold text-xl'>{teacher.name}</p>
                    <div className='mx-6 mt-4'>
                        <Link to={`/cassiesClasses`}>
                            <button className='text-white bg-groove-red rounded-full px-4 py-2'>
                                Book with Me
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='mx-6'>
                    <p className='text-lg'>{teacher.bio}</p>
                    <p className='text-md text-gray-600'>Dance Styles: {teacher.dancestyles}</p>
                    <p className='text-md text-gray-600'>Experience: {teacher.experience} years</p>
                    <p className='text-md text-gray-600'>Next Festival: {teacher.nextFestival}</p>
                </div>
            </div>
        </div>
    );
}

function CoverAndProfilePicture() {
    const [showMessage, setShowMessage] = useState(false);

    const handleFollowClick = () => {
        setShowMessage(true);

        // Hide the message after a few seconds
        setTimeout(() => {
            setShowMessage(false);
        }, 3000); // Hide message after 3 seconds
    };

    return (
        <div className='relative h-80 defaultFont'>
            <img src={backdrop} alt="cover" className='relative h-64 w-full object-fill mx-auto' />
            <div className='rounded-full size-28 flex items-center justify-center absolute left-6 lg:left-[26%] top-48 border-2 border-groove-red'>
                <img src={profile} alt="profile" className='rounded-full size-24' />
            </div>
            <button
                className='mr-6 mt-6 w-1/4 text-white rounded-full p-2 bg-groove-red float-right'
                onClick={handleFollowClick}
            >
                Follow
            </button>
            {showMessage && (
                <div className='absolute mt-2 right-6 p-2 bg-gray-800 text-white rounded'>
                    Thank you for the follow!
                </div>
            )}
        </div>
    );
}
