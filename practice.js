const entryForm = document.getElementById('new-form-box');
entryForm.style.display = 'none';

const myLibrary = [];

function Book(book, author, pageNumber, readStatus) {
  // the constructor...
  this.bookName = book;
  this.author = author;
  this.pageNumber = pageNumber;
  this.readStatus = readStatus;
}

Book.prototype.setStatus = function (container) {
  const yesToggle = container.querySelector('.yesToggle');
  const noToggle = container.querySelector('.noToggle');

  if (this.readStatus == 'yes') {
    yesToggle.checked = true;
  } else {
    noToggle.checked = true;
  }
};

function addBookToLibrary() {
  // do stuff here

  const allInputs = document.getElementsByClassName('inny');

  const checkBox = document.querySelector('#readStatus');

  let checkValue = '';

  if (checkBox.checked == true) {
    checkValue = 'yes';
  } else {
    checkValue = 'no';
  }

  const bookObject = new Book(allInputs[0].value, allInputs[1].value, allInputs[2].value, checkValue);

  myLibrary.push(bookObject);

  displayBooks();
}

function displayBooks() {
  const middle = document.querySelector('.middle');
  middle.innerHTML = ' ';

  for (let i = 0; i < myLibrary.length; i++) {
    const middle = document.querySelector('.middle');

    const container = document.createElement('div');
    container.classList.add(`container${i}`);
    container.classList.add('js-container');
    middle.appendChild(container);

    const nameInfo = document.createElement('div');
    nameInfo.classList.add('nameInfo');
    nameInfo.innerText = myLibrary[i].bookName;
    container.appendChild(nameInfo);

    const authorInfo = document.createElement('div');
    authorInfo.innerText = myLibrary[i].author;
    container.appendChild(authorInfo);

    const pageInfo = document.createElement('div');
    pageInfo.innerText = myLibrary[i].pageNumber;
    container.appendChild(pageInfo);

    const readStatus = document.createElement('div');
    readStatus.setAttribute('id', 'readStat');
    readStatus.innerText = myLibrary[i].readStatus;
    container.appendChild(readStatus);

    const removeButton = document.createElement('button');
    removeButton.classList.add('rButton');
    removeButton.innerText = 'remove';
    container.appendChild(removeButton);

    removeButton.addEventListener('click', function (e) {
      console.log(this.parentElement.className);
      const parent = String(this.parentElement.className);

      for (let i = 0; i < myLibrary.length; i++) {
        if (parent.includes(i)) {
          myLibrary.splice(i, 1);
        }
      }
      displayBooks();
    });

    const toggleDiv = document.createElement('div');
    toggleDiv.classList.add('toggleClass');
    toggleDiv.getAttribute('id', `toggleDiv${i}`);

    const readLabel = document.createElement('div');
    readLabel.classList.add('readLabel');
    readLabel.innerText = 'Read Status';
    readLabel.style.fontWeight = 'bold';
    readLabel.style.paddingBottom = '17px';
    toggleDiv.appendChild(readLabel);

    const rYesToggle = document.createElement('input');
    rYesToggle.type = 'radio';
    rYesToggle.name = `yesToggle${i}`;
    rYesToggle.classList.add('yesToggle');
    rYesToggle.value = 'yes';

    const yesLabel = document.createElement('label');
    yesLabel.innerText = 'Yes';
    toggleDiv.appendChild(yesLabel);
    toggleDiv.appendChild(rYesToggle);

    const rNoToggle = document.createElement('input');
    rNoToggle.type = 'radio';
    rNoToggle.name = `noToggle${i}`;
    rNoToggle.classList.add('noToggle');
    rNoToggle.value = 'no';

    const noLabel = document.createElement('label');
    noLabel.innerText = 'No';
    toggleDiv.appendChild(noLabel);
    toggleDiv.appendChild(rNoToggle);

    container.appendChild(toggleDiv);

    console.log(myLibrary[i]);
    myLibrary[i].setStatus(container);
  }
}

document.getElementById('new-form-box').addEventListener('submit', (e) => {
  e.preventDefault();

  addBookToLibrary();

  entryForm.style.display = 'none';

  console.log(myLibrary);
});

document.getElementById('new-entry').addEventListener('click', (e) => {
  entryForm.style.display = 'revert';
});
