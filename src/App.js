import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import Header from './containers/Header';
import { UserProvider } from './containers/UserContext';
import ProtectedRoute from './containers/ProtectedRoute';

const Home = React.lazy(() => import('./pages/Home'));
const Create = React.lazy(() => import('./pages/Create'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const SingleTweet = React.lazy(() => import('./pages/SingleTweet'));

export default function App() {
  return (
    <UserProvider>
      <Header />
      <Container>
        <Row>
          <Col>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tweets/:id" element={<SingleTweet />} />
                <Route
                  path="/create"
                  element={
                    <ProtectedRoute>
                      <Create />
                    </ProtectedRoute>
                  }
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </React.Suspense>
          </Col>
        </Row>
      </Container>
    </UserProvider>
  );
}
