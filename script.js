const products = [
  {
    id: 1,
    name: "Laptop Dell XPS 13",
    price: 28500000,
    quantity: 13,
  },
  {
    id: 2,
    name: "Laptop Dell XPS 12",
    price: 10000000,
    quantity: 3,
  },
];

const tbodyElement = document.querySelector("#tbody");
const formElement = document.querySelector("#added-product");
const btnSubmitElement = document.querySelector("#btnSubmit");
const iNameElement = document.querySelector("#iName");
const iPriceElement = document.querySelector("#iPrice");
const iStockElement = document.querySelector("#iStock");
const inputSearchElement = document.querySelector("#input-search");

localStorage.setItem("products", JSON.stringify(products));
const product = JSON.parse(localStorage.getItem("products")) || [];

let indexEdit = null;

const renderProduct = () => {
  let tbodyHTML = ``;
  product.forEach((element, index) => {
    tbodyHTML += `
    <tr id="row-SPJ806NEC">
        <td>${element.id}</td>
        <td class="td-name">${element.name}</td>
        <td class="td-price">${element.price} ₫</td>
        <td class="center" style="font-weight: 700">${element.quantity}</td>
        <td>
        <div class="td-actions">
        <button onclick="handleEdit(${index})" class="btn btn-sm btn-edit">✏ Sửa</button>
        <button onclick="handleDelete(${index})" class="btn btn-sm btn-del">✕ Xóa</button>
        </div>
        </td>
    </tr>
    `;
  });
  tbodyElement.innerHTML = tbodyHTML;
};

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!iNameElement.value) {
    alert("Họ và tên không đúng!");
    return;
  }
  if (!iPriceElement.value) {
    alert("Giá tiền không được để trống!");
    return;
  } else {
    if (iPriceElement.value < 0) {
      alert("Giá tiền không được bé hơn 0");
      return;
    }
  }
  if (!iStockElement.value) {
    alert("Số lượng không được để trống!");
    return;
  } else {
    if (iStockElement.value < 0) {
      alert("Số lượng phải lớn hơn 0");
      return;
    }
  }

  const newProduct = {
    id:
      indexEdit || indexEdit === 0 ? product[indexEdit].id : product.length + 1,
    name: iNameElement.value,
    price: iPriceElement.value,
    quantity: iStockElement.value,
  };

  if (indexEdit || indexEdit === 0) {
    product[indexEdit] = newProduct;
  } else {
    product.unshift(newProduct);
  }

  localStorage.setItem("products", JSON.stringify(products));

  renderProduct();

  formElement.reset();

  btnSubmitElement.textContent = "Thêm sản phẩm";
});

const handleDelete = (index) => {
  const isConfirm = confirm("Bạn có muốn xóa sản phẩm này không?");
  if (isConfirm) {
    product.splice(index, 1);

    localStorage.setItem("products", JSON.stringify(products));

    renderProduct();
  }
};

const handleEdit = (index) => {
  //   formElement.style.display = "block";

  iNameElement.value = product[index].name;
  dateElement.value = product[index].date;
  emailElement.value = product[index].email;
  iNameElement.value = product[index].price;
  statusSelect.value = product[index].status;

  btnSubmitElement.textContent = "Cập nhật";

  indexEdit = index;
};

btnSubmitElement.addEventListener("submit", (event) => {
  product.filter((element) => {
    return element.name.toLowerCase().include(event.target.value);
  });
});

renderProduct();
