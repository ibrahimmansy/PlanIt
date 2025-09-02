function calculate() {
  const price = parseFloat(document.getElementById("price").value);
  const months = parseInt(document.getElementById("months").value);
  const interestRate = parseFloat(document.getElementById("interest").value);
  const output = document.getElementById("output");
  const tbody = document.querySelector("#installmentTable tbody");

  if (isNaN(price) || isNaN(months) || isNaN(interestRate)) {
    output.innerText = "❌ من فضلك أدخل جميع القيم.";
    return;
  }

  const totalInterest = price * (interestRate / 100);
  const total = price + totalInterest;
  const monthly = total / months;

  output.innerHTML = `
    ✅ إجمالي المبلغ بعد الفائدة: ${total.toFixed(2)} جنيه<br>
    💰 القسط الشهري: ${monthly.toFixed(2)} جنيه
  `;

  tbody.innerHTML = "";
  let remaining = total;

  for (let i = 1; i <= months; i++) {
    remaining -= monthly;
    const row = `<tr>
      <td>${i}</td>
      <td>${monthly.toFixed(2)} جنيه</td>
      <td>${remaining > 0 ? remaining.toFixed(2) : 0} جنيه</td>
    </tr>`;
    tbody.innerHTML += row;
  }
}

function downloadTable() {
  const table = document.getElementById("installmentTable").outerHTML;
  const blob = new Blob([table], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "installment-table.html";
  link.click();
}

// 🌙 وضع ليلي
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// لو فيه وضع محفوظ في localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️ الوضع النهاري";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️ الوضع النهاري";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙 الوضع الليلي";
  }
});
