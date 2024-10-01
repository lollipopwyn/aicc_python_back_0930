const router = require('express').Router();
const {
  getTasks,
  getUserTasks,
  getSearchTasks,
  getCategory,
} = require('../controllers/getTasks');
//api path를 전달해 주는 메서드
// const { getTasks, getAllTasks } = require('../controllers/getTasks');

// router.get('/get_tasks/:userId', getTasks); //컨트롤러 함수 연결 - ':'은 정해지지 않은 문자열 표시

router.get('/get_tasks', getTasks);
router.get('/get_UserTasks/:user_key', getUserTasks);
router.get('/get_searchTasks/:text', getSearchTasks);
router.get('/get_Category/:text', getCategory);

module.exports = router; // router 모듈 내보내기
