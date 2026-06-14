import { test } from "node:test";
import assert from "node:assert/strict";
import { GET } from "../app/api/health/route.ts";

test("GET /api/health returns 200 and status ok", async () => {
  const res = await GET();
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.status, "ok");
  assert.equal(body.service, "parrot-tee-sample");
  assert.equal(typeof body.timestamp, "string");
});
