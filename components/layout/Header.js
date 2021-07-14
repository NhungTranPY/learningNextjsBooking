import React, {useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../../redux/actions/userActions'
import { signOut } from 'next-auth/client'

const Header = () => {

    const dispatch = useDispatch()

    const { user, loading } = useSelector(state => state.auth) // auth trong reducers.js

    useEffect(() => {
        // if(!user) {
            dispatch(loadUser())
        // }
    }, [dispatch])

    const logoutHandler = () => {
        signOut()
    }

    return (
        <nav className="navbar row justify-content-center sticky-top">
            <div className="container">
                <div className="col-3 p-0">
                    <div className="navbar-brand">
                        <Link href='/' passHref>
                            {/* <Image 
                                style={{ cursor: 'pointer' }} 
                                height={5}
                                width={10}
                                src="/public/images/bookit_logo.png" 
                                alt="Rental" /> */}
                                RENTAL
                        </Link>
                    </div>
                </div>

                <div className="col-3 mt-3 mt-md-0 text-center">

                    {user ? (
                        <div className="ml-4 dropdown d-line">
                            <button
                                className="btn dropdown-toggle mr-4"
                                type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false"
                            >
                                <figure className="avatar avatar-nav">
                                    <Image 
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                        width='100%'
                                        height='100%'
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </button>
                            {/* dropdowm list below */}
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                {/* <Link href='/bookings/me' passHref className="dropdown-item">
                                    My Bookings
                                </Link> */}
                                
                                <Link href='/bookings/me' passHref>
                                    <a className="dropdown-item">My Bookings</a>
                                </Link>
                                <Link href='/me/update' passHref>
                                    <a className="dropdown-item">Profile</a>
                                </Link>
                                <Link href='/' passHref>
                                    <a className="dropdown-item text-danger" onClick={logoutHandler}>Logout</a>
                                </Link>
                                
                            </div>
                        </div>
                    ) : 
                        !loading && <Link href='/login' passHref>
                            <a className="btn btn-danger px-4 text-white login-header-btn float-right">Login</a>
                        </Link>  
                    }

                                    
                </div>
            </div>
        </nav>
    )
}

export default Header
