# Ludino — Website

The **Ludino Landing v3** design canvas built out as a real static site, plus
the legal, company and account-deletion pages.

No build step, no dependencies — open `index.html` and it runs.

```
.
├── index.html                 # landing page
├── about.html                 # company
├── contact.html               # support / legal / deletion contacts
├── privacy-policy.html        # ─┐
├── terms.html                 #  │
├── community-guidelines.html  #  │
├── child-safety.html          #  ├─ policy documents
├── anti-bullying.html         #  │
├── cookie-policy.html         #  │
├── copyright.html             #  │
├── legal-requests.html        #  │
├── code-of-conduct.html       #  │  (business partners)
├── account-deletion.html      # ─┘  (+ working request form)
├── assets/
│   ├── css/styles.css         # tokens, header, footer, landing page
│   ├── css/pages.css          # inner pages + deletion form
│   ├── js/main.js             # sticky header, scroll reveal, mobile nav
│   └── js/delete-account.js   # deletion form validation + submission
├── img/
│   ├── home · board · modes · party · profile · stars .jpeg
│   │                           # real app screenshots, 720×1462
│   ├── mode-classic · mode-master · mode-blitz .jpg
│   │                           # mode-card key art, 1200×480
│   ├── token-red · green · blue · yellow .webp
│   │                           # game pieces, 320×513, transparent
│   ├── dice-1 … dice-6.png     # dice faces, 171×167, transparent
│   ├── brand-mark.png         # app icon, header + footer lockup
│   ├── favicon-16 · favicon-32 · apple-touch-icon .png
│   └── og-cover.png           # social share card
├── favicon.ico                # root, for legacy auto-discovery
├── robots.txt
└── sitemap.xml
```

---

## Live site

Published with GitHub Pages from the `main` branch:

**https://usamayousaf516.github.io/ludino-website/**

Pushing to `main` redeploys automatically — usually live within a minute.

### Store links

The download buttons currently point at the storefront home pages, not at
Ludino, because the app is not published yet:

- Play Store -> `https://play.google.com/store/apps`
- App Store -> `https://apps.apple.com/`

When the listings go live, swap both URLs. Each button carries a `data-store`
attribute so they are easy to find:

```bash
grep -n 'data-store' index.html
```

There are four (two in the hero, two in the download panel).

### If you move to a custom domain

Update `https://usamayousaf516.github.io/ludino-website/` in:

- the `canonical`, `og:url`, `og:image` and `twitter:image` tags in all 13 pages
- `robots.txt`
- `sitemap.xml`

then add a `CNAME` file and point DNS at GitHub.

### Icons

The favicon, touch icon and the header/footer logo all come from the Ludino app
icon (`blue_dragon_icon_1024.png`), generated into:

- `img/brand-mark.png` — 136px, shown at 34px in the header, 30px in the footer
- `img/favicon-32.png`, `img/favicon-16.png` — browser tabs
- `img/apple-touch-icon.png` — 180px, iOS home screen
- `favicon.ico` — root, 16/32/48, for browsers that look there first

The icon's corners are transparent, so the lockup sits correctly on both the
navy header at the top of the page and the white one after scrolling. To change
it, drop in a new square source and re-cut all five sizes.

Note it is a detailed illustration: it reads well at 32px and above, but at 16px
it reduces to a blue-and-gold shape. If you ever want it sharper in the tab, a
tighter crop on the dragon's head would survive 16px better than the full icon.

### Also worth setting

- **`og-cover.png`** is a generated share card. It still uses the old wordmark
  styling — worth regenerating with the app icon if you want them consistent.

---

## The app screenshots

`img/` holds the six real app captures. Each was taken at 720×1600 and trimmed
of the Android status bar (48px off the top) and system navigation bar (90px off
the bottom), leaving **720×1462** — a 9:18.27 frame, which is what the phone
mockups are built around.

