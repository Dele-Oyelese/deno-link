import { generateShortCode, getShortLink, storeShortLink } from "./db.ts";
import { Router } from "./router.ts";
const app = new Router()

app.get('/links/:id', async (req, _info, params) => {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/");

  // Extract shortCode (assuming `/links/:id`)
  const shortCode = pathSegments[2] 
console.log(shortCode)
  const shortLink = await getShortLink(shortCode)
  console.log(shortLink)

  return new Response(JSON.stringify(shortLink), { 
    status: 201,
    headers: { 'Content-Type': 'application/json' } })

}
)

app.post("/links", async (req) => {


  const { longUrl } = await req.json(); // Fixing async issue

  const shortCode = await generateShortCode(longUrl);
  const linkData = await storeShortLink(longUrl, shortCode, 'testUser');
  console.log(linkData)
  return new Response(`success! HELLO + ${linkData}`, {
    status: 201,
  });
});
  


export default {
fetch(req) {
  return app.handler(req)
},

} satisfies Deno.ServeDefaultExport
