import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button
      onClick={logoutHandler}
      className="px-5 py-2 text-purple-900 font-semibold rounded-full transition-all duration-300 ease-in-out hover:text-white hover:bg-pink-300/40 hover:scale-105"
    >
      Logout
    </button>
  )
}

export default LogoutBtn
