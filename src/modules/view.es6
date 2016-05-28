export default class {

  constructor() {
    this.list = document.getElementById('shop-list');
  }

  donePopulating() {
    let loader = document.getElementById('loader');
    loader.className += ' hidden';
  }

  addToList(html) {
    let listItem = document.createElement('li');
    listItem.className += 'mdl-list__item mdl-list__item--two-line';
    listItem.innerHTML = html;
    this.list.appendChild(listItem);
  }

}
