const HOST = process.env.HOST || "0.0.0.0";

async function fetchData() {
  console.log("Fetching data...");
  try {
    const response = await fetch("http://${HOST}:3000/api/products");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }

    renderProducts(data);
  } catch (error) {
    console.error(error.message);
  }
}

function renderProducts(products) {
  const productListContainer = document.getElementById("productList");

  console.log("Rendering products:", products);

  // Clear existing content
  productListContainer.innerHTML = "";

  // Create a table
  const table = document.createElement("table");
  table.border = "1";

  // Create table header
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = "<th>ID</th><th>Name</th>";
  table.appendChild(headerRow);

  // Render each product as a table row
  products.forEach((product) => {
    const productRow = document.createElement("tr");
    productRow.innerHTML = `<td>${product._id}</td><td>${product.name}</td>`;
    table.appendChild(productRow);
  });

  // Append the table to the container
  productListContainer.appendChild(table);
}

async function addProduct() {
  const newProductName = document.getElementById("newProductName").value;

  try {
    const response = await fetch("http://${HOST}:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newProductName }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add product: ${response.status} ${response.statusText}`
      );
    }

    console.log("Product added successfully");
    fetchData(); // Refresh the product list
  } catch (error) {
    console.error(error.message);
  }
}

async function updateProduct() {
  const updateProductId = document.getElementById("updateProductId").value;
  const updateProductName = document.getElementById("updateProductName").value;

  try {
    const response = await fetch(
      `http://${HOST}:3000/api/products/${updateProductId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updateProductName }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update product: ${response.status} ${response.statusText}`
      );
    }

    console.log("Product updated successfully");
    fetchData(); // Refresh the product list
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteProduct() {
  const deleteProductId = document.getElementById("deleteProductId").value;

  try {
    const response = await fetch(
      `http://${HOST}:3000/api/products/${deleteProductId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete product: ${response.status} ${response.statusText}`
      );
    }

    console.log("Product deleted successfully");
    fetchData(); // Refresh the product list
  } catch (error) {
    console.error(error.message);
  }
}
