let data = {
  msg: 'ready',
};
/*
var piano49 = ['c2', 'c6'];

class Keyboard{
  constructor(firstNote, lastNote) {
     this.firstNote = firstNote;
     this.lastNote = lastNote;
  }
  [Symbol.iterator]() {
      let step = this.firstNote;
      let iterator = {
        var lastNote = this.lastNote;
          next() {
            console.log("sss:"+lastNote);
              if (step <= lastNote) {
                  step++;
                  return { value: step, done: false };
              }
              else{
                return { value: step, done: true };
              }
          }
      };
      return iterator;
  }
}
var K = new Keyboard(1, 10);
for (let x of K) {
    console.log(x);
}
*/
data.floor=[
 {
  "color": "white",
  "note": "A",
  "octave": "0",
  "k": 1,
  "l": 144,
  "t": 82
 },
 {
  "color": "white",
  "note": "A",
  "octave": "1",
  "k": 2,
  "l": 78,
  "t": 151
 },
 {
  "color": "white",
  "note": "A",
  "octave": "2",
  "k": 3,
  "l": 312,
  "t": 132
 },
 {
  "color": "white",
  "note": "A",
  "octave": "3",
  "k": 4,
  "l": 106,
  "t": 397
 },
 {
  "color": "white",
  "note": "A",
  "octave": "4",
  "k": 5,
  "l": 373,
  "t": 23
 },
 {
  "color": "white",
  "note": "A",
  "octave": "5",
  "k": 6,
  "l": 144,
  "t": 27
 },
 {
  "color": "white",
  "note": "A",
  "octave": "6",
  "k": 7,
  "l": 46,
  "t": 90
 },
 {
  "color": "white",
  "note": "A",
  "octave": "7",
  "k": 8,
  "l": 339,
  "t": 68
 },
 {
  "color": "black",
  "note": "A",
  "octave": "1",
  "k": 9,
  "l": 114,
  "t": 279
 },
 {
  "color": "black",
  "note": "A",
  "octave": "2",
  "k": 10,
  "l": 190,
  "t": 266
 },
 {
  "color": "black",
  "note": "A",
  "octave": "3",
  "k": 11,
  "l": 161,
  "t": 155
 },
 {
  "color": "black",
  "note": "A",
  "octave": "4",
  "k": 12,
  "l": 26,
  "t": 55
 },
 {
  "color": "black",
  "note": "A",
  "octave": "5",
  "k": 13,
  "l": 78,
  "t": 186
 },
 {
  "color": "black",
  "note": "A",
  "octave": "6",
  "k": 14,
  "l": 257,
  "t": 280
 },
 {
  "color": "black",
  "note": "A",
  "octave": "7",
  "k": 15,
  "l": 220,
  "t": 352
 },
 {
  "color": "white",
  "note": "B",
  "octave": "0",
  "k": 16,
  "l": 85,
  "t": 293
 },
 {
  "color": "white",
  "note": "B",
  "octave": "1",
  "k": 17,
  "l": 364,
  "t": 58
 },
 {
  "color": "white",
  "note": "B",
  "octave": "2",
  "k": 18,
  "l": 67,
  "t": 260
 },
 {
  "color": "white",
  "note": "B",
  "octave": "3",
  "k": 19,
  "l": 120,
  "t": 20
 },
 {
  "color": "white",
  "note": "B",
  "octave": "4",
  "k": 20,
  "l": 254,
  "t": 170
 },
 {
  "color": "white",
  "note": "B",
  "octave": "5",
  "k": 21,
  "l": 323,
  "t": 64
 },
 {
  "color": "white",
  "note": "B",
  "octave": "6",
  "k": 22,
  "l": 212,
  "t": 251
 },
 {
  "color": "white",
  "note": "B",
  "octave": "7",
  "k": 23,
  "l": 281,
  "t": 355
 },
 {
  "color": "black",
  "note": "B",
  "octave": "0",
  "k": 24,
  "l": 341,
  "t": 267
 },
 {
  "color": "black",
  "note": "B",
  "octave": "1",
  "k": 25,
  "l": 151,
  "t": 99
 },
 {
  "color": "black",
  "note": "B",
  "octave": "2",
  "k": 26,
  "l": 220,
  "t": 309
 },
 {
  "color": "black",
  "note": "B",
  "octave": "3",
  "k": 27,
  "l": 301,
  "t": 215
 },
 {
  "color": "black",
  "note": "B",
  "octave": "4",
  "k": 28,
  "l": 70,
  "t": 43
 },
 {
  "color": "black",
  "note": "B",
  "octave": "5",
  "k": 29,
  "l": 207,
  "t": 171
 },
 {
  "color": "black",
  "note": "B",
  "octave": "6",
  "k": 30,
  "l": 155,
  "t": 199
 },
 {
  "color": "black",
  "note": "B",
  "octave": "7",
  "k": 31,
  "l": 14,
  "t": 373
 },
 {
  "color": "white",
  "note": "C",
  "octave": "1",
  "k": 32,
  "l": 32,
  "t": 395
 },
 {
  "color": "white",
  "note": "C",
  "octave": "2",
  "k": 33,
  "l": 343,
  "t": 302
 },
 {
  "color": "white",
  "note": "C",
  "octave": "3",
  "k": 34,
  "l": 243,
  "t": 249
 },
 {
  "color": "white",
  "note": "C",
  "octave": "4",
  "k": 35,
  "l": 373,
  "t": 139
 },
 {
  "color": "white",
  "note": "C",
  "octave": "5",
  "k": 36,
  "l": 239,
  "t": 51
 },
 {
  "color": "white",
  "note": "C",
  "octave": "6",
  "k": 37,
  "l": 261,
  "t": 391
 },
 {
  "color": "white",
  "note": "C",
  "octave": "7",
  "k": 38,
  "l": 66,
  "t": 147
 },
 {
  "color": "white",
  "note": "C",
  "octave": "8",
  "k": 39,
  "l": 343,
  "t": 213
 },
 {
  "color": "white",
  "note": "D",
  "octave": "1",
  "k": 40,
  "l": 276,
  "t": 271
 },
 {
  "color": "white",
  "note": "D",
  "octave": "2",
  "k": 41,
  "l": 130,
  "t": 293
 },
 {
  "color": "white",
  "note": "D",
  "octave": "3",
  "k": 42,
  "l": 170,
  "t": 307
 },
 {
  "color": "white",
  "note": "D",
  "octave": "4",
  "k": 43,
  "l": 356,
  "t": 361
 },
 {
  "color": "white",
  "note": "D",
  "octave": "5",
  "k": 44,
  "l": 218,
  "t": 317
 },
 {
  "color": "white",
  "note": "D",
  "octave": "6",
  "k": 45,
  "l": 94,
  "t": 66
 },
 {
  "color": "white",
  "note": "D",
  "octave": "7",
  "k": 46,
  "l": 92,
  "t": 327
 },
 {
  "color": "black",
  "note": "D",
  "octave": "1",
  "k": 47,
  "l": 240,
  "t": 355
 },
 {
  "color": "black",
  "note": "D",
  "octave": "2",
  "k": 48,
  "l": 337,
  "t": 292
 },
 {
  "color": "black",
  "note": "D",
  "octave": "3",
  "k": 49,
  "l": 168,
  "t": 74
 },
 {
  "color": "black",
  "note": "D",
  "octave": "4",
  "k": 50,
  "l": 242,
  "t": 40
 },
 {
  "color": "black",
  "note": "D",
  "octave": "5",
  "k": 51,
  "l": 20,
  "t": 213
 },
 {
  "color": "black",
  "note": "D",
  "octave": "6",
  "k": 52,
  "l": 283,
  "t": 204
 },
 {
  "color": "black",
  "note": "D",
  "octave": "7",
  "k": 53,
  "l": 257,
  "t": 23
 },
 {
  "color": "white",
  "note": "E",
  "octave": "1",
  "k": 54,
  "l": 338,
  "t": 175
 },
 {
  "color": "white",
  "note": "E",
  "octave": "2",
  "k": 55,
  "l": 397,
  "t": 130
 },
 {
  "color": "white",
  "note": "E",
  "octave": "3",
  "k": 56,
  "l": 101,
  "t": 70
 },
 {
  "color": "white",
  "note": "E",
  "octave": "4",
  "k": 57,
  "l": 341,
  "t": 113
 },
 {
  "color": "white",
  "note": "E",
  "octave": "5",
  "k": 58,
  "l": 287,
  "t": 250
 },
 {
  "color": "white",
  "note": "E",
  "octave": "6",
  "k": 59,
  "l": 156,
  "t": 349
 },
 {
  "color": "white",
  "note": "E",
  "octave": "7",
  "k": 60,
  "l": 95,
  "t": 293
 },
 {
  "color": "black",
  "note": "E",
  "octave": "1",
  "k": 61,
  "l": 249,
  "t": 268
 },
 {
  "color": "black",
  "note": "E",
  "octave": "2",
  "k": 62,
  "l": 224,
  "t": 13
 },
 {
  "color": "black",
  "note": "E",
  "octave": "3",
  "k": 63,
  "l": 251,
  "t": 248
 },
 {
  "color": "black",
  "note": "E",
  "octave": "4",
  "k": 64,
  "l": 84,
  "t": 51
 },
 {
  "color": "black",
  "note": "E",
  "octave": "5",
  "k": 65,
  "l": 330,
  "t": 48
 },
 {
  "color": "black",
  "note": "E",
  "octave": "6",
  "k": 66,
  "l": 126,
  "t": 144
 },
 {
  "color": "black",
  "note": "E",
  "octave": "7",
  "k": 67,
  "l": 302,
  "t": 264
 },
 {
  "color": "white",
  "note": "F",
  "octave": "1",
  "k": 68,
  "l": 232,
  "t": 357
 },
 {
  "color": "white",
  "note": "F",
  "octave": "2",
  "k": 69,
  "l": 66,
  "t": 7
 },
 {
  "color": "white",
  "note": "F",
  "octave": "3",
  "k": 70,
  "l": 300,
  "t": 118
 },
 {
  "color": "white",
  "note": "F",
  "octave": "4",
  "k": 71,
  "l": 77,
  "t": 101
 },
 {
  "color": "white",
  "note": "F",
  "octave": "5",
  "k": 72,
  "l": 174,
  "t": 262
 },
 {
  "color": "white",
  "note": "F",
  "octave": "6",
  "k": 73,
  "l": 181,
  "t": 27
 },
 {
  "color": "white",
  "note": "F",
  "octave": "7",
  "k": 74,
  "l": 399,
  "t": 63
 },
 {
  "color": "white",
  "note": "G",
  "octave": "1",
  "k": 75,
  "l": 107,
  "t": 45
 },
 {
  "color": "white",
  "note": "G",
  "octave": "2",
  "k": 76,
  "l": 91,
  "t": 272
 },
 {
  "color": "white",
  "note": "G",
  "octave": "3",
  "k": 77,
  "l": 146,
  "t": 108
 },
 {
  "color": "white",
  "note": "G",
  "octave": "4",
  "k": 78,
  "l": 194,
  "t": 185
 },
 {
  "color": "white",
  "note": "G",
  "octave": "5",
  "k": 79,
  "l": 284,
  "t": 294
 },
 {
  "color": "white",
  "note": "G",
  "octave": "6",
  "k": 80,
  "l": 341,
  "t": 375
 },
 {
  "color": "white",
  "note": "G",
  "octave": "7",
  "k": 81,
  "l": 8,
  "t": 58
 },
 {
  "color": "black",
  "note": "G",
  "octave": "1",
  "k": 82,
  "l": 40,
  "t": 38
 },
 {
  "color": "black",
  "note": "G",
  "octave": "2",
  "k": 83,
  "l": 101,
  "t": 209
 },
 {
  "color": "black",
  "note": "G",
  "octave": "3",
  "k": 84,
  "l": 239,
  "t": 275
 },
 {
  "color": "black",
  "note": "G",
  "octave": "4",
  "k": 85,
  "l": 108,
  "t": 304
 },
 {
  "color": "black",
  "note": "G",
  "octave": "5",
  "k": 86,
  "l": 232,
  "t": 249
 },
 {
  "color": "black",
  "note": "G",
  "octave": "6",
  "k": 87,
  "l": 189,
  "t": 343
 },
 {
  "color": "black",
  "note": "G",
  "octave": "7",
  "k": 88,
  "l": 197,
  "t": 273
 }
];
data.piano=[
 {
  "color": "white",
  "note": "A",
  "octave": "0",
  "k": 1,
  "box": null
 },
 {
  "color": "white",
  "note": "A",
  "octave": "1",
  "k": 2,
  "box": null
 },
 {
  "color": "white",
  "note": "A",
  "octave": "2",
  "k": 3,
  "box": null
 },
 {
  "color": "white",
  "note": "A",
  "octave": "3",
  "k": 4,
  "box": null
 },
 {
  "color": "white",
  "note": "A",
  "octave": "4",
  "k": 5,
  "box": null
 },
 {
  "color": "white",
  "note": "A",
  "octave": "5",
  "k": 6,
  "box": null
 },
 {
  "color": "white",
  "note": "A",
  "octave": "6",
  "k": 7,
  "box": null
 },
 {
  "color": "white",
  "note": "A",
  "octave": "7",
  "k": 8,
  "box": null
 },
 {
  "color": "black",
  "note": "A",
  "octave": "1",
  "k": 9,
  "box": null
 },
 {
  "color": "black",
  "note": "A",
  "octave": "2",
  "k": 10,
  "box": null
 },
 {
  "color": "black",
  "note": "A",
  "octave": "3",
  "k": 11,
  "box": null
 },
 {
  "color": "black",
  "note": "A",
  "octave": "4",
  "k": 12,
  "box": null
 },
 {
  "color": "black",
  "note": "A",
  "octave": "5",
  "k": 13,
  "box": null
 },
 {
  "color": "black",
  "note": "A",
  "octave": "6",
  "k": 14,
  "box": null
 },
 {
  "color": "black",
  "note": "A",
  "octave": "7",
  "k": 15,
  "box": null
 },
 {
  "color": "white",
  "note": "B",
  "octave": "0",
  "k": 16,
  "box": null
 },
 {
  "color": "white",
  "note": "B",
  "octave": "1",
  "k": 17,
  "box": null
 },
 {
  "color": "white",
  "note": "B",
  "octave": "2",
  "k": 18,
  "box": null
 },
 {
  "color": "white",
  "note": "B",
  "octave": "3",
  "k": 19,
  "box": null
 },
 {
  "color": "white",
  "note": "B",
  "octave": "4",
  "k": 20,
  "box": null
 },
 {
  "color": "white",
  "note": "B",
  "octave": "5",
  "k": 21,
  "box": null
 },
 {
  "color": "white",
  "note": "B",
  "octave": "6",
  "k": 22,
  "box": null
 },
 {
  "color": "white",
  "note": "B",
  "octave": "7",
  "k": 23,
  "box": null
 },
 {
  "color": "black",
  "note": "B",
  "octave": "0",
  "k": 24,
  "box": null
 },
 {
  "color": "black",
  "note": "B",
  "octave": "1",
  "k": 25,
  "box": null
 },
 {
  "color": "black",
  "note": "B",
  "octave": "2",
  "k": 26,
  "box": null
 },
 {
  "color": "black",
  "note": "B",
  "octave": "3",
  "k": 27,
  "box": null
 },
 {
  "color": "black",
  "note": "B",
  "octave": "4",
  "k": 28,
  "box": null
 },
 {
  "color": "black",
  "note": "B",
  "octave": "5",
  "k": 29,
  "box": null
 },
 {
  "color": "black",
  "note": "B",
  "octave": "6",
  "k": 30,
  "box": null
 },
 {
  "color": "black",
  "note": "B",
  "octave": "7",
  "k": 31,
  "box": null
 },
 {
  "color": "white",
  "note": "C",
  "octave": "1",
  "k": 32,
  "box": null
 },
 {
  "color": "white",
  "note": "C",
  "octave": "2",
  "k": 33,
  "box": null
 },
 {
  "color": "white",
  "note": "C",
  "octave": "3",
  "k": 34,
  "box": null
 },
 {
  "color": "white",
  "note": "C",
  "octave": "4",
  "k": 35,
  "box": null
 },
 {
  "color": "white",
  "note": "C",
  "octave": "5",
  "k": 36,
  "box": null
 },
 {
  "color": "white",
  "note": "C",
  "octave": "6",
  "k": 37,
  "box": null
 },
 {
  "color": "white",
  "note": "C",
  "octave": "7",
  "k": 38,
  "box": null
 },
 {
  "color": "white",
  "note": "C",
  "octave": "8",
  "k": 39,
  "box": null
 },
 {
  "color": "white",
  "note": "D",
  "octave": "1",
  "k": 40,
  "box": null
 },
 {
  "color": "white",
  "note": "D",
  "octave": "2",
  "k": 41,
  "box": null
 },
 {
  "color": "white",
  "note": "D",
  "octave": "3",
  "k": 42,
  "box": null
 },
 {
  "color": "white",
  "note": "D",
  "octave": "4",
  "k": 43,
  "box": null
 },
 {
  "color": "white",
  "note": "D",
  "octave": "5",
  "k": 44,
  "box": null
 },
 {
  "color": "white",
  "note": "D",
  "octave": "6",
  "k": 45,
  "box": null
 },
 {
  "color": "white",
  "note": "D",
  "octave": "7",
  "k": 46,
  "box": null
 },
 {
  "color": "black",
  "note": "D",
  "octave": "1",
  "k": 47,
  "box": null
 },
 {
  "color": "black",
  "note": "D",
  "octave": "2",
  "k": 48,
  "box": null
 },
 {
  "color": "black",
  "note": "D",
  "octave": "3",
  "k": 49,
  "box": null
 },
 {
  "color": "black",
  "note": "D",
  "octave": "4",
  "k": 50,
  "box": null
 },
 {
  "color": "black",
  "note": "D",
  "octave": "5",
  "k": 51,
  "box": null
 },
 {
  "color": "black",
  "note": "D",
  "octave": "6",
  "k": 52,
  "box": null
 },
 {
  "color": "black",
  "note": "D",
  "octave": "7",
  "k": 53,
  "box": null
 },
 {
  "color": "white",
  "note": "E",
  "octave": "1",
  "k": 54,
  "box": null
 },
 {
  "color": "white",
  "note": "E",
  "octave": "2",
  "k": 55,
  "box": null
 },
 {
  "color": "white",
  "note": "E",
  "octave": "3",
  "k": 56,
  "box": null
 },
 {
  "color": "white",
  "note": "E",
  "octave": "4",
  "k": 57,
  "box": null
 },
 {
  "color": "white",
  "note": "E",
  "octave": "5",
  "k": 58,
  "box": null
 },
 {
  "color": "white",
  "note": "E",
  "octave": "6",
  "k": 59,
  "box": null
 },
 {
  "color": "white",
  "note": "E",
  "octave": "7",
  "k": 60,
  "box": null
 },
 {
  "color": "black",
  "note": "E",
  "octave": "1",
  "k": 61,
  "box": null
 },
 {
  "color": "black",
  "note": "E",
  "octave": "2",
  "k": 62,
  "box": null
 },
 {
  "color": "black",
  "note": "E",
  "octave": "3",
  "k": 63,
  "box": null
 },
 {
  "color": "black",
  "note": "E",
  "octave": "4",
  "k": 64,
  "box": null
 },
 {
  "color": "black",
  "note": "E",
  "octave": "5",
  "k": 65,
  "box": null
 },
 {
  "color": "black",
  "note": "E",
  "octave": "6",
  "k": 66,
  "box": null
 },
 {
  "color": "black",
  "note": "E",
  "octave": "7",
  "k": 67,
  "box": null
 },
 {
  "color": "white",
  "note": "F",
  "octave": "1",
  "k": 68,
  "box": null
 },
 {
  "color": "white",
  "note": "F",
  "octave": "2",
  "k": 69,
  "box": null
 },
 {
  "color": "white",
  "note": "F",
  "octave": "3",
  "k": 70,
  "box": null
 },
 {
  "color": "white",
  "note": "F",
  "octave": "4",
  "k": 71,
  "box": null
 },
 {
  "color": "white",
  "note": "F",
  "octave": "5",
  "k": 72,
  "box": null
 },
 {
  "color": "white",
  "note": "F",
  "octave": "6",
  "k": 73,
  "box": null
 },
 {
  "color": "white",
  "note": "F",
  "octave": "7",
  "k": 74,
  "box": null
 },
 {
  "color": "white",
  "note": "G",
  "octave": "1",
  "k": 75,
  "box": null
 },
 {
  "color": "white",
  "note": "G",
  "octave": "2",
  "k": 76,
  "box": null
 },
 {
  "color": "white",
  "note": "G",
  "octave": "3",
  "k": 77,
  "box": null
 },
 {
  "color": "white",
  "note": "G",
  "octave": "4",
  "k": 78,
  "box": null
 },
 {
  "color": "white",
  "note": "G",
  "octave": "5",
  "k": 79,
  "box": null
 },
 {
  "color": "white",
  "note": "G",
  "octave": "6",
  "k": 80,
  "box": null
 },
 {
  "color": "white",
  "note": "G",
  "octave": "7",
  "k": 81,
  "box": null
 },
 {
  "color": "black",
  "note": "G",
  "octave": "1",
  "k": 82,
  "box": null
 },
 {
  "color": "black",
  "note": "G",
  "octave": "2",
  "k": 83,
  "box": null
 },
 {
  "color": "black",
  "note": "G",
  "octave": "3",
  "k": 84,
  "box": null
 },
 {
  "color": "black",
  "note": "G",
  "octave": "4",
  "k": 85,
  "box": null
 },
 {
  "color": "black",
  "note": "G",
  "octave": "5",
  "k": 86,
  "box": null
 },
 {
  "color": "black",
  "note": "G",
  "octave": "6",
  "k": 87,
  "box": null
 },
 {
  "color": "black",
  "note": "G",
  "octave": "7",
  "k": 88,
  "box": null
 }
];

