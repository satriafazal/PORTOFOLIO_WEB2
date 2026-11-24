import { DatabaseSync } from 'node:sqlite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.resolve(__dirname, '../database.sqlite')

console.log('Inisialisasi SQLite Database di:', dbPath)
const db = new DatabaseSync(dbPath)

// 1. Buat Tabel Team
db.exec(`
  CREATE TABLE IF NOT EXISTS team (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    avatar TEXT,
    skills TEXT,
    github TEXT,
    linkedin TEXT,
    email TEXT,
    contribution TEXT
  );
`)

// 2. Buat Tabel Projects
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT,
    category TEXT,
    summary TEXT,
    description TEXT,
    features TEXT,
    techStack TEXT,
    thumbnail TEXT,
    gallery TEXT,
    leadMemberId INTEGER,
    leadMemberName TEXT,
    contributors TEXT,
    liveUrl TEXT,
    githubUrl TEXT,
    status TEXT,
    featured INTEGER DEFAULT 0
  );
`)

// 3. Buat Tabel Messages (Form Kontak)
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    submittedAt TEXT NOT NULL
  );
`)

// Seed Data jika tabel masih kosong
const projectsCount = db.prepare('SELECT COUNT(*) as count FROM projects').get().count
if (projectsCount === 0) {
  console.log('Seeding SQLite projects table...')
  const projectsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../mockapi-projects.json'), 'utf8'))
  const insertProject = db.prepare(`
    INSERT INTO projects (
      id, title, slug, category, summary, description, features, techStack,
      thumbnail, gallery, leadMemberId, leadMemberName, contributors, liveUrl, githubUrl, status, featured
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const p of projectsData) {
    insertProject.run(
      p.id,
      p.title,
      p.slug || '',
      p.category || '',
      p.summary || '',
      p.description || '',
      JSON.stringify(p.features || []),
      JSON.stringify(p.techStack || []),
      p.thumbnail || '',
      JSON.stringify(p.gallery || []),
      p.leadMemberId || 0,
      p.leadMemberName || '',
      JSON.stringify(p.contributors || []),
      p.liveUrl || '',
      p.githubUrl || '',
      p.status || 'Completed',
      p.featured ? 1 : 0
    )
  }
}

const teamCount = db.prepare('SELECT COUNT(*) as count FROM team').get().count
if (teamCount === 0) {
  console.log('Seeding SQLite team table...')
  const teamData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../mockapi-team.json'), 'utf8'))
  const insertMember = db.prepare(`
    INSERT INTO team (id, name, role, bio, avatar, skills, github, linkedin, email, contribution)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const m of teamData) {
    insertMember.run(
      m.id,
      m.name,
      m.role,
      m.bio || '',
      m.avatar || '',
      JSON.stringify(m.skills || []),
      m.github || '',
      m.linkedin || '',
      m.email || '',
      m.contribution || ''
    )
  }
}

console.log('SQLite Database berhasil dibuat dan diisi:')
console.log('- Total Anggota Tim:', db.prepare('SELECT COUNT(*) as count FROM team').get().count)
console.log('- Total Proyek:', db.prepare('SELECT COUNT(*) as count FROM projects').get().count)

