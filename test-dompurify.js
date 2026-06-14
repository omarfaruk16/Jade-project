const DOMPurify = require('isomorphic-dompurify');
const input = '<p class="p1" style="font-size: 12px;">Hello</p>';
console.log("Output:", DOMPurify.sanitize(input));
