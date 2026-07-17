/**
 * Decap CMS GitHub OAuth handler — complete flow
 * GET  /api/auth          → redirect to GitHub authorize
 * POST /api/auth          → exchange code for access_token (Decap CMS uses POST)
 * GET  /api/auth/callback → GitHub redirects here with ?code=, exchanges, returns postMessage HTML
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  // Step 2: GitHub callback — exchange code for token, respond with postMessage to opener
  if (code) {
    try {
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
      if (data.error) {
        return new Response(data.error_description || data.error, { status: 401 });
      }
      return new Response(
        `<script>window.opener.postMessage(${JSON.stringify({ token: data.access_token, provider: "github" })}, "*");window.close();</script>`,
        { headers: { "Content-Type": "text/html" } }
      );
    } catch {
      return new Response("OAuth failed", { status: 500 });
    }
  }

  // Step 1: Initial request — redirect user to GitHub authorize page
  const redirectUri = "https://liuybhub.top/api/auth";
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
        client_secret: process.env.GITHUB_CLIENT_SECRET || "8b160d19f5bdac118c401e88df6e4d71643c6f46",
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
