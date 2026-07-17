/**
 * Decap CMS GitHub OAuth callback handler
 * Exchanges GitHub OAuth code for access token
 * No external dependencies — uses Node.js built-in https
 */
export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== "string") {
      return Response.json({ error: "missing code" }, { status: 400 });
    }

    const body = JSON.stringify({
      client_id: "378892338",
      client_secret: process.env.GITHUB_CLIENT_SECRET || "",
      code,
    });

    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body,
    });

    const data = await res.json();

    if (data.error) {
      return Response.json({ error: data.error_description || data.error }, { status: 401 });
    }

    return Response.json({ token: data.access_token, provider: "github" });
  } catch (e) {
    return Response.json({ error: "auth failed" }, { status: 500 });
  }
}
