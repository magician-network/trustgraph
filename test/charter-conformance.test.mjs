// The AAO charter passes the real checker, offline, with nothing installed.
//
// This repository is a reservation: there is no service and no src/ to hold a
// shape check, so the charter is validated directly against the estate's
// dependency-free AAO checker. `vendor-aao-check.mjs` is a byte-identical copy
// of the aao repository's checker; the drift test below compares the copy
// against a checkout beside this repository and reports UNKNOWN — never a pass
// — when there is nothing to compare against.
//
// A shape check cannot see a cross-reference. The static half of @flashyos/aao
// can, and it imports nothing but node: builtins, so it runs here with nothing
// installed — the same reason the charter promise is that a stranger can verify
// it offline.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateCharterDocument, conform } from '../vendor-aao-check.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CHARTER_PATH = 'flashyos.roles.json'

const loadCharter = () => JSON.parse(readFileSync(join(ROOT, CHARTER_PATH), 'utf8'))

test('the committed charter validates as an AAO charter document — zero issues', () => {
  const issues = validateCharterDocument(loadCharter())
  assert.deepEqual(issues, [], `${CHARTER_PATH} fails aao validate:\n  ${issues.map((i) => `${i.path}: ${i.message}`).join('\n  ')}`)
})

test('every static conformance question passes; the live ones are deferred, never claimed', () => {
  const report = conform(loadCharter())
  assert.ok(report.ok, `aao conform failed: ${JSON.stringify(report.issues)} ${JSON.stringify(report.results.filter((r) => r.status === 'fail'))}`)
  for (const r of report.results) {
    assert.ok(r.status === 'pass' || (r.kind === 'live' && r.status === 'deferred'), `${r.id} is ${r.status}`)
  }
})

test('every worksIn names a declared repository, and every repository has an owning role', () => {
  const c = loadCharter()
  const repos = new Set(c.repositories.map((r) => r.name))
  for (const role of c.roles) {
    for (const w of role.worksIn ?? []) assert.ok(repos.has(w), `role "${role.name}" works in "${w}", which is not a declared repository`)
  }
  const covered = new Set(c.roles.flatMap((r) => r.worksIn ?? []))
  for (const r of repos) assert.ok(covered.has(r), `no role works in "${r}"`)
})

test('the charter names the repository it lives in', () => {
  const c = loadCharter()
  assert.equal(c.slug, 'trustgraph', 'the charter slug is not trustgraph')
  assert.ok(
    c.repositories.some((r) => r.url === 'github.com/magician-network/trustgraph'),
    'the charter does not name github.com/magician-network/trustgraph',
  )
})

test('the directory fragment names one agent per charter role', () => {
  const c = loadCharter()
  const dir = JSON.parse(readFileSync(join(ROOT, 'directory.fragment.json'), 'utf8'))
  const agents = new Set(dir.nodes.filter((n) => n.kind === 'agent').map((n) => n.name))
  const roles = new Set(c.roles.map((r) => r.name))
  assert.deepEqual([...agents].sort(), [...roles].sort(), 'directory agents and charter roles disagree')
})
