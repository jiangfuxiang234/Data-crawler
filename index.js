let getMoviesData = require("./getMovies.js");
let fs = require("fs"); // fs：node核心模块，专门用于文件处理

getMoviesData().then(movies => {
    let json = JSON.stringify(movies);
    fs.writeFile("movies.json", json, function(){
        console.log("成功爬取到数据")
    })
})