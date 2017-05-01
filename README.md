# Theatre.minimax

> *[Minimax](https://en.wikipedia.org/wiki/Minimax) is a decision rule used in decision theory, game theory, statistics and philosophy for minimizing the possible loss for a worst case (maximum loss) scenario.*

## Overview

This Minimax module implements the [Negamax](https://en.wikipedia.org/wiki/Negamax) simplification with [alpha–beta pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning).

## Installation

Copy the content of [`sources/`](./sources) folder into your project.

## Usage

To use this Minimax module, you'll need to instanciate it with your presets ([`heuristic`](#constructor) and [`childhood`](#constructor) functions). Then, each time you'll need to get the best move node to play, you'll have to call the right decision rule ([`maximize`](#maximize) or [`minimize`](#minimize)) to apply to current move node.

#### Quick start

We first start an instance of this Minimax module :

```javascript
// starts a Minimax instance with your presets
const minimax = new Minimax(heuristic, childhood);
```

Then, we could use this instance to maximize the next move node to play :

```javascript
// calls maximize decision rule for current move node limited by given depth
const maximize = minimax.maximize(start, depth);

// gets the best next move node to play
console.log(maximize);
```

Or we could minimize the next move node to play :

```javascript
// calls minimize decision rule for current move node limited by given depth
const minimize = minimax.minimize(start, depth);

// gets the worst next move node to play
console.log(minimize);
```

## API

[`constructor()`](#constructor)

[`maximize()`](#maximize)

[`minimize()`](#minimize)

---

#### `constructor()`

Creates an instance of this Minimax module.

###### Usage :

```javascript
// starts a Minimax instance with your presets
const minimax = new Minimax(heuristic, childhood);
```

###### Properties :

| property  | name        | type       | description                                |
| --------- | ----------- | ---------- | ------------------------------------------ |
| parameter | `heuristic` | `function` | scores a move node                         |
| parameter | `childhood` | `function` | retrieves next move nodes from a move node |

###### Details :

`heuristic()` :

The `heuristic` function purpose is to score a move node to tell Minimax how to compare them with each other. Since it is related to your application, you must define your own `heuristic` function to pass through the `constructor` following the documentation below.

| property  | name    | type     | description            |
| --------- | ------- | -------- | ---------------------- |
| parameter | `move`  | `object` | move node              |
| return    | `score` | `number` | score of the move node |

`childhood()` :

The `childhood` function purpose is to retrieve the next move nodes from a move node to tell Minimax how to go through the move tree. Since it is related to your application, you must define your own `childhood` function to pass through the `constructor` following the documentation below.

| property  | name    | type     | description            |
| --------- | ------- | -------- | ---------------------- |
| parameter | `move`  | `object` | move node              |
| return    | `moves` | `array`  | array of move nodes |

---

#### `maximize()`

Maximizes the chances of current move winning (minimum loss).

###### Usage :

```javascript
// calls maximize decision rule for current move node limited by given depth
const maximize = minimax.maximize(start, depth);
```

###### Properties :

| property  | name    | type     | description                                     |
| --------- | ------- | -------- | ----------------------------------------------- |
| parameter | `start` | `object` | move node                                       |
| parameter | `depth` | `number` | max depth to reach browsing the move nodes tree |

---

#### `minimize()`

Minimizes the chances of current move winning (maximum loss).

###### Usage :

```javascript
// calls minimize decision rule for current move node limited by given depth
const minimize = minimax.minimize(start, depth);
```

###### Properties :

| property  | name    | type     | description                                     |
| --------- | ------- | -------- | ----------------------------------------------- |
| parameter | `start` | `object` | move node                                       |
| parameter | `depth` | `number` | max depth to reach browsing the move nodes tree |

## [Change Log](./CHANGELOG.md)

## [License](./LICENSE)
