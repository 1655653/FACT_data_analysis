var expandBar = function (d){
  d3.select(this).style("stroke","black")
  bar_locked = true 
  var div_w = d3.select("#exploit_div").style("width")
  var div_h = d3.select("#exploit_div").style("height")
  console.log(div_w)
  //d3.select("#exploit_div").transition().style("opacity","0").remove()
  var list = d3.select("#exploit_container").append("div")
  .attr("id","UIDs_list");
      list.transition()
      .style("height",div_h)
      .style("width",div_w)
      .style("background-color",d3.select(this).attr("fill"))
  d.UIDs.forEach(uid => {
      list.append("text").text(uid).style("font-size","10px")
      list.append("br")
  });
  console.log(d)
}















.on("click", function() {
  var clicked = this;   // Remember which bar received the click
  //console.log(clicked)
  var old_w= d3.select(this).style("width")
  var old_h= d3.select(this).style("height")
  var old_x= d3.select(this).attr("x")
  var old_y= d3.select(this).attr("y")
  var div_w = d3.select("#exploit_div").style("width")
  var div_h = d3.select("#exploit_div").style("height")
  d3.selectAll("svg")
  .remove("*")

  var new_el = d3.select("#exploit_div")
              .append("svg")
                  // .attr("x", 50)
                  // .attr("y", old_y)
                  // .attr("width", old_w)
                  // .attr("height", old_h)
                  .transition()
                  .delay(750)
                  .attr("width", div_w)
                  .attr("height", div_h)
                  .attr("x", old_x)
                  .attr("y", old_y)
                  .style("border-color","black")
                  .style("border-style","solid")
                  .style("margin","5px")
      //.append("rect")
          
})
//ONclick  

//!!!!!!!!!!!!!!!!                 616 Read the data and compute summary statistics for each specie
  // var dom = ['BusyBox 1.19.2 (CRITICAL)', 'Dnsmasq 2.52 (CRITICAL)', 'OpenSSL 1.0.0 (CRITICAL)', 'Point-to-Point Protocol daemon 2.4.5 (CRITICAL)', 'Samba 3.0.25 (CRITICAL)', 'iptables 1.4.12', 'nginx 1.2.2 (CRITICAL)']
//   var data = [
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "6.8",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "5.0",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "7.2",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "2.1",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "4.3",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "5.0",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "7.5",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "7.8",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "6.5",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "6.8",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "7.5",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "5.0",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "5.0",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "e8f1a0197fd0ceccc6533d606f7b30437d634fd4b35fa6f3c0877c29f6df3293_381360",
//     "score2": "5.0",
//     "cve": "BusyBox 1.19.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "5.0",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "5.0",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "6.4",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "5.0",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "5.0",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "7.5",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "7.5",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "7.5",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "4.3",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "5.0",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "7.8",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "5.0",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "5.0",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "4.3",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "8.3",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "8.3",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "7.1",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "4.3",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "4.3",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "4.3",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "7.1",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "0d78526c338d1f33b60f6893cc57a713a2cadbb1c8e4dd15f2c5b62a00780739_179656",
//     "score2": "4.3",
//     "cve": "Dnsmasq 2.52 (CRITICAL)"
//   },
//   {
//     "fo_name": "42d4184fc759b241e80a0ffdbbb5c759d95c7b4d6817f05a74bac70446b16bfd_1758109",
//     "score2": "5.0",
//     "cve": "OpenSSL 1.0.0 (CRITICAL)"
//   },
//   {
//     "fo_name": "42d4184fc759b241e80a0ffdbbb5c759d95c7b4d6817f05a74bac70446b16bfd_1758109",
//     "score2": "7.5",
//     "cve": "OpenSSL 1.0.0 (CRITICAL)"
//   },
//   {
//     "fo_name": "f5357098ab84fe12b51331bf6a3cb542547427aa4ec1a70b1897a532b469d2aa_268460",
//     "score2": "7.5",
//     "cve": "Point-to-Point Protocol daemon 2.4.5 (CRITICAL)"
//   },
//   {
//     "fo_name": "f5357098ab84fe12b51331bf6a3cb542547427aa4ec1a70b1897a532b469d2aa_268460",
//     "score2": "4.3",
//     "cve": "Point-to-Point Protocol daemon 2.4.5 (CRITICAL)"
//   },
//   {
//     "fo_name": "f5357098ab84fe12b51331bf6a3cb542547427aa4ec1a70b1897a532b469d2aa_268460",
//     "score2": "7.5",
//     "cve": "Point-to-Point Protocol daemon 2.4.5 (CRITICAL)"
//   },
//   {
//     "fo_name": "f5357098ab84fe12b51331bf6a3cb542547427aa4ec1a70b1897a532b469d2aa_268460",
//     "score2": "7.5",
//     "cve": "Point-to-Point Protocol daemon 2.4.5 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "7.2",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "10.0",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "6.0",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "6.9",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "9.3",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "9.3",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "9.3",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "5.8",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "4.0",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "1.9",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "2.1",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "5.0",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "5.0",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "7.5",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "7.5",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "5.0",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "3.3",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "6.8",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "2.6",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "1.2",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "10.0",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "3.6",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "5.1",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "5.1",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "5.0",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "8.3",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "4.0",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "5.0",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "4.3",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "5.0",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "4.0",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "4.3",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "4.3",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "4.3",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "4.3",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "6.8",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "5.8",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "5.8",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "4.8",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "6.8",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "6.5",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "4.3",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "4.3",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "4.0",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "5.5",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "2.6",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "7388866444b408a2de434e67b07686e4669444f86648bb131c0f03b5250d4d8a_1759692",
//     "score2": "9.3",
//     "cve": "Samba 3.0.25 (CRITICAL)"
//   },
//   {
//     "fo_name": "1c4bf39eb37689c68f938d4d7d545ab2deed933064f6a3f80881e538861fc780_396160",
//     "score2": "7.5",
//     "cve": "iptables 1.4.12"
//   },
//   {
//     "fo_name": "77c882774b1cb154e62bdf928701a0599f9f475cad5943e33b23db86f40b9107_4204",
//     "score2": "7.5",
//     "cve": "iptables 1.4.12"
//   },
//   {
//     "fo_name": "6219c695dcd89345ddce6ede1979b129c232913d2ca74e59937902554ff2edb5_531868",
//     "score2": "7.5",
//     "cve": "nginx 1.2.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "6219c695dcd89345ddce6ede1979b129c232913d2ca74e59937902554ff2edb5_531868",
//     "score2": "5.8",
//     "cve": "nginx 1.2.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "6219c695dcd89345ddce6ede1979b129c232913d2ca74e59937902554ff2edb5_531868",
//     "score2": "7.5",
//     "cve": "nginx 1.2.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "6219c695dcd89345ddce6ede1979b129c232913d2ca74e59937902554ff2edb5_531868",
//     "score2": "4.3",
//     "cve": "nginx 1.2.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "6219c695dcd89345ddce6ede1979b129c232913d2ca74e59937902554ff2edb5_531868",
//     "score2": "5.0",
//     "cve": "nginx 1.2.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "6219c695dcd89345ddce6ede1979b129c232913d2ca74e59937902554ff2edb5_531868",
//     "score2": "7.5",
//     "cve": "nginx 1.2.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "6219c695dcd89345ddce6ede1979b129c232913d2ca74e59937902554ff2edb5_531868",
//     "score2": "5.0",
//     "cve": "nginx 1.2.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "6219c695dcd89345ddce6ede1979b129c232913d2ca74e59937902554ff2edb5_531868",
//     "score2": "5.0",
//     "cve": "nginx 1.2.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "6219c695dcd89345ddce6ede1979b129c232913d2ca74e59937902554ff2edb5_531868",
//     "score2": "5.8",
//     "cve": "nginx 1.2.2 (CRITICAL)"
//   },
//   {
//     "fo_name": "6219c695dcd89345ddce6ede1979b129c232913d2ca74e59937902554ff2edb5_531868",
//     "score2": "4.3",
//     "cve": "nginx 1.2.2 (CRITICAL)"
//   }
// ]





//!---------------
        // select = document.createElement('select');
        // select.setAttribute("id", "packed_select")

        // select.onchange = selectedPackedFO //? lista dei FO packed

        // opt = document.createElement('option');
        // opt.innerHTML += "----"
        // select.appendChild(opt)
        // list_packed_hid.forEach(element => {
        //     var op = document.createElement('option')
        //     op.innerHTML += element
        //     select.appendChild(op)
        // });
        // document.getElementById("reportOf").append(select);










// if(d.data.hid == "bin") 
// var maxV = d.data.mime_types[Object.keys(d.data.mime_types)[0]];
// var maxM = Object.keys(d.data.mime_types)[0]
// for (const key in d.data.mime_types) {
//     if (Object.hasOwnProperty.call(d.data.mime_types, key)) {
//         if(d.data.hid == "bin") console.log(maxM + "" +maxV)
//         if(d.data.mime_types[key] > maxV) maxM = key
//     }
// }
// if(d.data.hid == "bin")
// console.log(d.data.hid+"folder: "+maxM +""+mycolor(maxM))
// return mycolor(maxM) }


//!------------
var heightbc = height/3
var marginbc = {top: 10, right: 30, bottom: 90, left: 40}
var svg_bc_pckd = d3.select("#reportOf")
.append("svg")
    .attr("width", width + marginbc.left + marginbc.right)
    .attr("height", heightbc + marginbc.top + marginbc.bottom)
