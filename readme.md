# Password Generator

Password generator is a simple CLI tool for generating passwords.

## Installation

Clone the repository from [GitHub](https://github.com/Wuningson/password-generator.git).

#### Link

To install dependencies, link and make the "password-generator" command available run (sudo might be needed on Linux):

```bash
yarn start
```

## Usage

```
password-generator [options]

# options
  -V, --version                      output the version number
  -s, --save                         Save to file
  -l, --length <length>              Password length
  -f, --filename <filename>          Filename for password file (default: "password")
  -c, --characterSet <characterSet>  Character set for generating the password. One of 'all', 'numeric', 'special', 'alphabetic' and 'alphanumeric' (default: "all")
  -h, --help                         display help for command
```

## Uninstall

To uninstall the CLI run: (sudo might be needed on Linux)

```bash
yarn stop
```
