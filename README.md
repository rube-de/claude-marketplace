# CC Skills

A monorepo of [Claude Code](https://docs.anthropic.com/en/docs/claude-code) plugins and [agent skills](https://agentskills.io).

[![Plugins](https://img.shields.io/badge/plugins-3-green.svg)](#plugins)
[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](./LICENSE)

## Plugins

| Plugin | Category | Description |
|--------|----------|-------------|
| [council](./plugins/council/) | Code Review | Orchestrate Gemini, Codex, Qwen, GLM-4.7, and Kimi K2.5 for consensus-driven reviews |
| [claude-dev-team](./plugins/claude-dev-team/) | Development | Multi-agent dev team with four modes: plan, dev, full, and auto via Agent Teams |
| [project-manager](./plugins/project-manager/) | Productivity | Interactive issue creation optimized for LLM agent teams |

## Installation

### Prerequisites

| Requirement | Check | Install |
|-------------|-------|---------|
| Claude Code CLI | `claude --version` | [Getting Started](https://docs.anthropic.com/en/docs/claude-code/getting-started) |

### Skills (via [skills.sh](https://skills.sh))

```sh
# List available skills
npx skills add rube-de/cc-skills --list

# Install specific skills
npx skills add rube-de/cc-skills --skill project-manager
npx skills add rube-de/cc-skills --skill council

# Install all skills
npx skills add rube-de/cc-skills --skill '*'
```

### Plugins (via Claude Code marketplace)

```sh
# Add the marketplace
claude plugin marketplace add rube-de/cc-skills

# Install plugins
claude plugin install council@rube-de/cc-skills
claude plugin install claude-dev-team@rube-de/cc-skills
claude plugin install project-manager@rube-de/cc-skills
```

## Structure

```
cc-skills/
├── .claude-plugin/
│   └── marketplace.json     ← Plugin registry (SSoT)
├── plugin.json              ← Root metadata
├── plugins/
│   ├── council/             # AI council code reviews
│   │   ├── agents/          # Consultant agents + Claude subagents
│   │   ├── hooks/           # Pre/post tool-use hooks
│   │   ├── scripts/         # Validation scripts
│   │   └── skills/          # council, council-reference
│   ├── claude-dev-team/     # Multi-agent dev team
│   │   ├── agents/          # Researcher subagent
│   │   ├── commands/        # Task workflow commands
│   │   ├── hooks/           # Session start hooks
│   │   ├── scripts/         # Agent team checks
│   │   └── skills/          # claude-dev-team
│   └── project-manager/     # Issue creation
│       └── skills/          # project-manager
├── scripts/
│   └── validate-plugins.mjs # Plugin validation
├── CLAUDE.md                # Claude Code context
└── LICENSE                  # MIT
```

## Troubleshooting

### "Source path does not exist" Error

The marketplace repo may be out of sync.

```bash
cd ~/.claude/plugins/marketplaces/cc-skills && git pull
claude plugin install plugin-name@rube-de/cc-skills
```

### Slash Commands Not Appearing

1. Verify the plugin is installed: `cat ~/.claude/plugins/installed_plugins.json | grep cc-skills`
2. Restart Claude Code (fresh session required)

### Hooks Not Working

Hooks must be synced to `~/.claude/settings.json`. Restart Claude Code after installing a plugin with hooks.

```bash
cat ~/.claude/settings.json | jq '.hooks | keys'
# Should show: ["PreToolUse", "PostToolUse", "SessionStart"]
```

## For Plugin Developers

### Plugin Structure

```
my-plugin/
├── agents/       → Agent definitions
├── commands/     → Slash commands (/plugin:command)
├── hooks/        → hooks.json
├── scripts/      → Shell scripts
└── skills/       → SKILL.md + references/
```

### marketplace.json Entry

```json
{
  "name": "my-plugin",
  "description": "Plugin description (min 10 chars)",
  "version": "1.0.0",
  "source": "./plugins/my-plugin",
  "category": "development",
  "author": {
    "name": "Your Name",
    "url": "https://github.com/username"
  },
  "keywords": ["keyword1", "keyword2"]
}
```

### Validation

```bash
bun scripts/validate-plugins.mjs
```

## Contributing

1. Fork the repository
2. Create a plugin in `plugins/your-plugin/`
3. Add an entry to `.claude-plugin/marketplace.json`
4. Run `bun scripts/validate-plugins.mjs`
5. Submit a pull request

## Acknowledgments

Marketplace structure, validation tooling, and release workflow inspired by [terrylica/cc-skills](https://github.com/terrylica/cc-skills).

## License

MIT
