/*

      //*selection with all packed elements
  select = document.createElement('select');
  select.setAttribute("id", "packed")
  select.onchange = changeFunc
  document.getElementById('textbox').appendChild(select);
  list_packed.forEach(function (item) {
    let op = document.createElement('option');
    op.setAttribute("value", item)
    select.appendChild(op);
    op.innerHTML += item;
  });
  
  
function changeFunc() {
  var selectBox = document.getElementById("packed");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  console.log(selectedValue);
 }
  */