console.log("init");

let observer = null;

function emitChange() {
  observer(data);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();

  return () => {
    observer = null;
  };
}

export function dropFloor(box, dest) {
  var iPiano = data.piano.findIndex(item => {
    return (item.box) && (item.box.k == box.k);
  });

  if (iPiano != -1){
    data.piano[iPiano].box = null;
    data.floor.push(box);
  }

  var iFloor = data.floor.findIndex(b => {
    return b.k == box.k;
  });

  if (iFloor != -1){
    data.floor[iFloor].l = dest.x;
    data.floor[iFloor].t = dest.y;
  }

  emitChange();
}

export function dropSlot(box, slot) {
  var iFloor = data.floor.findIndex(b => {
    return b.k == box.k;
  });

  if (iFloor != -1) data.floor.splice(iFloor, 1);

  var iBox = data.piano.findIndex(item => {
    return item.box && (item.box.k == box.k);
  });
  if (iBox != -1){
    data.piano[iBox].box = null;
  }

  var iSlot = data.piano.findIndex(item => {
    return item.k == slot.k;
  });
  if (iSlot != -1){
    if (data.piano[iSlot].box){
      data.floor.push(data.piano[iSlot].box);
    }
    data.piano[iSlot].box = box;
  }

  emitChange();
}

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export function bSuccess() {
  return data.piano.every(item => {
    return item.box && (item.box.k == item.k);
  });
}

export function msg(txt) {
  data.msg = txt;
}

export function getAudioCtx() {
  return audioCtx;
}
