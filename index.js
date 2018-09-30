//further
//Be able to permanently delete an item
//Add "buckets" or categories that you can put each of your todo items into.
//Add the ability to name each bucket/category.
//Add the ability to sort the buckets by date or name

const express = require('express');
const app = express();

const jsonfile = require('jsonfile');
const FILE = 'todo.json';

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

//Display html form for user to add task
app.get('/', (request, response) => {
    //render the todo.jsx file
        response.render('todo');
})

//read json file, then update json file after user input
app.post('/todolist', function(request, response) {

    //F1: Add a recording of the time that you put the item in your todo list.
    const currentDate = new Date().toLocaleString();
    var errorMessage = false;
    // var idArray = [];
    // var idNumber = 1 + parseInt(idArray.length);
    var taskObject = {
        id: '', //find a way to generate a unique id
        taskname: request.body.task,
        timeadded: currentDate,
        timecompleted: ''
    };

    //read jsonfile and retrieve existing info
    jsonfile.readFile(FILE, (error, object) => {
        var array = object.task;

        //create an object, and push the object into the json array
        if (taskObject.taskname == '') {
            var errorMessage = true;
        } else {
            array.push(taskObject);
        }
        // idArray.push(taskObject);

        // save the request.body
        jsonfile.writeFile(FILE, object, (err) => {
            console.error(err);
        })
    })
    response.redirect("/todolist");
})

//Display dashboard
app.get('/todolist', (request, response) => {

    jsonfile.readFile(FILE, (error, object) => {
    var array = object.task;
    //render the dashboard
    response.render('dashboard', { object: array });
    })
})

//ready server for get requests
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));