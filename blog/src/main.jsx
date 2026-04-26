import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/index.js'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import AllPost from './pages/AllPost.jsx'
import EditPost from './pages/EditPost.jsx'
import AddPost from './pages/addPost.jsx'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:(
          <AuthLayout authentication={false}>
          <Login/>
          </AuthLayout>
        )
      },
      {
        path:'/signup',
        element:(
          <AuthLayout authentication={false}>
          <Signup/>
          </AuthLayout>
        )
      },
      {
        path:'/all-posts',
        element:(
          <AuthLayout authentication>
            {" "}
          <AllPost/>
          </AuthLayout>
        )
      },
      {
        path:'/add-posts',
        element:(
          <AuthLayout authentication>
            {" "}
          <AddPost/>
          </AuthLayout>
        )
      },
      {
        path:'/edit-post/:slug',
        element:(
          <AuthLayout authentication>
            {" "}
          <EditPost/>
          </AuthLayout>
        )
      },
      {
        path:'/post/:slug',
        element:<Post/>
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
