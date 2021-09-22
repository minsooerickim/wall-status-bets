# WallStatusBets.io

![Alt Text](/client/my-app/public/home.gif)

![Alt Text](/client/my-app/public/searchResult.gif)

---

### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [License](#license)
- [Author Info](#author-info)

---

## Description

CRUD web application using MERN Stack

Retrieves and manipulates data from a subreddit, ```r/wallstreetbets```, to provide graphical and statistical data for users to analyze the popularity of their stock in interest on the subreddit over different periods of time.

Provides easy acess to all the trending stocks on both the subreddit, ```r/wallstreetbets```, and ```WallStatusBets.io```.

## Reflection

This was a 8 week long personal project build during the summer of 2021. Project goals included using new technologies and getting familiar with full stack development.

I wanted to pull data from the reddit API based on what stock the user was interested in; I was able to achieve this with the ```create next-app``` boilerplate, then adding ```snoowrap```. I decided to use ```create next-app``` to invest more time in diving into weird technological rabbit holes.

One of the hardest challenges I ran into was the reddit API limitations. The API had many limits when it came to data I wanted to retrieve. For instance, the API had a set number of posts and comments it was allowed to return. This was a big problem as I had to deal with huge chunks of data. I spent days trying to figure out a way around such a problem; Eventually, I ended up spending some time with ```snoowrap``` and found ways to use its functions to retrieve the desired data from reddit.

## Installation and Setup Instructions

Clone down this repository. You will need ```node```, ```npm```, and ```yarn``` installed globally on your machine.

To Start Development Server:

```yarn dev```

To Start Server:

```npm start```

To Visit App:

```localhost:3000```

#### Technologies

- react
- next.js
- express.js
- node.js
- mongoDB
- javascript
- HTML
- CSS
- axios
- snoowrap
- framer-motion
- chart.js
- react-icons

---

## How To Use

Input your stock of interest and click "Rate" to see the both statistical and graphical data!

---

## License

MIT License

Copyright (c) [2017] [James Q Quick]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Author Info

- Linkedin - [@minsookime](https://www.linkedin.com/in/minsookime/)
- Website - [Minsoo Kim](https://minsooerickim.github.io/)

