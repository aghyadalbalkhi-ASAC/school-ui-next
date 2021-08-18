import {lazy} from 'react-router-guard';
import {
    mustUnAuth,
    mustAuth,
} from './guards';
// import {mustAuth, mustUnAuth, mustUnAuthAdmin, mustAdmin, mustAuthAdmin} from './guards'

const config = [
    {
        path: '/auth',
        exact: true,
        component: lazy(() => import('../pages/auth/login')),
        canActivate: [mustUnAuth]
    },
    {
        path: '/',
        component: lazy(() => import('../components/main/Main.ui')),
        routes: [
            // {
            //     path: '/business/signup',
            //     exact: true,
            //     component: lazy(() => import('../ui/signup-business/SignupBusiness.ui'))
            // },

            // /* Start of Business User Routes*/
            // {
            //     path: '/profile',
            //     exact: true,
            //     component: lazy(
            //         () => import('../ui/business-profile/BusinessProfile.ui')
            //     ),
            //     canActivate: [mustAuth, mustBusinessUser]
            // },
            {
                path: '/',
                redirect: '/auth'
            }
        ]
        // canActivate: [mustAuth],
    }

];
export default config;
