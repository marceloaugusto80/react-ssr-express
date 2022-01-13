type InstantiationLocation = "constructor" | "componentDidMount" | "UNSAFE_componentWillMount";

export class TestCallObject {
    readonly name: string;
    readonly id: number;
    readonly instantiation: InstantiationLocation;
    readonly serverCompilationFlag?: boolean;
    readonly windowObjectDefined?: boolean;

    constructor(instantiation: InstantiationLocation) {

        this.name = "TestObject";
        this.instantiation = instantiation;
        
        this.id = Math.floor(Math.random() * 10000);
        
        this.serverCompilationFlag = __SERVER__;
        this.windowObjectDefined = (typeof window != "undefined");
        console.info(this);
    }

    toString(): string {
        return JSON.stringify(this);
    }
}

