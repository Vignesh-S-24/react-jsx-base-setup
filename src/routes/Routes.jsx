import { lazy, Suspense } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import MainLayout from "../layout/MainLayout";
import Loader from "../components/loader/Loader";

const RootLayout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
};

const Login = lazy(() => import("../pages/Auth/Login"));
const Signup = lazy(() => import("../pages/Auth/Signup"));
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
import {
  inventoryRoutes,
  salesRoutes,
  purchasesRoutes,
  timesheetRoutes,
  accountantRoutes,
  otherRoutes
} from './sidebarRoutes';

const Settings = lazy(() =>
  Promise.resolve({ default: () => <div>Settings Page</div> }),
);
const NotFound = lazy(() => import('../errors/NotFound'));
const Error500 = lazy(() =>
  Promise.resolve({ default: () => <div>500 Internal Error</div> }),
);
const MaintenancePage = lazy(() =>
  Promise.resolve({ default: () => <div>Under Maintenance</div> }),
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicRoute restricted={true} />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
          { path: "/forgot-password", element: <ForgotPassword /> },
        ],
      },
      { path: "/maintenance", element: <MaintenancePage /> },
      { path: "/500", element: <Error500 /> },
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [

              { path: 'dashboard', element: <Dashboard /> },
              ...inventoryRoutes,
              ...salesRoutes,
              ...purchasesRoutes,
              ...timesheetRoutes,
              ...accountantRoutes,
              ...otherRoutes,
              { path: 'settings', element: <Settings /> },
              { path: '*', element: <NotFound /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
