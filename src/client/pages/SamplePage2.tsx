import React from 'react';
import styled from 'styled-components';
import sampleImage1 from "../resources/images/sample-image-1.png";
import sampleImage2 from "../resources/images/sample-image-2.png";

export default function SamplePage2() {

    return (
        <Wrapper>
        
            <h1>Sample page 2</h1>
            <h2>Static content</h2>
            <p>The images below were fetched from the server.</p>
            <div className="images-sample">
                <img src={sampleImage1} />
                <img src={sampleImage2} />
            </div>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    div.images-sample {
        display: flex;
        flex-flow: row wrap;
        gap: 36px;
        align-items: center;
        margin: 48px;
        padding: 36px;
    }
    
`;