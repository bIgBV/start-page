A repo to store and share my start page

# Requirements
These are the node modules which are required
* grunt-cli
* bower

# Installation 
To install simply run `npm install` and `bower install` to install the required packages and run `grunt` to run it's default tasks.

At it's current state it:

![screenshot](http://i.imgur.com/75SFN11.png)

#Customization

There are 4 grunt commands by default:
* `jshint`
* `uglify`
* `less`
* `copy`

The dependancies are listed in [package.json](https://github.com/bIgBV/start-page/blob/master/package.json).

Less variables and mixins are present on the top of [style.less](https://github.com/bIgBV/start-page/blob/master/src/css/style.less). Simply run `grunt watch` and make your changes.


*NOTE* - The default locaiton is Hyderabad in India, to change it to your own location, just change the query parameter at the end of the api URL in [time-weather.js](https://github.com/bIgBV/start-page/blob/master/src/js/time-weather.js).