## Hexlet tests and linter status:
[![Actions Status](https://github.com/M4XPRD/frontend-project-lvl3/workflows/hexlet-check/badge.svg)](https://github.com/M4XPRD/frontend-project-lvl3/actions)
[![pages-build-deployment](https://github.com/M4XPRD/frontend-project-lvl3/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/M4XPRD/frontend-project-lvl3/actions/workflows/pages/pages-build-deployment)
[![Maintainability](https://api.codeclimate.com/v1/badges/c99e1ba900628cc47e44/maintainability)](https://codeclimate.com/github/M4XPRD/frontend-project-lvl3/maintainability)

## Description:
This is the utility, which shows the difference between two files. The output can be shown with different formats.

[RSS-Aggregator (demo)](https://frontend-project-lvl3-f1fsx7uf2-m4xprd.vercel.app)

<br></br>
**List of supported extensions:**

• JSON (```.json``` file extension)

• YML/YAML (```.yml```or ```.yaml``` file extensions)
<br></br>
**List of output formats:**

• ```stylish``` is standart format, which will show the difference between files with ```+``` and ```-``` signs.

• ```plain``` is human-readable variant, where you can see the string-like output of each line, that has any changes. 

• ```json``` is variant, which is similar to *stylish*. But instead of ```+``` and ```-``` you will see AST-tree-like system with statuses of *keys* and their *types*.

## Installation:

```sh

# Step 1 — clone this repository
$ git clone https://github.com/M4XPRD/frontend-project-lvl2

# Step 2 — install the dependencies
$ make install

# Step 3 — install the packages
$ sudo npm link
```
