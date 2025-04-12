import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div><div className="flex items-center justify-center min-h-screen font-poppins">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <div className="mb-8">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" className="mx-auto" />
      </div>
      <div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">
          ...maybe the page you're looking for is not found or never existed.
        </p>
        <Link to="/">
          <button className="px-6 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
            Back to home <i className="far fa-hand-point-right ml-2"></i>
          </button>
        </Link>
      </div>
    </div>
  </div></div>
  )
}

export default NotFoundPage