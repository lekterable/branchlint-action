# Branchlint

Lint your git branch names using github action.

## Usage

```yaml
name: Branchlint
on: pull_request
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Lint branch name
        uses: lekterable/branchlint-action@v1.0.0
        with:
          allowed: |
            development
            /(epic|feat|fix|chore)/DEV-\d{4}/i
```

**_allowed_** - _(required)_ a list of allowed branch names separated by a new line

**NOTE:** you can use both strings and valid regular expressions.

## License

[MIT](LICENSE)
