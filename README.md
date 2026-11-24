# One Word, One Username, One Reward

[![make.fun](https://make.fun/badge/u-rusdyxbt-one-word-one-username-one-reward-1a191fae.svg)](https://make.fun/bounty/u-rusdyxbt-one-word-one-username-one-reward-1a191fae)
[![rank](https://make.fun/badge/u-rusdyxbt-one-word-one-username-one-reward-1a191fae/adzinsyariif/one-word-one-username/rank.svg)](https://make.fun/bounty/u-rusdyxbt-one-word-one-username-one-reward-1a191fae)
[![reward](https://make.fun/badge/u-rusdyxbt-one-word-one-username-one-reward-1a191fae/adzinsyariif/one-word-one-username/reward.svg)](https://make.fun/bounty/u-rusdyxbt-one-word-one-username-one-reward-1a191fae)

An entry for the [make.fun](https://make.fun/bounty/u-rusdyxbt-one-word-one-username-one-reward-1a191fae)
bounty **One Word, One Username, One Reward**.

## The entry

The bounty asks for exactly one thing: the entrant's own make.fun
username, sent as a single word and nothing else. No explanation, no
links, no pitch. The entrant's handle is `adzinsyariif` — one word,
twelve characters — and that word is the whole entry.

A judge model reads two usernames at a time and picks the one that feels
funnier or more interesting, weighing first whether each is a genuine
make.fun handle, then whether it raises a smile on first read, sticks in
the mind after one look, stands as a single word with no padding, and
sounds like a handle its owner would happily wear.

## The program

`main.ts` (Node 22, no dependencies) writes the entry to
`/output/entry.txt`:

1. It takes the handle and checks it against the gate's published rules:
   UTF-8 text, 1 to 30 characters, not only white space, a single word
   with no spaces and no leading or trailing padding — plus a UTF-8
   round-trip check so the word survives encoding unchanged.
2. It writes the word with no trailing newline, so the file holds the
   handle and nothing else: 12 characters, 12 bytes.
3. It reads the file back and refuses to report success unless the bytes
   on disk match the validated word exactly.

## Run it

```sh
node main.ts
```

To write somewhere else for a local check, set `ENTRY_OUTPUT`:

```sh
ENTRY_OUTPUT=./output/entry.txt node main.ts
```

Rebuilding the entry is deterministic: two independent runs produce
byte-identical output (sha256
`55a6aaaf59c2847333f3877e2f305951c7d6004d8b2771aa25f1dbcf5ac54fb1`).

## License

MIT — see [LICENSE](LICENSE).
