const products = [
  {
    id: 1,
    name: "Laptop Dell XPS 13",
    price: 28500000,
    quantity: 13,
  },
  {
    id: 2,
    name: "Bàn phím Keychron K2",
    price: 10000000,
    quantity: 34,
  },
  {
    id: 3,
    name: "Chuột Logitech MX Master",
    price: 1850000,
    quantity: 7,
  },
  {
    id: 4,
    name: "Áo thun Basic Uniqlo",
    price: 390000,
    quantity: 32,
  },
  {
    id: 5,
    name: "Cà phê rang xay 500g",
    price: 185000,
    quantity: 58,
  },
];

const tbodyElement = document.querySelector("#tbody");
const formElement = document.querySelector("#added-product");
const btnSubmitElement = document.querySelector("#btnSubmit");
const iNameElement = document.querySelector("#iName");
const iPriceElement = document.querySelector("#iPrice");
const iStockElement = document.querySelector("#iStock");
const inputSearchElement = document.querySelector("#input-search");
const sortSelectElement = document.querySelector("#sortSelect");

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
    alert("Tên sản phầm không được để rỗng!");
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

  if (indexEdit !== null) {
    product[indexEdit] = newProduct;
  } else {
    product.unshift(newProduct);
  }

  localStorage.setItem("products", JSON.stringify(product));

  renderProduct();

  resetForm();

  indexEdit = null;

  btnSubmitElement.textContent = "Thêm sản phẩm";
});

const resetForm = () => {
  iNameElement.value = "";
  iPriceElement.value = "";
  iStockElement.value = "";

  indexEdit = null;
  btnSubmitElement.textContent = "Thêm sản phẩm";
};

const handleDelete = (index) => {
  const isConfirm = confirm("Bạn có muốn xóa sản phẩm này không?");
  if (isConfirm) {
    product.splice(index, 1);

    localStorage.setItem("products", JSON.stringify(product));

    renderProduct();
  }
};

const handleEdit = (index) => {
  iNameElement.value = product[index].name;
  iPriceElement.value = product[index].price;
  iStockElement.value = product[index].quantity;

  btnSubmitElement.textContent = "Cập nhật";

  indexEdit = index;
};

btnSubmitElement.addEventListener("submit", (event) => {
  product.filter((element) => {
    return element.name.toLowerCase().include(event.target.value);
  });
});

renderProduct();
