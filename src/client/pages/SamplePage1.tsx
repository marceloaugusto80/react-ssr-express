import React, { Fragment, useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { ExampleModel } from 'shared/models';
import { useServerData } from 'client/serverData';

export default function SamplePage1() {

    // you can check this variable state in the useEffect hook and make an api call if it's null.
    // that will depends on your requirements.
    // Mind that this variable will only receive the prerender data if you're navigating here by a common link, not a Router link.
    const model = useServerData<ExampleModel>();

    return (
        <Wrapper>
            <h1>Sample page 1</h1>
            {
                model &&
                <p>{model.message}</p>
            }
            {
                !model &&
                <Fragment>
                    <p>If you're seeing this, means that you navigated to this page by the BrowserRouter.</p>
                    <p>If you're running the application server, refresh the page to receive a ssr version of it.</p>
                </Fragment>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    h2 {
        background-color: #dfdfdf;
        width: 100%;
        padding: 8px;
        margin-top: 36px;
    }
`;