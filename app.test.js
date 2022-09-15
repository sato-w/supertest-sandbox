import request from "supertest";
import app from "./app.js";

describe("GET /", () => {
  test("runningの文字列が返ってくる", async () => {
    const response = await request(app).get("/");
    expect(response.body.status).toBe("running");
  });
});

describe("POST /users", () => {
  describe("ユーザ名とパスワードを入力したとき", () => {
    test("ステータスコード200が返ってくることを確認する", async () => {
      const response = await request(app).post("/users").send({
        username: "user",
        password: "pass",
      });
      expect(response.statusCode).toBe(200);
    });
    test("content-typeがJSONであることを確認する", async () => {
      const response = await request(app).post("/users").send({
        username: "user",
        password: "pass",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    test("userIdが返ってくることを確認する", async () => {
      const response = await request(app).post("/users").send({
        username: "user",
        password: "pass",
      });
      expect(response.body.userId).toBeDefined();
    });
  });

  describe("ユーザー名とパスワードが入力されていないとき", () => {
    test("ステータスコード400が返ってくることを確認する", async () => {
      const bodyData = [{ username: "user" }, { password: "pass" }, {}];
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
