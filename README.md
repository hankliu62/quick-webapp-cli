# autowebapp-cli
auto generate latest react/vue app without write config files

[React](https://www.npmjs.com/package/react) or [Vue](https://www.npmjs.com/package/vue) web application generator.


## Features
- Support react family bucket（supported react + react-router + redux + antd）

## Installation

```sh
$ npm install -g autowebapp-cli
```

with 1 commands

- autowebapp-cli (Support react family bucket)

## Quick Start React


The quickest way to get started with react is to utilize the executable `autowebapp-cli(1)` to generate an application as shown below:

Create the app:

```bash
$ autowebapp-cli react-demo && cd react-demo
```

Install dependencies:

```bash
$ npm install
```

Rock and Roll

```bash
$ npm start
```

## Command Line Options

This cli can also be further configured with the following command line flags.

    -h, --help          output usage information
    -V, --version       output the version number
    -t, --type <engine> add template <engine> support (react|vue) (defaults to plain react)
    -f, --force         force on non-empty directory

## License

[MIT](LICENSE)
