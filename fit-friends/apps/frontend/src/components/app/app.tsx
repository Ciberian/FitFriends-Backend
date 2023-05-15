import { AppRoute } from '../../constants';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import IndexPage from '../../pages/index-page/index-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import TrainerPersonalAccountPage from '../../pages/trainer-personal-account-page/trainer-personal-account-page';
import LoadingScreen from '../loading-screen/loading-screen';
import IntroPage from '../../pages/intro-page/intro-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import SignUpPage from '../../pages/sign-up-page/sign-up-page';
import QuestionnaireClientPage from '../../pages/questionnaire-client-page/questionnaire-client-page';
import QuestionnaireTrainerPage from '../../pages/questionnaire-trainer-page/questionnaire-trainer-page';
import CreateTrainingPage from '../../pages/create-training-page/create-training-page';
import MyTrainingsPage from '../../pages/my-trainings-page/my-trainings-page';
import MyOrdersPage from '../../pages/my-orders-page/my-orders-page';
import TrainerFriendsPage from '../../pages/trainer-friends-page/trainer-friends-page';
import TrainerTrainingPage from '../../pages/trainer-training-page/trainer-training-page';
import ClientPersonalAccountPage from '../../pages/client-personal-account-page/client-personal-account-page';
import MyPurchasesPage from '../../pages/my-purchases-page/my-purchases-page';
import MyGymsPage from '../../pages/my-gyms-page/my-gyms-page';
import TrainingDiaryPage from '../../pages/training-diary-page/training-diary-page';
import NutritionDiaryPage from '../../pages/nutrition-diary-page/nutrition-diary-page';
import ClientFriendsPage from '../../pages/client-friends-page/client-friends-page';
import ClientTrainingPage from '../../pages/client-training-page/client-training-page';
import GymsCatalogPage from '../../pages/gyms-catalog-page/gyms-catalog-page';
import GymCardPage from '../../pages/gym-card-page/gym-card-page';
import TrainingsCatalogPage from '../../pages/trainings-catalog-page/trainings-catalog-page';
import UsersCatalogPage from '../../pages/users-catalog-page/users-catalog-page';
import ClientCardPage from '../../pages/client-card-page/client-card-page';
import TrainerCardPage from '../../pages/trainer-card-page/trainer-card-page';
import { UserRole } from '@fit-friends/shared-types';

export function App() {
  // const authorizationStatus = useAppSelector(getAuthorizationStatus);
  // const isDataLoaded = useAppSelector(getLoadedDataStatus);
  // const user = useAppSelector(getUser);
  const authorizationStatus = 'AUTH'; // временный вариант
  const isDataLoaded = false; // временный вариант
  const user = {role: UserRole.Client}

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route path={AppRoute.Root}>
        <Route path={AppRoute.Intro} element={<IntroPage />} />
        <Route path={AppRoute.SignIn} element={<SignInPage />} />
        <Route path={AppRoute.SignUp} element={<SignUpPage />} />
        <Route path={AppRoute.QuestionnaireClient} element={<QuestionnaireClientPage />} />
        <Route path={AppRoute.QuestionnaireTrainer} element={<QuestionnaireTrainerPage />} />

        <Route
          index
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              {(user.role === UserRole.Client) ? <IndexPage /> : <Navigate to={AppRoute.TrainerPersonalAccount} />}
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.TrainerPersonalAccount}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <TrainerPersonalAccountPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.CreateTraining}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <CreateTrainingPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.MyTrainings}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyTrainingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.MyOrders}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyOrdersPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.TrainerFriends}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <TrainerFriendsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.TrainerTrainingCard}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <TrainerTrainingPage />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.ClientPersonalAccount}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <ClientPersonalAccountPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.MyPurchases}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyPurchasesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.MyGyms}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyGymsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.TrainingDiary}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <TrainingDiaryPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.NutritionDiary}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <NutritionDiaryPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.ClientFriends}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <ClientFriendsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.ClientTrainingCard}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <ClientTrainingPage />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.GymsCatalog}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <GymsCatalogPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.GymCard}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <GymCardPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.TrainingsCatalog}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <TrainingsCatalogPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.UsersCatalog}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <UsersCatalogPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.ClientCard}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <ClientCardPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.TrainerCard}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <TrainerCardPage />
            </PrivateRoute>
          }
        />

        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={AppRoute.NotFound} />} />
      </Route>
    </Routes>
  );
}

export default App;
