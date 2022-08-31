/*
  eslint-disable
    @typescript-eslint/naming-convention,
    import/no-commonjs
 */

const ALWAYS = `always`

module.exports = {
  extends: [`@commitlint/config-angular`],
  rules: {
    'scope-case': [0],
    'type-enum': [
      2,
      ALWAYS,
      [
        `chore`,
        `build`,
        `ci`,
        `docs`,
        `feat`,
        `fix`,
        `perf`,
        `refactor`,
        `revert`,
        `style`,
        `test`,
        `types`,
        `typings`,
        `wip`
      ]
    ]
  }
}
