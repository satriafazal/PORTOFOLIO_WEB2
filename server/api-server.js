import http from 'node:http'
import { DatabaseSync } from 'node:sqlite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const db = new DatabaseSync(path.resolve(__dirname, '../database.sqlite'))

const PORT = process.env.PORT || 3001

const parseJsonSafe = (str, fallback = []) => {
  try {
    return JSON.parse(str)
  } catch {
    return fallback
  }
}

const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  })
  res.end(JSON.stringify(data))
}

const server = http.createServer((req, res) => {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })
    res.end()
    return
  }

  const url = new URL(req.url, `http://${req.headers.host}`)
  const pathname = url.pathname

  // 1. GET /api/projects
  if (req.method === 'GET' && pathname === '/api/projects') {
    const rows = db.prepare('SELECT * FROM projects ORDER BY id ASC').all()
    const formatted = rows.map(r => ({
      ...r,
      features: parseJsonSafe(r.features),
      techStack: parseJsonSafe(r.techStack),
      gallery: parseJsonSafe(r.gallery),
      contributors: parseJsonSafe(r.contributors),
      featured: Boolean(r.featured)
    }))
    return sendJson(res, 200, formatted)
  }

  // 2. GET /api/projects/:id
  const projectMatch = pathname.match(/^\/api\/projects\/(\d+)$/)
  if (req.method === 'GET' && projectMatch) {
    const id = Number(projectMatch[1])
    const r = db.prepare('SELECT * FROM projects WHERE id = ?').get(id)
    if (!r) {
      return sendJson(res, 404, { error: 'Proyek tidak ditemukan di SQLite database.' })
    }
    const formatted = {
      ...r,
      features: parseJsonSafe(r.features),
      techStack: parseJsonSafe(r.techStack),
      gallery: parseJsonSafe(r.gallery),
      contributors: parseJsonSafe(r.contributors),
      featured: Boolean(r.featured)
    }
    return sendJson(res, 200, formatted)
  }

  // 3. GET /api/team
  if (req.method === 'GET' && pathname === '/api/team') {
    const rows = db.prepare('SELECT * FROM team ORDER BY id ASC').all()
    const formatted = rows.map(r => ({
      ...r,
      skills: parseJsonSafe(r.skills)
    }))
    return sendJson(res, 200, formatted)
  }

  // 4. GET /api/team/:id
  const teamMatch = pathname.match(/^\/api\/team\/(\d+)$/)
  if (req.method === 'GET' && teamMatch) {
    const id = Number(teamMatch[1])
    const r = db.prepare('SELECT * FROM team WHERE id = ?').get(id)
    if (!r) {
      return sendJson(res, 404, { error: 'Anggota tim tidak ditemukan di SQLite database.' })
    }
    const formatted = {
      ...r,
      skills: parseJsonSafe(r.skills)
    }
    return sendJson(res, 200, formatted)
  }

  // 5. POST /api/contact
  if (req.method === 'POST' && pathname === '/api/contact') {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => {
      try {
        const payload = JSON.parse(body)
        const insertMsg = db.prepare(`
          INSERT INTO messages (name, email, subject, message, submittedAt)
          VALUES (?, ?, ?, ?, ?)
        `)
        const submittedAt = new Date().toISOString()
        const result = insertMsg.run(
          payload.name || '',
          payload.email || '',
          payload.subject || '',
          payload.message || '',
          submittedAt
        )
        return sendJson(res, 201, {
          success: true,
          message: `Terima kasih, ${payload.name}! Pesan telah tersimpan di SQLite database.`,
          id: result.lastInsertRowid,
          receivedData: { ...payload, submittedAt }
        })
      } catch (err) {
        return sendJson(res, 400, { error: 'Payload JSON tidak valid.' })
      }
    })
    return
  }

  // 404
  return sendJson(res, 404, { error: 'Endpoint SQLite server tidak ditemukan.' })
})

server.listen(PORT, () => {
  console.log(`SQLite REST API Server aktif di http://localhost:${PORT}`)
})