| File | Screen |
|------|--------|
| `home.jpeg`    | Games home — 2 player / 4 player tiles |
| `board.jpeg`   | A four-player board mid-match |
| `modes.jpeg`   | Table tiers — Classic / Master / Quick |
| `party.jpeg`   | Party tab — live rooms |
| `profile.jpeg` | Player profile |
| `stars.jpeg`   | Stars store |

To swap one later, keep the same filename and trim the system bars the same way
so the aspect ratio stays near 9:18.2. The CSS assumes the bars are already
gone — it applies no offset of its own.

### Mode-card key art

The three cards under *Pick Your Mode* use illustrated banners rather than
screenshots: `mode-classic.jpg`, `mode-master.jpg`, `mode-blitz.jpg`, each
**1200×480** (2.5:1).

That window is always **150px tall** but its width changes with the column
count — from 207px (2 columns at ~620px viewport) to 366px (1 column at ~480px).
It is `object-fit: cover`, so the image always fills and centre-crops. When
replacing one:

- author at **2.5:1** and export around 1200×480 (that is >3x the largest
  rendered size, so it stays crisp without bloating the page);
- keep every important element inside the **centre 55% of the width** — that is
  the only region guaranteed to survive the narrowest crop;
- the band sits flush at the card's bottom edge with a hard cut, so leave the
  lowest ~5% clear;
- match the card's header gradient (Classic blue, Master purple, Blitz amber) so
  art and header read as one block.

### Dice and tokens

The floating dice and tokens in the hero, the die in the download panel and the
token above *Ready to Roll?* are the app's own art, not CSS shapes:

- `token-{red,green,blue,yellow}.webp` — 320×513, transparent
- `dice-{1..6}.png` — 171×167, transparent

The page currently uses the red and yellow tokens, `dice-5` in the hero and
`dice-4` in the download panel (the faces the original design drew). The rest of
both sets are included so you can swap a colour or a face by changing one
filename — unreferenced files are never downloaded, so they cost nothing.

Two notes if you replace them:

- The tokens are **WebP** because these are smooth gradients with an alpha
  channel. PNG-24 was 133KB each and palette PNG posterised the shading badly;
  WebP q90 is 27KB and visually identical to the source.
- Shadows use `filter: drop-shadow()` rather than `box-shadow` so they follow the
  piece's silhouette instead of a rectangle. Keep the transparent background.

---

## Things to check in the legal content

I copied the text across exactly as written, but two things are worth a look:

1. **It describes a different product.** The legal text is all about *LUDINO
   LIVE* — livestreaming, VoIP, video broadcast, virtual diamonds and gifts,
   broadcasters, talent and agency registration. The landing page sells a
   social multiplayer *Ludo board game*. If both products are the same company
   that may be fine, but the privacy policy and terms currently do not mention
   the Ludo game at all.

2. **One contact address.** Every email on the site is
   **`Technologyyaro@gmail.com`**, taken from the source documents — including
   the copyright designated-agent block and the deletion form's network-error
   message.

   Because that address handles copyright take-downs and law-enforcement
   requests as well as ordinary support, make sure whoever monitors it knows to
   route those on quickly — take-down notices carry deadlines.

3. **Two company names appear.** The User Agreement, Privacy Policy contact
   block and Copyright designated agent all say **Yaro Technology LLC**; the
   Copyright Policy's own opening line and the footer copyright say **Ludino
   Technology LLC**. Each page reproduces what its source document says. Worth
   settling on one.

4. **Two jurisdictions appear.** The Copyright Policy is written around the
   Singapore Copyright Act 2021 (with DMCA and EU safe harbours mentioned in
   passing), while the company address is Wyoming. The User Agreement has no
   governing-law or dispute-resolution clause at all — the previous version did.

**Community Guidelines now exists** as its own page. There is still no Refund
Policy document — the closest material is Virtual items (User Agreement §6),
which states that Diamond and Gift purchases are final and non-refundable.

**Editorial notes on transcription:**

- User Agreement §5(viii) said "transmitted through the Twitch Services" in the
  source — a copy-paste artifact. Changed to "the LUDINO Services".
