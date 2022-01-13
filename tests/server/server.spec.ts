import { createServer } from "server/src/server";
import { Express } from "express";
import request from "supertest";
import path from "path";

let server: Express;

beforeAll(() => {
    server = createServer(path.resolve(__dirname, "_publicMock"));
})

test("test home route", (done) => {

    request(server).get("/")
        .expect(200)
        .expect("content-type", /text\/html/)
        .then((r => {
            expect(/<h1>Home<\/h1>/.test(r.text)).toBeTruthy();
            done();
        }))
        .catch(e => done(e));

});

test("test serving static content", (done) => {

    request(server).get("/foo.js")
        .expect(200)
        .expect("content-type", /application\/javascript/)
        .then((r => {
            expect(/console.log\('foo'\);/.test(r.text)).toBeTruthy();
            done();
        }))
        .catch(e => done(e));

});