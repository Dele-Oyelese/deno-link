import { crypto } from "jsr:@std/crypto/crypto"
import { encodeBase64Url } from "jsr:@std/encoding"

export async function generateShortCode(longUrl: string) {
  try {
    new URL(longUrl)
  } catch (error) {
    console.log(error)
    throw new Error("Invalid URL provided")
  }

  const urlData = new TextEncoder().encode(longUrl + Date.now())
  const hash = await crypto.subtle.digest("SHA-256", urlData)

  const shortCode = encodeBase64Url(hash.slice(0, 8))

  return shortCode
}

const kv = await Deno.openKv()

export type ShortLink = {
  shortCode: string
  longUrl: string
  createdAt: number
  userId: string
  clickCount: number
  lastClickEvent?: string
}

export async function storeShortLink(
  longUrl: string,
  shortCode: string,
  userId: string,
) {
  const shortLinkKey = ["shortlinks", shortCode]
  const data: ShortLink = {
    shortCode,
    longUrl,
    userId,
    createdAt: Date.now(),
    clickCount: 0,
  }

  const res = await kv.set(shortLinkKey, data)

  if (!res.ok) {
    // handle errors
  }

  return res
}

export async function getShortLink(shortCode: string) {
  const link = await kv.get<ShortLink>(["shortlinks", shortCode])
  return link.value
}

// Temporary example to try it out
// deno run -A --unstable-kv src/db.ts
const longUrl = "https://fireship.io"
const shortCode = await generateShortCode(longUrl)
const userId = "test"

console.log(shortCode)

await storeShortLink(longUrl, shortCode, userId)

const linkData = await getShortLink(shortCode)
console.log(linkData)
