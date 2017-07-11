import roomLogo from '../person.png';

const roomlogo = 'http://paid-focusgroups.com/wp-content/uploads/2014/02/focus-group-logo-3-300x300.jpg';
export default function fetchRooms() {
  // const getrooms =  fetch('/api/rooms').then(res => {
  //   return res.json()
  // }).then(res => {
  //   return res
  // })
  var payload = [
  {id:1, title:"SET datatype in JS",logo:roomlogo,description:"Code snippets that explains SET datatype properties, usage and advantages",owner:"Ravi"},
  {id:2, title:"String a palindrome or not",logo:roomlogo,description:"Write a JavaScript function that checks whether a passed string is palindrome or not? A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g., madam or nurses run.",owner:"Ravi"},
  {id:3, title:"Prime or not",logo:roomlogo,description:"Write a JavaScript function that accepts a number as a parameter and check the number is prime or not Note : A prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.",owner:"Ravi"},
  {id:4, title:"Sum of an array of integers",logo:roomlogo,description:"Write a JavaScript program to compute the sum of an array of integers",owner:"Ravi"},
  {id:5, title:"Even or not",logo:roomlogo,description:" Write a JavaScript program to check whether a number is even or not",owner:"Ravi"},
  {id:6, title:"Merge Sort",logo:roomlogo,description:"Write a merge sort program in JavaScript.Sample array : [34,7,23,32,5,62] Sample output : [5, 7, 23, 32, 34, 62]",owner:"Ravi"},
  {id:7, title:"Reverse a number",logo:roomlogo,description:"Write a JavaScript function that reverse a number",owner:"Ravi"},
  {id:8, title:"Map-Reduce-Filter",logo:roomlogo,description:"Fundamental code snippets for map,reduce and filter ",owner:"Ravi"},
  {id:9, title:"Bubblesort in JS",logo:roomlogo,description:"Write pseudo code and implement Bubble Sort in JS",owner:"Ravi"},
  {id:10, title:"Factorial Of N",logo:roomlogo,description:"Write a JavaScript program to calculate the factorial of a number.In mathematics, the factorial of a non-negative integer n, denoted by n!, is the product of all positive integers less than or equal to n. For example, 5! = 5 x 4 x 3 x 2 x 1 = 120 ",owner:"Ravi"}
  ];
  return {type: "GET_ROOMS", payload:payload}
}