.append("g")
    .attr("transform",
        "translate(" + marginbc.left + "," + marginbc.top + ")");
// X axis
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {
    
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.Country; }))
        .padding(0.2);
    svg_bc_pckd.append("g")
        .attr("transform", "translate(0," + heightbc + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 13000])
        .range([ heightbc, 0]);
    svg_bc_pckd.append("g")
        .call(d3.axisLeft(y));    
    // Bars
    svg_bc_pckd.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.Country); })
        .attr("width", x.bandwidth())
        .attr("fill", "#69b3a2")
        // no bar at the beginning thus:
        .attr("height", function(d) { return heightbc - y(0); }) // always equal to 0
        .attr("y", function(d) { return y(0); })
    // Animation
    svg_bc_pckd.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return y(d.Value); })
        .attr("height", function(d) { return heightbc - y(d.Value); })
        .delay(function(d,i){console.log(i) ; return(i*100)})
})

//!---------------











// async function BuildTree(included_files, fatherNode){ //input is list of included files of the father node
//   if( included_files.length > 0){
//       promises = [];
//       included_files.forEach(function(item) {
//           url = endpoint+"file_object/"+item+"?summary=true";
//           promises.push(axios.get(url));
//       });
//       const res_File_objects = await Promise.all(promises)
//       for(let response of res_File_objects){
//           if(! ListMimes.includes(response.data.file_object.analysis.file_type.mime)) ListMimes.push(response.data.file_object.analysis.file_type.mime)

//           var node = {}
//           node["uid"] = response.data.request.uid
//           //node["hid"] = response.data.file_object.meta_data.hid
          
//           // fatherNode.push(node)
//           //*path managemnt
//           response.data.file_object.meta_data.virtual_file_path.forEach(path => {
              
//               var hname= path.substring(path.indexOf("|")).split("|").filter(d => d != "").at(-1)
//               node["hid"] = hname
//               node["bytes"] = response.data.file_object.meta_data.size
//               node["mime"] = response.data.file_object.analysis.file_type.mime
//               node["contacome"]=1
//               node["leaves"]=0
//               node["children"] = []
//               path = path.substring(path.indexOf("/")).split("/").filter(d => d != "")
//               path.pop()
//               if(path.length>0)
//               managePath(fatherNode.children,path,node)
//               else{
//                   fatherNode.children.push(node)
//               }
//           });
//           // var path = response.data.file_object.meta_data.virtual_file_path[0]
          
//           await BuildTree(response.data.file_object.meta_data.included_files, node);
//       };
      
//   }
//   // if(node.uid == "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368"){
//   //     console.log(element["hid"])
//   // }
// }

// //! old one
// //* builds the tree calling all packed/unpacked FO
// async function BuildTree(included_files, fatherNode){ //input is list of included files of the father node
//   if( included_files.length > 0){
//       promises = [];
//       included_files.forEach(function(item) {
//           url = endpoint+"file_object/"+item+"?summary=true";
//           promises.push(axios.get(url));
//       });
//       const res_File_objects = await Promise.all(promises)
//       for(let response of res_File_objects){
//           if(! ListMimes.includes(response.data.file_object.analysis.file_type.mime)) ListMimes.push(response.data.file_object.analysis.file_type.mime)

//           var node = {}
//           node["uid"] = response.data.request.uid
//           node["hid"] = response.data.file_object.meta_data.hid
//           node["bytes"] = response.data.file_object.meta_data.size
//           node["mime"] = response.data.file_object.analysis.file_type.mime
//           node["contacome"]=1
//           node["leaves"]=0
//           node["children"] = []

//           // fatherNode.push(node)
//           //*path managemnt
//           var path = response.data.file_object.meta_data.virtual_file_path[0]
          
//           console.log(response.data.file_object.meta_data.virtual_file_path)}
//           path = path.substring(path.indexOf("/")).split("/").filter(d => d != "")
//           path.pop()
//           if(path.length>0)
//               managePath(fatherNode.children,path,node)
//           else{
//               fatherNode.children.push(node)
//           }
          
//           await BuildTree(response.data.file_object.meta_data.included_files, node);
//       };
      
//   }
// }






































// // function RemoveMimeFromTree(fatherNode,mime_filtered){
// //   if(fatherNode.children.length == 0){ //se è una foglia non posso farci nulla, la tolgo dal padre
// //       return
// //   }
// //   else{
// //       var listIndex=[]
// //       mime_filtered.forEach(currmime => {
// //           for (let i = 0; i < fatherNode.children.length; i++) {
// //               const child = fatherNode.children[i];
// //               if(child.children.length ==0 && child.mime == currmime) listIndex.push(i) //folgia
              
// //           }
// //       });
// //       console.log("prima "+fatherNode.hid)
// //       console.log(fatherNode.children)
// //       listIndex.forEach(element => {
// //           fatherNode.children.splice(element,1)
// //       });
// //       console.log("dopo "+fatherNode.hid)
// //       console.log(fatherNode.children)
// //       fatherNode.children.forEach(child => {
// //           RemoveMimeFromTree(child,mime_filtered)
// //       });
// //   }

// // }

// //!Populate the <text> elements with our data-driven titles.
// //     g.selectAll(".node")
// //     .append("text")
// //     .filter(filter_min_arc_size_text)
// //     .attr("transform", function(d) {
// //         return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; 
// //         }).attr("dx", "-20") // radius margin
// //             .attr("dy", ".5em") // rotation align
// //             .text(function(d) {  
// //                 if(d.parent != null){
// //                     return d.data.hid 
// //                 }
// //             });
// // function computeTextRotation(d) {
// //   var angle = (d.x0 + d.x1) / Math.PI * 90;
// //   // Avoid upside-down labels
// //   //return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
// //   return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
// // }
//                     // while(path.length > 0){
//                     //     if(! hasFolder(fatherNode,path[0])){ //non ha la folder, la creo
//                     //         var folder = {}
//                     //         folder["uid"] = "folder"
//                     //         folder["hid"] = path[0]
//                     //         folder["size"] = "po ce se penza"
//                     //         folder["children"] = []
//                     //         tempfather.push(folder)
//                     //         tempfather = folder["children"]
//                     //         appendFolder = true
//                     //         console.log("appending"+path[0])
//                     //         console.log("tempfather"+tempfather)
//                     //         path.shift()
//                     //     }
//                     //     else{
//                     //         tempfather.forEach(element => {
//                     //             if (element["uid"]=="folder" && element["hid"] == folderi){
//                     //                 element["children"].push(node)
//                     //             }
                                    
//                     //         });
//                     //     }
//                     // }
                    
//                     // if(!appendFolder){
//                     //     tempfather.push(node)
//                     // }

//                     // fatherNode.push(tempfather)







//                     // var boh = d3.scaleLinear().domain(d.data.mime_types).range(mimeoccurrences); // unit: pixels
        
//                     // if(d.data.uid =="folder" ) {
//                     //     var l_colors=[] //voglio tornare un colore che sia la somma proporzionale dei mime
//                     //     for (const key in d.data.mime_types) {
//                     //         if (Object.hasOwnProperty.call(d.data.mime_types, key)) {
//                     //             const element = d.data.mime_types[key];
//                     //             l_colors.push(myColor(key))
                                
//                     //         }
//                     //     }
//                     //     var eheh = [] //lista dei colori dei mime
//                     //     ListMimes.forEach(element => {
//                     //         eheh.push(myColor(element))
//                     //     });
            
//                     //     var fol_color =  d3.scaleLinear().domain(eheh).range(l_colors);
                        
                        
//                     // }
//                     // return myColor(d.data.mime)
//                     // // console.log(d)
//                     // // const delta = d - range.min;
//                     // // return `rgb(0, ${255 - delta * colorUnit}, ${delta * colorUnit})`;

//                     // console.log("colorcolor"+myColor("text/plain"))
//                     // var mimeoccurrences = []
//                     // for (const key in Tree["mime_types"]) {
//                     //     if (Object.hasOwnProperty.call(Tree["mime_types"], key)) {
//                     //         const element = Tree["mime_types"][key];
//                     //         mimeoccurrences.push(element)
                            
//                     //     }
//                     // }
//                     // const range = [d3.min(mimeoccurrences),d3.max(mimeoccurrences)]    
//                     // const colorUnit = 255 / (range.max - range.min);
                    











// /*

//       //*selection with all packed elements
//   select = document.createElement('select');
//   select.setAttribute("id", "packed")
//   select.onchange = changeFunc
//   document.getElementById('textbox').appendChild(select);
//   list_packed.forEach(function (item) {
//     let op = document.createElement('option');
//     op.setAttribute("value", item)
//     select.appendChild(op);
//     op.innerHTML += item;
//   });
  
  
// function changeFunc() {
//   var selectBox = document.getElementById("packed");
//   var selectedValue = selectBox.options[selectBox.selectedIndex].value;
//   console.log(selectedValue);
//  }
//   */

//  /* list_cpu_arch.forEach(function (i) {
//     list_cpu_arch[i]
//     document.getElementById("cpu_architecture").innerHTML = item

//   });  */



//   /*
// //* cpu_architecture
// function cpu_architecture(json_response){
//   var list_cpu_arch_uids = json_response.firmware.analysis.cpu_architecture.summary
//   var list_cpu_arch = Object.keys(list_cpu_arch_uids)

