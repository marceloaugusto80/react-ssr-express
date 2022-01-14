import React, { Fragment, useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { PrerenderedContext } from 'client/PrerenderedContext';
import { ExampleModel } from 'shared/models';

export default function SamplePage1() {

    const prerenderedModel = useContext(PrerenderedContext) as ExampleModel;
    const [model, setModel] = useState(prerenderedModel);

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