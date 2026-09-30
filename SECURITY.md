# Security

## Reporting

Email **security@flashylabs** — this is the estate's private channel and the
address is to be confirmed before launch; if it does not resolve, open an issue
that says only "security report, please contact me" and a maintainer will reach
out privately. Do not put the finding in the issue.

Include what you found, how to reproduce it, and what you think the impact is.
No formal disclosure timeline is promised; one will be agreed with you rather
than imposed.

## What this repository is

A **reservation and a product charter**, not a running service. It holds the AAO
charter trustgraph's org is provisioned from, its `directory/1` mesh node, the
doctrine the eventual standing service must obey, and a dependency-free checker
that reads a JSON file. There is no service code, no data store, no network
surface and no dependencies. `vendor-aao-check.mjs` reads a local charter file
and makes no outbound request.

## What is a vulnerability here

- The vendored AAO checker accepting a charter the aao specification refuses, or
  refusing one it permits — in particular a charter that would provision an org
  whose roles, agents or approval thresholds are not what the committed charter
  declares.
- The vendored checker having drifted from its canonical source in a way that
  changes a verdict, undetected because the drift test reported UNKNOWN rather
  than a mismatch.
- A test that reports a pass without having compared anything — a green tick for
  having looked at nothing.
- A secret, credential or `.env` committed anywhere in the tree or its history.

## When the service exists

trustgraph will read `graph/1` and `trust/1` and compute standing. When that
code lands, its threat surface — reading a fragment that is somebody else's
untrusted input, and the boundary that keeps a party from moving their own
standing — is in scope and this section grows to cover it. Today there is no
such code, and this document does not claim otherwise.
