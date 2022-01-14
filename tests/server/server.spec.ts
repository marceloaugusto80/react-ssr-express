import { createServer } from "../../src/server/server";
import { Express } from "express";
import request from "supertest";
import path from "path";

let server: Express;

beforeAll(() => {
    server = createServer(path.resolve(__dirname, "../_fixtures"));
})

describe("Server requests", ()=> {
    
    test("test home route", async () => {
    
        const response = await request(server).get("/");
    
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toMatch(/text\/html/);
        expect(response.text).toMatch(/<h1>Home<\/h1>/);
    
    });
    
    test("test serving static content", async () => {
    
        const response = await request(server).get("/foo.js");
    
        expect(response.statusCode).toBe(200);
        expect(response.header["content-type"]).toMatch("application\/javascript");
        expect(response.text).toMatch(/console.log\('foo'\);/);
    
    
    });

});