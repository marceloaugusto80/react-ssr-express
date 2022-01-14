import { createServer } from "../../src/server/server";
import { Express } from "express";
import request from "supertest";

let server: Express;


beforeAll(() => {
    server = createServer();
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

    
    test("test sample-page-1 route", async () => {
    
        const response = await request(server).get("/sample-page-1");
    
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toMatch(/text\/html/);
        expect(response.text).toMatch(/This\sdata\scame\sfrom\sthe\sserver/);
    
    });

});