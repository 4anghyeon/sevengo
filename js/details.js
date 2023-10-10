// Firebase SDK 라이브러리 가져오기
import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: 'AIzaSyBuU6pe2VYUIoalynNO4w25HcfuZOI0Ig8',
  authDomain: 'sparta-bada5.firebaseapp.com',
  projectId: 'sparta-bada5',
  storageBucket: 'sparta-bada5.appspot.com',
  messagingSenderId: '678152779933',
  appId: '1:678152779933:web:fd4d686066c4bbbf7dbc74',
  measurementId: 'G-J9PY997T6X',
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const MEMBER_MAP = {
  lsh: {
    name: '이상현',
    color: '#D8B4F8',
    img: 'lsh-thumb.png',
  },
  khm: {
    name: '김혜민',
    color: '#8EACCD',
    img: 'khm.jpg',
  },
  cmg: {
    name: '최민권',
    color: '#F9F3CC',
    img: 'cmg.png',
  },
  phw: {
    name: '박희원',
    color: '#FFC7EA',
    img: 'hw.jpg',
  },
};

// 화면에 표시될 멤버 이름
let memberName = '';

// 댓글 입력 이벤트
$('#commentEnterButton').click(async function () {
  let comment = $('#commentInput').val();
  let date = new Date().toISOString();

  let doc = {
    comment,
    memberName,
    date,
  };

  await addDoc(collection(db, 'comments'), doc);
  $('#commentInput').val('');
  alert('댓글이 등록 되었습니다.');
  readComments(memberName);
});

const readComments = async () => {
  // 전체 댓글 불러오기
  let docs = await getDocs(collection(db, 'comments'));
  $('#commentList').empty();
  let commentList = [];

  docs.forEach(doc => {
    let row = doc.data();
    if (row) {
      commentList.push({comment: row.comment, date: row.date, memberName: row.memberName});
    }
  });

  commentList.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  commentList.forEach(row => {
    let date = new Date(row.date).toLocaleString('ko-KR');
    if (date === 'Invalid Date') date = row.date;
    // 화면의 사용자에 대한 댓글만 보여줌
    if (row.memberName === memberName)
      $('#commentList').append(`<div><span>${row.comment}</span><span>${date}</span></div>`);
  });
};

// 표시되고 있는 html 파일 이름
const fileName = location.pathname.split('/').pop().replace(/.html/g, '');

// 우측 상단 멤버 버튼 만들기
for (let member in MEMBER_MAP) {
  let {name, color, img} = MEMBER_MAP[member];
  if (member === fileName) {
    $('#memberName').text(name);
    memberName = name;
    readComments(memberName);
    continue;
  }
  $('#memberButtonBox').append(
    `<div class="name-box">
        <a href=${
          member + '.html'
        }><div class="button member-image" style="background-color: ${color}; background-image: url('../assets/img/${img}'); background-size: cover" ></div>
        <div class="name" style="background-color: ${color}">${name}</div>
        </a>
      </div>`,
  );
}
