// Inside App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './Components/DefaultLayout/DefaultLayout';
import { publicRoutes } from './Routes/Routes';
import { Fragment } from 'react';
import ShopProvider from './context/ShopProvider';

function App() {
    return (
        <Router>
            <div className="App">
                <ShopProvider />
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
