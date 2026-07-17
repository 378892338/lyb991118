/**
 * Decap CMS GitHub OAuth — GET handles the initial redirect to GitHub.
 * POST handles code→token exchange (Decap CMS calls this via base_url/auth_endpoint).
 *
 * GitHub callback (GET with ?code=) is handled by /api/auth/callback/route.ts
 */
export async function GET(_request: Request) {
  const redirectUri = "https://liuybhub.top/api/auth/callback";
  const githubUrl =
    "https://github.com/login/oauth/authorize" +
    "?client_id=378892338" +
    "&scope=repo,user" +
    "&redirect_uri=" + encodeURIComponent(redirectUri);

  return Response.redirect(githubUrl, 302);
}

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    if (!code) return Response.json({ error: "missing code" }, { status: 400 });

    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: "378892338",
        client_secret: process.env.GITHUB_CLIENT_SECRET || "",
        code,
      }),
    });
    const data = await res.json();
    if (data.error) return Response.json({ error: data.error_description || data.error }, { status: 401 });

    return Response.json({ token: data.access_token, provider: "github" });
  } catch {
    return Response.json({ error: "auth failed" }, { status: 500 });
  }
}
