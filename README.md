# Branchlint ![CI](https://github.com/lekterable/branchlint-action/workflows/CI/badge.svg) [![codecov](https://codecov.io/gh/lekterable/branchlint-action/branch/master/graph/badge.svg)](https://codecov.io/gh/lekterable/branchlint-action) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![management: perfekt👌](https://img.shields.io/badge/management-perfekt👌-red.svg?style=flat-square)](https://github.com/lekterable/perfekt)

Lint your Git branch names using GitHub action.

## Usage

```yaml
name: Branchlint
on: pull_request
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Lint branch name
        uses: lekterable/branchlint-action@2.1.0
        with:
          allowed: |
            development
            /(epic|feat|fix|chore)/DEV-\d{4}/i
          errorMessage: 'Custom error message'
          startAfter: '2021-01-01 00:00:00'
```

**_allowed_** - _(required)_ a list of allowed branch names (strings and/or regular expressions) separated by a new line

**_errorMessage_** - _(optional)_ a custom error message

**_startAfter_** - _(optional)_ a date string (YYYY-MM-DD hh:mm:ss) after which the linting will start

## License

[MIT](LICENSE)
