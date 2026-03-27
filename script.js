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

localStorage.setItem("products", JSON.stringify(products));
const product = JSON.parse(localStorage.getItem("products")) || [];

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
        <button class="btn btn-sm btn-edit">✏ Sửa</button>
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
    id: products.length + 1,
    name: iNameElement.value,
    price: iPriceElement.value,
    quantity: iStockElement.value,
  };

  products.unshift(newProduct);

  localStorage.setItem("products", JSON.stringify(products));

  renderProduct();

  formElement.reset();
});

const handleDelete = (index) => {
  const isConfirm = confirm("Bạn có muốn xóa sản phẩm này không?");
  if (isConfirm) {
    product.splice(index, 1);

    localStorage.setItem("products", JSON.stringify(products));

    renderProduct();
  }
};

renderProduct();
