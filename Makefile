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

ARC42_SKILL    := plugins/arc42-documentation/skills/arc42-documentation
ARC42_BMAD     := bmad/arc42-documentation-architect/agent-arc42-documentation-architect
MUSIC_BMAD     := bmad/music-domain-expert/agent-music-domain-expert
SHARED_SCRIPTS := bmad/_shared/scripts

.PHONY: build clean

build:
	@echo ">> arc42: copying canonical references into the BMad module"
	rm -rf "$(ARC42_BMAD)/references"
	cp -R "$(ARC42_SKILL)/references" "$(ARC42_BMAD)/references"
	@echo ">> distributing shared BMad scripts into each module"
	mkdir -p "$(ARC42_BMAD)/scripts" "$(MUSIC_BMAD)/scripts"
	cp "$(SHARED_SCRIPTS)/"*.py "$(ARC42_BMAD)/scripts/"
	cp "$(SHARED_SCRIPTS)/"*.py "$(MUSIC_BMAD)/scripts/"
	chmod +x "$(ARC42_BMAD)/scripts/"*.py "$(MUSIC_BMAD)/scripts/"*.py
	@echo ">> build complete — BMad modules are assembled and installable"

clean:
	rm -rf "$(ARC42_BMAD)/references" "$(ARC42_BMAD)/scripts" "$(MUSIC_BMAD)/scripts"
	@echo ">> cleaned generated BMad artifacts"
