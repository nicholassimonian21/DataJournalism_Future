const fs = require('fs');
const ejs = require('ejs');

/**
  * Read and parse the data for our project
  * @author Jameson Cohen
  * @author Nicholas Simonian
*/
let restaurantData = fs.readFileSync('data/clean/sortContent.json', 'utf8'); // ../
restaurantData = JSON.parse(restaurantData);

/**
  * Read the EJS files and create templates for the html macro and micro pages
  * @author Jameson Cohen
  * @author Nicholas Simonian
*/
let micro_template = fs.readFileSync('src/views/dataPage.ejs', 'utf8'); // ../
let index_template = fs.readFileSync('src/views/index.ejs', 'utf8'); // ../
let about_template = fs.readFileSync('src/views/about.ejs', 'utf8'); // ../

/**
  * Creates an array of micro pages to be used as links from macro pages to micro pages
  * @author Jameson Cohen
  * @author Nicholas Simonian
*/
let pageNames = [];
for (let i = 0; i<restaurantData.length; i++){
  pageNames.push(restaurantData[i].Zipcode);
}

/**
  * Creates an array that will keep track of the macro data (borough-wide and city-wide) for the macro html page
  * @author Jameson Cohen
  * @author Nicholas Simonian
*/
let macroDataArr = [];
for(let i = restaurantData.length-6; i < restaurantData.length; i ++){
  macroDataArr.push(restaurantData[i]);
}

/**
  * Turns the EJS template index.EJS file into an index.html blueprint file with all necessary data pushed to it and writes the file into the build folder
  * @author Jameson Cohen
  * @author Nicholas Simonian
*/
let index_html = ejs.render(index_template, {
  filename: __dirname + '/../src/views/index.ejs',
  data0: macroDataArr[0],
  data1: macroDataArr[1],
  data2: macroDataArr[2],
  data3: macroDataArr[3],
  data4: macroDataArr[4],
  data5: macroDataArr[5],
  data: restaurantData,
  svgData: JSON.stringify(restaurantData),
  pages: pageNames
});
fs.writeFileSync('build/index.html', index_html, 'utf8');

/**
  * Turns a single EJS template dataPage.EJS file into all of the micro zipcode.html blueprint files with all necessary data pushed to them and writes each file into the build folder
  * @author Jameson Cohen
  * @author Nicholas Simonian
*/
for (let i = 0; i<restaurantData.length-6; i++){
  let prevPage = i-1;
  let nextPage = i+1;
  if(i == 0){
    prevPage = restaurantData.length-7;
  }
  if(i == restaurantData.length - 7){
    nextPage = 0;
  }
  let micro_html = ejs.render(micro_template, {
    filename: __dirname + '/../src/views/dataPage.ejs',
    data: restaurantData[i],
    prevData: restaurantData[prevPage],
    nextData: restaurantData[nextPage],
    pages: pageNames
  });
  fs.writeFileSync('build/' + restaurantData[i].Zipcode + '.html', micro_html, 'utf8');
}

/**
  * Turns the EJS template about.EJS file into an about.html blueprint file with all necessary data pushed to it and writes the file into the build folder
  * @author Jameson Cohen
  * @author Nicholas Simonian
*/
let about_html = ejs.render(about_template, {
  filename: __dirname + '/../src/views/about.ejs',
  data: restaurantData,
  pages: pageNames
});
fs.writeFileSync('build/about.html', about_html, 'utf8');
