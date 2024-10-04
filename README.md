# WIP: your save more than likely will break after updates depending on what i change, the game is still really early in alpha and the inventory system may not be perfect

because of this, you may need to reset your save after each update if the game fails to load

HOPEFULLY after v0.2.0, there shouldnt be a need anymore to do this

# Chex Mining - v0.2.0-alpha:

GARGANTUAN DEVELOPMENTS

## new additions

__added gears!__, two gears currently exist:

- Clay Coil (Tier 1)

- Bismuth Blast Beverage (Tier 2)

**Clay Coil** has a +0.05x raw luck boost, and increases mining speed by 40ms BUT

it has a 1/75 chance to pause your mining for Two Seconds (it automatically starts again)

**Bismuth Blast Beverage** has a 1/40 chance on each block broken to mine 48 extra blocks BUT

the extra blocks it breaks are mined at 0.9x luck (seperate to pickaxe luck)

__added a new Tier 4 pickaxe!__

- Chexglow Dagger

breaks 10 blocks every 0.4 seconds! (no luck boost)

__added some more music__

__sound effects for gears, which are toggleable in settings__

__a few more dreamlike ores :), and Chexium! a new 1/5 common__

## fixes and revamps and additions (under the hood stuff)

- fixed the settings checkboxes hopefully, i hated those things

- __changed over to a new gear/pickaxe system which involves classes rather than objects__

- revamped luck calculations for gears and pickaxes

- cleaned up maingame.mjs a bit

- changed all the pickaxes to that new system

- added an ability system for gears (i can now apply certain abilities that happen randomly to certain gears)

- redid some recipe checking logic

- changed settingshandler a bit to account for new stuff

- recipes are now nested inside the pickaxe's class, as opposed to having them be two objects (same with gears)




