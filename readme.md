
# .ENV-SWITCHER <br>
### EASY SWICHING .ENV FILES

## Install
download sourcecode.
```
$ npm install -g
```

## Setting your project up
1. Make a directory name of `env-presets`.  
Should be better hide the directory as `.env-presets`.

2. Let `Git` ignore it.
```text
# env-presets
.env-presets
```
* For ElasticBeanstalk users: it should be added to `.ebignore` as well.

3. Put env files into `.env-presets`.  
example:
```text
.env-presets
|-dev
|-prod
|-...
```
You can choose any names as your own `envs`.
## Usage

Now it supports only this command.
```
$ envswitch ENV-NAME
```

For example, you wanna change your .env files as development environment.  
(When you made your own env files `dev` in `.env-presets`.)
```text
$ envswitch dev
```
Put the command below to swtich environment as production.
```text
$ envswitch prod
```
And you wanna change environment to `mytest`
```text
$envswitch mytest
```
