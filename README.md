# just-pnpm

This package utilizes npm package's `preinstall` and `postinstall` [scrips](https://docs.npmjs.com/cli/v9/using-npm/scripts) to restrict that only [pnpm](https://pnpm.io/) package manager could be used on a project.

It's developed as an alternative to `npx only-allow pnpm`, with some bugs fixed ([#15](https://github.com/pnpm/only-allow/issues/15), [#2660](https://github.com/npm/cli/issues/2660)).

## Installation

```
pnpm add -D just-pnpm
```

## Usage

Add this package to your project's `devDependencies` and that's it.

If someone executes package installation commands other than pnpm (`npm install`, `yarn`, `cnpm install`, whatever.) on the project, they will get an error instead and installation will not proceed.

```json
{
  "name": "your-project",
  "devDependencies": {
    "just-pnpm": "^1.0.1"
  }
}
```

For library developers, adding `just-pnpm` to your package's `dependencies` will prevent your library from being installed by any package managers except for pnpm. (not recommended though)

## Escape Hatches

Set environment variable `JUST_PNPM_SKIP_CHECK=true` to disable the check temporarily.

## Disclaimer

This package relies on [NPM lifecycle hooks](https://docs.npmjs.com/cli/v10/using-npm/scripts#npm-install) to work properly.

Although it's tested that the package works on many of popular package managers, a non-standard implementation or misbehavior could possibly break the functionality of package manager restriction.

## License

[MIT](LICENSE)
