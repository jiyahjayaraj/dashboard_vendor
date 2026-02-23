import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'utils/authGuard';

// lazy pages
const DashboardDefault = lazy(() => import('ui-component/dashboard'));
const Events = lazy(() => import('ui-component/events'));
const TicketManagement = lazy(() => import('ui-component/tickets'))
const Bookings = lazy(() => import('ui-component/bookings/order'))
const Profile = lazy(() => import('ui-component/profile'))

const UserFeedbackPage = lazy(() => import('ui-component/user_feedback/index'));
const UserRatingPage = lazy(() => import('ui-component/user_rating/index'));
const NopageFound = lazy(() => import('ui-component/common/no-page/NoPage'));

const Loader = () => <div>Loading...</div>;

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard user={['Vendor', 'Surveyor', 'Requester']}>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '',
      element: <Navigate to="dashboard" replace />
    },
    {
      path: 'dashboard',
      element: (
        <Suspense fallback={<Loader />}>
          <DashboardDefault />
        </Suspense>
      )
    },
    {
      path: 'events',
      element: (
        <Suspense fallback={<Loader />}>
          <Events />
        </Suspense>
      )

    },
    {
      path: 'tickets',
      element: (
        <Suspense fallback={<Loader />}>
          <TicketManagement />
        </Suspense>
      )
    },
    {
      path: 'bookings',
      element: (
        <Suspense fallback={<Loader />}>
          <Bookings />
        </Suspense>
      )
    },
    {
      path: 'profile',
      element: (
        <Suspense fallback={<Loader />}>
          <Profile />
        </Suspense>
      )
    },
    {
      path: 'userfeedback',
      element: (
        <Suspense fallback={<Loader />}>
          <UserFeedbackPage />
        </Suspense>
      )
    },
    {
      path: 'rating',
      element: (
        <Suspense fallback={<Loader />}>
          <UserRatingPage />
        </Suspense>
      )
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<Loader />}>
          <NopageFound />
        </Suspense>
      )
    }
  ]
};

export default MainRoutes;
