# SM Design Studio

Premium landing page for SM Design Studio — interior, exterior, and architectural visualization.

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Replacing studio content

- Images: `src/data/images.js`
- Copy, projects, services, and contact placeholders: `src/data/site.js`
- Form backend: `src/lib/submitInquiry.js`

## Supabase admin setup

1. Copy `.env.example` to `.env.local` and add the Supabase project URL and anon key.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Create the owner account in Supabase Authentication > Users.
4. Insert that Auth user's UUID into `public.admin_users` with `is_active = true`.
5. Start the app with `npm run dev`, then visit `/admin/login`.

The browser only uses the public anon key. Row Level Security and Storage policies restrict project writes, image uploads, edits, and deletes to users listed in `admin_users`. Never expose a service-role key to Vite or commit `.env.local`.

The public On-Site Projects section reads published rows from Supabase. Until Supabase is configured and real projects are added, it shows an empty state and does not display the old placeholder records.
