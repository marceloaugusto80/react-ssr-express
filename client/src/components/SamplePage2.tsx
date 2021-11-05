import React, { useState } from 'react'
import styled from 'styled-components'

export default function SamplePage2() {

    const [sampleText, setSampleText] = useState("Wait");
    
    if(!__SERVER__) {
        fetch("data/sample-text.txt")
            .then(resp => resp.text())
            .then(txt => setSampleText(txt));
    }

    return (
        <Wrapper>
        
            <h1>Static content sample</h1>
            
            <h2>The images below were fetched from the server.</h2>
            <div className="images-sample">
                <img src="images/sample-image-1.png" />
                <img src="images/sample-image-2.png" />
                <img src="images/sample-image-3.png" />
            </div>
            <hr/>
            <h2>The text below was fetched from the server.</h2>
            <div className="text-sample" suppressHydrationWarning>{sampleText}</div>
        
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
    div.text-sample {
        margin: 48px;
        padding: 36px;
        background-color: #eeeeee;
        font-style: italic;
        font-size: 14px;
    }
`;