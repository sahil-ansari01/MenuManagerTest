const form = document.getElementById('form');
const choosePrice = document.getElementById('choose-price');
const chooseDish = document.getElementById('choose-dish');
const chooseTable = document.getElementById('choose-table');
const addToBillBtn = document.querySelector('.add-to-bill');
const table1Ul = document.querySelector('.table1-ul')
const table2Ul = document.querySelector('.table2-ul')
const table3Ul = document.querySelector('.table3-ul')

document.addEventListener('DOMContentLoaded', () => {
    axios.get(`https://crudcrud.com/api/8d8fe5ac183c482bb2962737291261d1/orders`)
    .then( (res) => {
        for (let i = 0; i < res.data.length; i++) {
            // console.log(res.data[i].table )
            const order = res.data[i];
            showOrder(order);
        }
    })
    .catch( (err) => {
        console.log(err);
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let order = {
        price: choosePrice.value,
        dish: chooseDish.value,
        table: chooseTable.value
    } 

    axios.post(`https://crudcrud.com/api/8d8fe5ac183c482bb2962737291261d1/orders`, order)
    .then( (res) => {
        createOrder(order);
        clearFields();
    })
    .catch( (err) => {
        console.log(err)
    })

})

function clearFields() {
    choosePrice.value = '';
    chooseDish.value = '';
    chooseTable.value = 'table1';
}

function showOrder(order) {
    createOrder(order);
}

function createOrder(order) {
    const li = document.createElement('li');
    li.className = 'list-items';
    const liTextNode = document.createTextNode(`${order.dish} - $${order.price}`);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn btn-danger delete-btn';

    deleteBtn.addEventListener('click', () => {
        axios.delete(`https://crudcrud.com/api/8d8fe5ac183c482bb2962737291261d1/orders/${order._id}`)
        .then( (res) => {
            li.remove();
        })
        .catch( (err) => {
            console.log(err);
        })
    })

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