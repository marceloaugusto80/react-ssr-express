import React, { PureComponent, ReactNode } from 'react'
import MainLayout from './components/MainLayout';


/**
 * The root react component for both client side rendering and server side rendering
 */
export default class App extends PureComponent {
    render(): ReactNode {
        return (
            <React.StrictMode>
                <MainLayout/>
            </React.StrictMode>
        );
    }
}



