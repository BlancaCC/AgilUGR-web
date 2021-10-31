import {
    Navigate, useRoutes, BrowserRoutes
} from 'react-router-dom'
import Main from './layouts/Main'
import Profile from './views/Profile'

// router 
function Router () {
    return useRoutes([
        {
            path: '/', 
            element: <Main/>,
            children: [
                {path: profileURL, element: <Profile/>},
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
        <BrowserRoutes>
            <Router />
        </BrowserRoutes>
    )
}