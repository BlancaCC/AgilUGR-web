import {
    Navigate, useRoutes, BrowserRouter
} from 'react-router-dom'
import Main from './layouts/Main'
// vistas 
import Profile from './views/Profile'
import Debug from './views/Debug'
// urls 
import {profileURL, debugURL} from './routesURL'

// router 
function Router () {
    return useRoutes([

        {
            path: '/', 
            element: <Main/>,
            children: [
                {path: profileURL, element: <Profile/>},
                {path: debugURL, element: <Debug/>},
                // TODO other views 
            ]
        },
        {
            path: '*', 
            element: <Navigate to={profileURL} replace />
        }
    ])
}

export default function RouterWrapper () {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    )
}