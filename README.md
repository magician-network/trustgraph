# trustgraph

Trustgraph is the intended **standing service** of the Magician network: the
system that computes standing over the trust graph. It reads `graph/1` — what
exists and who vouches for whom — and the `trust/1` edges between them, and it
derives a party's standing from **what others assert about them**, never from
anything a party sets for itself.

**This repository is a reservation made real, not a running service.** There is
no service code here yet, and this README does not pretend otherwise. What is
committed is the product charter — the AAO roles the org is provisioned from,
the mesh directory node, and the doctrine the service must obey when it is
built — together with the checks that hold those honest. The service itself is
the roadmap below, and it waits on `graph/1` and `trust/1` stabilising in
[Magician](https://github.com/magician-network/magician) before it is worth
writing. Reserving the name and writing down the doctrine costs a repository;
building the service is a separate, larger effort.

This is a **product charter, not a specification.** `trust/1` and `graph/1` are
formats with their own normative homes; trustgraph is a *consumer* of them. It
coins no format, defines no wire shape, and adds nothing to what a valid
`trust/1` or `graph/1` document is. If a rule about what those documents *are*
is what you want, it belongs in their spec, not here.

## The doctrine trustgraph is built to obey

These are inherited estate boundaries. They are not this repository's to soften,
and the service that eventually lands here is wrong if it breaks one of them.

**Authority comes from what others assert.** Standing is a reading of the
inbound edges a party has been given — vouches, sealed outcomes, attestations
made *about* them by other parties. A party's own claims about itself are input
to nothing that ranks or routes.

**Nothing a party does alone moves their standing.** Unilateral activity —
filing, posting, re-asserting, self-describing — moves nothing. If a change
could let a party raise their own standing by acting on their own, it is wrong.
This is the invariant Magician's `packages/core` already pins with a test whose
whole job is proving unilateral activity moves nothing; trustgraph inherits it
and must not weaken it.

**No reward, token or incentive is ever an input.** No "make introductions →
earn" mechanic feeds standing, routing, ranking or trust. Any Flashy Gold
integration sits strictly *after* a sealed outcome, outside the reputation
computation, bounded and reversible. A reward input would manufacture exactly
the activity this product refuses.

**Registers everywhere; a combination is as weak as its weakest input.** Every
figure standing rests on is measured, asserted or estimated. Hearsay-only edges
cap at estimated; stale edges (unrenewed past their window) contribute at
estimated only. Standing never reports a figure more confident than the edges
under it.

**Consent is not standing's to grant.** trustgraph reads the graph and computes
a number; it never constructs a consented hop, never crosses an edge, and never
turns a computed standing into an authorisation. Agents suggest; humans consent.

## What is actually in this repository today

| Path | What it is |
|---|---|
| `flashyos.roles.json` | The AAO charter — five roles (`product`, `engineering`, `operations`, `review`, `conformance`), the single source a live org is provisioned from. |
| `directory.fragment.json` | This org's `directory/1` node: the org, one agent per role, and the accountable person. Generated from the charter. |
| `MESH.md` | How trustgraph sits on the FlashyOS mesh, and how a live org is provisioned from the charter. |
| `vendor-aao-check.mjs` | The estate's dependency-free AAO checker, byte-identical to the copy in the [aao](https://github.com/FlashyLabs/aao) repository. Re-vendor, never edit. |
| `test/` | `node --test`: the charter validates with zero issues, its roles cross-reference this repository, and the vendored checker has not drifted. |
| `tools/lint.mjs` | `node --check` over every `.mjs` in the tree. |

The charter validates against the real checker, offline, with nothing installed:

```bash
node vendor-aao-check.mjs validate flashyos.roles.json   # 0 issues
node vendor-aao-check.mjs conform  flashyos.roles.json   # 5 pass, 0 fail, 3 deferred (live)
```

## Commands

Node 22, nothing to install — this repository is dependency-free on purpose.

```bash
npm run lint    # node --check over every .mjs
npm test        # node --test the suite
```

## Roadmap — the service is what is not built yet

1. **`graph/1` and `trust/1` reach a stable read shape** in Magician. trustgraph
   is a consumer; it cannot be written against a moving target.
2. **A standing computation** that reads inbound edges and derives a figure with
   its register, obeying every boundary above, each pinned by a test before the
   code that could break it.
3. **A read surface** — a way for a member's graph to ask trustgraph for a
   standing and be handed a figure *and* the register it rests on, never a bare
   number.
4. **Provisioning a live org** from this charter (see `MESH.md`), and the
   authoritative conformance check run against the live domain after deploy.

Until (1), this repository stays a reservation: the name held, the doctrine
written down, the charter kept honest by tests, and no service claimed that does
not exist.

Status: reserved — no service code exists yet; the service is the roadmap, not built.

Licensed under Apache-2.0 (holder Agente Labs); the estate register in flashyos `tools/estate-licences.mjs` is the authority.
