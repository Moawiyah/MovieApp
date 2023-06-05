import fs from "fs";
import { inquirer } from "./main.js";
import { getApi } from "./http/httpGet.js";
let jsonData;

let movie = {
};



const writeToJSON = () => {
  fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8', (err) => {
    if (err) {
      console.log("Something went wrong while writing to the file!");
      console.error(err);
      return;
    }
    console.log('File has been written.');
    // inquirer.close();
  });
}

const listOfMovie = (jsonData) => {
  for (let i = 1; i <= jsonData.length; i++) {
    console.log(`${i} - ${jsonData[i - 1]["Title"]} ( ${jsonData[i - 1]["Genre"]} Movie ) released in ${jsonData[i - 1]["Year"]} by ${jsonData[i - 1]["Director"]} `)
  }
}


export const catalog = (num) => {
  try {
    fs.readFile('data.json', "utf-8", (err, data) => {
      jsonData = JSON.parse(data);
      let conter = jsonData.length
      if (err)
        console.log('somthing wrong');
      else {
        if (num == 1) {
          listOfMovie(jsonData);
          inquirer.close();
        } else if (num == 2) {
          conter++
          inquirer.question("What is the movie title? ", title => {
            inquirer.question("Who is the director of the movie? ", dir => {
              inquirer.question("What kind of movie? ", genre => {
                inquirer.question("In what year was it released? ", rel => {
                  movie["Id"] = conter;
                  movie["Title"] = title;
                  movie["Director"] = dir;
                  movie["Genre"] = genre;
                  movie["Year"] = rel;
                  jsonData.push(movie)
                  writeToJSON()
                })
              })
            });
          });
        }

        else if (num == 3) {
          listOfMovie(jsonData);
          inquirer.question("Enter the movie number you want to edit? ", num => {
            inquirer.question("What is the title of the new movie? ", title => {
              inquirer.question("Who is the director of the movie? ", dir => {
                inquirer.question("What kind of movie? ", genre => {
                  inquirer.question("In what year was it released? ", rel => {
                    jsonData[num - 1]["Title"] = title;
                    jsonData[num - 1]["Director"] = dir;
                    jsonData[num - 1]["Genre"] = genre;
                    jsonData[num - 1]["Year"] = rel;
                    writeToJSON()
                  })
                })
              })
            })
          })
        }
        else if (num == 4) {
          listOfMovie(jsonData);
          inquirer.question("Enter the movie number you want to remove: ", id => {
            for (let i = 0; i < jsonData.length; i++) {
              if (id == jsonData[i]["Id"])
                jsonData.splice(i, 1);
            }
            for (let i = 1; i <= jsonData.length; i++) {
              jsonData[i - 1]["Id"] = i
            }
            writeToJSON()
            process.stdout.write(`The Movie that has the index number equal ${Id} now is deleted!`)
          });
        }
        else if (num == 5) {
          let str = ""
          console.log(`
          1- Search by title
          2- Search by director
          3- Search by genre
          4- Search by year
          `)
          inquirer.question("Choose the number of the way you want to search: ", index => {
            if (index == 1)
              str = "Title";
            else if (index == 2)
              str = "Director";
            else if (index == 3)
              str = "Genre";
            else if (index == 4)
              str = "Year";
            inquirer.question(`Type what ${str} you want to search: `, sr => {
              for (let i = 1; i <= jsonData.length; i++) {
                if (sr == jsonData[i - 1][str])
                  console.log(`${i} - ${jsonData[i - 1]["Title"]} ( ${jsonData[i - 1]["Genre"]} Movie ) released in ${jsonData[i - 1]["Year"]} by ${jsonData[i - 1]["Director"]} `)
              }
            })
          })

        }
        else if (num == 6) {

          let arr = getApi()
          for (let i = 0; i < arr.length; i++) {
            arr[i]["Id"] = conter++;
            arr[i]["Director"] = "unknown";
            arr[i]["Genre"] = "unknown";
            jsonData.push(arr[i])
          }
          writeToJSON()
        }
      }
    });
  } catch (error) {
    console.log("Can't read this file");
    console.log(error);
  }
}






