const BASE_URL = 'http://localhost:3000/api';
const menuAPI = {
  async getMenus({ menus, category }) {
    try {
      const response = await fetch(`${BASE_URL}/category/${category}/menu`);
      if (!response.ok)
        throw new Error(`${category}메뉴 로드 과정에서 오류 발생`);

      const data = await response.json();
      menus[category] = data;
      return data;
    } catch (err) {
      console.log(err.message);
    }
  },
  async addNewMenu({ menu, category }) {
    try {
      const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menu),
      });
      if (!response.ok) throw new Error('메뉴 추가 과정에서 오류 발생');
    } catch (err) {
      console.log(err.message);
    }
  },
  async editMenu({ newName: name, category, menuId }) {
    try {
      const response = await fetch(
        `${BASE_URL}/category/${category}/menu/${menuId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        }
      );
      if (!response.ok) throw new Error('메뉴이름 수정 과정에서 오류 발생');
    } catch (err) {
      console.log(err.message);
    }
  },
  async toggleSoldOut({ category, menuId }) {
    try {
      const response = await fetch(
        `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
        {
          method: 'PUT',
        }
      );
      if (!response.ok) throw new Error('품절 상태관리 과정에서 오류 발생');
    } catch (err) {
      console.log(err.message);
    }
  },
  async deleteMenu({ category, menuId }) {
    try {
      await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default menuAPI;
