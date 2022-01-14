import React, { Fragment, useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { ExampleModel } from 'shared/models';
import { PrerenderData } from 'shared/PrerenderedData';

export default function SamplePage1() {

    const [model, setModel] = useState(PrerenderData.readFromDom<ExampleModel>(true));

    useEffect(() => {
        
        //Check if model was already set at server side. if not, make call the api
        
        if(!model) {
            
            // lets pretend its a api call. 
            Promise.resolve<ExampleModel>({message: "I'm a fetched data!", id: 33})
                .then(data => setModel(data))
                .catch(e => console.log("Ops! I didn't work!"));
        }

    }, []);

    return (
        <Wrapper>
            <h1>Sample page 1</h1>
            {
                model &&
                <p suppressHydrationWarning>{model.message}</p>
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