const MEMBER_MAP = {
  lsh: {
    name: '이상현',
    color: '#D8B4F8',
    img: 'lsh-thumb.png',
  },
  khm: {
    name: '김혜민',
    color: '#8EACCD',
    img: 'test.png',
  },
  cmg: {
    name: '최민권',
    color: '#F9F3CC',
    img: 'test.png',
  },
  phw: {
    name: '박희원',
    color: '#FFC7EA',
    img: 'test.png',
  },
};

$(document).ready(function () {
  const fileName = location.pathname.split('/').pop().replace(/.html/g, '');

  for (let member in MEMBER_MAP) {
    let {name, color, img} = MEMBER_MAP[member];
    if (member === fileName) continue;
    $('#memberButtonBox').append(
      `<div class="name-box">
        <a href=${
          member + '.html'
        }><img src="../assets/img/${img}" class="button member-image" style="background-color: ${color}" alt="${name}" />
        <div class="name" style="background-color: ${color}">${name}</div>
        </a>
      </div>`,
    );
  }
});
