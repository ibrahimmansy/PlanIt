document.addEventListener("DOMContentLoaded", () => {
  // عناصر
  const form = document.getElementById("installmentForm");
  const priceInput = document.getElementById("price");
  const monthsInput = document.getElementById("months");
  const interestInput = document.getElementById("interest");
  const tbody = document.querySelector("#resultTable tbody");
  const toggleDark = document.getElementById("toggleDarkMode");
  const downloadCSV = document.getElementById("downloadCSV");
  const printTable = document.getElementById("printTable");
  const resetTable = document.getElementById("resetTable");

  // تحميل الوضع الليلي من localStorage
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    toggleDark.textContent = "☀️";
  }

  // تبديل الوضع الليلي
  toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
    toggleDark.textContent = isDark ? "☀️" : "🌙";
  });

  // حساب الجدول
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const price = parseFloat(priceInput.value);
    const months = parseInt(monthsInput.value);
    const interest = parseFloat(interestInput.value);

    if (isNaN(price) || isNaN(months) || isNaN(interest) || price <= 0 || months <= 0) {
      alert("الرجاء إدخال قيم صحيحة!");
      return;
    }

    const total = price + price * (interest / 100);
    const installment = total / months;

    tbody.innerHTML = ""; // مسح الجدول السابق
    let remaining = total;
    let totalPaid = 0;

    for (let i = 1; i <= months; i++) {
      remaining -= installment;
      totalPaid += installment;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${i}</td>
        <td>${installment.toFixed(2)}</td>
        <td>${remaining > 0 ? remaining.toFixed(2) : 0}</td>
      `;
      tbody.appendChild(row);
    }

    // صف الإجمالي
    const totalRow = document.createElement("tr");
    totalRow.style.fontWeight = "bold";
    totalRow.style.backgroundColor = document.body.classList.contains("dark") ? "#2a2a2a" : "#f0f0f0";
    totalRow.innerHTML = `
      <td>الإجمالي</td>
      <td>${totalPaid.toFixed(2)}</td>
      <td>${remaining > 0 ? remaining.toFixed(2) : 0}</td>
    `;
    tbody.appendChild(totalRow);
  });

  // تحميل CSV
  downloadCSV.addEventListener("click", () => {
    const rows = document.querySelectorAll("#resultTable tr");
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
    a.href = url;
    a.download = "installments.csv";
    a.click();
  });

  // طباعة الجدول
  printTable.addEventListener("click", () => {
    window.print();
  });

  // مسح البيانات
  resetTable.addEventListener("click", () => {
    priceInput.value = "";
    monthsInput.value = "";
    interestInput.value = "";
    tbody.innerHTML = "";
  });
});
