# Status and scope

Planning baseline: November 10, 2026.

## What exists

This repository contains a VitePress documentation site, earlier architecture research and reviews, and the current [Ordo Knowledge Lab plan](project/index.md). Documentation build and publishing support are separate from application implementation.

## What is not implemented here

The Rust knowledge runtime, SQLite schema, plugin host, streaming product frontend, identity-resolution service, durable scheduler, model adapters and DigitalOcean deployment remain proposed. No application performance, reliability or test-pass claims are made.

## Publication status

The Documentation workflow validates the site and can publish it through GitHub Pages after the repository's Pages source is set to GitHub Actions. Consult the actual workflow run and deployment URL for live publication evidence. A successful build alone does not establish that the website is live.

The current working environment may be an isolated assistant workspace rather than the owner's Mac. [Setup instructions](project/setup.md) create a real local checkout in the user's chosen Projects directory. Never claim a Mac path was created without observing it.

## Plan precedence

The current baseline is [docs/project/](project/index.md). Earlier architecture pages remain reference material. In particular, NATS/JetStream is not required for the proposed first local implementation; [the decision register](project/decisions.md) records that change of direction.

A documentation change is not an approved production deployment, a change to course grading, or evidence that a proposed native capability exists.

## Immediate gate

Review the requirements, storage and identity rules, plugin contract, streaming outcomes, and local-to-hosted publication boundary before starting application code. DNS and infrastructure changes require a separate inventory, change scope, and rollback record.
