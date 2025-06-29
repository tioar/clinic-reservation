document.getElementById("reserveForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    date: form.date.value,
    session: form.session.value,
    visitType: form.visitType.value,
    name: form.name.value,
    birth: form.birth.value,
    id: form.id.value,
    phone: form.phone.value,
  };

  const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  document.getElementById("message").innerText = result.message;
});
