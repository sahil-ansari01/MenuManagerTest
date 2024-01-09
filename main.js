const form = document.getElementById('form');
const choosePrice = document.getElementById('choose-price');
const chooseDish = document.getElementById('choose-dish');
const chooseTable = document.getElementById('choose-table');
const addToBillBtn = document.querySelector('.add-to-bill');
const table1Ul = document.querySelector('.table1-ul');
const table2Ul = document.querySelector('.table2-ul');
const table3Ul = document.querySelector('.table3-ul');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await axios.get(`https://crudcrud.com/api/b278258cf23c426ca62c7cec2f8d9658/orders`);
        for (let i = 0; i < res.data.length; i++) {
            const order = res.data[i];
            showOrder(order);
        }
    } catch (err) {
        console.log(err);
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let order = {
        price: choosePrice.value,
        dish: chooseDish.value,
        table: chooseTable.value
    };

    try {
        const res = await axios.post(`https://crudcrud.com/api/b278258cf23c426ca62c7cec2f8d9658/orders`, order);
        createOrder(res.data);
        clearFields();
        refreshPage();
    } catch (err) {
        console.log(err);
    }


});

function clearFields() {
    choosePrice.value = '';
    chooseDish.value = '';
    chooseTable.value = 'table1';
}

function showOrder(order) {
    createOrder(order);
}

async function createOrder(order) {
    const li = document.createElement('li');
    li.className = 'list-items';
    const liTextNode = document.createTextNode(`${order.dish} - $${order.price}`);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn btn-danger delete-btn';

    deleteBtn.addEventListener('click', async () => {
        try {
            await axios.delete(`https://crudcrud.com/api/b278258cf23c426ca62c7cec2f8d9658/orders/${order._id}`);
            li.remove();
        } catch (err) {
            console.log(err);
        }
    });

    li.appendChild(liTextNode);
    li.appendChild(deleteBtn);

    switch (order.table) {
        case 'table1':
            table1Ul.appendChild(li);
            break;
        case 'table2':
            table2Ul.appendChild(li);
            break;
        case 'table3':
            table3Ul.appendChild(li);
            break;
    }
}

function refreshPage() {
    location.reload(true);
}