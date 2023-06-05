import { inquirer } from "./main.js";
import { catalog } from "./catalog.js";

let info = {
    0: "Welcome to Movie Catalog CLI Application! \n",
    1: "1: Display the list of movies \n",
    2: "2: Add a movie to the movie list \n",
    3: "3: Editing a movie in the movie list \n",
    4: "4: Delete a movie from the movie list \n",
    5: "5: Search for a movie from the movie list \n",
    6: "6: Get movies from the internet \n",
}

console.log(...Object.values(info))

const input = () => {
    inquirer.question("Please choose a number to continue: ", num => {
        if (num > 0 && num < 7) {
            console.log("\n" + info[num])
            catalog(num)
        }
        else {
            console.log("We are sorry! we don't support this operation yet :(");
        }
    });

}

input()

inquirer.on("close", function () {
    console.log("Good bye!");
    process.exit(0);
});



