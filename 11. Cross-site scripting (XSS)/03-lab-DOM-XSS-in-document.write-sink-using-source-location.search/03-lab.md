# Lab: DOM XSS in document.write sink using source location.search

## Lab Description

This lab contains a DOM-based cross-site scripting vulnerability in the search query tracking functionality. It uses the JavaScript document.write function, which writes data out to the page. The document.write function is called with data from location.search, which you can control using the website URL.

To solve this lab, perform a cross-site scripting attack that calls the alert function.

## Lab Solution

**Lessons Learned**: We can corrupt how sited JavaScript is interpreting the DOM
View-source: does not reflects the DOM changes.