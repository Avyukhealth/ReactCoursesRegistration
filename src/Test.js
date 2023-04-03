function isValExistInObject(obj, val) {
  let a = false;
  Array.from(Object.values(obj)).map((value) => {
    if (String(value).includes(val.toLowerCase())) a = true;
  });
  return a;
}

let obj = { a: "first value", b: 2 };


