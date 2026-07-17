export default {
  async fetch(request, env) {

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS"
        }
      });
    }

    try {

      const { message } = await request.json();

      const url =
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();

      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Maaf, saya tidak menemukan jawaban.";

      return Response.json(
        { reply },
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      );

    } catch (err) {

      return Response.json(
        {
          reply: "Terjadi kesalahan pada server."
        },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      );

    }

  }
}
