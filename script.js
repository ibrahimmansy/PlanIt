// Dark Mode Toggle
const toggleDark = document.getElementById("toggleDarkMode");
toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// Load Dark Mode
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// Form Submit
document.getElementById("installmentForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const price = parseFloat(document.getElementById("price").value);
  const months = parseInt(document.getElementById("months").value);
  const interest = parseFloat(document.getElementById("interest").value);

  const total = price + (price * (interest / 100));
  const installment = (total / months).toFixed(2);

  const tbody = document.querySelector("#resultTable tbody");
  tbody.innerHTML = "";

  let remaining = total;
  let totalPaid = 0;

  for (let i = 1; i <= months; i++) {
    remaining -= installment;
    totalPaid += parseFloat(installment);
    const row = `
      <tr>
        <td>${i}</td>
        <td>${installment}</td>
        <td>${remaining.toFixed(2)}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  }

  // Add final totals row
  const finalRow = `
    <tr style="font-weight:bold; background:#f0f0f0;">
      <td>Total</td>
      <td>${totalPaid.toFixed(2)}</td>
      <td>${remaining.toFixed(2)}</td>
    </tr>
  `;
  tbody.innerHTML += finalRow;
});

// Download CSV
document.getElementById("downloadCSV").addEventListener("click", () => {
  const rows = document.querySelectorAll("table tr");
  let csv = [];

  rows.forEach(row => {
    const cols = row.querySelectorAll("th, td");
    const rowData = [];
    cols.forEach(col => rowData.push(col.innerText));
    csv.push(rowData.join(","));
  });

  const blob = new Blob([csv.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "installments.csv");
  a.click();
});

// Print Table
document.getElementById("printTable").addEventListener("click", () => {
  window.print();
});

// Reset Table
document.getElementById("resetTable").addEventListener("click", () => {
  document.getElementById("price").value = "";
  document.getElementById("months").value = "";
  document.getElementById("interest").value = "";
  document.querySelector("#resultTable tbody").innerHTML = "";
});
