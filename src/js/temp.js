// NOTE OOP, 논리연산자, 중복체크, 전체 render는 필요할때만
// FIXME 음료 추가/수정 시 인풋 validation검사 정규표현식, validation함수들 모듈로 빼기-> import

// TODO STEP1
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

// TODO STEP2

// localStorage에 정보저장, 읽기(Read, Write)
//  메뉴추가, 수정, 삭제시 업데이트

// 음료 종류별로 관리(프라푸치노, 에스프레소, 디저트, ...)

// 처음 접속시 에스프레소페이지
// mode -> localStorage읽기 -> rendering

// 상태관리
// 품절상태관리

// TODO STEP3 OOP로 전환

// TODO STEP4 WEB-SERVER

const addMenuInput = document.querySelector('#espresso-menu-name');
const btnAddMenu = document.querySelector('#espresso-menu-submit-button');
const espressoContainer = document.querySelector('#espresso-menu-list');
const espressoForm = document.querySelector('#espresso-menu-form');
const menuCount = document.querySelector('.menu-count');
const nav = document.querySelector('nav');
const header = document.querySelector('.menu-header');

class App {
  menus = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  category = 'espresso';

  constructor() {
    this._getLocalStorage();

    nav.addEventListener('click', this._getCategory.bind(this));

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
      e.target.classList.contains('menu-sold-out-button') &&
        this._soldOutMenu(e);
    });
  }

  _countMenu() {
    const count = this.menus[this.category].length;
    menuCount.textContent = `총 ${count}개`;
  }

  _renderTempletes(menu) {
    const templete = `
        <li class="${
          !menu.soldOut || 'sold-out'
        } menu-list-item d-flex items-center py-2" data-menu-id="${menu.name}">
        <span class="w-100 pl-2 menu-name">${menu.name}</span>
        <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        >
        품절
        </button>
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

    espressoContainer.insertAdjacentHTML('beforeend', templete);
  }

  _checkValid(newMenu) {
    return this.menus[this.category].every((menu) => menu.name !== newMenu);
  }

  _addMenu() {
    let newMenu = addMenuInput.value;
    if (!this._checkValid(newMenu)) {
      alert('이미 있는 메뉴입니다');
      this._resetInput();
      return;
    }
    if (!newMenu.trim(' ')) {
      this._resetInput();
      return;
    }

    newMenu = { name: newMenu };
    this.menus[this.category].push(newMenu);
    this._setLocalStorage();

    this._renderTempletes(newMenu);
    this._resetInput();
    this._countMenu();
  }

  _editMenu(e) {
    // const menuId = e.target.closest('li').dataset.menuId;
    const menuName = e.target
      .closest('li')
      .querySelector('.menu-name').textContent;
    const nameUpdated = prompt('바꿀 메뉴 이름을 입력해주세요', `${menuName}`);
    if (!nameUpdated) return;

    const menuToUpdate = this.menus[this.category].find((menu, i, arr) => {
      if (menu.name === menuName) return menu;
    });
    menuToUpdate.name = nameUpdated;
    this._setLocalStorage();
    this._getLocalStorage();
  }

  _removeMenu(e) {
    const menuName = e.target
      .closest('li')
      .querySelector('.menu-name').textContent;

    if (!confirm(`정말 ${menuName}를 삭제하시겠습니까?`)) return;
    this.menus[this.category].find(
      (menu, i, arr) => menu.name === menuName && arr.splice(i, 1)
    );

    this._setLocalStorage();
    this._getLocalStorage();
    this._countMenu();
  }

  _soldOutMenu(e) {
    const menuName = e.target
      .closest('li')
      .querySelector('.menu-name').textContent;
    this.menus[this.category].find((menu, i, arr) => {
      if (menu.name === menuName) menu.soldOut = !menu.soldOut;
    });
    this._setLocalStorage();
    this._getLocalStorage();
  }

  _resetInput = () => (addMenuInput.value = '');

  _setLocalStorage() {
    localStorage.setItem(
      this.category,
      JSON.stringify(this.menus[this.category])
    );
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem(this.category));
    if (data) this.menus[this.category] = data;
    espressoContainer.innerHTML = '';
    this.menus[this.category].forEach((menu) => this._renderTempletes(menu));
  }

  _getCategory(e) {
    if (!e.target.dataset.categoryName) return;

    this.category = e.target.dataset.categoryName;
    this._getLocalStorage();
    header.textContent = `${e.target.textContent} 메뉴 관리`;
  }
}

const menuapp2 = new App();
