function solve() {
    const [name, year, price] = document.querySelectorAll('input');
    document.querySelector('button').addEventListener('click', addBook);

    function addBook(event) {
        event.preventDefault();
        if (name.value == '' || Number(year.value) < 1 || Number(price.value) < 1) {
            return
        }
        const bookPrice = Number(price.value);
        const div = e('div', undefined, 'book');
        const p = e('p', `${name.value} [${year.value}]`);
        const [shelfOld,shelfNew] = document.querySelectorAll(".selected");
        div.appendChild(p);
        if (Number(year.value) >= 2000) {//new book
            const buy = e('button', `Buy it only for ${bookPrice.toFixed(2)} BGN`);
            const move = e('button', 'Move to old section');
            div.appendChild(buy);
            div.appendChild(move);
            shelfNew.querySelector('div').appendChild(div);

            buy.addEventListener('click', () => buyBook(bookPrice.toFixed(2), div));
            move.addEventListener('click', () => moveBook(bookPrice.toFixed(2), p, shelfOld, div));
        } else {//old book
            const buy = e('button', `Buy it only for ${(bookPrice*0.85).toFixed(2)} BGN`);
            div.appendChild(buy);
            shelfOld.querySelector('div').appendChild(div);

            buy.addEventListener('click', () => buyBook((bookPrice*0.85).toFixed(2), div));
        }


    }

    function buyBook(price, book) {
        book.remove();
        updateProfit(price);
    }

    function updateProfit(price) {
        const profit = Number(document.querySelectorAll('h1')[1].textContent.split(': ')[1].split(' ')[0]);
        document.querySelectorAll('h1')[1].textContent = `Total Store Profit: ${(profit+Number(price)).toFixed(2)} BGN`;
    }

    function moveBook(price, p, shelfOld, book) {
        const bookPrice = Number(price);
        const div = e('div', undefined, 'book');
        const buy = e('button', `Buy it only for ${(bookPrice*0.85).toFixed(2)} BGN`);
        div.appendChild(p);
        div.appendChild(buy);
        shelfOld.querySelector('div').appendChild(div);
        book.remove();
        buy.addEventListener('click', () => buyBook(bookPrice*0.85.toFixed(2), div));
     }
    
    
    function e(type, content, className) {
        const result = document.createElement(type);
        result.textContent = content;
        if (className) {
            result.className = className;
        }
        return result;
    }
}