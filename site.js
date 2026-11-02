const viewerLink = document.querySelector("[data-image-viewer]");
const viewer = document.querySelector(".image-dialog");
const closeViewer = document.querySelector("[data-close-viewer]");

if (viewerLink && viewer instanceof HTMLDialogElement && typeof viewer.showModal === "function") {
  viewerLink.addEventListener("click", (event) => {
    if (event instanceof MouseEvent && (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0)) return;
    event.preventDefault();
    viewer.showModal();
  });
  closeViewer?.addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (event) => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
  });
  viewer.addEventListener("close", () => viewerLink.focus());
}

const copyButton = document.querySelector("[data-copy-target]");
const copyStatus = document.querySelector("[data-copy-status]");
if (copyButton instanceof HTMLButtonElement && navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    const commands = document.getElementById(copyButton.dataset.copyTarget ?? "");
    if (!commands || !copyStatus) return;
    try {
      await navigator.clipboard.writeText(commands.textContent.trim());
      copyStatus.textContent = "已複製兩行指令。";
    } catch {
      copyStatus.textContent = "未能自動複製，請選取上面的指令手動複製。";
    }
  });
}
