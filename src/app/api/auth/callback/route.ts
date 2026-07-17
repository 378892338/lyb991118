/**
 * GitHub OAuth callback — GitHub redirects here with ?code=
 * Exchanges code for access_token, returns postMessage HTML for Decap CMS popup
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response("Missing code parameter", { status: 400 });
  }

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
      `<html><body><script>window.opener.postMessage(${JSON.stringify({ token: data.access_token, provider: "github" })}, "*");window.close();</script></body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch {
    return new Response("OAuth token exchange failed", { status: 500 });
  }
}
