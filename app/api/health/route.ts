/**
 * GET /api/health — a liveness check.
 *
 * Returns 200 with a small JSON body. Uses the Web-standard `Response` (not
 * `next/server`) on purpose, so the handler is a plain function you can import
 * and unit-test without spinning up Next. Point a uptime monitor or a container
 * healthcheck at this path.
 */

/** Shape of the health payload, exported so tests can assert against it. */
export type Health = {
  status: "ok";
  service: "parrot-tee-sample";
  timestamp: string;
};

export async function GET(): Promise<Response> {
  const body: Health = {
    status: "ok",
    service: "parrot-tee-sample",
    timestamp: new Date().toISOString(),
  };
  return Response.json(body);
}
