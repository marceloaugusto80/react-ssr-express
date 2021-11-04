import React, { PureComponent, ReactNode } from 'react'
import styled from 'styled-components';
import { getBrowserInfoWithUndefinedChecks, getBrowserInfoWithFlagCheck } from '../core/sampleFunctions';

interface State {
    deferedContent: string;
}

export default class BrowserApiSample extends PureComponent<unknown, State> {
    constructor(props: unknown) {
        super(props)

        this.state = {
            deferedContent: "Wait..."
        }
    }

    componentDidMount = async () => {
        /*
            calling getBrowserInfoDefered outside a dynamic import will crash 
            react-dom-server at server side and return a code 500.
        */
        const { getBrowserInfoDefered } = await import("../core/sampleFunctions");

        const content = getBrowserInfoDefered();

        this.setState({ deferedContent: JSON.stringify(content) });
    }

    render(): ReactNode {

        // this content was gathered by a function checking the __SERVER__ flag, injected during compilation.

        const flagContent = getBrowserInfoWithFlagCheck();

        // this content was gathered by a function checking if the window object is defined

        const undefinedCheckContent = getBrowserInfoWithUndefinedChecks();

        return (
            <Wrapper>

                <h1>Access browser API sample</h1>

                <h2>Dynamic import:</h2>
                <p>Dynamic imports, afaik, runs only in the browser.</p>
                <p>The information below was gathered by a function running in the browser.</p>
                <code>{this.state.deferedContent}</code>

                <h2>Injected compilation flag:</h2>
                <p>Using an injected global variable to check if the code is running on the serer or in the browser.</p>
                <p>The information below was gathered by a function running first in the server, and then in the browser.</p>
                <code>{JSON.stringify(flagContent)}</code>

                <h2>Undefined checks:</h2>
                <p>Check if window object is defined (<code>typeof window == "undefined"</code>).</p>
                <p>The information below was gathered by a function running first in the server, and then in the browser.</p>
                <code>{JSON.stringify(undefinedCheckContent)}</code>

            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    h2 {
        background-color: #dfdfdf;
        width: 100%;
        padding: 8px;
        margin-top: 36px;
    }
`;