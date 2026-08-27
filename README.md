# Insomnus Design

Static design files for Insomnus. Homepage and dashboard app are **separate**.

## Pages

| File | What it is |
|------|------------|
| `index.html` | Marketing homepage / landing |
| `dashboard.html` | Player dashboard **app** (not the homepage) |

## Open locally

```bash
# from this folder
npx --yes serve .
```

Then open:

- Homepage: http://localhost:3000/
- Dashboard app: http://localhost:3000/dashboard.html

Or just double-click `dashboard.html`.

## Dashboard app

Matches the live Insomnus player app (`/user/dashboard`), restyled with the landing dungeon language:

- Left nav (Dashboard, Promo, Games, Events, Stores, Challenges, Your)
- Top bar (points, socials, wallet, Inventory, Play Game)
- News banners
- Statistics
- Invite friends
- Global activities
- Extra app screens: Promo, Inventory, Profile, Tasks, Achievements, Points, Market, Guides
- **Pet Lab** (`#pet-lab`) — dashboard page with three tabs:
  - **Mint** — pick a Gen 1 pet and mint from the desk. Activity, FAQ, and four mint phases.
  - **Breed** — pairing bench. Load two different pets from the kennel, convert points → essence, show key count. Pairing is sealed until after mint.
  - **Showroom** — pet GIFs, whitelist checker (Google Sheet), and boxed lore chapters.

Homepage (`index.html`) is left unchanged.

## Pet Lab notes

In-run copy comes from official docs. NFT numbers (3,000 / 9,000, non-burnable) come from the internal Gen 1 spec. Price is **TBA**. Mint and breed buttons stay closed locally.

**Review:** open `dashboard.html`, then Pet Lab. Switch MINT / BREED / SHOWROOM.
