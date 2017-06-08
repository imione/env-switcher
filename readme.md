
# .ENV-SWITCHER <br>
### EASY SWICHING .ENV FILES
If you apply .env modules to your service, .env files need to be handled .<br>
As you divide your service into micro services, .env files are getting more like tribbles.<br>
I hope you can manage your envs easily without any mistakes with this cli.

## Install
```
$ npm install -g env-switcher
```

## Setting your project up
Move into your project directory.
1. Initialize env-switcher for your project.
```text
$ envswitch init <env_name>
```
- you can run without env_name parameter, then your default name of env setting is: 'default'
```text
$ envswitch init
```
- Then `.envswitcher` will be automatically added to `.gitignore` if it exists.
* For ElasticBeanstalk users: it should be added to `.ebignore` manually.

2. Put env files into `.envswitcher`.  
example:
```text
.envswitcher
|-dev
|-prod
|-...
```
You can choose any names as your own `envs`.
## Usage

Now it supports only this command.
```
$ envswitch use <env_name>
```

For example, you wanna change your .env files as development environment.  
(When you made your own env files `dev` in `.envswitcher`.)
```text
$ envswitch use dev
```
Put the command below to swtich environment as production.
```text
$ envswitch use prod
```
And you wanna change environment to `mytest`
```text
$ envswitch use mytest
```
## More Commands
##### - list your env files
```text
$ envswitch list
```

##### - check the status of your environment
```text
$ envswitch status
```

##### - help
```text
$ envswitch --help
```