- User Agreement §3 contains "LUDINO and LUDINO will use a unified account
  system … accounts for both LUDINO", which appears to be a find-and-replace
  artifact where two product names were both replaced. Left as written.
- The Cookie Policy source has three empty list sections ("Necessary cookies on
  the Ludino Services may include:" followed by nothing). Those stubs were left
  out rather than published empty; the explanatory text for each cookie type is
  intact.
- In the Hate Speech policy, the quoted example threats under "Blackmail,
  threats, and endangerment" were condensed — several verbatim quotes,
  including explicit encouragements of suicide, were summarised rather than
  reproduced in full on a public page.

---

## The account deletion form

`account-deletion.html` has a **live, working form**. It POSTs to:

```
https://yaro-2e698dbda8ec.herokuapp.com/api/profile/login-request-delete/
```

with `{ user_id, password }`. That endpoint and the validation rules are
unchanged from your original page. Submitting it files a real deletion request,
so test with care.

---

## Running it

Any static server works. From this folder:

```bash
python serve.py
```

Then open <http://localhost:5173>. `serve.py` reads the `PORT` environment
variable, so a harness can hand it a free port; it also sends `no-store` so you
never chase a cached stylesheet. It uses `ThreadingHTTPServer` deliberately — a
single-threaded server deadlocks on the parallel keep-alive connections a
browser opens for CSS, JS and images. Opening the HTML files directly by
double-clicking also works — every path is relative.

## Deploying

Plain static files — drag the folder into Netlify / Vercel / Cloudflare Pages /
GitHub Pages, or upload over FTP. Nothing to build, nothing to exclude.

---

## How it was built

The landing page came from a Claude Design canvas file (`Ludino Landing v3.dc.html`),
a template format — `{{ expressions }}`, `<sc-for>` loops, `style-hover`
attributes and a `DCLogic` class, rendered by a `support.js` runtime that does
not ship. It was compiled to standard web code:

| Design canvas | This site |
|---|---|
| `<sc-for list="{{ modeCards }}">` | the three mode cards, written out |
| `{{ navInk }}`, `{{ navOpacity }}` | `body.is-scrolled` + CSS custom properties |
| `style-hover="…"` | real `:hover` rules |
| inline `style="…"` on every node | `assets/css/styles.css` |
| `DCLogic` component | `assets/js/main.js` |
| `<x-dc>` / `<helmet>` | normal `<head>` / `<body>` |

The inner pages reuse that design system — same header, footer, palette, type
and buttons — with `pages.css` adding document typography and the form.

Kept faithfully: every colour, radius, shadow, `clamp()`, animation, all landing
copy, and all legal copy.

Added, because a canvas file cannot carry them:

- `<title>`, meta description, Open Graph / Twitter cards, favicon, touch icon
- **a mobile nav** — the canvas had four inline links with nowhere to go on a
  phone; below 880px they collapse into a panel behind a hamburger
- semantic landmarks (`<main>`, `<nav>`, `<footer>`), a skip link, `aria-*` on
  the menu button, `width`/`height` on images to stop layout shift
- lazy loading on below-the-fold images
- the footer year fills in from the current date

Two small deviations from the raw canvas values, both deliberate:

1. The hero headline's drop shadow is `0 .074em` rather than a fixed `0 8px`.
   Identical at the 108px design size; at phone sizes the fixed shadow bled into
   the second line.
2. `Rule the Board.` is kept on one line above 620px, so the yellow half of the
   headline does not split mid-phrase.

**Header and footer markup is duplicated across the eight pages.** That is the
cost of having no build step — if you change a nav or footer link, change it in
all eight. `grep -n 'footer__cols' *.html` finds them.

## Browser support

Evergreen Chrome, Edge, Firefox and Safari. Uses `aspect-ratio`, CSS custom
properties, `clamp()`, `IntersectionObserver` and WebP images (Safari 14+, 2020). Without JavaScript every page
renders fully — content is visible by default and only hidden once the reveal
observer is confirmed working. The deletion form needs JavaScript to submit.
`prefers-reduced-motion` disables all motion.
