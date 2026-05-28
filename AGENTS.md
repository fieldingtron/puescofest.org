# Agent Notes

## Dependency Policy
- Keep tw-elements pinned to exactly 1.0.0.
- Reason: this project depends on legacy tw-elements bundle behavior and file paths used by the postbuild copy step and existing frontend code.
- Do not upgrade tw-elements without a dedicated migration and full UI regression pass.
