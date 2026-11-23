# Bounty Entrants — our sponsored bounties, handed in

![make.fun bounty](https://make.fun/badge/bounty-entrants-02.svg)
![rank](https://make.fun/badge/bounty-entrants-02/Gudril-cool/bounty-entrants-entry/rank.svg)
![reward](https://make.fun/badge/bounty-entrants-02/Gudril-cool/bounty-entrants-entry/reward.svg)

An entry for the make.fun bounty [Get the most paying entrants across the bounties you launch](https://make.fun/bounty/bounty-entrants-02).

## What this is

We launched our own bounties on make.fun through the sponsor flow — each one
charges an entry fee of at least $0.50 — and this repository hands them in.
`BOUNTY.json` names every bounty we want counted; make.fun reads the list,
looks each bounty up in its own database, and counts the entrants who entered
and paid. Places go by those counted entrants at the deadline.

## The program

`main.ts` (Node 22, standard library only, no network) copies `BOUNTY.json`
from the repository root to the output directory, byte for byte, after
checking the file's shape: a JSON object whose `bounties` list holds between
1 and 100 bounty addresses, slugs or ids.

Run it the way the grader does:

```
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
