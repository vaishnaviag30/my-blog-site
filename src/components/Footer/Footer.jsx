import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gradient-to-tl from-pink-50 via-purple-50 to-blue-50 border-t border-gray-200 rounded-t-2xl">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap justify-between">
          
          <div className="w-full p-6 md:w-1/2 lg:w-1/4">
            <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-purple-400">
              Company
            </h3>
            <ul>
              <li className="mb-2">
                <Link className="text-sm font-medium text-purple-700 hover:text-pink-500 transition" to="/">Features</Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm font-medium text-purple-700 hover:text-pink-500 transition" to="/">Pricing</Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm font-medium text-purple-700 hover:text-pink-500 transition" to="/">Affiliate</Link>
              </li>
            </ul>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-1/4">
            <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-purple-400">
              Support
            </h3>
            <ul>
              <li className="mb-2">
                <Link className="text-sm font-medium text-purple-700 hover:text-pink-500 transition" to="/">Account</Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm font-medium text-purple-700 hover:text-pink-500 transition" to="/">Help</Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm font-medium text-purple-700 hover:text-pink-500 transition" to="/">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-1/4">
            <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-purple-400">
              Legal
            </h3>
            <ul>
              <li className="mb-2">
                <Link className="text-sm font-medium text-purple-700 hover:text-pink-500 transition" to="/">Terms</Link>
              </li>
              <li className="mb-2">
                <Link className="text-sm font-medium text-purple-700 hover:text-pink-500 transition" to="/">Privacy</Link>
              </li>
              <li>
                <Link className="text-sm font-medium text-purple-700 hover:text-pink-500 transition" to="/">Licensing</Link>
              </li>
            </ul>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-1/4">
            <p className="text-sm text-purple-600">
              &copy; 2023. All Rights Reserved by DevUI.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Footer

