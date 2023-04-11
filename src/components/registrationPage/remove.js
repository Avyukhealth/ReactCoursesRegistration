const link = "https://www.gsoogle.com/";
let res = null,
  error = null;

let prom = fetch(link).then(
  (a) => (res = a),
  (b) => (error = b)
);

prom.then((data) => {
  if (data === res) console.log("yes");
}, err =>{
    if(error ===err) console.log("double yes")
});
