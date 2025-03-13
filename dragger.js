function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var isResizing = false;
  const resizeThreshold = 50; // Distance from the bottom-right corner to start resizing

  elmnt.addEventListener("mousedown", function(e) {
    // Check if the mouse is near the bottom-right corner for resizing
    if (isNearResizeArea(e)) {
      isResizing = true;
      document.onmousemove = elementResize;
      document.onmouseup = closeResizeElement;
      e.preventDefault(); // Prevent the drag when resizing
    } else {
      dragMouseDown(e); // Otherwise, start dragging
    }
  });

  // Check if the mouse is near the bottom-right corner
  function isNearResizeArea(e) {
    const rect = elmnt.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    // Check if the mouse is within the threshold of the bottom-right corner
    return x >= rect.right - resizeThreshold && y >= rect.bottom - resizeThreshold;
  }

  // Function to resize the element
  function elementResize(e) {
    if (isResizing) {
      const iframe = elmnt.querySelector("iframe");
      if (iframe) {
        iframe.style.pointerEvents = "none";
      }
      const width = e.clientX - elmnt.getBoundingClientRect().left;
      const height = e.clientY - elmnt.getBoundingClientRect().top;
      elmnt.style.width = width + 'px';
      elmnt.style.height = height + 'px';
    }
  }

  function closeResizeElement() {
    const iframe = elmnt.querySelector("iframe");
    if (iframe) {
      iframe.style.pointerEvents = "auto";
    }
    document.onmousemove = null;
    document.onmouseup = null;
    isResizing = false;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    const iframe = elmnt.querySelector("iframe");
    if (iframe) {
      iframe.style.pointerEvents = "none";
    }
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    if (!isResizing) { // Only move the element if not resizing
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement() {
    const iframe = elmnt.querySelector("iframe");
    if (iframe) {
      iframe.style.pointerEvents = "auto";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
}
