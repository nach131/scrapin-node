
const _ = require('lodash');

const words = ["#love", "#beauty", "#fashion", "#beautiful", "#model", "#photooftheday", "#powergirl", "#sun", "#training", "#swimming", "#fitness", "#selflove"
];

const adult = [
	"#elysaexhib", "#lingerie", "#lingerieaddict", "#lingeriemodel", "#elisadream", "#elisadreams", "#hotwife", "#photography", "#photooftheday", "#sensualwoman", "#powergirl", "#adultwork", "#onlyfans", "#onlyfanspromo", "#onlyfansgirls", "#onlyfansbabe", "#onlyfansmodel", "#qos"
]

const rWords_v1 = _.sampleSize(words, 5);
const rWords_v2 = _.sampleSize(adult, 10);

// console.log(rWords_v1, rWords_v2);

const hashtag = rWords_v1.concat(rWords_v2).join(' ');
console.log(hashtag);