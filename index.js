#!/usr/bin/env node

/**
 * Credit: https://www.npmjs.com/package/which-pm-runs
 *
 * The MIT License (MIT)
 * Copyright (c) 2017-2022 Zoltan Kochan <z@kochan.io>
 * https://github.com/zkochan/packages/blob/main/which-pm-runs/LICENSE
 */
function whichPMRuns() {
  const userAgent = process.env.npm_config_user_agent;
  if (!userAgent) {
    return undefined;
  }

  const pmSpec = userAgent.split(' ')[0];
  const separatorPos = pmSpec.lastIndexOf('/');
  const name = pmSpec.substring(0, separatorPos);
  return {
    name: name === 'npminstall' ? 'cnpm' : name,
    version: pmSpec.substring(separatorPos + 1),
  };
}

function isEnv(name) {
  return typeof process.env[name] !== 'undefined';
}

const wantedPM = 'pnpm';
const usedPM = whichPMRuns();
const shouldSkip = isEnv('JUST_PNPM_SKIP_CHECK');

if (isEnv('JUST_PNPM_DEBUG')) {
  console.log({ wantedPM, usedPM, shouldSkip });
}

// Credit: https://github.com/pnpm/only-allow/blob/master/bin.js
// with external dependencies removed, package manager restricted to pnpm,
// and isInstalledAsDependency check removed.
if (usedPM && usedPM.name !== wantedPM && !shouldSkip) {
  console.log(
    `Use "pnpm install" for installation in this project.

If you don't have pnpm, go to https://pnpm.io/installation
and find installation method that suits your environment.`
  );
  process.exit(1);
}
