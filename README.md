# WIP: your save more than likely will break after updates depending on what i change, the game is still really early in alpha and the inventory system may not be perfect

because of this, you may need to reset your save after each update if the game fails to load

HOPEFULLY after v0.2.0, there shouldnt be a need anymore to do this

# Chex Mining - v0.3.1-alpha:

hello!

what a nutso time to be alive, alot has changed! yet again:

things i've added:

## Pickaxes:

### Chexonic Spellbook (Tier 6)

oh boy tier 6...

> Luck: +0.5x

> Speed: 2 Blocks / 0.2s

## Gears:

### Wheel of Fate (Tier 4)

> Positive: Has a 1/400 chance to pause mining and spin a wheel which contains many effects.

> Negative: Effects can be good or bad.

### Chexium Chronograph

> Positive: Has a 1/250 chance to give +0.01x to +0.2x luck for 10 seconds depending on the time of day. (+0.2x happens at 12:00PM, +0.01x happens at 12:00AM, times are local to your timezone)

> Negative: The luck of this gear is entirely dependant on the time of the actual physical day. (fix your sleep schedule)

## New Ores:

> Graphite, Tier: Common, Rarity: 1/7 <br>
> Calcite, Tier: Common, Rarity: 1/25 <br>
> Sphalerite, Tier: Common, Rarity: 1/35 <br>
> Opal, Tier: Common, Rarity: 1/855 <br>
> Kaolinite, Tier: Common, Rarity: 1/900 <br>

> Ilmenite, Tier: Uncommon, Rarity: 1/2000 <br>
> Bornite, Tier: Uncommon, Rarity: 1/4000 <br>
> Hematite, Tier: Uncommon, Rarity: 1/7900 <br>

> Coltanite, Tier: Rare, Rarity: 1/13,500 <br>
> Zircon, Tier: Rare, Rarity: 1/26,500 <br>
> Bohrium, Tier: Rare, Rarity: 1/31,520 <br>
> Carnotite, Tier: Rare, Rarity: 1/32,000 <br>

> Wumbus Maximus, Tier: Unreal, Rarity: 1/500,500 <br>
> Chronolium, Tier: Unreal, Rarity: 1/888,888 <br> <br>

> Fracture of Normality, Tier: Pristine, Rarity: 1/14,777,777 <br>

> Conflux, Tier: Pure, Rarity: 1/41,121,100 <br>

> Phasecore, Tier: Angelic, Rarity: 1/800,000,000 <br>

> The End, Tier: Dreamlike, Rarity: 1/??????????? <br>
> The Truth, Tier: Dreamlike, Rarity: 1/???????????

## Other Changes and New Things:

> <b>Slightly</b> nerfed chexium matter manipulator (500 mining speed -> 550)

> added new ore log! i didnt much like how when mining you couldnt see all the ores you got, plus its quite fancy

> revamped the ore index to be able to handle more ores

> generally improved the dynamic gui handling

> added a failsafe for if your safe is outdated

> added new gear effects for both wheel of fate and chexium chronograph

> added a new song

> added a new temporary gear bonuses object to store temporary bonuses that may come from gears

> changed mining logic to allow for better stopping and starting

> general html and css improvements

> moved away from using ga.jspm.io for imports, now using esm.sh and jsdelivr

> removed the ore display at the top left, its now just pickaxe and gear

> added new spawn messages and effects for higher tier ores, changed the colors too 

## Fixes:

> fixed a bug where spawn animations and effects were overlapping and causing problems, they now interrupt each other

> fixed a bug with luck where your luck could go into negatives and overflow

> fixed a calculation with luck, luck wasnt actually being calculated correctly this entire time and the player had way more luck than they should have

> fixed a bug with the inventory not correctly sorting ores

> fixed a bug with gear block mining where putting "0" as the luck in the selectRandomOre function would not mine anything, as the base luck (1) was not being accounted for, causing the luck calculation to divide by zero and Infinity

> fixed the recipe for chexium matter manipulator being in the wrong order

