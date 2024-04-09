// IMP = here we are using the one of the way to modulurizing our code:
// we are going the use the (IIFE) module: These are functions that are wrapped in parentheses and executed immediately, creating a private scope for variables and functions within the module.
var TodoListApp = (function () {
  // here we have created the (tasks) array:
  // In which we will stores the (tasks) as an object:
  let tasks = [];
  // => 1 = here we get the tasks-list element which is (ul) element:through the (getElementById) function of (DOM):
  // IMP = for accessing the (tasks-list):we need to pass the (id) of (tasks-list) element:To this (getElementById) function of (DOM):
  const tasksList = document.getElementById("list");
  // => 2 = here we get the (input) element:so that we can get the (input-value) from it:
  const addTaskInput = document.getElementById("add");
  // => 3 = here we get the (tasks-counter) element:so that we can provide the real count of tasks to it:
  const tasksCounter = document.getElementById("tasks-counter");
  a = 10;
  console.log("its working hurry");
  async function fetchTodos() {
    // => 1 =  here we did the simple (fetch) request:
    // GET request:
    // fetch("https://jsonplaceholder.typicode.com/todos")
    //   .then(function (response) {
    //     console.log(response);
    // (json) function:will also return us the another (promise):
    //     const data = response.json();
    //     console.log(data);
    //     return data;
    //   })
    //   .then(function (data) {
    //     tasks = data.slice(0, 10);
    //     console.log("tasks-used-from-api", tasks);
    //     renderList();
    //     console.log("tasks-get-from-api", data);
    //   })
    //   .catch(function (error) {
    //     console.log("error", error);
    //   });
    // => 2 = here we did the (fetch) request:with the help of (async-await) method:
    // IMP = so when we are fetching data with the help of (async-await) method:then we did not have to use the (then) and (catch) method to handle the (promises):
    // IMP = Instead of (then) and (catch) method:we can use the (try) can (catch) method on await requests:To basically avoid any kind of (error) in our application:while we are fetching data from the (api):
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      tasks = data.slice(0, 10);
      renderList();
    } catch (error) {
      showNotification(error);
      console.log(error);
    }
  }

  // addTaskToDOM function:through this function we gonna be add or pass all the tasks to the DOM:
  // IMP = through this function:we gonna be create the (lists) and pass the (tasks) or tasks-data one by one to them:
  // this function will get the task as an argument with  in it:
  function addTaskToDOM(task) {
    // first we create list-tag:
    const li = document.createElement("li");
    // second we create the html structure for this list-tag:
    li.innerHTML = `
  
    <input type="checkbox" id="${task.id}" ${
      task.completed ? "checked" : ""
    }class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAY1BMVEX///8AAAD19fW8vLw7OzsyMjLp6enBwcFERERBQUG1tbUPDw92dnb7+/toaGhaWlpPT0/Y2NhjY2Pv7+9wcHDS0tLKysonJyeioqJJSUmCgoIVFRWTk5Ourq6cnJyKiooeHh4qxoeDAAADTUlEQVR4nO2c2ZqiMBCFAVnaJQ0BBHd8/6ccZ3Q0BUFDEhP763NuQx/+ToQsVFUQQBD0a8UXyuIe8JpkHyprnzSO8dhBne6qA3MKeJzKF4ZHl3xsOl8YuuxCjQ5024U7HcCdQ8CVDuAKgAAE4KcC7pcj2n8GYD1+Xf0RgN/j130DcEQANNVHAPJsNqYsF29cNGPXNYV4Xf7EcPKmpTqFjnWqJvHlrx1tK59AyOrXfvZVq+8JFj74wnChDOilA5/Omb0R9sOnvu/7fMDWD1+r/JR0fgA7Vb6g8QM44YBp44Nvo87nZZDVB/ifeJ04VT39jJNFDuX28BCCfpfWTfo+87RZmxnw6/btFNnhoYqu+56VwVeedXJ7y9eTdjRqqv4vixPtXuTn+zxUWn+TsvJuftbtQ3HbnVmluygTzJXX+lRkYV3axQuCUnTXGx+yKowtPydRLLrrfWqcuQOcARCAAPQIWFXVyGuMXZq8A/Iu3xY76TyT7Ypt3o1MY64AN7fpuhw0R7ep4izf7joCfBwUF7326HE8ffIHyJePC3odJZxNLGWj7AZQDF2IycI7Fe8vC1ZwAkiP2kk/rcUW2fG4E8D0S7yCPMniai/8kuxqAAhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgD8XsCJpcySOknzQLnx90CYhAQkNCUiEJm8hAcFaCKroxXYIiYNLWYyqo7CUR1bHvDeM1QPgIPtLR4Csu/XhdvAcVNtb/3XSwClnoVHNat4m5VECwY5l0s5XI9Gf7oLLWJqmI23RpWksfBbheQAEIAB/ACBZMiWSJZOJyGpCM9eCLJnOhrk9A/Oz6K5nXokWtotS0cJYmgk/xGNnNSeH0cJYmi7kZ7K0+iNMl6J3oulC/0urpTpoyZ+Jmbt39RK1LRYR5NRZt/ZfSpPxC2uDnJLdlsErrFfibbhs1uTbUl/9onAzahQWVkaZFz1bg5S4vlXYGXdiOkifLwzcsr5Z2HYLrj0tR3zRDYtMmJTHZOXA7sIYzzUVy0pgmGVl8rdX1WgNf9dvLwkxqfyDTN+v72GiJyWnFFUNnmSbkh18TSaMX99HV7GVxOr39aGN/vur6E01kGqVF+oftbRGkmlHYgoAAAAASUVORK5CYII="  
    class="delete" data-id="${task.id}">
  
  
    `;
    // third we have to  append or add these(List-tags  ) into our (unordered-list) tag:
    tasksList.append(li);
  }

  // renderList fucntion:through which we gonna be show the list of task in application:
  function renderList() {
    // here we are first empting the (inner-html) of (task-list) element:
    // so that we can render the new list of tasks in the task-list element:
    // IMP = or the other way of doing it is that we have to first get all the tasks from the list and then add the new one in it:
    tasksList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
      // here we another function:through which will basically gonna be pass all the tasks one by one to the DOM:
      addTaskToDOM(tasks[i]);
    }
    // provide tasks count-data to task-counter:
    tasksCounter.innerHTML = tasks.length;
  }
  // markTasksAsComplete function:through which we gonna be mark the task as completed:
  // IMP = this function also gets the (taskId) as argument in it:because we wanna know that which particular task have to mark as completed:
  function toggleTask(taskId) {
    // here we are finding out the (particular-task) from tasks-array:with the help of filter method:
    const task = tasks.filter(function (task) {
      return task.id === Number(taskId);
    });

    // filter method will return us the new-array:if with in that array we have any task then it  means that we have found the particular task:
    if (task.length > 0) {
      // our task should be at the (0) index of new task-array:
      const currentTask = task[0];

      // after getting out the particular task or task-object:we have to change its (done) properties (value):or we can say its (toggle) properties (value):
      currentTask.completed = !currentTask.completed;
      // renderList();
      showNotification("Task toggled successfully");
      return;
    }
    showNotification("Could not toggle the task");
  }
  // deleteTask function:will delete the task:
  // IMP = this function also gets the (taskId) as argument in it:because we wanna know that which particular task be have to delete:
  function deleteTask(taskId) {
    // for deleting task. we gonna be create the newtask array.which does not have task with in it.that we wanna be deleted:
    // IMP = we gonna be do this with the help of (filter) method:this filter method basically gonna be filter out the older tasks-array by deleting the task from it acc to the taskId which we have provided to him:and it will gonna be return us the new task-array:
    // which basically does not have the task with in it.that we have just filter out and delete from the older tasks-array:
    // IMP = this filter method basically gets the (callback) function as an argument:
    const newTasks = tasks.filter(function (task) {
      return task.id !== Number(taskId);
    });

    // IMP = and after filerting out the (older-task):we gonna be pass that new tasks-array to it:In this way we gonna be delete the particular task from tasks-array:
    tasks = newTasks;
    renderList();
    showNotification("Task Deleted successfully");
  }
  // addTask function:through this function we gonna be add or append the new-task which has been created by the user in the array of (tasks):
  // IMP = that's why this function will get the (task) object as argument in it:
  function addTask(task) {
    if (task) {
      // V.IMP = here we putting our user's created task into the (server):we will use the different (api) here because the (api) we use to fetch the (tasks): it  does not have the factionality in it to store the user(created-task) into the (server):
      // fetch("", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(task),
      // })
      //   .then(function (response) {
      //     return response.json();
      //   })
      //   .then(function (data) {
      //     console.log(data);
      //     tasks.push(data);
      //     renderList();
      //     showNotification("Task added successfully");
      //   })
      //   .catch(function (error) {
      //     console.log("error", error);
      //   });

      // pushed the task into the tasks-array:
      tasks.push(task);
      // call the renderList function:which basically render all the tasks on the browser:
      renderList();
      showNotification("task added successfully");
      return;
    }
    showNotification("task can not be added");
  }

  // showNotification function:through which we gonna be show the multiple notifications to the (user):
  // IMP = we are going to show the (text) as notification to the (user):(text) is basically the input (value) for (task) which has been created by the (user):
  // On the behalf of notification we only gonna be show the (alert) message to the (user):which will basically have the (text) of the (user) as notification message:
  // IMP = that's why we are passing the (text) as argument to this (function):

  function showNotification(text) {
    alert(text);
  }

  // => 1 = here we create the (event-handler) function:with in which we will be get the (value) from input element as a (event):
  // so this function will get the (event) as (argument) with in it:
  function handleInputKeypress(e) {
    // here we check that:if user press the (Enter) key on keyboard:then it means that user is done with typing:
    // we check that through if our event have a (Enter) key in it:
    if (e.key === "Enter") {
      // if its (true):then we have to get typed value of user from the event:
      // IMP = for that we have to use the (target) function and (value) method of the (event) on the event it self:
      const text = e.target.value;
      console.log("text", text);
      if (!text) {
        // here we are using the function that we have created:through which we gonna be show the alert message to the user:
        showNotification("Task Text Can Not Be Empty");
        // after showing the notification:we have to return from this function:because we are done working with this function here:
        return;
      }

      // IMP = but if we have the text value:then we gonna be create the task with the help of it:
      // task is basically a object:
      const task = {
        // here we are using the key-value pair method:
        // text:text,
        // we can also define it in this way as well:because it is the some thing:
        title: text,
        // IMP = With In the (Id) key we gonna be provide the (current-date) to it:and that date gonna be become the (unique-id) for our each and particular task:
        // IMP = Date.now() is a static method that returns the number of milliseconds elapsed since a specific point in time.
        // we also have to convert it into the form of string:for doing that we gonna be use the (toString) method on it:
        // id: Date.now().toString(),
        id: Date.now(),

        // here we have (done) key:which basically repersents that  particular (task) is done or not:
        // by default it will have (false) value:because every newly created task gonna be undone by default:
        completed: false,
      };
      // once we have created the task with the help of user's text:
      // then after that we also have to clear out that text from the input element:
      // we ganna be clear it out:by providing the (empty) string to it:we gonna be provide the empty string to it through the (event):the way we get the value of input-element through (event):In the same way we gonna be provide or assign the empty-string value to it:
      e.target.value = "";

      // here after building the task:with the help of (user) input:
      // we gonna be pass that (task) to the (addTask) function:
      addTask(task);
    }
  }

  // here we have event-handler function:for our event-delegation's (event-listener):
  function handleClickListener(e) {
    const target = e.target;
    console.log(target);
    // how we gonna be find out the particular element through the click-event:
    // we gonna be find them out with the help of there class-names:the class names which we have to given to our each element:
    if (target.className === "delete") {
      // if we get the delete class:then we have to fetch its (taskId):so we can delete the particular task by passing its (taskId) to the (delete-task) function:
      // V.IMP = we have to use the (dataset) method:To access the (data-id) of particular element:if we are giving the (id) value to particular element through the (data-id) attribute:because of that every data value of our element.we can access through the  (dataset) method:
      // after that method we also have to define the (attribute):whose value be want to access:like we want the data-value of (id): then we can use the (id):if wanna use the (data-value) of the (event) then we have to use the (event):
      const taskId = target.dataset.id;
      console.log("delete-task-Id:", taskId);
      deleteTask(taskId);
      return;
    } else if (target.className === "custom-checkbox") {
      // same thing we have to here as well:only difference is that here we did not have to use the (dataset) method:because checkbox element does not have the taskId in its (data-id) attribute:
      const taskId = target.id;
      toggleTask(taskId);
      return;
    }
  }

  // => 2 = IMP = for getting the value of input-element:we gonna be add the (eventListener) on it:
  // we gonna be add the (keyDown) event-listener on it:
  // IMP = so that whenever (user) press any key on the keyboard with in the input-element:we will get the (value) of that particular key:
  // here we are adding the (event-listener) on (input) element:
  // IMP = for adding the event-listener on element:we gonna be use the (addEventListener) function of (DOM):
  // we also need to provide the event-handler function to event-listener:through which we gonna be handle this event-listener:
  // addTaskInput.addEventListener("keydown", handleInputKeypress);

  // here we are doing the (event-delegation):
  // document.addEventListener("click", handleClickListener);

  function initializeApp() {
    // here we are adding our (fetchTodos) function:with in our (initializeApp) function:so that whenever our initializeApp function gets trigger we are able to fetch the todos from (Api):through fetchTodos function:
    fetchTodos();

    // => 2 = IMP = for getting the value of input-element:we gonna be add the (eventListener) on it:
    // we gonna be add the (keyDown) event-listener on it:
    // IMP = so that whenever (user) press any key on the keyboard with in the input-element:we will get the (value) of that particular key:
    // here we are adding the (event-listener) on (input) element:
    // IMP = for adding the event-listener on element:we gonna be use the (addEventListener) function of (DOM):
    // we also need to provide the event-handler function to event-listener:through which we gonna be handle this event-listener:
    addTaskInput.addEventListener("keydown", handleInputKeypress);

    // here we are doing the (event-delegation):
    document.addEventListener("click", handleClickListener);
  }

//   initializeApp();
  // V.IMP = here from our (IIFE) module's function:we gonna be return the (object):and we also gonna be assign the variable to this object:
  // IMP = so for doing that we have to gave the variable-name to this (IIFE) module function:because we are returing the object from this function:and that's the way to provide  (variable-name) to (object):
  return {
    initialize:initializeApp,
    a :a
  };
})();

// here we can see that what we are doing in the revealing-module pattern:
// var TodoListApp = (function(){
//     return{

//     }
// })();
