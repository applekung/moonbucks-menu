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

class App {
  menus = [];

  constructor() {
    this._getLocalStorage();
    btnAddMenu.addEventListener('click', this._addMenu.bind(this));

    // arrowFunction Lexical this
    addMenuInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this._addMenu();
      }
    });

    espressoContainer.addEventListener('click', (e) => {
      e.target.classList.contains('menu-edit-button') && this._editMenu(e);
      e.target.classList.contains('menu-remove-button') && this._removeMenu(e);
    });
  }

  _setLocalStorage() {
    localStorage.setItem('espressoMenu', JSON.stringify(this.menus));
    // this._renderTempletes();
  }
  _getLocalStorage() {
    // NOTE 여기서 모드를 체크해서 로컬스트리지에서 받아올 아이템이름을 곧 모드르
    // NOTE e.g. mode='espressoMenu'이런식으로해서 getItem`${mode}`
    const data = JSON.parse(localStorage.getItem('espressoMenu'));
    this.menus = !data ? [] : data;
    this._renderTempletes();
  }
  _countMenu() {
    // const count = espressoContainer.querySelectorAll('li').length;
    const count = this.menus.length;
    menuCount.textContent = `총 ${count}개`;
  }

  _renderTempletes() {
    const templetes = this.menus
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

    espressoContainer.innerHTML = templetes;
  }

  _addMenu() {
    const espressoMenu = addMenuInput.value;
    if (!espressoMenu.trim(' ')) {
      this._resetInput();
      return;
    }
    this.menus.push({ name: espressoMenu }); // FIXME나중에 로컬스토리지에도 저장
    this._renderTempletes();
    this._resetInput();
    this._countMenu();
    this._setLocalStorage();
  }
  _editMenu(e) {
    const menuName = e.target
      .closest('li')
      .querySelector('.menu-name').textContent;
    const editedMenu = prompt('바꿀 메뉴 이름을 입력해주세요', `${menuName}`);
    this.menus.filter((menu) => menu.name === menuName)[0].name = editedMenu;
    this._renderTempletes();
    this._setLocalStorage();
  }

  // 논리연산자 활용
  _removeMenu(e) {
    const menuName = e.target
      .closest('li')
      .querySelector('.menu-name').textContent;

    if (!confirm(`정말 ${menuName}를 삭제하시겠습니까?`)) return;
    const menuToremove = this.menus.find(
      (menu, i) => menu.name === menuName && menu
    );
    this.menus.splice(this.menus.indexOf(menuToremove), 1);

    this._countMenu();
    this._setLocalStorage();
    this._renderTempletes();
  }

  _resetInput = () => (addMenuInput.value = '');
}

const menuapp = new App();
