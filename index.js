const express = require('express'); //express 모듈 불러오기
const cors = require('cors'); //cors 모듈 불러오기
const PORT = '8080';
const cookieParser = require('cookie-parser');
const path = require('path');
const {spawn} = require("child_process").spawn;

const app = express(); //express 모듈을 사용하기 위해 app 변수에 할당한다.

//app.use(cors());
app.use(cookieParser());
app.use(express.json()); //express 모듈의 json()메소드를 사용한다.

app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
); 

// 채팅 문자열 요청
app.post("/chat",(req,res) => {
  try {
    const sendedQuestion = req.body.question;


    // EC2 서버에서 현재 실행 중인 Node.js 파일의 절대 경로를 기준으로 설정.
    const scriptPath = path.join(__dirname, 'bizchat.py');

    //EC2 서버에서 실행하는 절대 경로, 개발 테스트 시 사용 불가
    const pythonPath = path.join(__dirname, 'venv', 'bin', 'python3');

    //window 개발 테스트 시 사용하는 절대 경로
    // const pythonPath = path.join(__dirname, 'venv', 'Scripts', 'python.exe');



    // Spawn the Python process with the correct argument
    const result = spawn(pythonPath, [scriptPath, sendedQuestion]);



    let responseData = '';


    // Listen for data from the Python script
    result.stdout.on('data', (data) => {
      // console.log(data.toString());
      // res.status(200).json({ answer: data.toString() });
      responseData += data.toString();
    });


    // Listen for errors from the Python script
    result.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      res.status(500).json({ error: data.toString() });
    });


    // Handle the close event of the child process
    result.on('close', (code) => {
      if (code === 0) {
        res.status(200).json({ answer: responseData });
      } else {
        res
          .status(500)
          .json({ error: `Child process exited with code ${code}` });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

})

app.get('/', (req, res) => {
  res.send('Hello World https test completed');
});

app.use(require('./routes/deleteRoutes'));
app.use(require('./routes/postRoutes'));
app.use(require('./routes/getRoutes'));
app.use(require('./routes/updateRoutes'));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`)); //서버를 정상 실행할 시 메시지 출력


// 오류체크
try {
    const sendedQuestion = req.body.question;


    // EC2 서버에서 현재 실행 중인 Node.js 파일의 절대 경로를 기준으로 설정합니다.
    const scriptPath = path.join(__dirname, 'bizchat.py');
    const pythonPath = path.join(__dirname, 'venv', 'bin', 'python3');


    // Spawn the Python process with the correct argument
    const result = spawn(pythonPath, [scriptPath, sendedQuestion]);


    // result.stdout.on('data', (data) => {
    //   console.log(data.toString());
    //   // return res.status(200).json(data.toString());
    // });


    let responseData = '';


    // Listen for data from the Python script
    result.stdout.on('data', (data) => {
      // console.log(data.toString());
      // res.status(200).json({ answer: data.toString() });
      responseData += data.toString();
    });


    // Listen for errors from the Python script
    result.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      res.status(500).json({ error: data.toString() });
    });


    // Handle the close event of the child process
    result.on('close', (code) => {
      if (code === 0) {
        res.status(200).json({ answer: responseData });
      } else {
        res
          .status(500)
          .json({ error: `Child process exited with code ${code}` });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
