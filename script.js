const copyEmailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");
const email = "Sodeyfi.ali@gmail.com";

copyEmailButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "ایمیل کپی شد.";
  } catch {
    copyStatus.textContent = email;
  }
});