//   console.log(list_cpu_arch_uids)
//   document.getElementById("cpu_architecture_div").innerHTML = "CPU_ARCHITECTURE: " 

//   if(list_cpu_arch.length > 0){
//     for (let i = 0; i < list_cpu_arch.length; i++) {
//       document.getElementById("cpu_architecture_div").innerHTML += list_cpu_arch_uids[list_cpu_arch[i]].length + " devices with this architecture: " + list_cpu_arch[i] +"</br>"
//        //?creo e setto il select dei fo 
//        select = document.createElement('select');
//        select.setAttribute("id", "cpu_archi_select")
//        select.onchange = select_cpu_arch_FO //? <----------- CHIAMATA AL FO SELECTED
//        op = document.createElement('option');
//        op.innerHTML += "----"
//        select.appendChild(op)
//        document.getElementById('cpu_architecture_div').appendChild(select);
       
       
       
//        //? chiamo tutti i fo 
//        list_cpu_arch_uids[list_cpu_arch[i]].forEach(function (item) {
//          url = endpoint+"file_object/"+item+"?summary=true";
//          (async () => {
//            await makeGetRequest(url,analyze_cpu_arch_FO,item)   // uso funzioni anonime, asincrono devo lavorare sull analisi del singolo file object
//          })();
//        });
//     }
//   }
//   else{
//     document.getElementById("cpu_architecture_div").innerHTML += "No results with this plugin"
//   }
// }
// //* cpu_architecture --> aggiunge nome alla select
// function analyze_cpu_arch_FO(rj){
//   console.log(rj.file_object.meta_data.hid)
//   console.log(rj.request.uid)
//   console.log("--------")
//   list_response_cpu_archi.push(rj) //? ---> aggiorno lista globale
//   //list_packed_hid = rj.file_object.meta_data.hid

//   op = document.createElement('option');
//   document.getElementById("cpu_archi_select").appendChild(op)
//   op.innerHTML += rj.file_object.meta_data.hid;
// }

// //* cpu_architecture --> stampa path
// function select_cpu_arch_FO(){
//   var selectBox = document.getElementById("cpu_archi_select");
//   var FOhid = selectBox.options[selectBox.selectedIndex].value;
//   console.log(FOhid)
// }


//   */

