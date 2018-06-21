'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:CalculatorCtrl
 * @description
 * # CalculatorCtrl
 * Controller of the calculatorApp
 */

var calculatorCtrl = function() {
    var ctrl = this;
    ctrl.firstValue = 0;
    ctrl.secondValue = 0;
    ctrl.firstIden = '';
    ctrl.secondIden = '';
    ctrl.display = '0';
    ctrl.currentValue = ''; // the current value;
    var identify = ['*', '/', '+', '-', '='];
    ctrl.getEntries = function(value) {
        if(!isNaN(value)) {
            // check if value is a number
            ctrl.currentValue += value;
            if(ctrl.display == '0') {
                ctrl.display = value;
            }
            else {
                ctrl.display += value;
            }
        }// check if value is a number
        else if (value == 'AC' | value == 'CE' | value == '%' | value  == '.') {
            switch(value) {
                case 'AC':
                ctrl.firstValue = 0;
                ctrl.secondValue = 0;
                ctrl.firstIden = '';
                ctrl.secondIden = '';
                ctrl.display = '0';
                ctrl.currentValue = '';
                break;

                case 'CE':
                if(ctrl.display.length > 1) {
                    if(ctrl.display.slice(-1) == ctrl.secondIden) {
                        ctrl.secondIden = '';
                        console.log('delete secondIden');
                    }
                    else if(ctrl.display.slice(-1) == ctrl.firstIden) {
                        ctrl.firstIden = '';
                        console.log('delete firstIden');
                    }
                    ctrl.display = ctrl.display.slice(0, -1);
                }
                else if(ctrl.display.length == 1) {
                    ctrl.firstValue = 0;
                    ctrl.secondValue = 0;
                    ctrl.firstIden = '';
                    ctrl.secondIden = '';
                    ctrl.display = '0';
                    ctrl.currentValue = '';
                }
                break;

                case '%':
                if(ctrl.currentValue.length == 1) {
                    console.log(ctrl.currentValue.length);
                    ctrl.display = ctrl.display.slice(0, -1);
                    ctrl.currentValue = eval(ctrl.currentValue / 100);
                    ctrl.display += ctrl.currentValue;
                }
                if(ctrl.currentValue.length > 0) {
                    console.log(ctrl.currentValue.length);
                    ctrl.display = ctrl.display.slice(0, (ctrl.display.length - ctrl.currentValue.length));
                    ctrl.currentValue = eval(ctrl.currentValue / 100);
                    ctrl.display += ctrl.currentValue;
                }
                break;

                case '.':
                if(ctrl.currentValue.length > 0) {
                    ctrl.display += value;
                    break;
                }
                else {
                    break;
                }
            }
        }
        else if(identify.indexOf(value) !== -1){
            // check if value = '*', '/', '+', '-', '=';
            console.log('value is an identify');
            if(ctrl.firstIden.length == 0) {
                // check if firstIden is not defined;
                console.log('firstIden is not defined');
                var strings = ctrl.firstValue.toString() + '+' + ctrl.currentValue;
                if(ctrl.currentValue > 0) {
                    ctrl.firstValue = eval(strings);
                    console.log('first value = ' + ctrl.firstValue);
                }
                ctrl.firstIden = value;
                ctrl.currentValue = '';
                ctrl.display += value;
            } // check if firstIden is not defined;
            else {
                if(ctrl.secondIden.length == 0) {
                    // if secondIden is not exist
                    console.log('secondIden is not defined');
                    if(value == '*' | value == '/') {
                        // if value == '*' or '/';
                        if(ctrl.firstIden != '*' && ctrl.firstIden != '/')
                        {
                            ctrl.display += value;
                            ctrl.secondValue = ctrl.currentValue;
                            ctrl.secondIden = value;
                            ctrl.currentValue = '';
                        }
                        else {
                            ctrl.firstValue = eval(ctrl.display).toFixed(2);
                            ctrl.currentValue = '';
                            ctrl.display = ctrl.firstValue.toString() + value;
                            ctrl.firstIden = value;
                        }
                    }
                    else {
                        // if value != '*' && '/';
                        ctrl.firstValue = eval(ctrl.display).toFixed(2);
                        ctrl.currentValue = '';
                        if(value == '=') {
                            // check if value = '=';
                            ctrl.display = ctrl.firstValue.toString();
                        }
                        else {
                            // if value is not '=';
                            ctrl.display = ctrl.firstValue.toString() + value;
                            ctrl.firstIden = value;
                        }
                    }
                }
                else if (ctrl.secondIden.length >= 1){
                    // if secondIden exists
                    ctrl.firstValue = eval(ctrl.display).toFixed(2);
                    ctrl.secondValue = 0;
                    ctrl.secondIden = '';
                    if(value != '=') {
                        ctrl.display = ctrl.firstValue+ value;
                    }
                    else {
                        ctrl.display = ctrl.firstValue;
                    }
                    ctrl.currentValue = '';
                    ctrl.firstIden = value;
                }
            }
        } // check if value = '*', '/', '+', '-', '=';
    }
}

angular.module('calculatorApp')
  .controller('CalculatorCtrl', calculatorCtrl);
