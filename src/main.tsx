import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './pages/Auth'
import Login from './pages/Login'
import Register from './pages/Register'
import Root from './pages/Root'
import Add from './pages/Add'

const Items = lazy(() => import('./pages/Items'));
const Edit = lazy(() => import('./pages/Edit'));



const root = createBrowserRouter(
  [
    {
      path: '/',
      element: <Auth />,
      children: [
        {
          path: '',
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        }
      ]
    },
    {
      path: "/dashbored",
      element: <Root />,
      children: [
        {
          path: "items",
          element: <Suspense fallback={<div className=' w-screen h-screen text-black dark:text-white text-center flex items-center justify-center text-6xl'>There Ss No Produects Yet ....</div>}>
            <Items />
          </Suspense>,
          loader: async () => {
            const res = await fetch("https://vica.website/api/items", {
              headers: {
                Authorization: `${localStorage.getItem("token")}`,
                "Accept": "application/json"
              }
            })
            if (!res.ok) {
              throw new Error("NOT FOUND")
            } else {
              return res.json()
            }
          }
        },
        {
          path: "add",
          element: <Add />,

        },
        {
          path: "edit/:id",
          element: <Suspense fallback={<div className=' w-screen h-screen text-black dark:text-white text-center flex items-center justify-center text-6xl'>There Is No Produects Yet ....</div>}>
            <Edit />
          </Suspense>,
          loader: async ({ params }) => {
            const res = await fetch(`https://vica.website/api/items/${params.id}`, {
              headers: {
                Authorization: `${localStorage.getItem("token")}`,
                "Accept": "application/json",
              }
            })
            if (!res.ok) {
              throw new Error("NOT FOUND")
            } else {
              return res.json()
            }
          }
        },
        {
          path: "favorits",
          element: "Favorits"
        },
        {
          path: "orderlist",
          element: "Order List"
        }
      ]
    }
  ])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={root} />
  </StrictMode>,
)
