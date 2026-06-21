# Assemble the BMad module forms from their canonical single sources.
#
# Single sources of truth (committed):
#   - arc42 capability + knowledge files:
#       plugins/arc42-documentation/skills/arc42-documentation/references/
#   - shared BMad install-time scripts (identical across every module):
#       bmad/_shared/scripts/
#
# Generated targets (git-ignored, assembled here) live inside each
# bmad/<module>/agent-*/ directory. Run `make build` before installing a BMad
# module from this repo via its localPath.

ARC42_BMAD := bmad/arc42-documentation-architect/agent-arc42-documentation-architect
MUSIC_BMAD := bmad/music-domain-expert/agent-music-domain-expert

.PHONY: build clean

# Build is a single dependency-free Node script (tools/build.mjs), shared with
# the npm `prepare` lifecycle so a GitHub clone-install assembles itself.
build:
	node tools/build.mjs

clean:
	rm -rf "$(ARC42_BMAD)/references" "$(ARC42_BMAD)/scripts" "$(MUSIC_BMAD)/scripts"
	@echo ">> cleaned generated BMad artifacts"
