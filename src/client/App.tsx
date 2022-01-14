import React, { StrictMode } from 'react'
import { Link, Routes, Route } from 'react-router-dom';
import styled from "styled-components";
import HomePage from './pages/HomePage';
import SamplePage1 from './pages/SamplePage1';
import SamplePage2 from './pages/SamplePage2';

/** * The root react component for both client side rendering and server side rendering */
export default function App() {

    return (
        <StrictMode>
            <Wrapper>

                <div className="header">React SSR Template</div>

                <div className="sidebar">
                    <Link to="/">Home</Link>
                    <Link to="sample-page-1">Sample page 1</Link>
                    <Link to="sample-page2">Sample page 2</Link>
                </div>

                <div className="content">
                    <Routes>
                        <Route path="/sample-page-1" element={<SamplePage1 />} />
                        <Route path="/sample-page2" element={<SamplePage2 />} />
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </div>

            </Wrapper>
        </StrictMode>
    );

}


const Wrapper = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    min-height: 100vh;
    display: grid;
    grid-template-areas: 
        "header  header"
        "sidebar content";
    grid-template-columns: 200px 1fr;
    grid-template-rows: 50px 1fr;

    
    div.header {
        grid-area: header;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        padding: 8px;
        font-size: 22px;
        background-color: #087db3;
        color: white;
    }
    div.sidebar {
        grid-area: sidebar;
        display: flex;
        flex-flow: column nowrap;
        justify-content: right;
        gap: 36px;
        padding: 16px;
        background-color: #bedceb;

        a:visited {
            text-decoration: none;
        }
    }
    div.content {
        grid-area: content;
        padding: 8px;
    }
`;




