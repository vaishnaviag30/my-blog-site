import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 shadow-md rounded-b-xl">
      <Container className="bg-transparent">
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center">
              <Logo width="70px" />
            </Link>

          </div>

          {/* Navigation Items */}
          <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-center text-lg font-medium">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-5 py-2 text-purple-900 font-semibold rounded-full transition-all duration-300 ease-in-out hover:text-white hover:bg-pink-300/40 hover:scale-105"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