// {
//   "uid": "de7ddf183b9b0cea6a96f1af3ab5a6bda5a171c1b13890ddc8aa84264f07ffc9_3662970",
//   "hid": "Tenda WH 450 v. 1.0.0.18",
//   "size": 16457061,
//   "mime": "filesystem/squashfs",
//   "leaves": 180,
//   "children": [
//     {
//       "uid": "folder",
//       "hid": "webroot",
//       "size": 322039,
//       "leaves": 55,
//       "children": [
//         {
//           "uid": "folder",
//           "hid": "js",
//           "size": 58348,
//           "leaves": 12,
//           "children": [
//             {
//               "uid": "16082f8db564c927c72fbc45894cba43e377dc907199013935c4e70402e8a576_2298",
//               "hid": "/webroot/js/log_setting.js",
//               "size": 2298,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "09b51c59ef663cf1f1631b21008a980a7440f58d9077caa6e59523e625136cb0_4234",
//               "hid": "/webroot/js/wl_wds.js",
//               "size": 4234,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "ff93ed3ef8b48b73857e32d11d9438dd67f257985f9f8660442b2887bc5cb396_6936",
//               "hid": "/webroot/js/status.js",
//               "size": 6936,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "5038126f2d374c8abc9dda334c77c7e90aa3e637c4e21a049159d9beec255ac4_2646",
//               "hid": "/webroot/js/log_addsetting.js",
//               "size": 2646,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "f1dc2614e51505eec8198473b224e772437b078d54df32e9588961fe7c31e84f_2888",
//               "hid": "/webroot/js/index.js",
//               "size": 2888,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "d0cc5a9f77dcca4ce194d81c3160594cdcd9007177494571b088f0f1cdde2208_1760",
//               "hid": "/webroot/js/timing_reboot.js",
//               "size": 1760,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "1f05a757fe0d598366ced408e174a64bc42fccdfc047b39da5163864f0a487a5_13020",
//               "hid": "/webroot/js/wl_sec.js",
//               "size": 13020,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "453ecb16645f573243881fd0d9ef95de184ffa481086f2c10288417b82cf77ea_8436",
//               "hid": "/webroot/js/system_tool.js",
//               "size": 8436,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "e57e02d0dc08bef7fc07aa1906cd5d6f2f5c728a70b597a5fb258c3e12904d1e_1366",
//               "hid": "/webroot/js/wireless.js",
//               "size": 1366,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "2b71a74d476c30ad404ce042b2c078ac31cfd96aba251bfe0e696ce03f5289bc_6358",
//               "hid": "/webroot/js/wl_filter.js",
//               "size": 6358,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "8e5ba3893f943510e9e6f648556e19fd6203471fb6a162f28d6e4f3394ff8b4a_4471",
//               "hid": "/webroot/js/lan.js",
//               "size": 4471,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "7a30196438d30395b6b5654530260034154d34d47d348a36ea35634b39355012_3935",
//               "hid": "/webroot/js/system_log.js",
//               "size": 3935,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             }
//           ],
//           "mime_types": {
//             "undefined": 0,
//             "text/plain": 12,
//             "application/x-executable": 0,
//             "application/x-sharedlib": 0,
//             "application/x-object": 0,
//             "image/gif": 0,
//             "inode/symlink": 0,
//             "image/png": 0,
//             "application/octet-stream": 0
//           }
//         },
//         {
//           "uid": "c57e96b7eb8e1332167263587862938a9f40bbb5b48f52c0a00a098429e7eac4_2331",
//           "hid": "/webroot/lan.asp",
//           "size": 2331,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "b984a6d6c0db928642ecab50d0b05d5db9876cc230a248ce045a220de2d50ec0_1379",
//           "hid": "/webroot/system_led.asp",
//           "size": 1379,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "626e2066b5a387dc6d6a8aa810046355866dd5963df10dda1e0423fd17324877_4320",
//           "hid": "/webroot/system_upgrade.asp",
//           "size": 4320,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "789514fee44f7c8332dd626f80527cad51848f3223be6ba5771438a044798c57_2155",
//           "hid": "/webroot/system_password.asp",
//           "size": 2155,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "9621e2a6109ec24ccb40a99ba34962f41910f29c2343a8c1468ba37988de07e7_786",
//           "hid": "/webroot/error.asp",
//           "size": 786,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "folder",
//           "hid": "public",
//           "size": 126457,
//           "leaves": 5,
//           "children": [
//             {
//               "uid": "737b5734974eea5b1ff490de2389aeeb0d11386276a956ffb9944ba5a480d276_93870",
//               "hid": "/webroot/public/j.js",
//               "size": 93870,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "a951962865a60c966945841ce96a59e3a17489d6f7df1f42b6dfc35bf38ec8d7_2449",
//               "hid": "/webroot/public/index.css",
//               "size": 2449,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "abea7229da7d0082ff21979353743c4f9d2dee37c6cdbd256413c2b3c96e2599_10520",
//               "hid": "/webroot/public/style.css",
//               "size": 10520,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "e37e99ddfc73ac7ba774e23736b2ef429d9a0cb8c906453c75b14c029bdd5493_2893",
//               "hid": "/webroot/public/csshover3.htc",
//               "size": 2893,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "21d6edf6b3dbae95635c65d22f2b3035199294c6f8953bd83e01295056b1ea62_16725",
//               "hid": "/webroot/public/gozila.js",
//               "size": 16725,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             }
//           ],
//           "mime_types": {
//             "undefined": 0,
//             "text/plain": 5,
//             "application/x-executable": 0,
//             "application/x-sharedlib": 0,
//             "application/x-object": 0,
//             "image/gif": 0,
//             "inode/symlink": 0,
//             "image/png": 0,
//             "application/octet-stream": 0
//           }
//         },
//         {
//           "uid": "7eb54753b2204ae4b6c87053a3148fd04aa480ee4f3ecbad803d5893e7e4f537_1831",
//           "hid": "/webroot/log_addsetting.asp",
//           "size": 1831,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "97884003e24b52410ce3e5f552b510507d5c36004fb1ccf725d73b3523226b27_4121",
//           "hid": "/webroot/wireless_wds.asp",
//           "size": 4121,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "47d58059bc30cc256925649ed1fc6a2b229eca51e60930d0b498f0f8137cd195_2888",
//           "hid": "/webroot/login.asp",
//           "size": 2888,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "0ab1542c63edc30607e29b97752a4980d119bbe7b5c6f28dbdc03658408ba440_1101",
//           "hid": "/webroot/status_ap.asp",
//           "size": 1101,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "46a3f5cb3bd4e01324c2401ddcc83fc7933e75f34915e00a6e495b875b080e13_5676",
//           "hid": "/webroot/system_hostname.asp",
//           "size": 5676,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "d0f50f07fb6bd07a23e7b47a50213a94f2af5b9480ec4f5ca4e002d74457d600_2102",
//           "hid": "/webroot/system_log.asp",
//           "size": 2102,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "1947a922caed768b89f9d5d57427bdfb564df090bcc6bcf77283b79f8cf106d2_1930",
//           "hid": "/webroot/log_setting.asp",
//           "size": 1930,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "b7bc39ac4584c5b7f7c5a3e4a06e6464bda1d602ef7585c9915cf74dde8146a0_4739",
//           "hid": "/webroot/snmp.asp",
//           "size": 4739,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "folder",
//           "hid": "images",
//           "size": 25696,
//           "leaves": 8,
//           "children": [
//             {
//               "uid": "763246afa8d88e00bd43f188da8716ecf61f0f7579c3cce19d3d07e4e026dcd0_2590",
//               "hid": "/webroot/images/wifi_signal.gif",
//               "size": 2590,
//               "mime": "image/gif",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "7aeb695315a9bb62889914f189c4323b41fbd0fe463b96c3934d8d19c11e0047_3420",
//               "hid": "/webroot/images/warning.gif",
//               "size": 3420,
//               "mime": "image/png",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "94187ac7b15fc10eb9800a08f4581a2806bc4a93f580efe8a1e0d31058ed8331_324",
//               "hid": "/webroot/images/repeat_y.gif",
//               "size": 324,
//               "mime": "image/gif",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "1d1b219d30fb6e882ffcc8a738a332a5b62c1bfeaee20da06f097700ab937539_9708",
//               "hid": "/webroot/images/sprite_tenda.gif",
//               "size": 9708,
//               "mime": "image/gif",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "6943ab91e148a346d6c22ea96cd83a7b901e3a899f638800bb3d49219632bd5a_946",
//               "hid": "/webroot/images/animated_loading.gif",
//               "size": 946,
//               "mime": "image/gif",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "c90c5a98e9d41454f234819475583c7f392bc5018817090e5bd2bb02902c69a5_875",
//               "hid": "/webroot/images/repeat-x.gif",
//               "size": 875,
//               "mime": "image/gif",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "6498c70394f8d772dce3779ae8abaaf3fb55f5c76cb8b614e077e4fa7f872938_4897",
//               "hid": "/webroot/images/login_logo.gif",
//               "size": 4897,
//               "mime": "image/png",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "1e0fce27bdc23e12a6b6124515b68a071fce8c90cb2b6e03c4e8f53da3fd9eae_2936",
//               "hid": "/webroot/images/load_bg.gif",
//               "size": 2936,
//               "mime": "image/png",
//               "leaves": 0,
//               "children": []
//             }
//           ],
//           "mime_types": {
//             "undefined": 0,
//             "text/plain": 0,
//             "application/x-executable": 0,
//             "application/x-sharedlib": 0,
//             "application/x-object": 0,
//             "image/gif": 5,
//             "inode/symlink": 0,
//             "image/png": 3,
//             "application/octet-stream": 0
//           }
//         },
//         {
//           "uid": "582714796b34df944f3552243cf5b97c59b699ba6d18bbdb664298b24791a061_8844",
//           "hid": "/webroot/do_help.htm",
//           "size": 8844,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "4e13f5fd2ec045ac19d923cb8609198663bfb3bce82d4fee13cf097f5600a926_357",
//           "hid": "/webroot/password_error.asp",
//           "size": 357,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "8a9e61826fa50985cb7786ff185af8a76f9a502a3dd9bb29de813486ffed6604_5648",
//           "hid": "/webroot/wireless_security.asp",
//           "size": 5648,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "8362ebc3ee3815626d2d5d91dbb97355c7168598800ce03a30d1a0c18a23151e_21428",
//           "hid": "/webroot/wireless_wisp.asp",
//           "size": 21428,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "afedfe459a5418380a5b4465223a7667d38a105452bcb051250744d291744b32_2504",
//           "hid": "/webroot/system_reboot.asp",
//           "size": 2504,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "b7b585d97aed7949806e4cf44ca7fe5e353e26a3453c5723105963073c911f6f_12009",
//           "hid": "/webroot/wireless_basic.asp",
//           "size": 12009,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "fb6a9f0225b57eaf9023b6ffee00fc8ef3c33212f73dd26b53220edaead07314_522",
//           "hid": "/webroot/upgrading.asp",
//           "size": 522,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "40da682534ce1e29143efeadfff22a1dc5d33f30883a609f45985e9da49cd1ab_1302",
//           "hid": "/webroot/wireless_restart.asp",
//           "size": 1302,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "69128ddd0f02061295725103689782379061cd5f228660baa9b9e657c41208a3_3360",
//           "hid": "/webroot/index.asp",
//           "size": 3360,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "03cb137c8f75c2cadcc448cce68d2566fb2adeb79a849548c31bbb8bc0811538_1834",
//           "hid": "/webroot/status_wireless.asp",
//           "size": 1834,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "230a493c91ce7c6040bb8abfb986902837d31c99448682d1d20e2b759486740d_1936",
//           "hid": "/webroot/status_system.asp",
//           "size": 1936,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "696242b626ba899cade3e401167e0e26c94fd0835372fd2019d7181246a4930c_2097",
//           "hid": "/webroot/system_backup.asp",
//           "size": 2097,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "996b3008e88393c6e781ed03afccaeb113b5d7cc77ac920ebd4844bd7ef66439_3799",
//           "hid": "/webroot/wireless_filter.asp",
//           "size": 3799,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "e634e28126b6b0f5e26989f9774668c56a9f8015f4bd337817afaf3f1fcea2a2_3757",
//           "hid": "/webroot/checktools.asp",
//           "size": 3757,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "031aee5a6c7901bf681f8d62546d3352ba13dc5e61ab9fea17a81891b82d2641_3423",
//           "hid": "/webroot/wireless_advance.asp",
//           "size": 3423,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "aa89896b1b35ceaa58fb1fa2484e12795ee023eda4eb6f1d6375eddcef359854_1601",
//           "hid": "/webroot/status_wirelesslist.asp",
//           "size": 1601,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "78a59fbe6790734b31d254ad69516b9f350a0c7ae2f713ad7cfae0ba78b975d7_1758",
//           "hid": "/webroot/system_restore.asp",
//           "size": 1758,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         }
//       ],
//       "mime_types": {
//         "undefined": 0,
//         "text/plain": 47,
//         "application/x-executable": 0,
//         "application/x-sharedlib": 0,
//         "application/x-object": 0,
//         "image/gif": 5,
//         "inode/symlink": 0,
//         "image/png": 3,
//         "application/octet-stream": 0
//       }
//     },
//     {
//       "uid": "folder",
//       "hid": "bin",
//       "size": 4882933,
//       "leaves": 41,
//       "children": [
//         {
//           "uid": "5f84a06bb687800dc6fb7ba10986baafd555c9f12cdd8acba32c491a7a23e4cc_54413",
//           "hid": "/bin/wlconf",
//           "size": 54413,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "c4dfc7e3bbbaa4badfe077817e93a9f70d476721bb5270d9cb8a48b5636ed284_10632",
//           "hid": "/bin/et",
//           "size": 10632,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "6a200e1356505acff9bb51dd5ee739a872eaf06f03817f9f38e62fb561e55ec9_10328",
//           "hid": "/bin/logserver",
//           "size": 10328,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "9c4171ba903e23d4e2df045a70f2f36c63d96767e60a7a439bb025d16b7ad66c_76888",
//           "hid": "/bin/nas",
//           "size": 76888,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "a0b0ccb7a60ace9109ab5d56f32560c30917444debcc55a64bdb21f575690ff6_18124",
//           "hid": "/bin/arptool",
//           "size": 18124,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "9dc36e98b3c01d6831abbff10d7c25203a528849d217bb58cdfd39c5856d3e4b_532",
//           "hid": "/bin/iprule.sh",
//           "size": 532,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "17db7eaedef513c7cee811c22a400b37d0ae485db5752e5149162634dee9329e_62252",
//           "hid": "/bin/dhcpcd",
//           "size": 62252,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "7f37a8bd2238d6f035b9e7ba8a31ad70408e100d3dc5f7748f70c5627b89725d_5380",
//           "hid": "/bin/gpiod",
//           "size": 5380,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "b5bc1bc4abfccb4e8f9d0626fc770bc87bc84fb14a0b79ee421066450e5f7a2d_7964",
//           "hid": "/bin/tqu",
//           "size": 7964,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "72df5ce288e9d8ef135a4d7e3f4cbe8778e13d0990a08998eae048c7c192bc9d_24632",
//           "hid": "/bin/cfmd",
//           "size": 24632,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "82a06244cfe546a784ef8026c89a34bd131149b4973d28b9a80b3f41f80cbe4e_5376",
//           "hid": "/bin/tenda_wifid",
//           "size": 5376,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "719e6eb22811372a7f842da041630fced2df38c43b0fda7a7976f9dcbd898f89_14500",
//           "hid": "/bin/88ip",
//           "size": 14500,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "8e42d5d3def2f34038d05f00664936c8ac0d99bbfb94cfd89cb7e80e75b87d66_134644",
//           "hid": "/bin/busybox",
//           "size": 134644,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "201ac67dd9abe5826f687f02526d3ae616d28a8b4a1bca0c451be66b93b539ea_2034604",
//           "hid": "/bin/WTP",
//           "size": 2034604,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "20b66910ba1393d316d56e60fd290d193e623be8675dd4590a3d20f541a4afdb_100",
//           "hid": "/bin/settings.wtp.txt",
//           "size": 100,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "b27cfc374ff11548b9eeafa894d9d34d931e985f6803777482b65fbf9279941f_371960",
//           "hid": "/bin/ip",
//           "size": 371960,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "916c3e3aeaee39dae8ad26c4b4171e0b419d25096df6a45c88da411034c4699a_43847",
//           "hid": "/bin/eapd",
//           "size": 43847,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368",
//           "hid": "/bin/sleep",
//           "size": 301368,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "963d0f9d098d20972bc9168d4ba7f56aa6e038c7ddc58d5c02413cbad45a6622_100876",
//           "hid": "/bin/apmsg",
//           "size": 100876,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "6db305bb9f8c29a83d361ac4ede29a8ae3f26eb1a2ee66830ca7f0fd9d3effaf_15080",
//           "hid": "/bin/ddostool",
//           "size": 15080,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "7158fa9524eacc55f05f51e9ff3bce87ff3760005e9137eceb13fc6691d667f0_120744",
//           "hid": "/bin/miniupnpd",
//           "size": 120744,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "fd4168462e300a813e54a0cc049221a40e4efedd961312c587fc9cdcc9adfbcd_66708",
//           "hid": "/bin/dnrd",
//           "size": 66708,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "cc8449e7fc28e2e7d731dd49d8075585bea589fbc6f26ee8c3153e55ff778268_10320",
//           "hid": "/bin/autoimage",
//           "size": 10320,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "c0ecf99ee3583174b8522fc8f08ae546a211594c76a41960c716027b55a4bf00_9824",
//           "hid": "/bin/envram",
//           "size": 9824,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "193fb075f19627016c70fc9a7f27d637b9355cb57b3234d7ccdcc005c7a6372d_1482",
//           "hid": "/bin/config.wtp",
//           "size": 1482,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "fca9c3f3107ff57172f62ca5d9da2aec7da46fe44edd5941d9e39897b0f61132_22",
//           "hid": "/bin/dhcps-guest",
//           "size": 22,
//           "mime": "inode/symlink",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "d41c0f1431b39b9db565b4e32a5437c61c77762a3f4401bac3bafa4887164117_24",
//           "hid": "/bin/sleep",
//           "size": 24,
//           "mime": "inode/symlink",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "25ae0e518f272f5209c72ddee7f7a9d247ec67e27de47041783bc5d6d3dd408b_44605",
//           "hid": "/bin/snmpd",
//           "size": 44605,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "8fff57b24c300d1ee36acc8e629242fe3192ac0e88d88c920cb401a7787fd82e_6568",
//           "hid": "/bin/equ",
//           "size": 6568,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "2822ce44c213b666209321b45a2ce29c37f54bf8d68878631d14e2af7df5cb07_10303",
//           "hid": "/bin/arpbrocast",
//           "size": 10303,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "3a3d4a51adb25cb3949effc448ef518b5eec68f1a9c28701d77cf8f29315cc68_88896",
//           "hid": "/bin/netctrl",
//           "size": 88896,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "3fdcf60ca9996523a1cc3169ffeb26b51d536bf79a9b6702c17a583cdb10dcf1_164828",
//           "hid": "/bin/dhcps",
//           "size": 164828,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "7ac44c60cc506f9bdacd10b33e4582d539031421bd114698247ba48e24eb3f91_32360",
//           "hid": "/bin/3322ip",
//           "size": 32360,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "5029544c91aa5428e4e6365fcd57119d41e5528dbd568bb308784cbc35d2a8e3_77152",
//           "hid": "/bin/acsd",
//           "size": 77152,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "b98df7f245d671a5b9c582fb1e0d7d66f604199fedadabb21358448e1ce7079b_40656",
//           "hid": "/bin/apmng_svr",
//           "size": 40656,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "8bd36cb708309c66b50baddd75bd21dbf41d966251667cd9726579565c5e01c2_11044",
//           "hid": "/bin/cfm",
//           "size": 11044,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "afc4784960b29e110e2dd1598b8eabf8dec83ab86f2e4acb6d7398b96c698837_6180",
//           "hid": "/bin/app_check",
//           "size": 6180,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "9077a4106c747044fdb9d142df886aec75e360464e260e9e22412fa141e8e70b_6725",
//           "hid": "/bin/ebtables",
//           "size": 6725,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "e46798f77d8066bff29bd054be5b04bc5e97324706fefae85df67847e6ea21f6_8096",
//           "hid": "/bin/sntp",
//           "size": 8096,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "12cdf9cad3fdd9be9a7b1a901b76fcb237616a377f537ce9ca654cd0834efcc0_457832",
//           "hid": "/bin/tc",
//           "size": 457832,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "d520811eb92d8119ce2e28b3e17cea1d5211418560549a213db8f74fa786c659_425064",
//           "hid": "/bin/httpd",
//           "size": 425064,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         }
//       ],
//       "mime_types": {
//         "undefined": 0,
//         "text/plain": 3,
//         "application/x-executable": 36,
//         "application/x-sharedlib": 0,
//         "application/x-object": 0,
//         "image/gif": 0,
//         "inode/symlink": 2,
//         "image/png": 0,
//         "application/octet-stream": 0
//       }
//     },
//     {
//       "uid": "folder",
//       "hid": "lib",
//       "size": 5839262,
//       "leaves": 31,
//       "children": [
//         {
//           "uid": "344e6569a8ea680fd7922e2b40994c0b30367a58299bcc09089b650440e5723a_22800",
//           "hid": "/lib/ld-uClibc.so.0",
//           "size": 22800,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "folder",
//           "hid": "modules",
//           "size": 3953356,
//           "leaves": 13,
//           "children": [
//             {
//               "uid": "folder",
//               "hid": "2.6.22",
//               "size": 3907020,
//               "leaves": 11,
//               "children": [
//                 {
//                   "uid": "folder",
//                   "hid": "kernel",
//                   "size": 3907020,
//                   "leaves": 11,
//                   "children": [
//                     {
//                       "uid": "folder",
//                       "hid": "drivers",
//                       "size": 3863704,
//                       "leaves": 8,
//                       "children": [
//                         {
//                           "uid": "folder",
//                           "hid": "connector",
//                           "size": 14752,
//                           "leaves": 1,
//                           "children": [
//                             {
//                               "uid": "24b0fd1b8fa0564da2f418efe39046706a461f0307b32de14c89a6292e3238c7_14752",
//                               "hid": "/lib/modules/2.6.22/kernel/drivers/connector/cn.ko",
//                               "size": 14752,
//                               "mime": "application/x-object",
//                               "leaves": 0,
//                               "children": []
//                             }
//                           ],
//                           "mime_types": {
//                             "undefined": 0,
//                             "text/plain": 0,
//                             "application/x-executable": 0,
//                             "application/x-sharedlib": 0,
//                             "application/x-object": 1,
//                             "image/gif": 0,
//                             "inode/symlink": 0,
//                             "image/png": 0,
//                             "application/octet-stream": 0
//                           }
//                         },
//                         {
//                           "uid": "folder",
//                           "hid": "net",
//                           "size": 3846748,
//                           "leaves": 6,
//                           "children": [
//                             {
//                               "uid": "folder",
//                               "hid": "et",
//                               "size": 80652,
//                               "leaves": 1,
//                               "children": [
//                                 {
//                                   "uid": "1a0ebdb63435a89cd12dafe0b6c4533609f3d76f791d920763eaca55fb9cf4b7_80652",
//                                   "hid": "/lib/modules/2.6.22/kernel/drivers/net/et/et.ko",
//                                   "size": 80652,
//                                   "mime": "application/x-object",
//                                   "leaves": 0,
//                                   "children": []
//                                 }
//                               ],
//                               "mime_types": {
//                                 "undefined": 0,
//                                 "text/plain": 0,
//                                 "application/x-executable": 0,
//                                 "application/x-sharedlib": 0,
//                                 "application/x-object": 1,
//                                 "image/gif": 0,
//                                 "inode/symlink": 0,
//                                 "image/png": 0,
//                                 "application/octet-stream": 0
//                               }
//                             },
//                             {
//                               "uid": "folder",
//                               "hid": "bcm57xx",
//                               "size": 241152,
//                               "leaves": 1,
//                               "children": [
//                                 {
//                                   "uid": "4efcbee7f6bffd1ede29753147e89d1f91416feda7f97dad413ad4a75ce0a55d_241152",
//                                   "hid": "/lib/modules/2.6.22/kernel/drivers/net/bcm57xx/bcm57xx.ko",
//                                   "size": 241152,
//                                   "mime": "application/x-object",
//                                   "leaves": 0,
//                                   "children": []
//                                 }
//                               ],
//                               "mime_types": {
//                                 "undefined": 0,
//                                 "text/plain": 0,
//                                 "application/x-executable": 0,
//                                 "application/x-sharedlib": 0,
//                                 "application/x-object": 1,
//                                 "image/gif": 0,
//                                 "inode/symlink": 0,
//                                 "image/png": 0,
//                                 "application/octet-stream": 0
//                               }
//                             },
//                             {
//                               "uid": "folder",
//                               "hid": "igs",
//                               "size": 29668,
//                               "leaves": 1,
//                               "children": [
//                                 {
//                                   "uid": "0f1915c94474164c5e2fcd36d5543db2463b6514d9e15539ec5fac268902a67c_29668",
//                                   "hid": "/lib/modules/2.6.22/kernel/drivers/net/igs/igs.ko",
//                                   "size": 29668,
//                                   "mime": "application/x-object",
//                                   "leaves": 0,
//                                   "children": []
//                                 }
//                               ],
//                               "mime_types": {
//                                 "undefined": 0,
//                                 "text/plain": 0,
//                                 "application/x-executable": 0,
//                                 "application/x-sharedlib": 0,
//                                 "application/x-object": 1,
//                                 "image/gif": 0,
//                                 "inode/symlink": 0,
//                                 "image/png": 0,
//                                 "application/octet-stream": 0
//                               }
//                             },
//                             {
//                               "uid": "folder",
//                               "hid": "emf",
//                               "size": 36812,
//                               "leaves": 1,
//                               "children": [
//                                 {
//                                   "uid": "77a5139475f8c8d08510227e02697663bf6d1b29b1d183a82d8a15834ac3a348_36812",
//                                   "hid": "/lib/modules/2.6.22/kernel/drivers/net/emf/emf.ko",
//                                   "size": 36812,
//                                   "mime": "application/x-object",
//                                   "leaves": 0,
//                                   "children": []
//                                 }
//                               ],
//                               "mime_types": {
//                                 "undefined": 0,
//                                 "text/plain": 0,
//                                 "application/x-executable": 0,
//                                 "application/x-sharedlib": 0,
//                                 "application/x-object": 1,
//                                 "image/gif": 0,
//                                 "inode/symlink": 0,
//                                 "image/png": 0,
//                                 "application/octet-stream": 0
//                               }
//                             },
//                             {
//                               "uid": "folder",
//                               "hid": "ctf",
//                               "size": 21280,
//                               "leaves": 1,
//                               "children": [
//                                 {
//                                   "uid": "785d7d2d039125451aa9916c35fa9fe4ab1d0af6480cd7e7a3eb418b818b31f9_21280",
//                                   "hid": "/lib/modules/2.6.22/kernel/drivers/net/ctf/ctf.ko",
//                                   "size": 21280,
//                                   "mime": "application/x-object",
//                                   "leaves": 0,
//                                   "children": []
//                                 }
//                               ],
//                               "mime_types": {
//                                 "undefined": 0,
//                                 "text/plain": 0,
//                                 "application/x-executable": 0,
//                                 "application/x-sharedlib": 0,
//                                 "application/x-object": 1,
//                                 "image/gif": 0,
//                                 "inode/symlink": 0,
//                                 "image/png": 0,
//                                 "application/octet-stream": 0
//                               }
//                             },
//                             {
//                               "uid": "folder",
//                               "hid": "wl",
//                               "size": 3437184,
//                               "leaves": 1,
//                               "children": [
//                                 {
//                                   "uid": "3c125a83e41926e1c9fb6cfa255bc8cb50eb35446bb9905b44e93a70f26f9718_3437184",
//                                   "hid": "/lib/modules/2.6.22/kernel/drivers/net/wl/wl.ko",
//                                   "size": 3437184,
//                                   "mime": "application/x-object",
//                                   "leaves": 0,
//                                   "children": []
//                                 }
//                               ],
//                               "mime_types": {
//                                 "undefined": 0,
//                                 "text/plain": 0,
//                                 "application/x-executable": 0,
//                                 "application/x-sharedlib": 0,
//                                 "application/x-object": 1,
//                                 "image/gif": 0,
//                                 "inode/symlink": 0,
//                                 "image/png": 0,
//                                 "application/octet-stream": 0
//                               }
//                             }
//                           ],
//                           "mime_types": {
//                             "undefined": 0,
//                             "text/plain": 0,
//                             "application/x-executable": 0,
//                             "application/x-sharedlib": 0,
//                             "application/x-object": 6,
//                             "image/gif": 0,
//                             "inode/symlink": 0,
//                             "image/png": 0,
//                             "application/octet-stream": 0
//                           }
//                         },
//                         {
//                           "uid": "folder",
//                           "hid": "scsi",
//                           "size": 2204,
//                           "leaves": 1,
//                           "children": [
//                             {
//                               "uid": "4feb440b275ec1b2ee0994c043b183f1574b91957175b0792ec6640e8fb8dd43_2204",
//                               "hid": "/lib/modules/2.6.22/kernel/drivers/scsi/scsi_wait_scan.ko",
//                               "size": 2204,
//                               "mime": "application/x-object",
//                               "leaves": 0,
//                               "children": []
//                             }
//                           ],
//                           "mime_types": {
//                             "undefined": 0,
//                             "text/plain": 0,
//                             "application/x-executable": 0,
//                             "application/x-sharedlib": 0,
//                             "application/x-object": 1,
//                             "image/gif": 0,
//                             "inode/symlink": 0,
//                             "image/png": 0,
//                             "application/octet-stream": 0
//                           }
//                         }
//                       ],
//                       "mime_types": {
//                         "undefined": 0,
//                         "text/plain": 0,
//                         "application/x-executable": 0,
//                         "application/x-sharedlib": 0,
//                         "application/x-object": 8,
//                         "image/gif": 0,
//                         "inode/symlink": 0,
//                         "image/png": 0,
//                         "application/octet-stream": 0
//                       }
//                     },
//                     {
//                       "uid": "folder",
//                       "hid": "net",
//                       "size": 39724,
//                       "leaves": 2,
//                       "children": [
//                         {
//                           "uid": "folder",
//                           "hid": "sched",
//                           "size": 39724,
//                           "leaves": 2,
//                           "children": [
//                             {
//                               "uid": "a8ce9d6b6609eeb1844ddda788603e140b9431384f25cc7c808a3d7b406e91c2_10608",
//                               "hid": "/lib/modules/2.6.22/kernel/net/sched/sch_tbf.ko",
//                               "size": 10608,
//                               "mime": "application/x-object",
//                               "leaves": 0,
//                               "children": []
//                             },
//                             {
//                               "uid": "a6d6cc23d7c298e8ad2961e79504b2f81588a15d09e25585f625a95fe2613616_29116",
//                               "hid": "/lib/modules/2.6.22/kernel/net/sched/sch_hfsc.ko",
//                               "size": 29116,
//                               "mime": "application/x-object",
//                               "leaves": 0,
//                               "children": []
//                             }
//                           ],
//                           "mime_types": {
//                             "undefined": 0,
//                             "text/plain": 0,
//                             "application/x-executable": 0,
//                             "application/x-sharedlib": 0,
//                             "application/x-object": 2,
//                             "image/gif": 0,
//                             "inode/symlink": 0,
//                             "image/png": 0,
//                             "application/octet-stream": 0
//                           }
//                         }
//                       ],
//                       "mime_types": {
//                         "undefined": 0,
//                         "text/plain": 0,
//                         "application/x-executable": 0,
//                         "application/x-sharedlib": 0,
//                         "application/x-object": 2,
//                         "image/gif": 0,
//                         "inode/symlink": 0,
//                         "image/png": 0,
//                         "application/octet-stream": 0
//                       }
//                     },
//                     {
//                       "uid": "folder",
//                       "hid": "lib",
//                       "size": 3592,
//                       "leaves": 1,
//                       "children": [
//                         {
//                           "uid": "635c0c965703078cb6ec69fd4f8fb0f116f482840de1b8c40ec835da4fe3c81f_3592",
//                           "hid": "/lib/modules/2.6.22/kernel/lib/libcrc32c.ko",
//                           "size": 3592,
//                           "mime": "application/x-object",
//                           "leaves": 0,
//                           "children": []
//                         }
//                       ],
//                       "mime_types": {
//                         "undefined": 0,
//                         "text/plain": 0,
//                         "application/x-executable": 0,
//                         "application/x-sharedlib": 0,
//                         "application/x-object": 1,
//                         "image/gif": 0,
//                         "inode/symlink": 0,
//                         "image/png": 0,
//                         "application/octet-stream": 0
//                       }
//                     }
//                   ],
//                   "mime_types": {
//                     "undefined": 0,
//                     "text/plain": 0,
//                     "application/x-executable": 0,
//                     "application/x-sharedlib": 0,
//                     "application/x-object": 11,
//                     "image/gif": 0,
//                     "inode/symlink": 0,
//                     "image/png": 0,
//                     "application/octet-stream": 0
//                   }
//                 }
//               ],
//               "mime_types": {
//                 "undefined": 0,
//                 "text/plain": 0,
//                 "application/x-executable": 0,
//                 "application/x-sharedlib": 0,
//                 "application/x-object": 11,
//                 "image/gif": 0,
//                 "inode/symlink": 0,
//                 "image/png": 0,
//                 "application/octet-stream": 0
//               }
//             },
//             {
//               "uid": "d55b4172a46af3162451a7214b108af50848b924136d3a7e2c78acb052b3000f_25452",
//               "hid": "/lib/modules/ebt_ethqos.ko",
//               "size": 25452,
//               "mime": "application/x-object",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "8097b2668e68ba8aa3d33cbca248111ebfc98c6223767b4e9a7cd59f02e2fbd0_20884",
//               "hid": "/lib/modules/ebt_portalauth.ko",
//               "size": 20884,
//               "mime": "application/x-object",
//               "leaves": 0,
//               "children": []
//             }
//           ],
//           "mime_types": {
//             "undefined": 0,
//             "text/plain": 0,
//             "application/x-executable": 0,
//             "application/x-sharedlib": 0,
//             "application/x-object": 13,
//             "image/gif": 0,
//             "inode/symlink": 0,
//             "image/png": 0,
//             "application/octet-stream": 0
//           }
//         },
//         {
//           "uid": "d90b2292414c0ac418c8fd89ac6d1989e0d15f4bde0fe313ab4059c5bbaa937a_9380",
//           "hid": "/lib/libdl.so.0",
//           "size": 9380,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "95f7987f5a3a2f0d4f19d2b542cdfeba87fb59c8be73e0eedecddf8843b76596_13584",
//           "hid": "/lib/libcrypt.so.0",
//           "size": 13584,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "370b46737a82625da9245b94d4b6be70218aee2fc117886b3c1910c1a4a5bc65_80232",
//           "hid": "/lib/libpthread.so.0",
//           "size": 80232,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "f679181dff36ddf30462a2f54e57e24d2a18080653cac84cf6a1dc51559b07d3_167016",
//           "hid": "/lib/libnetsnmpagent.so",
//           "size": 167016,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "890e9cbc36db871db9cd1ac155c7150753b6eb6941c52068cefdec18889e8bc3_5444",
//           "hid": "/lib/libmsgctl.so",
//           "size": 5444,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "fe170666893da701c6d3b57bf7e74a4cf8a5a085d2a499efcd0143e81ef04803_131280",
//           "hid": "/lib/libcommon.so",
//           "size": 131280,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "a6cec7b64e28268173959c5072a9d33a407cc355a5e271a8cb98a80142feef64_26",
//           "hid": "/lib/libgcc_s.so.1",
//           "size": 26,
//           "mime": "inode/symlink",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "329f77a8fd614e2be3f8bef68a093a9681a51f1fd5bd676b0f53fe4de6f00141_24440",
//           "hid": "/lib/libCfm.so",
//           "size": 24440,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "c7cf07c99e09732b6cc8e5cecc54b9bf519430b01d587c17be59ba5387e24519_15112",
//           "hid": "/lib/libChipApi.so",
//           "size": 15112,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "cf385fdf543a6726d344841f69454dd52ea7062770cb9b389bd1f63e4b03092a_4900",
//           "hid": "/lib/libresolv.so.0",
//           "size": 4900,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "6acc9b8a5a55a83c81949324922b64070f7f6312a1ffc08166ad0d4c14146fb6_681296",
//           "hid": "/lib/libnetsnmp.so",
//           "size": 681296,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "4b7f123e156e197f2a6e479b0a639a0081db3140d53e02a32d9b3c506eecb997_5032",
//           "hid": "/lib/libutil.so.0",
//           "size": 5032,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "ce6c827fb87eec18805ce5c8a27d473ff0013134d085542743be47c673fc38a0_17588",
//           "hid": "/lib/libufilter.so",
//           "size": 17588,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "7aec7d9846d9462f38bbbabfd4c3474f331fc14e99ff1d7d31e40bfc24bf80e0_91232",
//           "hid": "/lib/libnetsnmpmibs.so",
//           "size": 91232,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "f1c0404060ad9a1d2374289d03db9ea31dc3ba18f2205fdaf5939900d69589ac_398468",
//           "hid": "/lib/libc.so.0",
//           "size": 398468,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "b7e26ccf602581864be94463c7af4965beb4cdb625068295f8c2cfacf78f3037_158608",
//           "hid": "/lib/libnetsnmphelpers.so",
//           "size": 158608,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "a33318e8981da85db2f5e7769ba8bad8ee114b83ab46c4123ce3c6f0101db9f2_59468",
//           "hid": "/lib/libm.so.0",
//           "size": 59468,
//           "mime": "application/x-sharedlib",
//           "leaves": 0,
//           "children": []
//         }
//       ],
//       "mime_types": {
//         "undefined": 0,
//         "text/plain": 0,
//         "application/x-executable": 0,
//         "application/x-sharedlib": 17,
//         "application/x-object": 13,
//         "image/gif": 0,
//         "inode/symlink": 1,
//         "image/png": 0,
//         "application/octet-stream": 0
//       }
//     },
//     {
//       "uid": "folder",
//       "hid": "etc_ro",
//       "size": 19339,
//       "leaves": 9,
//       "children": [
//         {
//           "uid": "90fa616b2a0991f8df600d4fc99aa6a7617c99bd37fe961c642e3e97e9f3fb16_4609",
//           "hid": "/etc_ro/snmpd.conf",
//           "size": 4609,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "f71e5e53cb3cf9dbbfe0e6fb8d41a03f11bb4ab17ee4b8ca7e29aaadfd7391e8_12655",
//           "hid": "/etc_ro/default.cfg",
//           "size": 12655,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "0a5a79fea27593562b8b0eb8d94e24b84aa810df98ff6ca15fbf83ff9353252e_108",
//           "hid": "/etc/hotplug2.rules",
//           "size": 108,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "84a4cbaabd4cdeb0f1572c37f251c338327ec538140ab637732293670d3b6f96_14",
//           "hid": "/etc/ld.so.conf",
//           "size": 14,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "d3ce0870cd557c7bb5c1c90c347052bf05d71475a620cd1166720486dfddf153_197",
//           "hid": "/etc_ro/passwd",
//           "size": 197,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "folder",
//           "hid": "iproute2",
//           "size": 190,
//           "leaves": 1,
//           "children": [
//             {
//               "uid": "c0d18beb324f190a638c733cc33c5c9c29fe0080de111802273d39deaedd7e34_190",
//               "hid": "/etc_ro/iproute2/rt_tables",
//               "size": 190,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             }
//           ],
//           "mime_types": {
//             "undefined": 0,
//             "text/plain": 1,
//             "application/x-executable": 0,
//             "application/x-sharedlib": 0,
//             "application/x-object": 0,
//             "image/gif": 0,
//             "inode/symlink": 0,
//             "image/png": 0,
//             "application/octet-stream": 0
//           }
//         },
//         {
//           "uid": "folder",
//           "hid": "udev",
//           "size": 226,
//           "leaves": 1,
//           "children": [
//             {
//               "uid": "87bd9c62f416de1a4100d19d7c5951437f8b81692e7d457b24da1daf8412c8f6_226",
//               "hid": "/etc/udev/udev.conf",
//               "size": 226,
//               "mime": "text/plain",
//               "leaves": 0,
//               "children": []
//             }
//           ],
//           "mime_types": {
//             "undefined": 0,
//             "text/plain": 1,
//             "application/x-executable": 0,
//             "application/x-sharedlib": 0,
//             "application/x-object": 0,
//             "image/gif": 0,
//             "inode/symlink": 0,
//             "image/png": 0,
//             "application/octet-stream": 0
//           }
//         },
//         {
//           "uid": "e8a56378e96b77f8e3581daf357f932c81dd722744e92d74f63cb60e9d7a50bd_1308",
//           "hid": "/etc_ro/ld.so.cache",
//           "size": 1308,
//           "mime": "application/octet-stream",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "b107a9568da1ba9b42d16d8f9eb3bde2114b262ae84efac5f14f32b28769daa7_32",
//           "hid": "/etc_ro/group",
//           "size": 32,
//           "mime": "text/plain",
//           "leaves": 0,
//           "children": []
//         }
//       ],
//       "mime_types": {
//         "undefined": 0,
//         "text/plain": 8,
//         "application/x-executable": 0,
//         "application/x-sharedlib": 0,
//         "application/x-object": 0,
//         "image/gif": 0,
//         "inode/symlink": 0,
//         "image/png": 0,
//         "application/octet-stream": 1
//       }
//     },
//     {
//       "uid": "folder",
//       "hid": "usr",
//       "size": 1197371,
//       "leaves": 38,
//       "children": [
//         {
//           "uid": "folder",
//           "hid": "sbin",
//           "size": 549735,
//           "leaves": 8,
//           "children": [
//             {
//               "uid": "742947dccb8a20c2bfa4de9d9d30c6d038d2b05e8d9fd3a747ae22a228364783_44275",
//               "hid": "/usr/sbin/ufilter",
//               "size": 44275,
//               "mime": "application/x-executable",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "3f59a97dcd216205eb9a2adc8f2069c28f4f8b9824818e9634eec92bb7921737_9204",
//               "hid": "/usr/sbin/vconfig",
//               "size": 9204,
//               "mime": "application/x-executable",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "53eb88e0c7458e4b217ded384ba39ff00c05c9e008f809a684f11c09fc290513_384684",
//               "hid": "/usr/sbin/wl",
//               "size": 384684,
//               "mime": "application/x-executable",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "96a9a4ec28a842072bf4c8767607d5da6eefc0d60f711e169b2a282eca7fd4ce_32128",
//               "hid": "/usr/sbin/brctl",
//               "size": 32128,
//               "mime": "application/x-executable",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "29d5b0a8ea0bc946beb01a532bb4045eb9ab68aaa3460804b7a025710ef07a17_5640",
//               "hid": "/usr/sbin/nvram",
//               "size": 5640,
//               "mime": "application/x-executable",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "2252f3fb789c83365d2eebb46cb63326ffcd2ef4e8b27d6e6073e5be5bcf4f30_13912",
//               "hid": "/usr/sbin/emf",
//               "size": 13912,
//               "mime": "application/x-executable",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "1cc5c85b8a9cdf34f964606bbb7ffa6e650d5b9583de1c1770a150cc68ba0deb_50904",
//               "hid": "/usr/sbin/wlconf",
//               "size": 50904,
//               "mime": "application/x-executable",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "a057fea9fe055c104afe653f9064d331d8db3f54f6f9eb8ae3525354aeeafacb_8988",
//               "hid": "/usr/sbin/igs",
//               "size": 8988,
//               "mime": "application/x-executable",
//               "leaves": 0,
//               "children": []
//             }
//           ],
//           "mime_types": {
//             "undefined": 0,
//             "text/plain": 0,
//             "application/x-executable": 8,
//             "application/x-sharedlib": 0,
//             "application/x-object": 0,
//             "image/gif": 0,
//             "inode/symlink": 0,
//             "image/png": 0,
//             "application/octet-stream": 0
//           }
//         },
//         {
//           "uid": "folder",
//           "hid": "lib",
//           "size": 647636,
//           "leaves": 30,
//           "children": [
//             {
//               "uid": "1af6bcd31f97eae5015d3f5f208f58c514c1d3e73286aac8b14437da733a4f25_4240",
//               "hid": "/usr/lib/libebt_PortalAuth.so",
//               "size": 4240,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "842a7c02859dff85280fb034fc8a9b7bb263f316a8b00990b23e54644a5342f5_148256",
//               "hid": "/usr/lib/libupnp.so",
//               "size": 148256,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "482a4383ea9500dc4ceb2e0e27f88cd72d30a35f7b89916c91ac9c960d688de0_4244",
//               "hid": "/usr/lib/libnvram.so",
//               "size": 4244,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "1911a8ee734ab46dbc54196a36d8fe2d03f8222f52ea51797c838906761e40cb_6632",
//               "hid": "/usr/lib/libebt_mark.so",
//               "size": 6632,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "5024efc2d94de97892ff82cedacd62d1bcad89574247b5554f32cf65381521ff_78811",
//               "hid": "/usr/lib/libshared.so",
//               "size": 78811,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "fa9fdef360e35aa9ca59462497a28bf3a7a6623515e148ef47aed4ee46bb4432_3896",
//               "hid": "/usr/lib/libebt_standard.so",
//               "size": 3896,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "de115fa81b7044bc241a139cf6ad8a819720cf368fff83fdaba39415012dd3fb_63804",
//               "hid": "/usr/lib/libdisk.so",
//               "size": 63804,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "eecc6ead7c99f66756edcd22179a28361164f2fa6e24f24ef9bcba4f07fb1910_112812",
//               "hid": "/usr/lib/libbcmcrypto.so",
//               "size": 112812,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "23143c0f2d8587e48f53108c9f6d868bcbff2fff20a8426f2272571bd5b821b4_6612",
//               "hid": "/usr/lib/libebt_nflog.so",
//               "size": 6612,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "52959b700fd5e008c8accb97c9328e547613b001d345f340baa8a778070239f7_6754",
//               "hid": "/usr/lib/libebt_limit.so",
//               "size": 6754,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "764c5493050a944737d801a39257d7064119842cd9122a24c13e3fba06555174_8126",
//               "hid": "/usr/lib/libebt_nat.so",
//               "size": 8126,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "8c142aa7c97e10e68193ea5799924711a3f45cc37a966a29cdfb882ea4386e9f_3144",
//               "hid": "/usr/lib/libebtable_filter.so",
//               "size": 3144,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "b229496a180eccc3c7bf7bef72b507d9d5d3f2fb7bba5b221ca35aba19867e9f_5951",
//               "hid": "/usr/lib/libebt_arpreply.so",
//               "size": 5951,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "c28fe095fe680ca6f7390b27308a557fc9856e3ea001d5a6671c3be674a374af_7766",
//               "hid": "/usr/lib/libbcm.so",
//               "size": 7766,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "78b31aa41aded18d8e0611fd83b4e54eec0d79197f9a9701b8013fd0e74a339e_5554",
//               "hid": "/usr/lib/libebt_802_3.so",
//               "size": 5554,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "379139865484a830819f383d9c304e7f6eee4bd28a70e18e5fce20e0515ef3e8_4686",
//               "hid": "/usr/lib/libebt_EthQoS.so",
//               "size": 4686,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "35c77fc98cea1293959cf34a5043fb8e2e49dcc4e728601a87884c5da177140d_2913",
//               "hid": "/usr/lib/libebtable_broute.so",
//               "size": 2913,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "1f54aeabd6c1ec418446916066b4590c7eed35bb3b151bcff162221f2b0af026_11212",
//               "hid": "/usr/lib/libebt_arp.so",
//               "size": 11212,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "4e337aefd56ca0d2214a264c57cd519a712de07b8d95738355f0ef6e1222f26d_3157",
//               "hid": "/usr/lib/libebtable_nat.so",
//               "size": 3157,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "d1c2f7dd2966884c92da65936ba49fec81e28c5fa2ed61c4fe4e2f85380f1683_4698",
//               "hid": "/usr/lib/libebt_redirect.so",
//               "size": 4698,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "e45e55bad80cda5061b284fc87cd841e4d4a073e7125357c431ff87dce397f2c_5135",
//               "hid": "/usr/lib/libebt_pkttype.so",
//               "size": 5135,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "ced745544dde24e04f9f7416ab0c18f2fb3bde4fe9e25616452f88dc86e12c7a_10720",
//               "hid": "/usr/lib/libebt_among.so",
//               "size": 10720,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "978e482bb3da7c0c09c501073bb7efe0e7563938ac48729533bd25d591e66448_6618",
//               "hid": "/usr/lib/libebt_ulog.so",
//               "size": 6618,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "a6965a733ac196c270981cedb285d01ae1c567ef1142e870e233ba1a7e19ca58_6630",
//               "hid": "/usr/lib/libebt_vlan.so",
//               "size": 6630,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "fc2a2a0d060c737eca0e02cabb269d1c18724ac219260a4143948aaf5c8d59f8_13970",
//               "hid": "/usr/lib/libebt_ip6.so",
//               "size": 13970,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "06a67f98d647af35976c7a125c040d015d53bc66c06b69e0da1a8c1e469720de_7515",
//               "hid": "/usr/lib/libebt_log.so",
//               "size": 7515,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "1934faf35b8044ba92246657f8809cac5673f0d589665e0265a40f994a47d610_78741",
//               "hid": "/usr/lib/libebtc.so",
//               "size": 78741,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "23bac40dc4c086688e59fda5042916bfeff0705844abed7b2a9b03607e6ec93c_10339",
//               "hid": "/usr/lib/libebt_stp.so",
//               "size": 10339,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "6c65101d2333f15ad417df1ff08fecaaf6f813b24c15d2b0a3d272aeda734146_9851",
//               "hid": "/usr/lib/libebt_ip.so",
//               "size": 9851,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             },
//             {
//               "uid": "5d8fc52a84c586084efa2f6dbe8fe0a50c238a8ce99080fdcff73ae29e42f029_4849",
//               "hid": "/usr/lib/libebt_mark_m.so",
//               "size": 4849,
//               "mime": "application/x-sharedlib",
//               "leaves": 0,
//               "children": []
//             }
//           ],
//           "mime_types": {
//             "undefined": 0,
//             "text/plain": 0,
//             "application/x-executable": 0,
//             "application/x-sharedlib": 30,
//             "application/x-object": 0,
//             "image/gif": 0,
//             "inode/symlink": 0,
//             "image/png": 0,
//             "application/octet-stream": 0
//           }
//         }
//       ],
//       "mime_types": {
//         "undefined": 0,
//         "text/plain": 0,
//         "application/x-executable": 8,
//         "application/x-sharedlib": 30,
//         "application/x-object": 0,
//         "image/gif": 0,
//         "inode/symlink": 0,
//         "image/png": 0,
//         "application/octet-stream": 0
//       }
//     },
//     {
//       "uid": "folder",
//       "hid": "sbin",
//       "size": 533147,
//       "leaves": 6,
//       "children": [
//         {
//           "uid": "a79a072d7f58661a5138c24ee7a8648483fd4ecb77a4524534bdc0abfb0f2435_27984",
//           "hid": "/sbin/hotplug2",
//           "size": 27984,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "c632f0f2210dec218f95a89e409c6bbf3010413d29eec120e54fae2fe5155dd4_52156",
//           "hid": "/sbin/igmpproxy",
//           "size": 52156,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "72c888b036079e67c03fefb6c88fd61a8f2de6a7896b88594b15633a3a68fa36_29308",
//           "hid": "/sbin/udevtrigger",
//           "size": 29308,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "2d4b0cbb153cdb259f7317db42cd6d6a1d3caaababeef2296893215e184d7d8a_70000",
//           "hid": "/sbin/rc",
//           "size": 70000,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "74d219706be903d60798160a9f5305a20fca2cd39b7538af062a797a983e7282_19",
//           "hid": "/sbin/mtd_write_oob",
//           "size": 19,
//           "mime": "inode/symlink",
//           "leaves": 0,
//           "children": []
//         },
//         {
//           "uid": "ef3ab616a0bee3b579177e162462419407a79f84a88ff3b55f45716c7668f0ba_353680",
//           "hid": "/sbin/traceroute",
//           "size": 353680,
//           "mime": "application/x-executable",
//           "leaves": 0,
//           "children": []
//         }
//       ],
//       "mime_types": {
//         "undefined": 0,
//         "text/plain": 0,
//         "application/x-executable": 5,
//         "application/x-sharedlib": 0,
//         "application/x-object": 0,
//         "image/gif": 0,
//         "inode/symlink": 1,
//         "image/png": 0,
//         "application/octet-stream": 0
//       }
//     }
//   ],
//   "mime_types": {
//     "undefined": 0,
//     "text/plain": 58,
//     "application/x-executable": 49,
//     "application/x-sharedlib": 47,
//     "application/x-object": 13,
//     "image/gif": 5,
//     "inode/symlink": 4,
//     "image/png": 3,
//     "application/octet-stream": 1
//   }
// }