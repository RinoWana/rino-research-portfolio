# Rino Riyadi Wana Research — Portfolio Website

Dark brown × gold research portfolio with a built-in CMS, inspired by JP Morgan and hedge fund aesthetic.

## Tech Stack

| Layer     | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Styling   | Tailwind CSS (custom brown/gold theme) |
| Database  | Supabase PostgreSQL |
| Storage   | Supabase Storage (images) |
| Auth      | Supabase Auth |
| Hosting   | Vercel |

---

## Quick Setup

### 1. Install dependencies

```bash
cd rino-research-portfolio
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New project
2. Copy your **Project URL** and **Anon Key** from Settings → API

### 3. Set up the database

1. Supabase Dashboard → SQL Editor → New Query
2. Paste and run the contents of `supabase-schema.sql`

### 4. Create image storage bucket

1. Supabase Dashboard → Storage → New bucket
2. Name: `article-images`
3. Toggle **Public bucket** ON → Save

### 5. Create your admin account

1. Supabase Dashboard → Authentication → Users → Add user
2. Set your email and password

### 6. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 7. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

---

## Using the Admin Panel

- Visit `/admin/login` — sign in with your Supabase email/password
- **Dashboard** `/admin/dashboard` — view all articles, toggle publish/draft, delete
- **New Article** `/admin/articles/new` — markdown editor with:
  - Split edit/preview mode
  - Cover image upload
  - Inline image upload (toolbar button)
  - Auto-generated slug from title
  - Category, tags, excerpt fields
  - Save as Draft or Publish immediately

---

## Customization

| What to change | File |
|---------------|------|
| Your name/bio | `app/about/page.tsx` |
| Contact email | `components/Footer.tsx`, `app/about/page.tsx` |
| Research stats | `app/page.tsx` (About strip section) |
| Color palette | `tailwind.config.js` + `app/globals.css` |
| Article categories | `app/admin/ArticleEditor.tsx` (select options) |

---

## Writing Articles

Articles use **Markdown** with full support for:

- Headings (`##`, `###`)
- Bold, italic, strikethrough
- Ordered and unordered lists
- Blockquotes
- Code blocks with syntax highlighting
- Tables
- Images (upload via toolbar)
- Links

**Estimated read time** is calculated automatically from word count.
