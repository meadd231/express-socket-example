const express = require('express');
const app = express();
const server = require('http').createServer(app);
// 웹 소켓 모듈을 불러온 후 생성된 서버를 사용해서 웹 소켓 서버를 생성함.
// io는 WebSocket Server라고 볼 수 있다.
const io = require('socket.io')(server, { cors: { origin: "*" }});

// ejs 사용하여 뷰 엔진 사용
app.set('view engine', 'ejs');

// http 요청 처리 이벤트 구현
app.get('/home', async (req, res) => {
  console.log('hello');
  res.render('home');
  return
});

// 왜 express를 냅두고 http 모듈로 만든 서버를 여는 거지?
// http 모듈을 express를 이용해서 만드는 건가?
server.listen(3001, () => {
  console.log('Server Run');
});

// WebSocket Server에 
// 연결 수립 시 동작
io.on('connection', (socket) => {
  // 여기 있는 애는 client 소켓인건가?
  console.log('User connected' + socket.id);

  // message 이벤트 수신 시 동작
  socket.on('message', (data) => {
    // 해당 소켓을 제외한 모든 소켓에게 message라는 이벤트를 emit 한다.
    socket.broadcast.emit('message', data);
  });
});