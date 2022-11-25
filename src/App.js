import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import ALB from './components/alb.js';
import NLB from './components/nlb.js';
import Navigation from './components/navigation.js';

class PageRoutes extends Component {
    render() {
        return (
            <Routes>
                <Route path='/alb' element={<ALB />} />
                <Route path='/nlb' element={<NLB />} />
                <Route path='*' element={<ALB />} />
            </Routes>
        )
    }
}

class App extends Component {
    render() {
        return (
            <Container>
                <Navigation />
                <PageRoutes />
            </Container >
        )
    }
}

export default App;