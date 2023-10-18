// NEW STEP1
// 에스프레소 메뉴 추가
//    메뉴이름 입력 -> (빈값 체크 || FIXME 중복체크) -> 확인버튼
//    메뉴이름 입력 -> (빈값 체크 || 중복체크) -> 엔터
// 메뉴 추가시 html
// `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>`안에 li로
// insertAdjacentHTML('beforeend', newMenu)

// 에스프레소 메뉴 수정
//    수정버튼클릭 -> prompt메시지 -> 확인시 업데이트
// 에스프레소 메뉴 삭제
//    삭제버튼클릭 -> confirm확인 -> 삭제
// 메뉴 개수 카운트 -> 상단 입력

// NEW STEP2

// localStorage에 정보저장, 읽기(Read, Write)
//  메뉴추가, 수정, 삭제시 업데이트

// 음료 종류별로 관리(프라푸치노, 에스프레소, 디저트, ...)
//   옵션1) 탭식으로 관리(hidden클래스 추가)
//   옵션2) FIXME 음료 탭별로 id저장해놨다가 각각의 localStorage불러오기

// 처음 접속시 에스프레소페이지
// mode -> localStorage읽기 -> rendering

// 상태관리
// 품절상태관리

// NEW STEP3 WEB-SERVER
// NEW STEP4 OOP로 전환
// {{espresso:[{},{},{}]},...,{desert:[{},{}]}}
// render, mode

const addMenuInput = document.querySelector('#espresso-menu-name');
const btnAddMenu = document.querySelector('#espresso-menu-submit-button');
const espressoContainer = document.querySelector('#espresso-menu-list');
const espressoForm = document.querySelector('#espresso-menu-form');
const menuCount = document.querySelector('.menu-count');
const resetInput = () => (addMenuInput.value = '');
const countMenu = () => {
  const count = espressoContainer.querySelectorAll('li').length;

  menuCount.textContent = `총 ${count}개`;
};

const menus = []; // FIXME 나중에 mode에따라 localStorgae에서 가져오는걸로 업데이트 || []
const renderTemplete = (templetes) => {};

const addMenu = () => {
  const espressoMenu = addMenuInput.value;
  if (!espressoMenu.trim(' ')) {
    resetInput();
    return;
  }
  menus.push({ name: espressoMenu });
  const templetes = menus
    .map((menu) => {
      return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${menu.name}</span>
          <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
          수정
          </button>
          <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
          삭제
          </button>
        </li>
  `;
    })
    .join('');
  // espressoContainer.insertAdjacentHTML('beforeend', templetes);
  espressoContainer.innerHTML = templetes;
  resetInput();
  countMenu();
  console.log(menus);
};

btnAddMenu.addEventListener('click', addMenu);

addMenuInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addMenu();
  }
});

const editMenu = (menuName) => {
  const editedMenu = prompt(
    '바꿀 메뉴 이름을 입력해주세요',
    `${menuName.textContent}`
  );
  menuName.textContent = editedMenu;
};
const delMenu = (menutag, menuName) => {
  confirm(`정말 ${menuName.textConten}를 삭제하시겠습니까?`) &&
    espressoContainer.removeChild(menutag);
  countMenu();
};

espressoContainer.addEventListener('click', (e) => {
  const targetClass = e.target.classList;
  targetClass.contains('menu-edit-button') &&
    editMenu(e.target.closest('li').querySelector('.menu-name'));
  targetClass.contains('menu-remove-button') &&
    delMenu(
      e.target.closest('li'),
      e.target.closest('li').querySelector('.menu-name')
    );
});
