//Invoke api https://0dgvrutdji.execute-api.eu-west-1.amazonaws.com/prod/send-mail-ses
var http =  require('https');
var options = {
  host: '0dgvrutdji.execute-api.eu-west-1.amazonaws.com',
  port: 443,
  path: '/prod/send-mail-ses',
  method: 'POST'
};
http.request (options,function(res){
  var responseBody='';
  console.log("statusCode: ", res.statusCode);
  res.on('data',function(dataChunks){
    responseBody+= dataChunks;
  });

  res.on('end',function(){
    var bodyJSON = JSON.parse(responseBody);
    console.log(bodyJSON);
  });

  res.on('error',function(err){
    // var bodyJSON = JSON.parse(responseBody);
    console.log(err);
  });
}).end();
