# CLAUDE.md

@AGENTS.md

## Plugins (Claude Code skills)

| Plugin | Category | Version | Skill Triggers |
|--------|----------|---------|----------------|
| council | Code Review | 1.1.0 | `/council` |
| claude-dev-team | Development | 1.0.0 | `/claude-dev-team` |
| project-manager | Productivity | — | `/project-manager` |
| plugin-dev | Development | 1.0.0 | `/plugin-dev`, `/plugin-dev:create` |

## Navigation

| Topic | Document |
|-------|----------|
| Installation | README.md |
| Marketplace Registry | .claude-plugin/marketplace.json |
| Plugin Authoring | docs/PLUGIN-AUTHORING.md |

## Claude Code Specifics

- Skills activate via slash commands (see table above)
- `plugins/*/skills/*/SKILL.md` — skill activation definitions (YAML frontmatter + instructions)
- `plugins/*/hooks/hooks.json` — hook definitions (PreToolUse, PostToolUse, SessionStart)
- `plugins/*/agents/*.md` — agent/subagent definitions with YAML frontmatter
- Validate with: `bun scripts/validate-plugins.mjs`
