// vendor-aao-check.mjs is byte-identical to the aao repository's copy — when
// that checkout is present beside this repository to compare against.
//
// The estate vendor-drift pattern: a copy that cannot be compared is reported
// UNKNOWN, never current and never failing. A stale vendored checker does not
// fail on its own — it disagrees, silently, about exactly the charter rule
// somebody just changed in canon — so the comparison is the only thing
// standing between a change to the source and a copy that never hears about it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const VENDORED = 'vendor-aao-check.mjs'
const SOURCE = join(ROOT, '..', 'aao', VENDORED)

test('the vendored checker imports nothing but node: builtins', () => {
  const src = readFileSync(join(ROOT, VENDORED), 'utf8')
  for (const [, spec] of src.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
    assert.ok(spec.startsWith('node:'), `${VENDORED} imports "${spec}"`)
  }
})

test('the vendored checker matches the aao source byte for byte, when it is beside us', (t) => {
  if (!existsSync(SOURCE)) {
    t.diagnostic(`../aao is not checked out beside this repository — ${VENDORED} drift status UNKNOWN, not current`)
    return
  }
  assert.ok(
    readFileSync(join(ROOT, VENDORED)).equals(readFileSync(SOURCE)),
    `${VENDORED} has drifted from ../aao/${VENDORED} — re-vendor, never edit`,
  )
})
