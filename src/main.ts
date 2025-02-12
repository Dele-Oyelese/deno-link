import { Router } from "./router.ts";
const app = new Router()

app.get('/', () => new Response('hi Mom'))
app.post('/health-check', () => new Response('ALIVE'))


export default {
fetch(req) {
  return app.handler(req)
},

} satisfies Deno.ServeDefaultExport
