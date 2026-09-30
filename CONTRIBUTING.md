# Contributing

This repository is a **reservation and a product charter** for trustgraph, the
Magician network's intended standing service. There is no service code here yet,
and adding some is not a small pull request — it waits on `graph/1` and `trust/1`
stabilising and belongs on the roadmap in `README.md`, not in a drive-by change.

What is worked on here today:

- the AAO charter (`flashyos.roles.json`) and its derived `directory/1` node;
- the doctrine trustgraph must obey, written down in `README.md`;
- the checks that keep those honest.

## Running it

Node 22. Nothing to install — this repository is dependency-free on purpose.

```bash
npm run lint    # node --check over every .mjs
npm test        # node --test the suite
node vendor-aao-check.mjs validate flashyos.roles.json   # 0 issues
node vendor-aao-check.mjs conform  flashyos.roles.json   # the seven questions
```

## What a change needs

- **A test that fails without it.** Not a test that exercises the code; one that
  would have caught the thing. A charter change that does not change a checker
  verdict still needs the cross-reference test to cover it.
- **A reason in the commit message.** What was wrong, not what you did.
- **No dependencies.** `node:` builtins only. A pull request adding a
  `dependencies` key or an install step to CI will be declined however good the
  library is.
- **Honesty over a green tick.** A check that compares against a sibling checkout
  that may be absent reports UNKNOWN when it is absent — never a false pass.

## The doctrine is not yours to soften

The boundaries in `README.md` — authority comes from what others assert; nothing
a party does alone moves their standing; no reward, token or incentive is ever an
input; registers everywhere; consent is not standing's to grant — are inherited
estate doctrine. A change that would let the eventual service break one of them
is wrong however convenient, and will be declined.

## What will be declined

- Service code written against a `graph/1` or `trust/1` shape that has not
  stabilised. It cannot be written against a moving target and would have to be
  rewritten.
- Anything that lets a party's own claims about itself move standing, routing or
  ranking.
- Any reward, token or incentive mechanic as an input to standing.
- Hand-editing `vendor-aao-check.mjs` or any vendored file. Re-vendor from the
  source, never edit the copy.
- A change to the licence. It is Apache-2.0 (holder Flashy Labs), declared once
  in the estate register in flashyos `tools/estate-licences.mjs`; that register
  is the authority, not a decision made in this repository.

## Commit messages

End with the attribution lines your tooling requires, if any. State the branch
you tested on if it is not the default.
