import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';

const LeftSidebar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess]);

  return (
    <nav className="leftsidebar">
        <div className="flex flex-col gap-11">
            <Link to="/" className="flex gap-3 items-center">
                <img src="/assets/images/logo.svg" alt="logo" width={170} height={36} />
            </Link>

            <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
                <img src={user.imageUrl || "assets/icons/profile-placeholder.svg"} alt="profile" className='h-14 w-14 rounded-full' />
                <div className='flex flex-col'>
                    <p className='body-bold'>
                        {user.name}
                    </p>
                    <p className='small-regular text-light-3'>@{user.username}</p>
                </div>
            </Link>
        </div>
    </nav>
  )
}

export default LeftSidebar