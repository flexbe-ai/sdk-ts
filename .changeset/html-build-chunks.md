---
"@flexbe/sdk": minor
---

Add `dependencies` to `BuildHtmlParams` and `chunks` to `BuildHtmlResult`. `dependencies` overrides the built-in package pins for one HTML build. `chunks` is the compiled package files, kept out of the island script. `external` is still accepted and does not change the build.
