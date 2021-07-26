import Welcome from './Components/Welcome';
import Admin from './Components/Admin/Admin';
import Staff from './Components/Staff/Staff';
import AdminLayout from './Layouts/AdminLayout';
import StaffLayout from './Layouts/StaffLayout';
import LandingLayout from './Layouts/LandingLayout';
import Passengers from './Components/Admin/Passengers';
import Services from './Components/Admin/Services';
import Dashboard from './Components/Admin/Dashboard';
import Service from './Components/Staff/Service';
import Checkin from './Components/Staff/Checkin';
import InFlight from './Components/Staff/InFlight';

const routes = [
    {
        layout: LandingLayout,
        subRoutes: [
            {
                exact: true,
                path: "/",
                component: Welcome
            }
        ]
    },
    {
        layout: AdminLayout,
        subRoutes: [
            {
                path: "/admin",
                component: Admin
            },
            {
                path: "/passengers",
                component: Passengers
            },
            {
                path: "/services",
                component: Services
            },
            {
                path: "/dashboard",
                component: Dashboard
            }
        ]
    },
    {
        layout: StaffLayout,
        subRoutes: [
            {
                path: "/staff",
                component: Staff
            },
            {
                path: "/checkin",
                component: Checkin
            },
            {
                path: "/service",
                component: Service
            },
            {
                path: "/inflight",
                component: InFlight
            }
        ]
    }
];

export default routes;