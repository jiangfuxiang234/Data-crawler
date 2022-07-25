var axios = require("axios");
var cheerio = require("cheerio");


async function getMovieHtml(){
    var movie = await axios.get("https://movie.douban.com/chart");
    var html = movie.data; // 获取这个网站的所有html
    return html;
}

async function getMoviesData(){
    var html = await getMovieHtml();
    var $ = cheerio.load(html); // 将html转换成jQuery对象
    var trs = $("tr.item");
    // console.log(html);
    var movies = [];
    for(let i = 0; i < trs.length; i++){
          let tr = trs[i];
          let m = getMovie($(tr));
          movies.push(m)
    }
    return movies;
}

function getMovie(tr){
    let name = tr.find("div.pl2 a").text();
        name = name.replace(/\s/g, ""); // 去掉所有空格
        name = name.split("/")[0];
    let imgSrc = tr.find("a.nbg img").attr("src");
    let describe = tr.find("p.pl").text();
    return{
        name,
        imgSrc,
        describe
    }
}

module.exports = getMoviesData;