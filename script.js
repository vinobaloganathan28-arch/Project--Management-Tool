// REGISTER
function register() {
  const user = {
    name: name.value,
    email: email.value,
    password: password.value
  };
  localStorage.setItem("user", JSON.stringify(user));
  alert("Registration successful");
  location.href = "index.html";
}

// LOGIN
function login() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (
    user &&
    loginEmail.value === user.email &&
    loginPassword.value === user.password
  ) {
    localStorage.setItem("loggedIn", "true");
    location.href = "dashboard.html";
  } else {
    alert("Invalid login");
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("loggedIn");
  location.href = "index.html";
}

// PROJECTS
function addProject() {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.push({
    name: projectName.value,
    tasks: []
  });
  localStorage.setItem("projects", JSON.stringify(projects));
  projectName.value = "";
  loadProjects();
}

function loadProjects() {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  const div = document.getElementById("projects");
  div.innerHTML = "";

  projects.forEach((p, i) => {
    div.innerHTML += `
      <p>
        ${p.name}
        <button onclick="openProject(${i})">Open</button>
      </p>
    `;
  });
}

function openProject(i) {
  localStorage.setItem("currentProject", i);
  location.href = "board.html";
}

// BOARD
function loadBoard() {
  let projects = JSON.parse(localStorage.getItem("projects"));
  let i = localStorage.getItem("currentProject");
  let project = projects[i];

  projectTitle.innerText = project.name;

  todo.innerHTML = "";
  progress.innerHTML = "";
  done.innerHTML = "";

  project.tasks.forEach((t) => {
    document.getElementById(t.status).innerHTML += `
      <div class="task">
        ${t.text}<br>
        <button onclick="moveTask('${t.text}')">Move</button>
      </div>
    `;
  });
}

function addTask() {
  let projects = JSON.parse(localStorage.getItem("projects"));
  let i = localStorage.getItem("currentProject");

  projects[i].tasks.push({
    text: taskText.value,
    status: "todo"
  });

  localStorage.setItem("projects", JSON.stringify(projects));
  taskText.value = "";
  loadBoard();
}

function moveTask(text) {
  let projects = JSON.parse(localStorage.getItem("projects"));
  let i = localStorage.getItem("currentProject");

  projects[i].tasks.forEach((t) => {
    if (t.text === text) {
      if (t.status === "todo") t.status = "progress";
      else if (t.status === "progress") t.status = "done";
    }
  });

  localStorage.setItem("projects", JSON.stringify(projects));
  loadBoard();
}
