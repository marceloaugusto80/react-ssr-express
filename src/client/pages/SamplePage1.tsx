import React, { PureComponent, ReactNode } from 'react'
import styled from 'styled-components';
import { TestCallObject } from '../core/sampleLogic';

interface State {
    componentDidMountTestObj?: TestCallObject;
    unsaveComponentDidMountTestObj?: TestCallObject;
}

export default class SamplePage1 extends PureComponent<unknown, State> {
    
    readonly constructorTestObject: TestCallObject;

    constructor(props: unknown) {
        super(props)

        this.state = {}

        const testObject = new TestCallObject("constructor");
        this.constructorTestObject = testObject;
    }

    componentDidMount = () => {

        // Any logic here will run only in client side. More than that, the only lifecycle method
        // that runs server side is UNSAFE_componentWillMount()
        // https://reactjs.org/docs/react-component.html#unsafe_componentwillmount
      
        const testObj = new TestCallObject("componentDidMount");
        this.setState({ componentDidMountTestObj: testObj });
    }

    UNSAFE_componentWillMount = () => {
        
        // Logic here will run in both server and client side.
        // This is the only lifecycle method that runs on server.
        // https://reactjs.org/docs/react-component.html#unsafe_componentwillmount

        const testObj = new TestCallObject("UNSAFE_componentWillMount");
        this.setState({ unsaveComponentDidMountTestObj: testObj });
    }

    render(): ReactNode {

        return (
            <Wrapper>

                <h1>Access browser API sample</h1>
                <p>This page tests accessing the browser api in both server and client side.</p>
                <p>A dummy object check if the __SERVER__ flag is set to true and if the window global object is defined.</p>
                <p>The object prints a message in the console when instantiated and has a unique id.</p>
                <p><strong>Check both browser and server console</strong> to compare the results.</p>

                <h2>Test object created in the constructor</h2>
                <p>The information below was gathered by instantiating the test object in the component constructor.</p>
                <p>If the page is created in the server, the logic runs both in the server and client.</p>
                <code suppressHydrationWarning>{this.constructorTestObject.toString()}</code>

                <h2>Test object created in componentDidMount() method</h2>
                <p>The information below was gathered by instantiating the test object in componentDidMount() method.</p>
                <p>The logic will always run only in the client.</p>
                <code suppressHydrationWarning>{this.state.componentDidMountTestObj?.toString()}</code>

                <h2>Test object created in UNSAFE_componentWillMount method</h2>
                <p>The information below was gathered by instantiating the test object in UNSAFE_componentWillMount() method.</p>
                <p>If the page is created in the server, the logic runs both in the server and client.</p>
                <code suppressHydrationWarning>{this.state.unsaveComponentDidMountTestObj?.toString()}</code>

                <hr/>

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