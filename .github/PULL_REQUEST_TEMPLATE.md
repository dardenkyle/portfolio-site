## Summary

<!-- Briefly describe what changed and why. -->

## Related Issue

Closes #

## Scope

<!-- List the files, modules, docs, or behavior intentionally changed. -->

## Out of Scope

<!-- List related work intentionally excluded from this PR. -->

## Risk Level

Select exactly one: `Low`, `Medium`, or `High`.

Risk level:

Reason:

<!-- Explain why this risk level fits. -->

## Architecture Check

- [ ] Controllers stay thin; services own the data.
- [ ] Frontend keeps the API-types → mappers → domain-model layering; new fields added in all three layers.
- [ ] No API route or response shape changes unless explicitly requested.
- [ ] No changes to CORS config, deploy workflows, or secrets usage unless explicitly requested.
- [ ] No analytics event names/parameters changed unless explicitly requested.
- [ ] No new dependencies or build tooling changes unless explicitly requested.

## Documentation Check

Select exactly one: `Updated` or `Update not needed`.

Documentation:

Reason:

<!-- If docs were not needed, explain why. -->
<!-- See the Documentation Expectations section in CLAUDE.md: README, analytics docs, case studies, ADRs, and CLAUDE.md itself. -->

## Verification

Commands run:

<!-- List commands or manual checks performed. -->

Results:

<!-- Summarize the result of each command or check. -->

## Review Notes

<!-- Call out reviewer focus areas, decisions, or known follow-ups. -->
