let session = "work";
let wmin = 10;
let bmin = 5;
let lbmin = 10;
let count = 1;
let tcount = 3;

// 60: 10 min/w, 5 min/b, 10 w, 5 b, 10 w, 10 b
function format_time(min, sec) {
  return `${min > 9 ? min : "0" + min}:${sec > 9 ? sec : "0" + sec}`;
}
function set_time() {
  let time = document.getElementById("time");
  let min = parseInt(time.innerText.split(":")[0]);
  let sec = parseInt(time.innerText.split(":")[1]);

  if (parseInt(time.innerText.split(":")[1]) == 0) {
    sec = 59;
    min -= 1;
  } else {
    sec -= 1;
  }

  time.innerText = format_time(min, sec);
}

function remove_active(clas) {
  clas.classList.remove("active");
}

function set_active(el) {
  let work = document.getElementById("worktime");
  let pause = document.getElementById("breaktime");
  let longbreak = document.getElementById("longbreaktime");
  if (el == work) {
    work.classList.add("active");
    remove_active(pause);
    remove_active(longbreak);
  } else if (el == pause) {
    remove_active(work);
    pause.classList.add("active");
    remove_active(longbreak);
  } else if (el == longbreak) {
    remove_active(work);
    remove_active(pause);
    longbreak.classList.add("active");
  }
}

function set_config() {
  let wminutes = document.getElementById("wminutes").value;
  let bminutes = document.getElementById("bminutes").value;
  let lbminutes = document.getElementById("lbminutes").value;
  let sections = document.getElementById("sessions").value;

  let config = document.getElementById("configuration");
  let app = document.getElementById("app");

  console.log(wminutes);
  console.log(bminutes);
  console.log(lbminutes);
  console.log(sections);

  wmin = parseInt(wminutes);
  bmin = parseInt(bminutes);
  lbmin = parseInt(lbminutes);
  tcount = parseInt(sections);

  config.style.display = "none";
  app.style.display = "flex";

  document.getElementById("time").innerText = format_time(wmin);

  clearInterval(interval);
  interval = setInterval(init_interval, 1000);
}

function show_config() {
  let config = document.getElementById("configuration");
  config.style.display = "flex";
  let app = document.getElementById("app");
  app.style.display = "none";
}

function init_interval() {
  let time = document.getElementById("time");
  let work = document.getElementById("worktime");
  let pause = document.getElementById("breaktime");
  let longbreak = document.getElementById("longbreaktime");

  let min = parseInt(time.innerText.split(":")[0]);
  let sec = parseInt(time.innerText.split(":")[1]);
  if (min == 0 && sec == 0) {
    if (session == "work") session = count != tcount ? "break" : "long break";
    else if (session == "break") session = "work";
    else session = "work";
  }

  if (session == "work" && time.innerText == "00:00") {
    time.innerText = format_time(wmin, 0);
    set_active(work);
  } else if (session == "break" && time.innerText == "00:00") {
    time.innerText = format_time(bmin, 0);
    count += 1;
    set_active(pause);
  } else if (session == "long break" && time.innerText == "00:00") {
    time.innerText = format_time(lbmin, 0);
    count = 0;
    set_active(longbreak);
  }

  set_time();
}

var interval = setInterval(init_interval, 1000);
