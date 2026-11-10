# Portable knowledge and identity

Status: proposed format and invariants. Format v1 must be specified and tested before importing real research collections.

## Preserve four different identities

| Record | Meaning |
| --- | --- |
| Artifact | Exact bytes, addressed by a cryptographic content hash |
| Mention | A reference at a precise source span or media interval |
| Entity | A stable identity for a person, place, organization, event or object |
| Claim | A proposition with qualifiers, evidence and assessment |

Identical bytes may have separate acquisition records. Multiple reports may support one proposition without constituting independent corroboration. Record source copying and derivation explicitly.

## Resolution, not name deduplication

Normalize names only for candidate discovery. Aliases are many-to-many and may be scoped by language, type, time and context. Use identifiers, type compatibility, temporal/geographic evidence and graph context alongside lexical and vector candidates.

An ambiguous match stays unresolved. Persist negative matches. Embedding similarity is not sufficient evidence for an automatic identity merge.

Record each merge or split as a revisioned decision. Preserve original mentions and assignments so the decision can be reversed. Revalidate a draft when its base revision or affected entities have changed.

## Claims and confidence

Store subject, controlled predicate, object/value, polarity, modality and temporal qualifiers. Identical subject/predicate/object triples can still express different claims. One projected relationship may have many supporting or opposing evidence records.

Keep extraction confidence, identity confidence, source quality, corroboration and claim assessment distinct. Uncalibrated model scores are not probabilities of truth. Use explicit assessments such as reported, disputed, unresolved or corroborated, with the assessment's author, method and revision.

## Proposed library package

```text
research.knowledge/
  manifest.json
  library.sqlite
  objects/sha256/...
  workflows/...
  models/manifests/...
```

The manifest identifies the format version, library revision, included hashes and required features. Credentials, device handles, machine paths and executable plugins do not belong in portable evidence. Models are described by manifests; weights are included only under explicit licensing and size policy.

Embeddings need a versioned space identity: model, preprocessing/tokenizer, dimensions, normalization and metric. Equal dimensions do not imply compatible spaces. Preserve vectors even when their query embedder is unavailable; explain the search limitation and retain lexical/graph access.

## Export and import rules

Create a consistent database snapshot using a supported SQLite snapshot mechanism. Include every referenced object and verify its hash. Never assume copying a live main database file captures WAL changes.

Import verifies integrity and format compatibility before opening. It does not execute bundled code, resume external actions or contact sources automatically. Indexes are rebuildable; evidence is not disposable cache.

See [SQLite file portability](https://sqlite.org/onefile.html), [backup API](https://sqlite.org/backup.html), and [WAL considerations](https://sqlite.org/wal.html). These document database mechanisms; our package-level guarantees still require tests.
